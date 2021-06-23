"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeNode = void 0;
class TreeNode {
    constructor(val) {
        if (val === undefined) {
            this.value = "";
        }
        else {
            this.value = val;
        }
        this.children = [];
        this.numChild = 1;
        this.linenumber = 0;
    }
    getNumChild() {
        return this.numChild;
    }
    setNumChld(num) {
        this.numChild = num;
    }
    setValue(val) {
        this.value = val;
    }
    getValue() {
        return this.value;
    }
    setChildren(children) {
        this.children = children;
    }
    getChildren() {
        return this.children;
    }
    addChild(child) {
        this.numChild++;
        this.children.push(new TreeNode(child));
    }
}
exports.TreeNode = TreeNode;
//# sourceMappingURL=treeModel.js.map