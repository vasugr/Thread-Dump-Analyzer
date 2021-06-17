export class StackTraceSummary{
    count:number;
    stackTrace:string;

    constructor(){
        this.count=0;
        this.stackTrace="";
    }

    public setStackTrace(stacktrace:string){
        this.stackTrace=stacktrace;
    }

    public getStackTrace():String{
        return this.stackTrace;
    }
    public getCount():number{
        return this.count;
    }
    public setCount(count:number){
        this.count=count;
    }

    
}