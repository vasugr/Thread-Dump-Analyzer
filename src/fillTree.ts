import { ThreadInfo } from "./model/ThreadInfo";
import { TreeNode } from "./treeModel";

function insertNode(root:TreeNode,func:string):any{

    if(root.getValue() === func){
        root.numChild++;
        return root;
    }
    else{
        var ans=null;
        for(var childNode of root.children){
            ans=insertNode(childNode,func);
            if(ans!==null){
                break;
            }
        }
        return ans;
    }
}

export function fillTree(root:TreeNode, tlist:Array<ThreadInfo>){

    for(var tinfo of tlist){
        var root2:TreeNode=root;
        for(var func of tinfo.getCallList()){
            var node = insertNode(root2,func);

            if(node===null){
                var newNode = new TreeNode(func);
                root2.children.push(newNode);
                root2=newNode;
            }
            else{
                root2=node;
            }
        }
    }

}