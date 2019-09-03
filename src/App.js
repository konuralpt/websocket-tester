import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import _ws from './components/ws';
import _signalr from './components/signalr';
import _socketio from './components/socketio';


function App() {

  function onSelectChange(event){
    setSocketType(event.target.value);
  }

  function renderComponent(){
    if(socketType === "ws" || socketType === "wss"){
      return(<_ws />)
    }else if(socketType === "signalr"){
      return(<_signalr />)
    }else if(socketType === "socketio"){
      return(<_socketio />)
    }
  }
  
  const [socketType, setSocketType] = useState('ws');

  return (
    <div className="App">
      <div className="row">
        <div className="col-md-12">

          <form>
            <div className="form-group row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Socket Type</label>
              <div className="col-sm-1">
              <select className="selectpicker" onChange={onSelectChange}>
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
          </form>
        </div>
      </div>
      {
        renderComponent()
      }
      <ToastContainer />

    </div>
  );
}

export default App;
