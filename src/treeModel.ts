
export class TreeNode{
    public value:string;
    public numChild:number;
    public children:Array<TreeNode>;

    public constructor(val?:string){
        if(val===undefined){
            this.value="";
        }   
        else{
            this.value=val;
        }
        this.children=[];
        this.numChild=1;
    }

    public getNumChild(){
        return this.numChild;
    }
    public setNumChld(num:number){
        this.numChild=num;
    }

    public setValue(val:string){
        this.value=val;
    }

    public getValue():string{
        return this.value;
    }

    public setChildren(children:Array<TreeNode>){
        this.children=children;
    }

    public getChildren():Array<TreeNode>{
        return this.children;
    }

    public addChild(child:string){
        this.numChild++;
        this.children.push(new TreeNode(child));
    }
}