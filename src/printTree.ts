import { LineNum } from "./linenum";
import { TreeNode } from "./treeModel";

export function printTree(root:TreeNode,indent:string,linenum:LineNum):string{
    var ans:string="";
    root.linenumber=linenum.val;
    ans += "("+root.getNumChild()+")"+ root.getValue()+"\n";
    for(var child of root.getChildren()){
        ans+= indent+"|\n"+indent+"|----";
        var indent2 = indent + "\t";
        linenum.val+=2;
        ans+= printTree(child,indent2,linenum);
    }

    return ans;
}