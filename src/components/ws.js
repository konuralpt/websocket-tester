import React from 'react';
import ReactDOM from 'react-dom';
import Websocket from 'react-websocket';
import { toast } from 'react-toastify';

const valid_websocket = /^wss?:\/\/([0-9]{1,3}(?:\.[0-9]{1,3}){3}|[a-zA-Z]+)(:[0-9]{1,5})(\/.+)?$/i;


class _ws extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render_websocket: false,
      websocket_validation: false,
      web_socket_url: '',
      response_area: '',
      request_area: '',
      suggetions: [],
      show:false,
    }
    const suggestions = localStorage.getItem('ws');
    if(suggestions){
      this.state.suggetions = suggestions.split('|');
    }
    
  }
  connect(){
    if(valid_websocket.test(this.state.web_socket_url)){
      this.setState({render_websocket: true});

      const ws = localStorage.getItem('ws')
      if(ws && ws.indexOf(this.state.web_socket_url) === -1){
        localStorage.setItem('ws',ws+'|'+this.state.web_socket_url)
      }else{
        localStorage.setItem('ws',this.state.web_socket_url)
      }

    }else{
      this.setState({websocket_validation: false});
      this.toastMessage(3,"Address is not valid!");
    }
  }
  onMessage(data) {
    this.set_response_area(data);
  };
  onOpen(){
    this.setState({websocket_validation: true})
    this.toastMessage(1,"Connected successfully");
  };
  onClose(){
    this.toastMessage(2,"Server not available!");
    this.setState({websocket_validation: false})
    this.setState({render_websocket: false})
  };

  sendMessage(){
    console.log(this.state.request_area);
    if(this.state.render_websocket){
      this.refWebSocket.sendMessage(this.state.request_area);
    }
  }
  set_response_area(value){
    this.setState({response_area: value})
  }
  web_socket_url_change(event){
    this.setState({web_socket_url: event.target.value});
  }
  web_socket_url_click(){
    console.log(this.show);
    this.setState({show: !this.state.show});
  }
  request_area_change(event){
    this.setState({request_area: event.target.value});
  }
  set_web_socket_url(item){
    console.log(item);
    this.setState({web_socket_url: item});
    this.setState({show: !this.state.show});    
  }

  toastMessage(type,message){
    if(type === 1){
      toast.success(message);
    }else if(type === 2){
      toast.warning(message);
    }else{
      toast.error(message);
    }
  }

  render() {
    return (
      <div>
      {
          this.state.render_websocket ?
          <Websocket url={this.state.web_socket_url}
            onOpen={this.onOpen.bind(this)}
            onMessage={this.onMessage.bind(this)}
            onClose={this.onClose.bind(this)}
            ref={Websocket => {
              this.refWebSocket = Websocket;
            }}
            />
            :
            <div></div>
      }
      <form>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">WebSocket Address</label>
          <div className="col-sm-6">
          <input type="text" className="form-control" onClick={this.web_socket_url_click.bind(this)} onChange={this.web_socket_url_change.bind(this)} value={this.state.web_socket_url} placeholder="ws://0.0.0.0:8181" />
          <div className="suggestbox" style={{display: this.state.show ? "block" : "none" }}>
            <ul className="list-group">
            {this.state.suggetions.map((item, key) =>
                <li key={key} onClick={() => {this.set_web_socket_url(item)}} className="list-group-item suggest-item">{item}</li>
            )}
            </ul>
          </div>
          </div>
        </div>
        <div className="form-group row">
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Status</label>
              <div className="col-sm-1">
                <button type="button" className={ 'btn ' + (this.state.websocket_validation ? 'btn-success' : 'btn-danger') } disabled>{(this.state.websocket_validation ? 'Connected' : 'Disconnected')}</button>
              </div>
            </div>
        <div className="form-group row"></div>
        <div className="form-group row"></div>
        <div className="form-group row">
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label"></label>
              <div className="col-sm-1">
                <button type="button" className="btn btn-dark" onClick={this.connect.bind(this)}>Connect</button>
              </div>
        </div>
      </form>
        <div className="row">
          <div className="col-md-9" style={{padding: 30}}>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Request</span>
              </div>
              <textarea className="form-control" aria-label="Request" rows="8" onChange={this.request_area_change.bind(this)} value={this.state.request_area}></textarea>
            </div>
          </div>
          <div className="col-md-2" style={{padding: 30}}>
            <div className="input-group">
              <button className="btn btn-dark" onClick={this.sendMessage.bind(this)} style={{marginTop: "30%"}}>Send</button>
            </div>
          </div>
        </div>
        <hr width="50%"/>
        <div className="row">
          <div className="col-md-10" style={{padding: 30}}>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Response</span>
              </div>
              <textarea className="form-control" aria-label="Response" rows="8" value={this.state.response_area} disabled></textarea>
            </div>
          </div>
        </div>
        </div>
    )
  }


}
export default _ws;