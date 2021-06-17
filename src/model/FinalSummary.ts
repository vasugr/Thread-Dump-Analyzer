import { StateSummary } from "./StateSummary";

export class FinalSummary{
    count:number;
    time:string;
    stateList: Array<StateSummary>;

    constructor(){
        this.count=0;
        this.time="";
        this.stateList=[];
    }

    public setTime(time:string){
        this.time=time;
    }

    public getTime():String{
        return this.time;
    }
    public getCount():number{
        return this.count;
    }
    public setCount(count:number){
        this.count=count;
    }

    public getStateList(): Array<StateSummary> {
        return this.stateList;
    }

    public setStateList(stateList: Array<StateSummary>) {
        this.stateList = stateList;
    }


    
}