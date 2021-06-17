"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDump = void 0;
const ThreadDumpInfo_1 = require("./model/ThreadDumpInfo");
const ThreadInfo_1 = require("./model/ThreadInfo");
function parseDump(text) {
    var splitted = text.split("\n");
    //console.log(splitted[2]);
    let namePattern = "^\"(.*)\".*prio=([0-9]+) os_prio=([0-9]+) tid=(\\w*) nid=(\\w*)\\s\\w*";
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
                    // console.log("name= ==",tag[0]);
                    // console.log("name == " ,tag[1]);
                    // console.log("prio = ",tag[2]);
                    // console.log("os_prio = ",tag[3]);
                    // console.log("tid",tag[4]);
                    // console.log("nid",tag[5]);
                    tInfo.setThreadName(tag[1]);
                    tInfo.setPriority(tag[2]);
                    tInfo.setosPriority(tag[3]);
                    tInfo.setTid(tag[4]);
                    tInfo.setNid(tag[5]);
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