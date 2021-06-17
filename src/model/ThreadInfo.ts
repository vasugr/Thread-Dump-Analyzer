export class ThreadInfo {
    /*private*/ threadName: string;

    /*private*/ priority: string;

    /*private*/ osPriority: string;

    /*private*/ tid: string;

    /*private*/ nid: string;

    /*private*/ state: string;

    /*private*/ stackTrace: string;

    constructor(){
        this.threadName = "";
         this.priority="";
         this.osPriority="";
         this.tid="";
         this.nid="";
         this.state = "";
         this.stackTrace="";
    }
    // constructor(threadName:string,priority:string,osPriority:string,tid:string,nid:string,state:string,stacktrace:string) {
    //     this.threadName = threadName;
    //     this.priority=priority;
    //     this.osPriority=osPriority;
    //     this.tid=tid;
    //     this.nid=nid;
    //     this.state = state;
    //     this.stackTrace=stacktrace;

    // }

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

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        return "\nThreadInfo{\nthreadName=\'" + this.threadName + '\'' + "\npriority=" + this.priority + "\osPriority=" + this.osPriority + "\ntid=" + this.tid + "\nnid=" + this.nid + "\nstate=\'" + this.state + '\'' + "\nstackTrace=\'" + this.stackTrace + '\'' + '}';
    }
}




