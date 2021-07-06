// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path = require('path');
import * as vscode from 'vscode';
import { Position, Range } from 'vscode';
import { generateSummary } from './controller';
import { generateStringSummary } from './generateStringSummary';
import { ThreadInfo } from './model/ThreadInfo';

function getTextEditor(document: vscode.TextDocument): vscode.TextEditor | null {

	for (let te of vscode.window.visibleTextEditors) {
		if (te.document.fileName === document.fileName) {
			return te;
		}
	}
	return null;
}
async function foldLines(document: vscode.TextDocument, foldLines: Array<number>) {
	var str = "";
	foldLines.forEach(p => str += p + ",");

	const textEditor = getTextEditor(document);
	if (!textEditor) { return; }
	const selection = textEditor.selection;

	for (const lineNumber of foldLines) {
		textEditor.selection = new vscode.Selection(lineNumber, 0, lineNumber, 0);
		await vscode.commands.executeCommand('editor.fold');
		//console.log('folding ' + textEditor.selection.anchor.line);
	}
	textEditor.selection = selection;
	// textEditor.revealRange(textEditor.selection, vscode.TextEditorRevealType.InCenter);
}

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('tda.helloWorld', function () {
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;
		
		const wsPath = editor?.document.uri.fsPath;
		const wsedit = new vscode.WorkspaceEdit();
		
		const filePath = vscode.Uri.file(wsPath + '_output_summary.txt');
		//vscode.window.showInformationMessage(filePath.toString());
		wsedit.createFile(filePath, { ignoreIfExists: true });
		vscode.workspace.applyEdit(wsedit);
		vscode.window.showInformationMessage('Summary created at : ',filePath.toString());
		var openPath = vscode.Uri.parse(filePath.toString());
		//console.log("\n\nhuehuehuekok\n\n");

		if (editor) {
			const document = editor.document;
			const selection = editor.selection.union(new Range(
				new Position(0, 0),
				new Position(document.lineCount, 0)));

			const text = document.getText(selection);
			var summary:Map<string,Map<string,Array<ThreadInfo>>>=generateSummary(text);

			var foldlines:Array<number>=[];
			var ans = generateStringSummary(summary,foldlines);
			var setting: vscode.Uri = vscode.Uri.parse(filePath.fsPath);
				vscode.workspace.openTextDocument(setting).then((a: vscode.TextDocument) => {
					
					vscode.window.showTextDocument(a, 1, false).then(e => {
						e.edit(edit => {
							edit.replace(new Range(
								 		new Position(0, 0),
								 		new Position(document.lineCount, 0)), ans);
						}
						);
						foldLines(e.document,foldlines.reverse());
					});
				}, (error: any) => {
					console.error(error);
					debugger;
				});	
		}
	});

	context.subscriptions.push(disposable);
}
// this method is called when your extension is deactivated
export function deactivate() {}
