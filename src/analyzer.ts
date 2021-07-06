import { ThreadDumpInfo } from "./model/ThreadDumpInfo";
import { ThreadInfo } from "./model/ThreadInfo";

function groupBy(list: any[], keyGetter: { (ThreadInfo: any): any; (arg0: any): any; }) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

export function analyzeDump(tdInfo:ThreadDumpInfo):Map<string,Map<string,Array<ThreadInfo>>>{
    //group by state
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let grp:Map<string,Array<ThreadInfo>> = groupBy(tdInfo.gettInfo(), ThreadInfo=>ThreadInfo.state);

    //group by stacktrace
    let grp2:Map<string,Map<string,Array<ThreadInfo>>>=new Map<string,Map<string,Array<ThreadInfo>>>();


    //group by thread-name prefix
    //let grp3:Map<string,Map<string,Array<ThreadInfo>>>=new Map<string,Map<string,Array<ThreadInfo>>>();

    grp.forEach((value: Array<ThreadInfo>, key: string) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        var tmpVal:Map<string,Array<ThreadInfo>> = groupBy(value, ThreadInfo=>ThreadInfo.stackTrace);

        //stacktrace map
        var tmpValSorted:Map<string,Array<ThreadInfo>> =new Map([...tmpVal].sort((a, b) => a[1].length>b[1].length?-1:1));
        //console.log("map__after__sort = ",tmpValSorted);
        if(key.length>0){
            grp2.set(key,tmpValSorted);
        }
        //console.log("key = ",key,"type of val =" , tmpVal);
    });

    
    //statemap
    return grp2;
    
}