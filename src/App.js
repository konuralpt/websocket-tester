import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Websocket from 'react-websocket';
import './App.css';
require('signalr');

const valid_websocket = /^wss?:\/\/([0-9]{1,3}(?:\.[0-9]{1,3}){3}|[a-zA-Z]+)(:[0-9]{1,5})$/i;

function App() {
  function connect(){
    /*
    var connection = window.$.hubConnection('http://localhost:65297');
    
    var contosoChatHubProxy = connection.createHubProxy('CraashHub');
    console.log(contosoChatHubProxy);
    connection.start().done(function(){ 
      console.log('Now connected, connection ID=' + connection.id); 
      contosoChatHubProxy.invoke('craash','');
    });
    */
   if(socketType == "ws" || socketType == "wss" ){
    if(valid_websocket.test(web_socket_url)){
      render_websocket(true);
    }else{
      set_valid(false);
      toast.error("Address is not valid!");
    }
   }else if(socketType == "signalr"){
    const script = document.createElement("script");
    script.src = web_socket_url + "/signalr/hubs";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      window.$.connection.hub.url= web_socket_url + '/signalr';

      window.$.connection[hubName].client.connected = function () { };

      window.$.connection.hub.start().done(function(){ 
        toast.success("Connected successfully");
        toast('Connection ID= '+window.$.connection.hub.id);
      }).fail(function(){ toast.warning("Server not available!"); });
    };
   }
  };

  function onMessage(data) {
    toast(data);
  };
  function onOpen(){
    set_valid(true);
    toast.success("Connected successfully");
  };
  function onClose(){
    toast.warning("Server not available!");
    set_valid(false);
    render_websocket(false);
  };
  function onSelectChange(event){
    setSocketType(event.target.value);
  }

  function signalr_addEvent(){
    var splitted = signalr_event_string.split(',');
    const event_name = splitted[0];
    splitted.shift();
    const params = splitted;
    window.$.connection[hubName].client[event_name] = function(...params){
      alert(params);
    }
  }
  function signalr_invokeEvent(){
    var contosoChatHubProxy = window.$.connection[hubName];
    contosoChatHubProxy.invoke('craash', 2);
  }

  function renderTextInput(){
    if(socketType == "ws"){
      return(
        <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">WebSocket Address</label>
        <div class="col-sm-6">
        <input type="text" className="form-control" value={web_socket_url} onChange={web_socket_url_change} placeholder="ws://0.0.0.0:8181" />
        </div>
      </div>)
    }else if(socketType == "wss"){
      return(
        <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">WebSocket Address</label>
        <div class="col-sm-6">
        <input type="text" className="form-control" value={web_socket_url} onChange={web_socket_url_change} placeholder="wss://0.0.0.0:8181" />
        </div>
      </div>)
    }else if(socketType == "signalr"){
      return(
        <div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">WebSocket Address</label>
        <div class="col-sm-2">
        <input type="text" className="form-control" value={web_socket_url} onChange={web_socket_url_change} placeholder="http://localhost:65297" />
        </div>
        <label for="inputPassword" class="col-sm-1 col-form-label">HubName</label>
        <div class="col-sm-2">
        <input type="text" className="form-control" value={hubName} onChange={hubName_change} placeholder="ChatHub" />
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">Add Event</label>
        <div class="col-sm-5">
          <input type="text" className="form-control" value={signalr_event_string} onChange={signalr_event_string_change} placeholder="event_name,param1,param2,..." />
        </div>
        <div class="col-sm-1">
          <button type="button" className="btn btn-dark" onClick={signalr_addEvent}>Add</button>
        </div>
      </div>
        </div>)
    }else if(socketType == "socketio"){
      return(
        <div class="col-sm-6">
          <input type="text" className="form-control" value={web_socket_url} onChange={web_socket_url_change} placeholder="wss://0.0.0.0:8181" />
        </div>)
    }

  }
  function renderReqRes(){
    if(socketType == "ws" || socketType == "wss"){
      return(<div>
        <div class="row">
          <div class="col-md-10" style={{padding: 30}}>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Request</span>
              </div>
              <textarea class="form-control" aria-label="Request" rows="8"></textarea>
            </div>
          </div>
        </div>
        <hr width="50%"/>
        <div class="row">
          <div class="col-md-10" style={{padding: 30}}>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Response</span>
              </div>
              <textarea class="form-control" aria-label="Response" rows="8"></textarea>
            </div>
          </div>
        </div>
  
        </div>)
    }else if(socketType == "signalr"){


    }
  }
  
  const [web_socket_url, setWeb_socket_url] = useState('');
  const [hubName, setHubName] = useState('');
  const [signalr_event_string, setSignalr_event_string] = useState('');
  const [websocket_render, render_websocket] = useState(false);
  const [valid, set_valid] = useState(false);
  const [socketType, setSocketType] = useState('ws');

  const signalr_event_string_change = event => setSignalr_event_string(event.target.value);
  const web_socket_url_change = event => setWeb_socket_url(event.target.value);
  const hubName_change = event => setHubName(event.target.value);
  return (
    <div className="App">
      {
          websocket_render ?
          <Websocket url={web_socket_url}
            onOpen={onOpen.bind(this)}
            onMessage={onMessage.bind(this)}
            onClose={onClose.bind(this)}
            />
            :
            <div></div>
      }
      <div class="row">
        <div className="col-md-12">

          <form>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Socket Type</label>
              <div class="col-sm-1">
              <select class="selectpicker" onChange={onSelectChange}>
                <optgroup label="WebSocket" data-max-options="2">
                  <option value="ws">ws://</option>
                  <option value="wss">wss://</option>
                </optgroup>
                <optgroup label="Event-Driven WebSocket" data-max-options="2">
                  <option value="signalr">SignalR</option>
                  <option value="socketio">SocketIO</option>
                </optgroup>
              </select>
              </div>
            </div>
            {
              renderTextInput()
            }

            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Status</label>
              <div class="col-sm-1">
                <button type="button" class={ 'btn ' + (valid ? 'btn-success' : 'btn-danger') } disabled>Disconnected</button>
              </div>
            </div>
            <div class="form-group row"></div><div class="form-group row"></div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label"></label>
              <div class="col-sm-1">
                <button type="button" className="btn btn-dark" onClick={connect}>Connect</button>
              </div>
            </div>

          </form>
        </div>
      </div>
      <button type="button" className="btn btn-dark" onClick={signalr_invokeEvent}>invoke event</button>
      <button type="button" className="btn btn-dark" onClick={signalr_addEvent}>ADDeVENT</button>

      {
        renderReqRes()
      }
      <ToastContainer />

    </div>
  );
}

export default App;
