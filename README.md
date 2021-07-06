## Features

This extension parses and analyzes thread dump and generates a summary to display useful information.
* THREAD COUNT SUMMARY : 
  * count of different thread states
* DAEMON vs NON-DAEMON : 
  * count of daemon threads and non-daemon threads
* DEADLOCKS : 
  * shows a summary of threads stuck in a deadlock
* BOTTOM UP CALL STACK TREE : 
   * Call Stack Tree consolidates all the threads stack trace into one single tree and gives you one single view. It makes the thread dumps navigation much simpler and easier.  
   * It shows the class name, method name, and line of the code that has been executed and the number of threads that have executed the line of code
   * Initially, the tree remains in collapsed form, click on the 3 dots or on the arrow before it to expand
* THREAD DUMP SUMMARY : 
  * It shows all the threads grouped by state and by identical stacktrace.
  * Initially, it stays in collapsed form, click on the 3 dots after the thread name or on the arrow before it to expand
 
### Input Thread Dump
![INPUT](/images/input.png)

### Output Summary 
![OUTPUT](/images/output.png)

# Installation

Search for "Thread Dump Analyzer" in VS code extention marketplace and install it.

# How To Use

* Mac: 
  * ```cmd+shift+o```<br />
    OR
  * ```cmd+shift+p``` and  search "Analyze Thread Dump" command

* Windows: 
  * ```ctrl+shift+o```<br />
    OR
  * ```ctrl+shift+p``` and  search "Analyze Thread Dump" command

-----------------------------------------------------------------------------------------------------------
