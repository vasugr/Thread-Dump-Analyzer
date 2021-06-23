import { TreeNode } from "./treeModel";

export function printTree(root:TreeNode,indent:string):string{
    var ans:string="";

    ans += "("+root.getNumChild()+")"+ root.getValue()+"\n";

    for(var child of root.getChildren()){
        ans+= indent+"|\n"+indent+"|----";
        var indent2 = indent + "\t";

        ans+= printTree(child,indent2);
    }

    return ans;
}