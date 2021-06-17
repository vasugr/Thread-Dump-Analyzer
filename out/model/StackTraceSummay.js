"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackTraceSummary = void 0;
class StackTraceSummary {
    constructor() {
        this.count = 0;
        this.stackTrace = "";
    }
    setStackTrace(stacktrace) {
        this.stackTrace = stacktrace;
    }
    getStackTrace() {
        return this.stackTrace;
    }
    getCount() {
        return this.count;
    }
    setCount(count) {
        this.count = count;
    }
}
exports.StackTraceSummary = StackTraceSummary;
//# sourceMappingURL=StackTraceSummay.js.map