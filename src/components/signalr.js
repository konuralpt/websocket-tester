import React from 'react';
import { toast } from 'react-toastify';
import TagsInput from 'react-tagsinput';
require('signalr');


class _signalr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        uri: '',
        hub_name: '',
        events: [],
        invoke: '',
        incoming_event: 'Response',
        response_area: '',
        connected: false,
        
        show_uri_suggestion: false,
        show_hub_suggestion: false,
        
        uri_suggestion: [],
        hub_suggestion: [],
    };
    this.set_connectin_state = this.set_connectin_state.bind(this);
    const uri_suggestions = localStorage.getItem('signalr_uri');
    const hub_suggestions = localStorage.getItem('signalr_hub');

    if(uri_suggestions){
      this.state.uri_suggestion = uri_suggestions.split('|');
    }
    if(hub_suggestions){
      this.state.hub_suggestion = hub_suggestions.split('|');
    }
    
  }
  componentDidMount(){
    window.$('.selectpicker').selectpicker();
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
  handleChange(events) {
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
  set_suggestion(value, type){
    if(type === 'uri'){
      this.setState({uri: value});
    }else if(type === 'hub'){
      this.setState({hub_name: value});
    }
    this.set_suggestion_visibility(type);
  }
  set_suggestion_visibility(type){
    if(type === 'uri'){
      this.setState({show_uri_suggestion: !this.state.show_uri_suggestion});
    }else if(type === 'hub'){
      this.setState({show_hub_suggestion: !this.state.show_hub_suggestion});
    }
  }
  set_localStorage(type){
    if(type === 'uri'){
      
      const obj = localStorage.getItem('signalr_uri')
      if(obj && obj.indexOf(this.state.uri) === -1){
        localStorage.setItem('signalr_uri',obj+'|'+this.state.uri)
      }else{
        localStorage.setItem('signalr_uri',this.state.uri)
      }


    }else if(type === 'hub'){

      const obj = localStorage.getItem('signalr_hub')
      if(obj && obj.indexOf(this.state.hub_name) === -1){
        localStorage.setItem('signalr_hub',obj+'|'+this.state.hub_name)
      }else{
        localStorage.setItem('signalr_hub',this.state.hub_name)
      }


    }
  }

  onSelectChange(){

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
        /*const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://192.168.0.25/socket/CraashHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.start().then(function () {
    console.log("connected");
});*/
    this.set_localStorage('uri');
    this.set_localStorage('hub');
    const script = document.createElement("script");
    script.src = this.state.uri + "/signalr/hubs";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.$.connection.hub.url= this.state.uri + '/signalr';

      window.$.connection[this.state.hub_name].client.connected = () => { };

      for(var i=0; i < this.state.events.length; i++){
        const incoming_event_name = this.state.events[i];
        window.$.connection[this.state.hub_name].client[this.state.events[i]] = (...args) => {
          this.set_incoming_event(incoming_event_name);
          this.set_response_area(args);
        }
      }
      window.$.connection.hub.reconnecting(() => {
        toast.warning("Disconnected. Trying to reconnect");
        this.set_connectin_state(false);
      });
      window.$.connection.hub.reconnected(() => {
        toast.success("Back to online");
        this.set_connectin_state(true);
      });
      window.$.connection.hub.disconnected(() => {
        toast.error("Disconnected");
        this.set_connectin_state(false);
      });
      window.$.connection.hub.start().done(() => {
        this.set_connectin_state(true);
        /*this.set_localStorage('uri');
        this.set_localStorage('hub');*/
        toast.success("Connected successfully");
        toast('Connection ID= '+window.$.connection.hub.id);
      }).fail(() => { toast.warning("Server not available!"); });
    };
  }


  render() {
    return (
        <div>
            <form>
            <div className="form-group row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Socket Type</label>
              <div className="col-sm-1">
              <select className="selectpicker" onChange={this.onSelectChange}>
                  <option value="mvc">ASP.NET MVC</option>
                  <option value="core">ASP.NET Core</option>
              </select>
              </div>
            </div>
            <div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">SignalR Address</label>
                    <div className="col-sm-2">
                      <input type="text" value={this.state.uri} onClick={() =>{this.set_suggestion_visibility('uri')}} className="form-control" onChange={this.uri_change.bind(this)} placeholder="http://localhost:65297" />
                      <div className="suggestbox" style={{display: this.state.show_uri_suggestion ? "block" : "none" }}>
                        <ul className="list-group">
                        {this.state.uri_suggestion.map((item, key) =>
                            <li key={key} onClick={() => {this.set_suggestion(item,'uri')}} className="list-group-item suggest-item">{item}</li>
                        )}
                        </ul>
                      </div>
                    </div>
                    <label className="col-sm-1 col-form-label">HubName</label>
                    <div className="col-sm-2">
                    <input type="text" value={this.state.hub_name} onClick={() =>{this.set_suggestion_visibility('hub')}} className="form-control" onChange={this.hub_name_change.bind(this)} placeholder="ChatHub" />
                    <div className="suggestbox" style={{display: this.state.show_hub_suggestion ? "block" : "none" }}>
                        <ul className="list-group">
                        {this.state.hub_suggestion.map((item, key) =>
                            <li key={key} onClick={() => {this.set_suggestion(item,'hub')}} className="list-group-item suggest-item">{item}</li>
                        )}
                        </ul>
                      </div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Add Event</label>
                    <div className="col-sm-5">
                    <TagsInput value={this.state.events} onChange={this.add_event.bind(this)} inputProps={{placeholder: 'Add Event'}} />
                </div>
                </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Status</label>
              <div className="col-sm-1">
                <button type="button" className={ 'btn ' + (this.state.connected ? 'btn-success' : 'btn-danger') } disabled>{(this.state.connected ? 'Connected' : 'Disconnected')}</button>
              </div>
            </div>
            <div className="form-group row"></div>
            <div className="form-group row"></div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label"></label>
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
export default _signalr;
