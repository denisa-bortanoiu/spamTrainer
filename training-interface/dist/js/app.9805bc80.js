(function(e){function t(t){for(var i,s,o=t[0],l=t[1],c=t[2],f=0,p=[];f<o.length;f++)s=o[f],a[s]&&p.push(a[s][0]),a[s]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);u&&u(t);while(p.length)p.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],i=!0,o=1;o<n.length;o++){var l=n[o];0!==a[l]&&(i=!1)}i&&(r.splice(t--,1),e=s(s.s=n[0]))}return e}var i={},a={app:0},r=[];function s(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=i,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var u=l;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0104":function(e,t,n){},"034f":function(e,t,n){"use strict";var i=n("64a9"),a=n.n(i);a.a},"4ca6":function(e,t,n){"use strict";var i=n("5e33"),a=n.n(i);a.a},5248:function(e,t,n){"use strict";var i=n("aec4"),a=n.n(i);a.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var i=n("2b0e"),a=(n("0104"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("MainPage")],1)}),r=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("h1",[e._v("Training interface")]),n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("TrainFiles",{attrs:{endpoint:"spam",color:"color: red"}}),n("TrainFiles",{attrs:{endpoint:"ham",color:"color: green"}})],1),e._m(0)])])},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text-left footer"},[n("p",[e._v("Only .eml files are allowed for training.")]),n("p",{staticClass:"float-right"},[e._v("Denisa Bortanoiu, 2018")])])}],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-col",[n("h2",[e._v("Train as "),n("span",{style:e.color},[e._v(e._s(e.endpoint))])]),n("b-alert",{attrs:{variant:"success",dismissible:"",show:e.showSuccess},on:{dismissed:function(t){e.showSuccess=!1}}},[e._v("\n    The upload was successful!\n  ")]),n("b-alert",{attrs:{variant:"danger",dismissible:"",show:e.showFailure},on:{dismissed:function(t){e.showFailure=!1}}},[e._v("\n    The upload has failed!\n  ")]),n("b-form-file",{ref:"endpoint",attrs:{multiple:"",accept:"message/rfc822","drag-drop":"",type:"is-dark",placeholder:"Choose files..."},model:{value:e.files,callback:function(t){e.files=t},expression:"files"}}),e.files.length>0?n("div",{staticClass:"float-left"},[n("div",{staticClass:"mt-3"},[n("h5",[e._v("Selected files: ")])]),e._l(e.files,function(t){return n("b-list-group",{key:t.name,attrs:{data:t}},[n("b-list-group-item",[e._v(e._s(t.name))])],1)})],2):e._e(),n("div",{staticClass:"display-1"},[n("b-button",{staticClass:"buttons",attrs:{variant:"outline-danger"},on:{click:function(t){e.clearFiles()}}},[e._v("\n      Clear all\n    ")]),n("b-button",{staticClass:"buttons",attrs:{variant:"outline-success"},on:{click:function(t){e.send_files()}}},[e._v("\n      Train!\n    ")])],1)],1)},c=[],u=n("bc3a"),f=n.n(u),p={name:"TrainFiles",props:{endpoint:String,color:String},data:function(){return{files:[],showSuccess:!1,showFailure:!1}},methods:{clearFiles:function(){this.$refs.endpoint.reset()},send_files:function(){for(var e=this,t=new FormData,n=0;n<this.files.length;n++){var i=this.files[n];t.append("files["+n+"]",i)}f.a.post("http://localhost:5001/"+this.endpoint,t,{headers:{"Content-Type":"multipart/form-data"}}).then(function(){e.showSuccess=!0}).catch(function(){e.showFailure=!0})}}},d=p,v=(n("5248"),n("2877")),h=Object(v["a"])(d,l,c,!1,null,"5f7085c6",null);h.options.__file="TrainFiles.vue";var b=h.exports,_={name:"MainPage",components:{TrainFiles:b}},m=_,g=(n("4ca6"),Object(v["a"])(m,s,o,!1,null,"16ae144e",null));g.options.__file="MainPage.vue";var w=g.exports,y={name:"app",components:{MainPage:w}},T=y,C=(n("034f"),Object(v["a"])(T,a,r,!1,null,null,null));C.options.__file="App.vue";var O=C.exports,F=(n("f9e3"),n("2dd8"),n("9f7b"));i["a"].config.productionTip=!0,i["a"].use(F["a"]),new i["a"]({render:function(e){return e(O)}}).$mount("#app")},"5e33":function(e,t,n){},"64a9":function(e,t,n){},aec4:function(e,t,n){}});
//# sourceMappingURL=app.9805bc80.js.map