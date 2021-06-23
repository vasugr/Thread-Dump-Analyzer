"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const vscode_1 = require("vscode");
const controller_1 = require("./controller");
const generateStringSummary_1 = require("./generateStringSummary");
// this method is called when your extension is activated
// your extension is activated the very first time the command is exec
const toObject = (map = new Map) => Object.fromEntries(Array.from(map.entries(), ([k, v]) => v instanceof Map
    ? [k, toObject(v)]
    : [k, v]));
function getTextEditor(document) {
    for (let te of vscode.window.visibleTextEditors) {
        if (te.document.fileName === document.fileName) {
            return te;
        }
    }
    return null;
}
function foldLines(document, foldLines) {
    return __awaiter(this, void 0, void 0, function* () {
        var str = "";
        foldLines.forEach(p => str += p + ",");
        //console.log("folde error : ",foldLines);
        //console.log("folding lines: " + str);
        const textEditor = getTextEditor(document);
        if (!textEditor) {
            return;
        }
        const selection = textEditor.selection;
        for (const lineNumber of foldLines) {
            textEditor.selection = new vscode.Selection(lineNumber, 0, lineNumber, 0);
            yield vscode.commands.executeCommand('editor.fold');
            //console.log('folding ' + textEditor.selection.anchor.line);
        }
        textEditor.selection = selection;
        // textEditor.revealRange(textEditor.selection, vscode.TextEditorRevealType.InCenter);
    });
}
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    //console.log('Congratulations, your extension "tda" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    // let disposable = vscode.commands.registerCommand('tda.helloWorld', () => {
    // 	// The code you place here will be executed every time your command is executed
    // 	// Display a message box to the user
    // 	//vscode.window.showInformationMessage('Hello World from Thread Dump Analyzer!');
    // 	const editor = vscode.window.activeTextEditor;
    // 	if (editor) {
    // 		const document = editor.document;
    // 		const text = document.getText();
    // 		var summary:Map<string,Map<string,Array<ThreadInfo>>>=generateSummary(text);
    // 		var o3 = toObject(summary);
    // 		var jsonfile = JSON.stringify(o3);
    // 		const panel = vscode.window.createWebviewPanel(
    // 			'catCoding', // Identifies the type of the webview. Used internally
    // 			'Thread Dump Summary', // Title of the panel displayed to the user
    // 			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
    // 			{
    // 				// Enable scripts in the webview
    // 				enableScripts: true
    // 			  } // Webview options. More on these later.
    // 		);
    // 		const onDiskPath = vscode.Uri.file( 
    // 			path.join(context.extensionPath,'src', 'index.ts')
    // 		 );
    // 		 // And get the special URI to use with the webview
    // 		 const tsURI = panel.webview.asWebviewUri(onDiskPath);
    // 		panel.webview.html = getWebviewContent(tsURI,jsonfile);
    // 	}
    // });
    const disposable = vscode.commands.registerCommand('tda.helloWorld', function () {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection.union(new vscode_1.Range(new vscode_1.Position(0, 0), new vscode_1.Position(document.lineCount, 0)));
            // Get the word within the selection
            const text = document.getText(selection);
            var summary = controller_1.generateSummary(text);
            // var o3 = toObject(summary);
            // var jsonfile = JSON.stringify(o3,null,4);
            var foldlines = [];
            var ans = generateStringSummary_1.generateStringSummary(summary, foldlines);
            editor.edit(editBuilder => {
                editBuilder.replace(new vscode_1.Range(new vscode_1.Position(0, 0), new vscode_1.Position(document.lineCount, 0)), ans);
            });
            foldLines(editor.document, foldlines.reverse());
            //console.log("foldedlines = ",foldlines);
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map