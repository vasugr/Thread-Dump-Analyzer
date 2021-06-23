"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printTree = void 0;
function printTree(root, indent, linenum) {
    var ans = "";
    root.linenumber = linenum.val;
    ans += "(" + root.getNumChild() + ")" + root.getValue() + "\n";
    for (var child of root.getChildren()) {
        ans += indent + "|\n" + indent + "|----";
        var indent2 = indent + "\t";
        linenum.val += 2;
        ans += printTree(child, indent2, linenum);
    }
    return ans;
}
exports.printTree = printTree;
//# sourceMappingURL=printTree.js.map