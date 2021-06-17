/* eslint-disable @typescript-eslint/naming-convention */
import { ThreadInfo } from "./ThreadInfo";

export class ThreadDumpInfo {
    /*private*/ Time: string;


    /*private*/ tInfo: Array<ThreadInfo>;

    public constructor(){
        this.Time="";
        this.tInfo=[];
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        return "\nThreadDumpInfo{\nTime=\'" + this.Time + '\'' + '\'' + "\ntInfo=" + /* implicit toString */ (a => a?'['+a.join(', ')+']':'null')(this.tInfo) + '}';
    }

    public gettInfo(): Array<ThreadInfo> {
        return this.tInfo;
    }

    public settInfo(tInfo: Array<ThreadInfo>) {
        this.tInfo = tInfo;
    }

    public getTime(): string {
        return this.Time;
    }

    public setTime(time: string) {
        this.Time = time;
    }

}