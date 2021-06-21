"use strict";
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
function activate(context) {
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
            var ans = generateStringSummary_1.generateStringSummary(summary);
            editor.edit(editBuilder => {
                editBuilder.replace(new vscode_1.Range(new vscode_1.Position(0, 0), new vscode_1.Position(document.lineCount, 0)), ans);
            });
            //editor.document.;
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map