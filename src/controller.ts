import { analyzeDump } from "./analyzer";
import { ThreadDumpInfo } from "./model/ThreadDumpInfo";
import { ThreadInfo } from "./model/ThreadInfo";
import { parseDump } from "./parser";


export function generateSummary(text:string):Map<string,Map<string,Array<ThreadInfo>>>{

    var tdInfo: ThreadDumpInfo = parseDump(text);
    let summary:Map<string,Map<string,Array<ThreadInfo>>> =analyzeDump(tdInfo);


    return summary;
}
