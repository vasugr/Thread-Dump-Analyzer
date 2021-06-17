import { StackTraceSummary } from "./StackTraceSummay";

export class StateSummary{
    count:number;
    state:string;
    stackTraceList: Array<StackTraceSummary>;

    constructor(){
        this.count=0;
        this.state="";
        this.stackTraceList=[];
    }

    public setState(state:string){
        this.state=state;
    }

    public getState():String{
        return this.state;
    }
    public getCount():number{
        return this.count;
    }
    public setCount(count:number){
        this.count=count;
    }

    public getStackTraceList(): Array<StackTraceSummary> {
        return this.stackTraceList;
    }

    public setStackTraceList(stackTraceList: Array<StackTraceSummary>) {
        this.stackTraceList = stackTraceList;
    }


    
}