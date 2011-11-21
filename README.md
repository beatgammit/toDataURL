Intro
=====

`toDataURL` takes whatever you give it (assuming it's supported) and turns it into something you can download.

Supported inputs are:

* string- uses built-in btoa function
* Array- takes Array of numbers and assumes they're bytes (converts to Uint8Array internally)
* Uint8Array- uses a home-grown base64 conversion function

`toDataURL` works with pakmanager and probably any other CommonJS compliant browser package builders.

Exported Methods
----------------

* toDataURL- takes up to three arguments
  * data- one of the supported formats listed above
  * mimeType- optional; application/octet-stream is the default
  * download- optional; defaults to false; this will automagically download the data if true
* openDataURL- takes up to two arguments
  * data- the dataURL output from toDataURL
  * name- name of the window to open it in (defaults to `_self`)
