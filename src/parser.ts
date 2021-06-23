import { ThreadDumpInfo } from "./model/ThreadDumpInfo";
import { ThreadInfo } from "./model/ThreadInfo";

export function parseDump(text:string):ThreadDumpInfo{

    var splitted = text.split("\n"); 
    let namePattern ="^\"(.*)\"(.*)prio=([0-9]+) os_prio=([0-9]+) tid=(\\w*) nid=(\\w*)\\s\\w*";
    let statePattern = "\\s+java.lang.Thread.State: (.*)";
    let lockedPattern = "\\s+- locked\\s+<(.*)>\\s+\\(.*\\)";
    let lockWaitPattern = "\\s+- parking to wait for\\s+<(.*)>\\s+\\(.*\\)";
    let functionCallPattern = "\\s+at (.*)";
        
    let stacktrace:string="";
    var tInfo:ThreadInfo= new ThreadInfo;
    var tInfoList:ThreadInfo[]=[];
    //let tLis
    var starting:boolean = true;
    var gotime:boolean = false;

    var tdInfo:ThreadDumpInfo=new ThreadDumpInfo;

    var lockedList:Array<string> =new Array<string>();
    var waitingList:Array<string> =new Array<string>();
    var functionCallList:Array<string> =new Array<string>();

    for(var line of splitted){
        //console.log(line);
        if(!gotime){
            tdInfo.setTime(line);
            gotime=true;
        }
        else{
            if(line.charAt(0)==='"'){
                if(!starting){
                    tInfo.setStackTrace(stacktrace);
                    tInfo.setLocked(lockedList);
                    tInfo.setWaiting(waitingList);
                    tInfo.setCallList(functionCallList.reverse());
                    tInfoList.push(tInfo);
                    //console.log(tInfo.toString());
                    functionCallList =new Array<string>();
                    lockedList =new Array<string>();
                    waitingList =new Array<string>();
                    stacktrace="";
                }else{
                    stacktrace="";
                    starting = false;
                }
                let tag = line.match(namePattern);
                tInfo=new ThreadInfo;
                if(tag!==null){
                    tInfo.setThreadName(tag[1]);
                    tInfo.setDaemon(tag[2].includes("daemon"));
                    //console.log("daemon = ",tInfo.getDaemon());
                    tInfo.setPriority(tag[3]);
                    tInfo.setosPriority(tag[4]);
                    tInfo.setTid(tag[5]);
                    tInfo.setNid(tag[6]);
                }
            }
            else if(line.includes("Thread.State:")){
                let tag = line.match(statePattern);
                if(tag!==null){
                    // console.log(tag.length,"");
                    // console.log("state == ",tag[1].split(" ")[0]);
                    tInfo.setState(tag[1].split(" ")[0]);
                }
            }
            else{
                let tag = line.match(lockedPattern);
                if(tag!==null){
                    if(tInfo.state==="RUNNABLE"){
                        stacktrace+= line.replace(tag[1],"")+"\n";
                    }
                    else{
                        stacktrace+= line+"\n";
                    }
                    lockedList.push(tag[1]);
                }
                else{
                    stacktrace+= line+"\n";
                    let tag1 = line.match(lockWaitPattern);
                    if(tag1!==null){
                        waitingList.push(tag1[1]);
                    }
                    else{
                        let tag2 = line.match(functionCallPattern);
                        if(tag2!==null){
                            functionCallList.push(tag2[1]);
                        }
                    }
                }
                
            }   
        }
    }

    if(tInfo.getThreadName().length>0){
        tInfo.setStackTrace(stacktrace);
        tInfoList.push(tInfo);
    }

    tdInfo.settInfo(tInfoList);
    
    return tdInfo;
}