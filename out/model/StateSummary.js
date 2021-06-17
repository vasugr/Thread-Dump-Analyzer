"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateSummary = void 0;
class StateSummary {
    constructor() {
        this.count = 0;
        this.state = "";
        this.stackTraceList = [];
    }
    setState(state) {
        this.state = state;
    }
    getState() {
        return this.state;
    }
    getCount() {
        return this.count;
    }
    setCount(count) {
        this.count = count;
    }
    getStackTraceList() {
        return this.stackTraceList;
    }
    setStackTraceList(stackTraceList) {
        this.stackTraceList = stackTraceList;
    }
}
exports.StateSummary = StateSummary;
//# sourceMappingURL=StateSummary.js.map