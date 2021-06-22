"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadInfo = void 0;
class ThreadInfo {
    constructor() {
        this.threadName = "";
        this.daemon = false;
        this.priority = "";
        this.osPriority = "";
        this.tid = "";
        this.nid = "";
        this.state = "";
        this.stackTrace = "";
        this.locked = [];
        this.waiting = [];
        this.callList = [];
    }
    setCallList(callList) {
        this.callList = callList;
    }
    getCallList() {
        return this.callList;
    }
    getDaemon() {
        return this.daemon;
    }
    setDaemon(daemon) {
        this.daemon = daemon;
    }
    setLocked(locked) {
        this.locked = locked;
    }
    getLocked() {
        return this.locked;
    }
    setWaiting(waiting) {
        this.waiting = waiting;
    }
    getWaiting() {
        return this.waiting;
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
    toString() {
        return "\nThreadInfo{\nthreadName=\'" + this.threadName + "\npriority=" + this.priority + "\osPriority=" + this.osPriority + "\ntid=" + this.tid + "\nnid=" + this.nid + "\nstate=\'" + this.state + "\nlocked : " + this.locked + "\nwaiting : " + this.waiting + "\nstackTrace=\'" + this.stackTrace + '}';
    }
}
exports.ThreadInfo = ThreadInfo;
//# sourceMappingURL=ThreadInfo.js.map