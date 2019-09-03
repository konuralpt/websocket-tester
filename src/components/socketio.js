import React from 'react';
import { toast } from 'react-toastify';
import TagsInput from 'react-tagsinput';


class _socketio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        uri: '',
        hub_name: '',
        events: [],
        invoke: '',
        incoming_event: 'Response',
        response_area: '',
        connected: false
    };
    this.set_connectin_state = this.set_connectin_state.bind(this);
  }

  uri_change(event){
    this.setState({uri: event.target.value});
  }
  hub_name_change(event){
    this.setState({hub_name: event.target.value});
  }
  invoke_change(event){
    this.setState({invoke: event.target.value});
  }
  add_event(events){
    this.setState({events})
  }
  set_response_area(value){
    this.setState({response_area: value})
  }
  set_connectin_state(value){
    this.setState({connected: value});
  }
  set_incoming_event(value){
    this.setState({incoming_event: value})
  }
  
  invoke_event(){
    if(this.state.invoke.includes(',')){
      const splitted = this.state.invoke.split(',');
      const event_name = splitted[0];
      splitted.shift();
      console.log(splitted);
      window.$.connection[this.state.hub_name].invoke(event_name, ...splitted);
    }else{
      window.$.connection[this.state.hub_name].invoke(this.state.invoke);
    }
  }
  connect(){
    const script = document.createElement("script");
    script.src = this.state.uri + "/socket.io/socket.io.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const script2 = document.createElement("script");
      script2.type = 'text/javascript';
      script2.innerHTML = `var socket = io('${this.state.uri}');`
      script.async = true;
      document.body.appendChild(script2);

      window.socket.on('connect', () => {
        this.set_connectin_state(true);
        toast.success("Connected successfully");
      });

      this.state.events.map((item) => {
        window.socket.on(item, (...args) => {
          const incoming_event_name = item;
          this.set_incoming_event(incoming_event_name);
          this.set_response_area(JSON.stringify(args));
        });
      })

      window.socket.on('event', (data) => {
        console.log(data)
      });
      window.socket.on('disconnect', () => {
        toast.error("Disconnected");
        this.set_connectin_state(false);
      });
    };
  }


  render() {
    return (
        <div>
            <form>
            <div>
                <div className="form-group row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">SignalR Address</label>
                    <div className="col-sm-5">
                    <input type="text" className="form-control" onChange={this.uri_change.bind(this)} placeholder="http://localhost:3000" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Add Event</label>
                    <div className="col-sm-5">
                    <TagsInput value={this.state.events} onChange={this.add_event.bind(this)} inputProps={{placeholder: 'Add Event'}} />
                </div>
                </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Status</label>
              <div className="col-sm-1">
                <button type="button" className={ 'btn ' + (this.state.connected ? 'btn-success' : 'btn-danger') } disabled>{(this.state.connected ? 'Connected' : 'Disconnected')}</button>
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
                <span className="input-group-text">Invoke Event</span>
              </div>
              <input type="text" className="form-control" onChange={this.invoke_change.bind(this)} placeholder="event_name,param1,param2,..." />
            </div>
          </div>
          <div className="col-md-3" style={{padding: 30}}>
            <div className="input-group">
              <button className="btn btn-dark" onClick={this.invoke_event.bind(this)}>Invoke</button>
            </div>
          </div>
        </div>
        <hr width="50%"/>
        <div className="row">
          <div className="col-md-10" style={{padding: 30}}>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="response_span_text">{this.state.incoming_event}</span>
              </div>
              <textarea className="form-control" aria-label="Response" rows="8" value={this.state.response_area} disabled></textarea>
            </div>
          </div>
        </div>
        </div>
    )
  }


}
export default _socketio;
