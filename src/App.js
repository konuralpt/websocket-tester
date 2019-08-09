import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import _ws from './components/ws';
import _signalr from './components/signalr';


const valid_websocket = /^wss?:\/\/([0-9]{1,3}(?:\.[0-9]{1,3}){3}|[a-zA-Z]+)(:[0-9]{1,5})$/i;
var signalr_events = [];

function App() {

  function onSelectChange(event){
    setSocketType(event.target.value);
  }

  function renderComponent(){
    if(socketType === "ws" || socketType === "wss"){
      return(<_ws />)
    }else if(socketType === "signalr"){
      return(<_signalr />)
    }
  }
  function renderTextInput(){/*
    if(socketType === "ws"){
    }else if(socketType === "signalr"){
      return(
        <div>
      <div className="form-group row">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">WebSocket Address</label>
        <div className="col-sm-2">
        <input type="text" className="form-control" value={web_socket_url} onChange={web_socket_url_change} placeholder="http://localhost:65297" />
        </div>
        <label htmlFor="inputPassword" className="col-sm-1 col-form-label">HubName</label>
        <div className="col-sm-2">
        <input type="text" className="form-control" value={hubName} onChange={hubName_change} placeholder="ChatHub" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Add Event</label>
        <div className="col-sm-5">
          <TagsInput value={signalr_events} onChange={signalr_addEvent} inputProps={{placeholder: 'Add Event'}} />
        </div>
      </div>
        </div>)
    }else if(socketType === "socketio"){
      return(
        <div className="col-sm-6">
          <input type="text" className="form-control" value={web_socket_url} onChange={web_socket_url_change} placeholder="wss://0.0.0.0:8181" />
        </div>)
    }
*/
  }
  function renderReqRes(){/*
    if(socketType === "ws" || socketType === "wss"){
      return(<_ws />)
    }else if(socketType === "signalr"){
      return(<div>
        <div className="row">
          <div className="col-md-9" style={{padding: 30}}>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Invoke Event</span>
              </div>
              <input type="text" className="form-control" value={signalr_invoke} onChange={signalr_invoke_change} placeholder="event_name,param1,param2,..." />
            </div>
          </div>
          <div className="col-md-3" style={{padding: 30}}>
            <div className="input-group">
              <button className="btn btn-dark" onClick={signalr_invokeEvent}>Invoke</button>
            </div>
          </div>
        </div>
        <hr width="50%"/>
        <div className="row">
          <div className="col-md-10" style={{padding: 30}}>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="response_span_text">{signalr_incoming_event}</span>
              </div>
              <textarea className="form-control" aria-label="Response" rows="8" value={response_text_area} onChange={response_text_area_change} disabled></textarea>
            </div>
          </div>
        </div>
  
        </div>)
    }*/
  }
  
  const [web_socket_url, setWeb_socket_url] = useState('');
  const [hubName, setHubName] = useState('');
  const [signalr_connected, set_signalr_connected] = useState(false);
  const [signalr_invoke, set_signalr_invoke] = useState('');
  const [socketType, setSocketType] = useState('ws');
  const [response_text_area, setResponse_text_area] = useState('');
  const [signalr_incoming_event, setSignalr_incoming_event] = useState('Response');

  
  const web_socket_url_change = event => setWeb_socket_url(event.target.value);
  const hubName_change = event => setHubName(event.target.value);
  const signalr_invoke_change = event => set_signalr_invoke(event.target.value);
  const response_text_area_change = event => setResponse_text_area(event.target.value);

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
            {
              renderTextInput()
            }

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
