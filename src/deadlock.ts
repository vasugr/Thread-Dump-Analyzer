import { ThreadInfo } from "./model/ThreadInfo";

function getNext(slow:ThreadInfo,waiting:Map<ThreadInfo,string>,locked:Map<string,ThreadInfo>){
    var resid:string|undefined = waiting.get(slow);
    if(typeof resid === "string"){
        var thinf2 = locked.get(resid);

        if(thinf2 instanceof ThreadInfo && waiting.has(thinf2)){
            slow=thinf2;
        }
        else{
            return null;
        }
    }
    return slow;
}

export function identiftDeadLock(waiting:Map<ThreadInfo,string>,locked:Map<string,ThreadInfo>){

    let deadlocks:Set<ThreadInfo> =  new Set<ThreadInfo>();

    for(let [tinfo,resourceid] of waiting){
        if(deadlocks.has(tinfo)) {continue;}
        var slow:ThreadInfo = tinfo;
        var fast:ThreadInfo = tinfo;
        var found:boolean=false;
        while(true){
            //fast
            var next = getNext(fast,waiting,locked);
            if(next!==null){
                var next2 = getNext(next,waiting,locked);
                if(next2!==null){
                    fast=next2;
                }
                else{
                    break;
                }
            }
            else{
                break;
            }
            // if(fast.getTid()===slow.getTid()){
            //     found=true;
            //     break;
            // }
            //slow
            var next =getNext(slow,waiting,locked);
            if(next!==null){
                slow=next;
            }
            else{
                break;
            }
            
            if(fast.getTid()===slow.getTid()){
                found=true;
                break;
            }
        }
        if(found){
            //console.log("ok found one deadlock");
            var finder:ThreadInfo = tinfo;
            while(finder.getTid()!==slow.getTid()){
                deadlocks.add(finder);
                var next =getNext(finder,waiting,locked);
                if(next!==null){
                    finder=next;
                }   
                var next2 =getNext(slow,waiting,locked);
                if(next2!==null){
                    slow=next2;
                }
            }
            deadlocks.add(finder);
            var next =getNext(finder,waiting,locked);
            if(next!==null){
                finder=next;
            }
            while(finder.getTid()!==slow.getTid()){
                deadlocks.add(finder);
                var next =getNext(finder,waiting,locked);
                if(next!==null){
                    finder=next;
                }   
            }
        }
    }
    return deadlocks;
}