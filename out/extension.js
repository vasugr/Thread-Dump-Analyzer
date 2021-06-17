"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const path = require("path");
const vscode = require("vscode");
const controller_1 = require("./controller");
const webview_1 = require("./webview");
// this method is called when your extension is activated
// your extension is activated the very first time the command is exec
const toObject = (map = new Map) => Object.fromEntries(Array.from(map.entries(), ([k, v]) => v instanceof Map
    ? [k, toObject(v)]
    : [k, v]));
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    //console.log('Congratulations, your extension "tda" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('tda.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        //vscode.window.showInformationMessage('Hello World from Thread Dump Analyzer!');
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            //const selection = editor.selection;
            // Get the word within the selection
            const text = document.getText();
            //const reversed = word.split('').reverse().join('');
            var summary = controller_1.generateSummary(text);
            // var o2 = mapToObjectRec(summary);
            // console.log(JSON.stringify(mapToObject(o2, summary), null, ' '));
            //console.log("type = ",summary.get("WAITING"));
            var o3 = toObject(summary);
            //console.log("type2 == ", o3);
            var jsonfile = JSON.stringify(o3);
            //console.log("json = ",jsonfile);
            // const onDiskPath2 = vscode.Uri.file( 
            // 	path.join(context.extensionPath,'src', 'output1.json')
            //  );
            // //console.log("path == ",onDiskPath2.path);
            // var fs = require('fs');
            // fs.writeFile(onDiskPath2.path, jsonfile, function(err: any) {
            // 	if (err) {
            // 		console.log(err);
            // 	}
            // });
            //console.table(summary);
            const panel = vscode.window.createWebviewPanel('catCoding', // Identifies the type of the webview. Used internally
            'Thread Dump Summary', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in.
            {
                // Enable scripts in the webview
                enableScripts: true
            } // Webview options. More on these later.
            );
            //panel.webview.html = buildTable(MOUNTAINS);
            const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'index.ts'));
            // And get the special URI to use with the webview
            const tsURI = panel.webview.asWebviewUri(onDiskPath);
            panel.webview.html = webview_1.getWebviewContent(tsURI, jsonfile);
            //panel.webview.postMessage(jsonfile);
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map