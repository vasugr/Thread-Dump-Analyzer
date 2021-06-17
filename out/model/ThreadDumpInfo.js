"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadDumpInfo = void 0;
class ThreadDumpInfo {
    constructor() {
        this.Time = "";
        this.tInfo = [];
    }
    /**
     *
     * @return {string}
     */
    toString() {
        return "\nThreadDumpInfo{\nTime=\'" + this.Time + '\'' + '\'' + "\ntInfo=" + /* implicit toString */ (a => a ? '[' + a.join(', ') + ']' : 'null')(this.tInfo) + '}';
    }
    gettInfo() {
        return this.tInfo;
    }
    settInfo(tInfo) {
        this.tInfo = tInfo;
    }
    getTime() {
        return this.Time;
    }
    setTime(time) {
        this.Time = time;
    }
}
exports.ThreadDumpInfo = ThreadDumpInfo;
//# sourceMappingURL=ThreadDumpInfo.js.map