"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStringSummary = void 0;
function sharedStart(array) {
    var A = array.concat().sort(), a1 = A[0], a2 = A[A.length - 1], L = a1.length, i = 0;
    while (i < L && a1.charAt(i) === a2.charAt(i)) {
        i++;
    }
    return a1.substring(0, i);
}
function generateStringSummary(summary) {
    var ans = "";
    var ans1 = "";
    var ans2 = ""; //Thread count summary
    ans2 += " -------------------------------------------------\n";
    ans2 += "  THREAD COUNT SUMMARY: \n";
    ans += "\n\t\tTHREAD DUMP SUMMARY\n\n";
    var thrdCount = 0;
    var numDaemon = 0;
    for (let [state, value] of summary) {
        //console.log("---");
        //console.log(state,value);
        ans1 += " -------------------------------------------------\n";
        ans1 += "|\t\tSTATE : " + state + "\n";
        ans1 += " -------------------------------------------------\n\n";
        var thrdStateCount = 0;
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
            ans1 += "THREAD NAME : " + sharedStart(threadNameArr) + "\n";
            ans1 += stacktrace;
            ans1 += "\n";
            numDaemon += tinfo.reduce((acc, cur) => cur.daemon ? acc++ : acc, 0);
        }
        ans2 += "\n\t\t" + state + " : " + thrdStateCount;
        thrdCount += thrdStateCount;
    }
    ans2 += "\n\tTOTAL THREADS COUNT = " + thrdCount;
    ans2 += "\n -------------------------------------------------\n";
    ans2 += "  DAEMON VS NON-DAEMON : \n";
    ans2 += "\n\t\t DAEMON : " + numDaemon;
    ans2 += "\n\t\t NON-DAEMON : " + (thrdCount - numDaemon);
    ans2 += "\n -------------------------------------------------\n\n";
    ans += ans2;
    ans += ans1;
    return ans;
}
exports.generateStringSummary = generateStringSummary;
//# sourceMappingURL=generateStringSummary.js.map