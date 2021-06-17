"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalSummary = void 0;
class FinalSummary {
    constructor() {
        this.count = 0;
        this.time = "";
        this.stateList = [];
    }
    setTime(time) {
        this.time = time;
    }
    getTime() {
        return this.time;
    }
    getCount() {
        return this.count;
    }
    setCount(count) {
        this.count = count;
    }
    getStateList() {
        return this.stateList;
    }
    setStateList(stateList) {
        this.stateList = stateList;
    }
}
exports.FinalSummary = FinalSummary;
//# sourceMappingURL=FinalSummary.js.map