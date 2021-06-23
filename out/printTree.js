"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printTree = void 0;
function printTree(root, indent) {
    var ans = "";
    ans += "(" + root.getNumChild() + ")" + root.getValue() + "\n";
    for (var child of root.getChildren()) {
        ans += indent + "|\n" + indent + "|----";
        var indent2 = indent + "\t";
        ans += printTree(child, indent2);
    }
    return ans;
}
exports.printTree = printTree;
//# sourceMappingURL=printTree.js.map