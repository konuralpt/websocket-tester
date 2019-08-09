import React from 'react';
import Websocket from 'react-websocket';
import { ToastContainer, toast } from 'react-toastify';

const valid_websocket = /^wss?:\/\/([0-9]{1,3}(?:\.[0-9]{1,3}){3}|[a-zA-Z]+)(:[0-9]{1,5})$/i;


class _ws extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render_websocket: false,
      websocket_validation: false,
      web_socket_url: ''
    }
  }
  connect(){
    if(valid_websocket.test(this.state.web_socket_url)){
      this.setState({render_websocket: true});
    }else{
      this.setState({websocket_validation: false});
      this.toastMessage(3,"Address is not valid!");
    }
  }

  onMessage(data) {
    
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
  
  web_socket_url_change(event){
    this.setState({web_socket_url: event.target.value});
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
            />
            :
            <div></div>
      }
      <form>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">WebSocket Address</label>
          <div className="col-sm-6">
          <input type="text" className="form-control" onChange={this.web_socket_url_change.bind(this)} placeholder="ws://0.0.0.0:8181" />
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
          <div className="col-md-10" style={{padding: 30}}>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Request</span>
              </div>
              <textarea className="form-control" aria-label="Request" rows="8"></textarea>
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
              <textarea className="form-control" aria-label="Response" rows="8"></textarea>
            </div>
          </div>
        </div>
        </div>
    )
  }


}
export default _ws;