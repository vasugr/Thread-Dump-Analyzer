"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeDump = void 0;
const FinalSummary_1 = require("./model/FinalSummary");
function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        }
        else {
            collection.push(item);
        }
    });
    return map;
}
function analyzeDump(tdInfo) {
    var finalSummary = new FinalSummary_1.FinalSummary;
    finalSummary.setTime(tdInfo.getTime());
    var stateList = [];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let grp = groupBy(tdInfo.gettInfo(), ThreadInfo => ThreadInfo.state);
    // console.log(" grppp sizee = ", grp.size);
    // console.log(grp.get("TIMED_WAITING"));
    // for (let [key, value] of grp) {
    //     console.log("key == " ,key, "type of val = \n" ,value);
    // }
    let grp2 = new Map();
    //console.log("fine till here #1");
    grp.forEach((value, key) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        var tmpVal = groupBy(value, ThreadInfo => ThreadInfo.stackTrace);
        //console.log("mapb4sort = ",tmpVal);
        var tmpValSorted = new Map([...tmpVal].sort((a, b) => a[1].length > b[1].length ? -1 : 1));
        //console.log("map__after__sort = ",tmpValSorted);
        // value = tmpVal.;
        if (key.length > 0) {
            grp2.set(key, tmpValSorted);
        }
        //console.log("key = ",key,"type of val =" , tmpVal);
    });
    return grp2;
}
exports.analyzeDump = analyzeDump;
//# sourceMappingURL=analyzer.js.map