"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSummary = void 0;
const analyzer_1 = require("./analyzer");
const parser_1 = require("./parser");
function generateSummary(text) {
    var tdInfo = parser_1.parseDump(text);
    let summary = analyzer_1.analyzeDump(tdInfo);
    return summary;
}
exports.generateSummary = generateSummary;
//# sourceMappingURL=controller.js.map