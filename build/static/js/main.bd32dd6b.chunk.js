(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(28)},17:function(e,t,n){},19:function(e,t,n){e.exports=n.p+"static/media/logo.ee7cd8ed.svg"},20:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),c=n(3),r=n.n(c),l=(n(17),n(5)),s=n(2),i=(n(18),n(9)),m=n.n(i),u=(n(19),n(20),/^wss?:\/\/([0-9]{1,3}(?:\.[0-9]{1,3}){3}|[a-zA-Z]+)(:[0-9]{1,5})$/i);var d=function(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(!1),i=Object(l.a)(r,2),d=i[0],p=i[1],v=Object(a.useState)(!1),b=Object(l.a)(v,2),E=b[0],f=b[1];return o.a.createElement("div",{className:"App"},d?o.a.createElement(m.a,{url:n,onOpen:function(){f(!0),s.b.success("Connected successfully")}.bind(this),onMessage:function(e){Object(s.b)(e)}.bind(this),onClose:function(){s.b.warning("Server not available!"),f(!1),p(!1)}.bind(this)}):o.a.createElement("div",null),o.a.createElement("div",{className:"row",style:{marginLeft:20,marginTop:18}},o.a.createElement("div",{className:"col-md-12"},o.a.createElement("form",null,o.a.createElement("div",{className:"form-row align-items-center"},o.a.createElement("div",{className:"col-sm-7 my-1"},o.a.createElement("label",{className:"sr-only",htmlFor:"inlineFormInputGroupUsername"},"Username"),o.a.createElement("div",{className:"input-group"},o.a.createElement("div",{className:"input-group-prepend"},o.a.createElement("div",{className:"input-group-text "+(E?"valid":"not-valid")},"WebSocket Uri")),o.a.createElement("input",{type:"text",className:"form-control",value:n,onChange:function(e){return c(e.target.value)},placeholder:"ws://0.0.0.0:8181"}))),o.a.createElement("div",{className:"col-sm-1 my-1"},o.a.createElement("button",{type:"button",className:"btn btn-dark",onClick:function(){u.test(n)?p(!0):(f(!1),s.b.error("Address is not valid!"))}},"Connect")))))),o.a.createElement(s.a,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(25),n(26),n(27);r.a.render(o.a.createElement(d,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[12,1,2]]]);
//# sourceMappingURL=main.bd32dd6b.chunk.js.map