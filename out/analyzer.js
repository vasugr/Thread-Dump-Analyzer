"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeDump = void 0;
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
    //group by state
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let grp = groupBy(tdInfo.gettInfo(), ThreadInfo => ThreadInfo.state);
    //group by stacktrace
    let grp2 = new Map();
    //group by thread-name prefix
    //let grp3:Map<string,Map<string,Array<ThreadInfo>>>=new Map<string,Map<string,Array<ThreadInfo>>>();
    grp.forEach((value, key) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        var tmpVal = groupBy(value, ThreadInfo => ThreadInfo.stackTrace);
        //stacktrace map
        var tmpValSorted = new Map([...tmpVal].sort((a, b) => a[1].length > b[1].length ? -1 : 1));
        //console.log("map__after__sort = ",tmpValSorted);
        if (key.length > 0) {
            grp2.set(key, tmpValSorted);
        }
        //console.log("key = ",key,"type of val =" , tmpVal);
    });
    //statemap
    return grp2;
}
exports.analyzeDump = analyzeDump;
//# sourceMappingURL=analyzer.js.map