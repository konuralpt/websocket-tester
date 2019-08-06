import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Websocket from 'react-websocket';
import './App.css';
require('signalr');

const valid_websocket = /^wss?:\/\/([0-9]{1,3}(?:\.[0-9]{1,3}){3}|[a-zA-Z]+)(:[0-9]{1,5})$/i;
/*const script = document.createElement("script");

script.src = "http://localhost:65297/signalr/hubs";
script.async = true;

document.body.appendChild(script);*/
function App() {
  function connect(){
    var connection = window.$.hubConnection('http://localhost:65297');
    connection.qs = { 'version' : '1.0' };
    var contosoChatHubProxy = connection.createHubProxy('CraashHub');
    connection.start().done(function(){ 
      console.log('Now connected, connection ID=' + connection.id); 
      contosoChatHubProxy.invoke('craash');
    });
    
    /*
    if(valid_websocket.test(web_socket_url)){
      render_websocket(true);
    }else{
      set_valid(false);
      toast.error("Address is not valid!");

    }*/
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
  const [web_socket_url, setWeb_socket_url] = useState(
  ''
  );
  const [websocket_render, render_websocket] = useState(
  false
  );
  const [valid, set_valid] = useState(
  false
  );

  const web_socket_url_change = event => setWeb_socket_url(event.target.value);

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

      <div className="row" style={{marginLeft:20,marginTop:18}} >
        <div className="col-md-12">
          <form>
            <div className="form-row align-items-center">
              <div className="col-sm-7 my-1">
                <label className="sr-only" htmlFor="inlineFormInputGroupUsername">Username</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className={ 'input-group-text ' + (valid ? 'valid' : 'not-valid') }>WebSocket Uri</div>
                  </div>
                  <input type="text" className="form-control" value={web_socket_url} onChange={web_socket_url_change} placeholder="ws://0.0.0.0:8181" />
                </div>
              </div>
              <div className="col-sm-1 my-1">
                <button type="button" className="btn btn-dark" onClick={connect}>Connect</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />

    </div>
  );
}

export default App;
