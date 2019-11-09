@if (@This==@IsBatch) @then
@echo off
rem **** batch zone *********************************************************

    setlocal enableextensions disabledelayedexpansion

    rem The batch file will delegate all the work to the script engine
    if not "%~1"=="" (
        wscript //E:JScript "%~dpnx0" %1
    )

    rem End of batch file area. Ensure the batch file ends execution
    rem before reaching the JavaScript zone
    exit /b

@end


// **** JavaScript zone *****************************************************
// Instantiate the needed component to make URL queries
var http = WScript.CreateObject('Msxml2.XMLHTTP.6.0');

// Retrieve the URL parameter
var url = WScript.Arguments.Item(0);

// Make the request

http.open("GET", 'https://twitch.c0dr.nl:9384/webhook/tts-send/'+url, false);
http.send();

// All done. Exit
WScript.Quit(0);