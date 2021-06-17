"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadInfo = void 0;
class ThreadInfo {
    constructor(threadName, priority, osPriority, tid, nid, state, stacktrace) {
        this.threadName = threadName;
        this.priority = priority;
        this.osPriority = osPriority;
        this.tid = tid;
        this.nid = nid;
        this.state = state;
        this.stackTrace = stacktrace;
    }
    getThreadName() {
        return this.threadName;
    }
    setThreadName(threadName) {
        this.threadName = threadName;
    }
    getPriority() {
        return this.priority;
    }
    setPriority(priority) {
        this.priority = priority;
    }
    getosPriority() {
        return this.osPriority;
    }
    setosPriority(osPriority) {
        this.osPriority = osPriority;
    }
    getTid() {
        return this.tid;
    }
    setTid(tid) {
        this.tid = tid;
    }
    getNid() {
        return this.nid;
    }
    setNid(nid) {
        this.nid = nid;
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }
    getStackTrace() {
        return this.stackTrace;
    }
    setStackTrace(stackTrace) {
        this.stackTrace = stackTrace;
    }
    /**
     *
     * @return {string}
     */
    toString() {
        return "\nThreadInfo{\nthreadName=\'" + this.threadName + '\'' + "\npriority=" + this.priority + "\osPriority=" + this.osPriority + "\ntid=" + this.tid + "\nnid=" + this.nid + "\nstate=\'" + this.state + '\'' + "\nstackTrace=\'" + this.stackTrace + '\'' + '}';
    }
}
exports.ThreadInfo = ThreadInfo;
//# sourceMappingURL=ThreadInfo.js.map