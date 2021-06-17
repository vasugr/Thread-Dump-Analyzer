import { Uri } from "vscode";


export function getWebviewContent(uri: Uri,jsonfile:string) {
  //console.log("hmm uri == ",uri);
	return `<!DOCTYPE html>
  <html lang="en">
    <head><title>Thread Dump Analyzer</title></head>
    <body>
      <h1>Thread Dump Summary</h1>
      <div id="DIV1" style="display:none"><`+jsonfile+`></div>
      <div id="app"></div>
      <!-- Assume index.js is the compiled output of index.ts -->
      <script  src="`+uri+`" >
        
        
      </script>
    </body>
  </html>`;
}
  
