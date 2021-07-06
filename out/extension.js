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
    const disposable = vscode.commands.registerCommand('tda.helloWorld', function () {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
        const wsPath = editor === null || editor === void 0 ? void 0 : editor.document.uri.fsPath;
        const wsedit = new vscode.WorkspaceEdit();
        const filePath = vscode.Uri.file(wsPath + '_output_summary.txt');
        //vscode.window.showInformationMessage(filePath.toString());
        wsedit.createFile(filePath, { ignoreIfExists: true });
        vscode.workspace.applyEdit(wsedit);
        vscode.window.showInformationMessage('Summary created at : ', filePath.toString());
        var openPath = vscode.Uri.parse(filePath.toString());
        //console.log("\n\nhuehuehuekok\n\n");
        if (editor) {
            const document = editor.document;
            const selection = editor.selection.union(new vscode_1.Range(new vscode_1.Position(0, 0), new vscode_1.Position(document.lineCount, 0)));
            const text = document.getText(selection);
            var summary = controller_1.generateSummary(text);
            var foldlines = [];
            var ans = generateStringSummary_1.generateStringSummary(summary, foldlines);
            var setting = vscode.Uri.parse(filePath.fsPath);
            vscode.workspace.openTextDocument(setting).then((a) => {
                vscode.window.showTextDocument(a, 1, false).then(e => {
                    e.edit(edit => {
                        edit.replace(new vscode_1.Range(new vscode_1.Position(0, 0), new vscode_1.Position(document.lineCount, 0)), ans);
                    });
                    foldLines(e.document, foldlines.reverse());
                });
            }, (error) => {
                console.error(error);
                debugger;
            });
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map