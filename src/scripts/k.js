let config = {
    authentication: {
        subscription: {
            server: 'spidr-ucc.genband.com',
        },
        websocket: {
            server: 'spidr-ucc.genband.com',
        }
    }
}

let getUser = function(name)
{    
    debugger;
    let storedNames = '';
    if(localStorage.getItem("storage-event-test") != '')
    {
        storedNames = JSON.parse(localStorage.getItem("storage-event-test"));   
        var index = storedNames.indexOf(name);
        if (index > -1) {
            storedNames.splice(index, 1);
        } 
    }   
    return storedNames;
}

let setUser = function(name)
{
    debugger;
    let storedNames;
    if(localStorage.getItem("storage-event-test") == '')
    storedNames  = [];
    else
    storedNames = JSON.parse(localStorage.getItem("storage-event-test")); 
    var index = storedNames.indexOf(name);
        if (index > -1) {            
        } 
        else
        storedNames[storedNames.length]= name; 
    localStorage.setItem("storage-event-test", JSON.stringify(storedNames)); 
}

let clearStorage = function()
{
    localStorage.setItem("storage-event-test", '');
}

let removeUser = function(name)
{
    let storedNames = JSON.parse(localStorage.getItem("storage-event-test"));   
    var index = storedNames.indexOf(name);
    if (index > -1) {
        storedNames.splice(index, 1);
    }
    localStorage.setItem("storage-event-test", JSON.stringify(storedNames));
}
 
let kandy = createKandy( config );

 kandy.on('auth:change', function() {     
    connectStatus = kandy.getConnection().isConnected;  
    window['LoginComponent'].zone.run(() => {
        window['LoginComponent'].component.loginFromOutside(connectStatus); 
      });     
}); 

kandy.on('auth:error', function(params) {
  logmsg('Connect error: ' + params.error.message + ' (' + params.error.code + ')');
});

function logmsg(message) {   
  console.log(message);
}

let callId;

var makeCall = function (name) {
    debugger
    let callee = name;
    let withVideo = true;
    let remoteContainer = document.getElementById('vremote');
    let localContainer = document.getElementById('vlocal');
    logmsg('Making call to ' + callee);
    
    callId = kandy.call.make(callee, {
        sendInitialVideo: withVideo,
        remoteVideoContainer: remoteContainer,
        localVideoContainer: localContainer,
        normalizeAddress: true
    });
    window['CallComponent'].zone.run(() => {
        window['CallComponent'].component.statusChange("IN_CALL"); 
      });
    
}

let answerCall =function() {
    debugger;
     let withVideo = true;
    let remoteContainer = document.getElementById('vremote');
    let localContainer = document.getElementById('vlocal');

    let call = kandy.call.getById(callId);
    logmsg('Answering call from ' + call.from);

    kandy.call.answer(callId, {
        sendInitialVideo: withVideo,
        remoteVideoContainer: remoteContainer,
        localVideoContainer: localContainer
    });
    window['CallComponent'].zone.run(() => {
        window['CallComponent'].component.statusChange("IN_CALL"); 
      });
}

let rejectCall = function () {
    let call = kandy.call.getById(callId);
    logmsg('Rejecting call from ' + call.from);

    kandy.call.reject(callId);
    window['UserComponent'].zone.run(() => {
        window['UserComponent'].component.navigationEndCall(call.from); 
      });
}

var endCall= function () {
    let call = kandy.call.getById(callId);
    logmsg('Ending call with ' + call.from);
    kandy.call.end(callId);
    window['UserComponent'].zone.run(() => {
        window['UserComponent'].component.navigationEndCall(call.from); 
      });
}

kandy.on('call:start', function(params) {
    logmsg('Call successfully started. Waiting for response.');
});

kandy.on('call:error', function(params) {
    logmsg('Encountered error on call: ' + params.error.message);
});

kandy.on('media:error', function(params) {
    logmsg('Call encountered media error: ' + params.error.message);
});

kandy.on('call:stateChange', function(params) {
    debugger;
    let call = kandy.call.getById(callId);
    logmsg('Call state changed to: ' + params.state);
    let withVideo = true;
    if(params.state === 'ENDED') {       
          endCall();
    }  
    else if (params.state == "RINGING"|| params.state == "IN_CALL")
    {
     if( withVideo == true)
    {
        document.getElementsByClassName('call-container')[0].style.position = "relative";       
    }
    else
    {
        document.getElementsByClassName('call-container')[0].style.position = "fixed";
    }   
}
});

kandy.on('call:receive', function(params) {
    callId = params.callId;
    debugger;
    call = kandy.call.getById(params.callId);
    logmsg('Received incoming call from ' + call.from);
    window['UserComponent'].zone.run(() => {
        window['UserComponent'].component.navigationReceiveCall(call.from, "receiving"); 
      });
});