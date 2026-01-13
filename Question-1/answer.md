
# 1. Node.js Architecture

Node.js is designed to handle a large number of client requests efficiently by using a single-threaded, event-driven architecture.

Key Characteristics

* Uses one main thread for JavaScript execution
* Supports non-blocking I/O, so tasks do not wait unnecessarily
* Works on an event-driven model
* Heavy or blocking tasks are processed using background threads

High-Level Flow

* JavaScript code runs on a **single main execution thread**
* Long-running operations are **delegated to background workers**
* Once completed, results are sent back using **callbacks, promises, or async/await**
* The **Event Loop** controls the order in which tasks are executed

---

2. JavaScript Engine (V8)

What is V8?

* V8 is a **JavaScript engine developed by Google**
* It converts JavaScript code directly into **machine-level instructions**
* Node.js uses V8 to run JavaScript outside the browser

Role of V8 in Node.js

* Reads and parses JavaScript source code
* Compiles code into highly optimized machine code
* Executes code at high speed
* Manages memory allocation and garbage collection



3. Node.js Core APIs

What are Core APIs?

* Built-in modules that come with Node.js
* Mostly written using JavaScript and C++
* Do not require external installation


* `fs` – Handles file system operations
* `http` – Used to create servers and handle requests
* `os` – Provides system-related information
* `path` – Helps manage file and directory paths

Purpose

* Provide access to **system-level functionalities**
* Enable interaction with files, networks, and the operating system
* Simplify backend development

 4. Native Bindings

 What are Native Bindings?

* A connecting layer between **JavaScript** and **C/C++ code**
* Allow JavaScript to communicate with low-level system resources

 Why Native Bindings are Needed

* JavaScript cannot directly interact with the operating system
* Native bindings connect JavaScript with **libuv** and OS APIs
* They help Node.js achieve better performance


5. Event Loop

What is the Event Loop?

* The core mechanism that enables asynchronous behavior in Node.js
* Continuously monitors different task queues

Role of the Event Loop

* Executes callback functions
* Controls asynchronous task execution
* Prevents blocking of the main thread
* Maintains smooth and efficient execution flow


6. libuv

What is libuv?

* A C-based library** used internally by Node.js
* Provides support for asynchronous I/O operations
* Works consistently across Windows, Linux, and macOS

Why Node.js Needs libuv

* JavaScript runs on a single thread
* OS-level asynchronous operations are complex
* libuv hides OS differences and simplifies async handling

Responsibilities of libuv

* Implements the event loop
* Handles file system and networking operations
* Manages timers
* Controls the thread pool



7. Thread Pool

What is a Thread Pool?

* A set of background threads managed by libuv
* Used to perform blocking or resource-heavy tasks

 Why Node.js Uses a Thread Pool

* Blocking tasks can freeze the event loop
* Some operations cannot be handled asynchronously by the OS
* Thread pool keeps the main thread responsive

Operations Handled by the Thread Pool

* File system operations (`fs`)
* Cryptographic tasks
* Compression operations
* Certain DNS lookups



8. Worker Threads

What are Worker Threads?

* Independent JavaScript threads introduced in Node.js
* Used to execute CPU-intensive operations

Why Worker Threads are Needed

* CPU-heavy tasks can block the event loop
* Worker threads allow true parallel execution
* Improve performance without affecting responsiveness

Difference: Thread Pool vs Worker Threads

| Thread Pool             | Worker Threads            |
| ----------------------- | ------------------------- |
| Managed by libuv        | Managed by Node.js        |
| Used internally         | Created by developers     |
| Handles I/O-heavy tasks | Handles CPU-heavy tasks   |
| Does not run JS code    | Runs full JavaScript code |



9. Event Loop Queues

Node.js uses different queues to decide the execution order of tasks.

Macro Task Queue

Includes:

* `setTimeout`
* `setInterval`
* `setImmediate`
* I/O callbacks

setTimeout(() => {
  console.log("Timer");
}, 0);


Micro Task Queue

Includes:

* `Promise.then`
* `catch`
* `finally`
* `process.nextTick`

Promise.resolve().then(() => {
  console.log("Promise");
});


Execution Priority Order

1. Call Stack
2. Micro Task Queue
3. Macro Task Queue
