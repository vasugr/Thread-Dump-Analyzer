// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path = require('path');
import * as vscode from 'vscode';
import { Position, Range } from 'vscode';
import { generateSummary } from './controller';
import { generateStringSummary } from './generateStringSummary';
import { ThreadInfo } from './model/ThreadInfo';
import * as fs from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is exec

const toObject:any = (map = new Map) =>
  Object.fromEntries
    ( Array.from
        ( map.entries()
        , ([ k, v ]) =>
            v instanceof Map
              ? [ k, toObject (v) ]
              : [ k, v ]
        )
    );

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
	//console.log("folde error : ",foldLines);
	//console.log("folding lines: " + str);

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

			// Get the word within the selection
			const text = document.getText(selection);
			var summary:Map<string,Map<string,Array<ThreadInfo>>>=generateSummary(text);

			// var o3 = toObject(summary);
			
	 		// var jsonfile = JSON.stringify(o3,null,4);
			var foldlines:Array<number>=[];
			var ans = generateStringSummary(summary,foldlines);
			//console.log("sumary generated ");
			//fs.writeFileSync(filePath.toString(), ans.toString(), 'utf8');
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
			
			//console.log("\n\nfile saved\n ");			
			// editor.edit(editBuilder => {
			// 	editBuilder.replace(new Range(
			// 		new Position(0, 0),
			// 		new Position(document.lineCount, 0)), ans);
			// });

			// foldLines(editor.document,foldlines.reverse());
			//console.log("foldedlines = ",foldlines);
		}
		//console.log("\n\nokokok\n\n");
		// vscode.workspace.openTextDocument(openPath).then(doc => {
		// 	vscode.window.showTextDocument(doc);
		// 	const editor1 = vscode.window.activeTextEditor;
		// 	if(editor1){
		// 		const document1 = editor1.document;

		// 		console.log("new doc text = ",document1.getText());
		// 		console.log("new doc path = ",document1.uri.path);
		// 		editor1.edit(editBuilder => {
		// 		editBuilder.replace(new Range(
		// 				new Position(0, 0),
		// 				new Position(document1.lineCount, 0)), ans);
		// 		});
	
		// 		foldLines(document1,foldlines.reverse());
		// 	}
		// });
		
	});

	context.subscriptions.push(disposable);
}
// this method is called when your extension is deactivated
export function deactivate() {}
