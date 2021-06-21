"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDump = void 0;
const ThreadDumpInfo_1 = require("./model/ThreadDumpInfo");
const ThreadInfo_1 = require("./model/ThreadInfo");
function parseDump(text) {
    var splitted = text.split("\n");
    //console.log(splitted[2]);
    let namePattern = "^\"(.*)\"(.*)prio=([0-9]+) os_prio=([0-9]+) tid=(\\w*) nid=(\\w*)\\s\\w*";
    let statePattern = "\\s+java.lang.Thread.State: (.*)";
    let stacktrace = "";
    var tInfo = new ThreadInfo_1.ThreadInfo;
    var tInfoList = [];
    //let tLis
    var starting = true;
    var gotime = false;
    var tdInfo = new ThreadDumpInfo_1.ThreadDumpInfo;
    for (var line of splitted) {
        //console.log(line);
        if (!gotime) {
            tdInfo.setTime(line);
            gotime = true;
        }
        else {
            if (line.charAt(0) === '"') {
                if (!starting) {
                    tInfo.setStackTrace(stacktrace);
                    tInfoList.push(tInfo);
                    stacktrace = "";
                }
                else {
                    stacktrace = "";
                    starting = false;
                }
                let tag = line.match(namePattern);
                tInfo = new ThreadInfo_1.ThreadInfo;
                if (tag !== null) {
                    //console.log("name= ==",tag[0]);
                    // console.log("name2 == " ,tag[1]);
                    // console.log("daemon == " ,tag[2].split(" ")[2]);
                    // console.log("prio = ",tag[3]);
                    // console.log("os_prio = ",tag[4]);
                    // console.log("tid",tag[5]);
                    // console.log("nid",tag[6]);
                    tInfo.setThreadName(tag[1]);
                    tInfo.setDaemon(tag[2].includes("daemon"));
                    //console.log("daemon = ",tInfo.getDaemon());
                    tInfo.setPriority(tag[3]);
                    tInfo.setosPriority(tag[4]);
                    tInfo.setTid(tag[5]);
                    tInfo.setNid(tag[6]);
                }
            }
            else if (line.includes("Thread.State:")) {
                let tag = line.match(statePattern);
                if (tag !== null) {
                    // console.log(tag.length,"");
                    // console.log("state == ",tag[1].split(" ")[0]);
                    tInfo.setState(tag[1].split(" ")[0]);
                }
            }
            else {
                stacktrace += line + "\n";
            }
        }
    }
    if (tInfo.getThreadName().length > 0) {
        tInfo.setStackTrace(stacktrace);
        tInfoList.push(tInfo);
    }
    // console.log("length = " ,tInfoList.length);
    // console.log(tInfoList[0]);
    // console.log(tInfoList[1]);
    tdInfo.settInfo(tInfoList);
    return tdInfo;
}
exports.parseDump = parseDump;
//# sourceMappingURL=parser.js.map