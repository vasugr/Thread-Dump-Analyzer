"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStringSummary = void 0;
const deadlock_1 = require("./deadlock");
const fillTree_1 = require("./fillTree");
const linenum_1 = require("./linenum");
const printTree_1 = require("./printTree");
const treeModel_1 = require("./treeModel");
function sharedStart(array) {
    var A = array.concat().sort(), a1 = A[0], a2 = A[A.length - 1], L = a1.length, i = 0;
    while (i < L && a1.charAt(i) === a2.charAt(i)) {
        i++;
    }
    return a1.substring(0, i);
}
function generateStringSummary(summary, foldlines) {
    var ans = "";
    var line = 0;
    var foldlines2 = [];
    var ans1 = ""; //thread dump summary
    var ans2 = ""; //Thread count summary and daemon
    var ans3 = ""; // dead lock detection
    var ans4 = ""; //call stack tree
    ans1 += "\n -------------------------------------------------\n";
    ans1 += "\n|\t\tTHREAD DUMP SUMMARY\n\n";
    ans2 += " -------------------------------------------------\n";
    ans2 += "|  THREAD COUNT SUMMARY: \n";
    ans3 += "\n -------------------------------------------------\n";
    ans3 += "|  DEADLOCKS DETECTED: \n";
    ans4 += "\n -------------------------------------------------\n";
    ans4 += "|  BOTTOM UP CALL STACK TREE: \n\n";
    var thrdCount = 0;
    var numDaemon = 0;
    var lockedResource = new Map();
    var waitingThrds = new Map();
    var deadlock = new Set();
    var root = new treeModel_1.TreeNode("\troot");
    root.linenumber = 1;
    for (let [state, value] of summary) {
        ans1 += " -------------------------------------------------\n";
        foldlines2.push(ans1.split(/\r\n|\r|\n/).length);
        ans1 += "|\t\tSTATE : " + state + "\n";
        ans1 += " -------------------------------------------------\n\n";
        var thrdStateCount = 0;
        if (state === "BLOCKED") {
            for (let [strace, tlist] of value) {
                for (var tinfo of tlist) {
                    var resource = tinfo.getLocked();
                    for (var resourceID of resource) {
                        lockedResource.set(resourceID, tinfo);
                    }
                }
            }
            for (let [strace, tlist] of value) {
                for (var tinfo of tlist) {
                    var resourceList = tinfo.getWaiting();
                    for (var resourceID of resourceList) {
                        if (lockedResource.has(resourceID)) {
                            waitingThrds.set(tinfo, resourceID);
                        }
                    }
                }
            }
            deadlock = deadlock_1.identiftDeadLock(waitingThrds, lockedResource);
            //console.log("deadlocks = ",deadlock);
        }
        for (let [stacktrace, tinfo] of value) {
            numDaemon += tinfo.reduce((acc, cur) => cur.daemon ? ++acc : acc, 0);
            ans1 += " ";
            //console.log("typeof tinfo ",tinfo.length);
            // eslint-disable-next-line @typescript-eslint/naming-convention
            let threadNameArr = tinfo.map(ThreadInfo => ThreadInfo.threadName);
            let numThrds = tinfo.length;
            thrdStateCount += numThrds;
            if (numThrds > 1) {
                ans1 += numThrds + " THREADS with ";
            }
            else {
                ans1 += numThrds + " THREAD with ";
            }
            if (stacktrace.length > 0) {
                foldlines2.push(ans1.split(/\r\n|\r|\n/).length);
            }
            ans1 += "THREAD NAME : " + sharedStart(threadNameArr) + "\n";
            ans1 += stacktrace;
            ans1 += "\n";
            numDaemon += tinfo.reduce((acc, cur) => cur.daemon ? acc++ : acc, 0);
            fillTree_1.fillTree(root, tinfo);
        }
        ans2 += "\n\t\t" + state + " : " + thrdStateCount;
        thrdCount += thrdStateCount;
    }
    ans2 += "\n\tTOTAL THREADS COUNT = " + thrdCount;
    ans2 += "\n -------------------------------------------------\n";
    ans2 += "|  DAEMON VS NON-DAEMON : \n";
    ans2 += "\n\t\t DAEMON : " + numDaemon;
    ans2 += "\n\t\t NON-DAEMON : " + (thrdCount - numDaemon);
    ans += ans2;
    if (deadlock.size === 0) {
        ans3 += "\n\t\tNONE\n";
    }
    else {
        for (var tinfo of deadlock) {
            ans3 += "\n   THREAD NAME : " + tinfo.getThreadName();
            ans3 += "\n" + tinfo.getStackTrace();
        }
    }
    ans3 += "\n -------------------------------------------------\n";
    ans += ans3;
    var linenum = new linenum_1.LineNum();
    linenum.val = 1;
    ans4 += printTree_1.printTree(root, "\t\t", linenum);
    ans4 += "\n -------------------------------------------------\n";
    line += ans.split(/\r\n|\r|\n/).length;
    line += 3;
    for (var child of root.children) {
        foldlines.push(child.linenumber + line);
    }
    ans += ans4;
    line = ans.split(/\r\n|\r|\n/).length;
    for (var linenum1 of foldlines2) {
        foldlines.push(line + linenum1 - 1);
    }
    ans += ans1;
    return ans;
}
exports.generateStringSummary = generateStringSummary;
//# sourceMappingURL=generateStringSummary.js.map