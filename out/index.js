"use strict";
// @ts-ignore: Object is possibly 'null'.
var data = document.getElementById("DIV1").innerHTML;
var dataSliced = data.substring(4, data.length - 4);
//console.log("sliced == ",dataSliced);
let obj = JSON.parse(dataSliced);
//console.log(" typeof obj keys == ", Object.keys(obj));
var app = document.getElementById("app");
var p = document.createElement("table");
let thead = p.createTHead();
let row5 = thead.insertRow();
let th = document.createElement("th");
let text = document.createTextNode("Thread State");
th.appendChild(text);
row5.appendChild(th);
let th1 = document.createElement("th");
let text1 = document.createTextNode("Stacktraces");
th1.appendChild(text1);
row5.appendChild(th1);
let th2 = document.createElement("th");
let text2 = document.createTextNode("Thread Information");
th2.appendChild(text2);
row5.appendChild(th2);
var tblBody = document.createElement("tbody");
var i = 0;
var j = 0;
var stackTraceList = new Array;
var objlist = new Array;
for (const property in obj) {
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var h = document.createElement("H1"); // Create a <h1> element
    var cellText = document.createTextNode(property); // Create a text node
    h.appendChild(cellText);
    cell.appendChild(h);
    row.appendChild(cell);
    var cell = document.createElement("td");
    var p2 = document.createElement("table");
    var tblBody2 = document.createElement("tbody");
    var objStrace = obj[property];
    objlist.push(objStrace);
    for (const strace in objStrace) {
        var row2 = document.createElement("tr");
        row2.style.width = "590px";
        var cell2 = document.createElement("td");
        cell2.style.width = "400px";
        var straceText = strace;
        stackTraceList.push(straceText);
        var cellText2 = document.createTextNode(straceText.substring(0, 270) + "........");
        cell2.appendChild(cellText2);
        var cell21 = document.createElement("td");
        cell21.style.width = "200px";
        var x = document.createElement("BUTTON");
        var t = document.createTextNode("show/hide");
        x.appendChild(t);
        x.setAttribute("id", "buttonid" + i);
        x.setAttribute("name", "less");
        x.style.opacity = "0.5";
        x.style.width = "100px";
        cell2.setAttribute("id", "cell2id" + i);
        x.onclick = function (event) {
            var evntObj = event.currentTarget;
            // @ts-ignore: Object is possibly 'null'.
            var btnid = evntObj.id;
            var getId = btnid.substring(8);
            //console.log("btn id = "+btnid);
            // @ts-ignore: Object is possibly 'null'.
            var btnStatus = evntObj.name;
            // @ts-ignore: Object is possibly 'null'.
            var btnName = evntObj.value;
            console.log("btn text == " + btnName);
            if (btnStatus === "less") {
                //console.log("btn status == "+btnStatus);
                // @ts-ignore: Object is possibly 'null'.
                document.getElementById("cell2id" + getId).innerHTML = stackTraceList[getId];
                // @ts-ignore: Object is possibly 'null'.
                evntObj.setAttribute("name", "more");
            }
            else {
                //console.log("btn status == "+btnStatus);
                // @ts-ignore: Object is possibly 'null'.
                document.getElementById("cell2id" + getId).innerHTML = stackTraceList[getId].substring(0, 270) + "......";
                // @ts-ignore: Object is possibly 'null'.
                evntObj.setAttribute("name", "less");
            }
            //console.log(" typeof obj keys == ", );
        };
        row2.appendChild(cell2);
        row2.appendChild(x);
        var numthrds = 0;
        for (var thd01 in objStrace[strace]) {
            numthrds += (thd01.length);
        }
        var y = document.createElement("BUTTON");
        var t2 = document.createTextNode("show " + numthrds + " threads with similar stacktrace >");
        y.appendChild(t2);
        y.setAttribute("id", "threadbuttonid" + i + "-" + j);
        y.style.opacity = "0.5";
        y.style.width = "100px";
        y.style.maxHeight = "100px";
        y.onclick = function (event) {
            var evntObj = event.currentTarget;
            // @ts-ignore: Object is possibly 'null'.
            var btnid = evntObj.id;
            var combinedId = btnid.substring(14);
            var straceId = combinedId.split("-")[0];
            var stateId = combinedId.split("-")[1];
            var thatCell = document.getElementById("tblid" + stateId);
            var allThreadsAray = objlist[stateId][stackTraceList[straceId]];
            var cellText = document.createTextNode(allThreadsAray.length);
            var p3 = document.createElement("table");
            var tblBody3 = document.createElement("tbody");
            for (var thrdinfo of allThreadsAray) {
                var row3 = document.createElement("tr");
                var cell4 = document.createElement("td");
                var b = document.createElement("b");
                var cellText4 = document.createTextNode("THREAD NAME : ");
                b.appendChild(cellText4);
                cell4.appendChild(b);
                var cellText5 = document.createTextNode(thrdinfo["threadName"]);
                cell4.appendChild(cellText5);
                cell4.appendChild(document.createElement('br'));
                var b = document.createElement("b");
                var cellText4 = document.createTextNode("PRIORITY : ");
                b.appendChild(cellText4);
                cell4.appendChild(b);
                var cellText5 = document.createTextNode(thrdinfo["priority"]);
                cell4.appendChild(cellText5);
                cell4.appendChild(document.createElement('br'));
                var b = document.createElement("b");
                var cellText4 = document.createTextNode("OS_PRIORITY : ");
                b.appendChild(cellText4);
                cell4.appendChild(b);
                var cellText5 = document.createTextNode(thrdinfo["osPriority"]);
                cell4.appendChild(cellText5);
                cell4.appendChild(document.createElement('br'));
                var b = document.createElement("b");
                var cellText4 = document.createTextNode("TID : ");
                b.appendChild(cellText4);
                cell4.appendChild(b);
                var cellText5 = document.createTextNode(thrdinfo["tid"]);
                cell4.appendChild(cellText5);
                cell4.appendChild(document.createElement('br'));
                var b = document.createElement("b");
                var cellText4 = document.createTextNode("NID : ");
                b.appendChild(cellText4);
                cell4.appendChild(b);
                var cellText5 = document.createTextNode(thrdinfo["nid"]);
                cell4.appendChild(cellText5);
                cell4.appendChild(document.createElement('br'));
                var b = document.createElement("b");
                var cellText4 = document.createTextNode("STATE : ");
                b.appendChild(cellText4);
                cell4.appendChild(b);
                var cellText5 = document.createTextNode(thrdinfo["state"]);
                cell4.appendChild(cellText5);
                cell4.appendChild(document.createElement('br'));
                row3.appendChild(cell4);
                tblBody3.appendChild(row3);
            }
            p3.appendChild(tblBody3);
            p3.setAttribute("border", "1");
            while (thatCell === null || thatCell === void 0 ? void 0 : thatCell.hasChildNodes()) {
                // @ts-ignore: Object is possibly 'null'.
                thatCell === null || thatCell === void 0 ? void 0 : thatCell.removeChild(thatCell.lastChild);
            }
            thatCell === null || thatCell === void 0 ? void 0 : thatCell.appendChild(p3);
            //console.log(" typeof obj keys == ", );
        };
        row2.appendChild(y);
        tblBody2.appendChild(row2);
        i++;
    }
    p2.appendChild(tblBody2);
    p2.setAttribute("border", "1");
    cell.appendChild(p2);
    cell.style.width = "400px";
    row.appendChild(cell);
    var cell3 = document.createElement("td");
    var h1 = document.createElement("i"); // Create a <h1> element
    var cellText2 = document.createTextNode("click on a stacktrace to show thread information"); // Create a text node
    h1.appendChild(cellText2);
    cell3.appendChild(h1);
    cell3.setAttribute("id", "tblid" + j);
    row.appendChild(cell3);
    tblBody.appendChild(row);
    tblBody.setAttribute("align", "left");
    j++;
}
p.appendChild(tblBody);
p.setAttribute("border", "5");
p.setAttribute("align", "left");
app === null || app === void 0 ? void 0 : app.appendChild(p);
//# sourceMappingURL=index.js.map