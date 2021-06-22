export class ThreadInfo {
    threadName: string;

    daemon:boolean;

    priority: string;

    osPriority: string;

    tid: string;

    nid: string;

    state: string;

    stackTrace: string;

    locked :Array<string>;

    waiting:Array<string>;

    callList:Array<string>;


    constructor(){
        this.threadName = "";
        this.daemon=false;
         this.priority="";
         this.osPriority="";
         this.tid="";
         this.nid="";
         this.state = "";
         this.stackTrace="";
         this.locked=[];
         this.waiting=[];
         this.callList=[];
    }

    public setCallList(callList:Array<string>){
        this.callList=callList;
    }

    public getCallList():Array<string>{
        return this.callList;
    }

    public getDaemon():boolean{
        return this.daemon;
    }

    public setDaemon(daemon:boolean){
         this.daemon=daemon;
    }
    
    public setLocked(locked:Array<string>){
        this.locked=locked;
    }

    public getLocked():Array<string>{
        return this.locked;
    }

    public setWaiting(waiting:Array<string>){
        this.waiting=waiting;
    }

    public getWaiting():Array<string>{
        return this.waiting;
    }

    

    
    public getThreadName(): string {
        return this.threadName;
    }

    public setThreadName(threadName: string) {
        this.threadName = threadName;
    }

    public getPriority(): string {
        return this.priority;
    }

    public setPriority(priority: string) {
        this.priority = priority;
    }

    public getosPriority(): string {
        return this.osPriority;
    }

    public setosPriority(osPriority: string) {
        this.osPriority = osPriority;
    }

    public getTid(): string {
        return this.tid;
    }

    public setTid(tid: string) {
        this.tid = tid;
    }

    public getNid(): string {
        return this.nid;
    }

    public setNid(nid: string) {
        this.nid = nid;
    }

    public getState(): string {
        return this.state;
    }

    public setState(state: string) {
        this.state = state;
    }

    public getStackTrace(): string {
        return this.stackTrace;
    }

    public setStackTrace(stackTrace: string) {
        this.stackTrace = stackTrace;
    }

    public toString(): string {
        return "\nThreadInfo{\nthreadName=\'" + this.threadName + "\npriority=" + this.priority + "\osPriority=" + this.osPriority + "\ntid=" + this.tid + "\nnid=" + this.nid + "\nstate=\'" + this.state +  "\nlocked : "+this.locked+"\nwaiting : "+this.waiting+  "\nstackTrace=\'" + this.stackTrace + '}';
    }

    
}




