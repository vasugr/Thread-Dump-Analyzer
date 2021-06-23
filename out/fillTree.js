"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillTree = void 0;
const treeModel_1 = require("./treeModel");
function insertNode(root, func) {
    if (root.getValue() === func) {
        root.numChild++;
        return root;
    }
    else {
        var ans = null;
        for (var childNode of root.children) {
            ans = insertNode(childNode, func);
            if (ans !== null) {
                break;
            }
        }
        return ans;
    }
}
function fillTree(root, tlist) {
    for (var tinfo of tlist) {
        var root2 = root;
        for (var func of tinfo.getCallList()) {
            var node = insertNode(root2, func);
            if (node === null) {
                var newNode = new treeModel_1.TreeNode(func);
                root2.children.push(newNode);
                root2 = newNode;
            }
            else {
                root2 = node;
            }
        }
    }
}
exports.fillTree = fillTree;
//# sourceMappingURL=fillTree.js.map