// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path = require('path');
import * as vscode from 'vscode';
import { Position, Range } from 'vscode';
import { generateSummary } from './controller';
import { generateStringSummary } from './generateStringSummary';
import { ThreadInfo } from './model/ThreadInfo';

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

export function activate(context: vscode.ExtensionContext) {
	

	const disposable = vscode.commands.registerCommand('tda.helloWorld', function () {
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;

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

			var ans = generateStringSummary(summary);
			editor.edit(editBuilder => {
				editBuilder.replace(new Range(
					new Position(0, 0),
					new Position(document.lineCount, 0)), ans);
			});

			//editor.document.;
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
