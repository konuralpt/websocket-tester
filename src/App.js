import React, {useState } from 'react';
import Websocket from 'react-websocket';
import logo from './logo.svg';
import './App.css';

function App() {
  function connect(){
    //alert(web_socket_url);
    render_websocket(true);
  };
  function onMessage(data) {
    alert(data);
  };
  function onOpen(){
    alert('open');
  };
  const [web_socket_url, setWeb_socket_url] = useState(
  ''
  );
  const [websocket_render, render_websocket] = useState(
  false
  );

  const web_socket_url_change = event => setWeb_socket_url(event.target.value);

  return (
    <div className="App">
    {
      websocket_render ?
      <Websocket url={web_socket_url}
        onOpen={onOpen.bind(this)}
        onMessage={onMessage.bind(this)}/>
        :
        <div></div>
    }

      <div class="row">
        <div class="col-md-12">
          <form>
            <div class="form-row align-items-center">
              <div class="col-sm-10 my-1">
                <label class="sr-only" for="inlineFormInputGroupUsername">Username</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">WebSocket Uri</div>
                  </div>
                  <input type="text" class="form-control" value={web_socket_url} onChange={web_socket_url_change} placeholder="ws://0.0.0.0:8181" />
                </div>
              </div>
              <div class="col-sm-1 my-1">
                <button type="button" class="btn btn-dark" onClick={connect}>Connect</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
