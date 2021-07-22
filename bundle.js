!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("react-dom"),require("prop-types")):"function"==typeof define&&define.amd?define(["react","react-dom","prop-types"],t):"object"==typeof exports?exports["r-audio"]=t(require("react"),require("react-dom"),require("prop-types")):e["r-audio"]=t(e.react,e["react-dom"],e["prop-types"])}(window,function(e,t,n){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(a,i,function(t){return e[t]}.bind(null,i));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),s=n(1),o=n(2),l=n.n(o);class r extends i.a.Component{componentWillMount(){if(!this.context.audio)throw new ReferenceError("RComponent needs to be a child of a RAudioContext")}render(){return null}}if(r.contextTypes={audio:l.a.instanceOf(window.AudioContext||window.webkitAudioContext),nodes:l.a.instanceOf(Map),debug:l.a.bool},window.AudioContext=window.AudioContext||window.webkitAudioContext||null,!window.AudioContext)throw new Error("Could not find AudioContext. This may be because your browser does not support Web Audio.");class d extends i.a.Component{constructor(e){super(e),this.nodes=new Map,this._context=new AudioContext(e.options),this.props.onInit&&this.props.onInit(this._context),this.props.debug&&(window.RAudioNodeMap=this.nodes)}componentWillMount(){this._context.resume()}getChildContext(){return{audio:this._context,debug:this.props.debug,nodes:this.nodes}}componentWillUnmount(){this._context.suspend()}render(){const e=i.a.Children.toArray(this.props.children).map(e=>{if(!r.isPrototypeOf(e.type))return e;const t={destination:()=>this._context.destination,identifier:Symbol(e.type.name)};return i.a.cloneElement(e,t)});return this.props.debug?i.a.createElement("div",null,e):e||[]}}d.childContextTypes={audio:l.a.instanceOf(AudioContext),nodes:l.a.instanceOf(Map),debug:l.a.bool};class u extends r{constructor(e){super(e),this.node=null,this.params={},this.connectToAllDestinations=this.connectToAllDestinations.bind(this),this.setParam=this.setParam.bind(this)}flattenPointers(e,t=[]){for(let n of e)Array.isArray(n)?this.flattenPointers(n,t):"symbol"==typeof n?t.push(this.context.nodes.get(n)):t.push(n);return t}getConnectionArguments(e,t,n,a=0,i=0){return[n?e[n]:e].concat(n?[]:[a,i])}connectToAllDestinations(e,t){if(t.disconnect(),e&&!this.props.disconnected){let n=e();n instanceof Array||(n=[n]),this.flattenPointers(n).forEach((e,n)=>{if(e){const a=this.getConnectionArguments(e,n,this.props.connectToParam,this.props.connectFromChannel,this.props.connectToChannel);t.connect(...a)}})}}componentWillMount(){super.componentWillMount()}componentWillReceiveProps(e){this.updateParams(e)}componentWillUpdate(e,t){this.props.identifier!==e.identifier&&(this.context.nodes.delete(this.props.identifier),this.context.nodes.set(e.identifier,this.node))}componentDidUpdate(e,t){e.destination!==this.props.destination&&this.connectToAllDestinations(this.props.destination,this.node)}componentWillUnmount(){this.node.disconnect(),this.context.nodes.delete(this.props.identifier)}resolveTransitionProps(e,t){return["number"==typeof e.transitionTime?e.transitionTime:e.transitionTime?e.transitionTime[t]:null,"string"==typeof e.transitionCurve?e.transitionCurve:e.transitionCurve?e.transitionCurve[t]:null]}updateParams(e){if(this.params)for(let t in this.params){if(!(t in e))continue;const[n,a]=this.resolveTransitionProps(e,t);if(this.node[t]instanceof AudioParam)this.setParam(this.node[t],e[t],n,a);else if(this.node.parameters&&this.node.parameters.has(t)){let i=this.node.parameters.get(t);this.setParam(i,e[t],n,a)}else if(t in this.node)try{this.node[t]!==e[t]&&(this.node[t]=e[t])}catch(e){console.warn(`Tried setting ${t} on node`,this.node)}}}setParam(e,t,n,a){if(a){const i=`${a}RampToValueAtTime`;try{e[i](t,n)}catch(a){e.linearRampToValueAtTime(t,n)}}else e.setValueAtTime(t,n||this.context.audio.currentTime)}componentDidMount(){this.connectToAllDestinations(this.props.destination,this.node)}render(){return this.context.debug?i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement("strong",null,i.a.createElement("em",null,this.props.name||""),i.a.createElement("sup",null,i.a.createElement("mark",null,this.props.disconnected?"disconnected":""))),i.a.createElement("div",null,this.props.connectToParam?i.a.createElement("span",null," connects to ",i.a.createElement("em",null,this.props.connectToParam)):null)),Object.keys(this.params).map((e,t)=>{if(!this.props[e]&&0!==this.props[e])return null;let n=this.props[e];return"boolean"==typeof this.props[e]&&(n=this.props[e].toString()),["number","string","boolean"].includes(typeof this.props[e])||(n=n.constructor.name),i.a.createElement("li",{key:t},e,": ",i.a.createElement("code",null,n))})):null}}class c extends u{componentWillUnmount(){if(super.componentWillUnmount(),this.props.parent){const e=this.props.parent();this.flattenPointers(e).forEach((e,t)=>{const n=this.context.nodes.get(e);if(n)try{n.disconnect(this.node)}catch(e){console.warn(e)}})}}}class h extends c{constructor(e){super(e),this.params={gain:this.props.gain}}componentWillMount(){super.componentWillMount(),this.node||(this.node=this.context.audio.createGain(),this.context.nodes.set(this.props.identifier,this.node)),this.updateParams=this.updateParams.bind(this),this.updateParams(this.props)}}class p extends u{constructor(e){super(e),this.params={},this.createNode=this.createNode.bind(this)}createNode(){this.node=this.context.audio.createMediaElementSource(this.props.element),this.context.nodes.set(this.props.identifier,this.node)}componentWillMount(){super.componentWillMount(),this.node||this.createNode(),this.updateParams=this.updateParams.bind(this),this.updateParams(this.props)}componentWillReceiveProps(e){e.element!==this.props.element&&this.createNode()}}const m=["RSplit","RCycle","RSplitChannels","RPipeline"],g=e=>c.isPrototypeOf(e.type)||m.includes(e.type.name)||"RExtensible"===Object.getPrototypeOf(e.type).name;class b extends r{constructor(e){super(e),this.resolveDestination=this.resolveDestination.bind(this),this.resolvePointer=this.resolvePointer.bind(this),this.resolveParent=this.resolveParent.bind(this)}resolvePointer(e){let t=e;return e instanceof Array&&(t=e.map(e=>this.context.nodes.get(e)||e)),t}resolveDestination(e,t){let n=null;if(e===t.length-1)n=(()=>this.props.destination());else if(g(t[e+1].component))n=(()=>this.resolvePointer(this.context.nodes.get(t[e+1].identifier)));else{let a=e+1;for(;t[++a]&&!g(t[a].component););n=a!==e+1&&t[a]?()=>this.resolvePointer(this.context.nodes.get(t[a].identifier)):()=>this.props.destination()}return n}resolveParent(e,t){if(0===e)return this.getParent||null;{const n=t.slice(0,e),a=[];let i=n.pop();if(r.isPrototypeOf(i.component.type)){if(a.push(i.identifier),g(i.component))return()=>a;i=n.pop()}for(;i&&!g(i.component)&&r.isPrototypeOf(i.component.type);)a.push(i.identifier),i=n.pop();return()=>a}}createIdentifiedChild(e){const t={component:e,identifier:Symbol(e.type.name+Date.now())};return!this.foundFirstConnectableType&&g(e)&&(t.identifier=this.props.identifier,this.foundFirstConnectableType=!0),t}createEmbeddableChild(e,t,n){if(!r.isPrototypeOf(e.component.type))return e.component;const a={destination:this.resolveDestination(t,n),parent:this.resolveParent(t,n),identifier:e.identifier};return t===n.length-1&&Object.assign(a,{connectFromChannel:this.props.connectFromChannel||0,connectToChannel:this.props.connectToChannel||0}),i.a.cloneElement(e.component,a)}render(){this.foundFirstConnectableType=!1;const e=i.a.Children.toArray(this.props.children),t=(this.customChildren||e).filter(e=>null!==e&&e!==[]).map(this.createIdentifiedChild,this).map(this.createEmbeddableChild,this);return this.context.debug?i.a.createElement("li",null,i.a.createElement("ul",null,t)):t}}var f={Silence:i.a.createElement(class extends i.a.Component{constructor(e){super(e),this.state={value:"0"},this.audio=new Audio("/assets/audio/silence.mp3"),this.audio.autoplay=!0,this.audio.loop=!0,this.handleChange=this.handleChange.bind(this)}handleChange(e){this.setState({value:e.target.value})}render(){return i.a.createElement(d,{debug:!0},i.a.createElement("label",null,"Transmission Loss (dB):",i.a.createElement("span",null," "),i.a.createElement("input",{type:"number",id:"dbl",className:"control-dbl","data-action":"dbl",value:this.state.value,onChange:this.handleChange})),i.a.createElement(b,null,i.a.createElement(p,{element:this.audio}),i.a.createElement(h,{gain:Math.pow(10,this.state.value/20).toFixed(2)})))}},null),"Traffic-Honking":i.a.createElement(class extends i.a.Component{constructor(e){super(e),this.state={value:"0"},this.audio=new Audio("/assets/audio/honking-traffic.mp3"),this.audio.autoplay=!0,this.audio.loop=!0,this.handleChange=this.handleChange.bind(this)}handleChange(e){this.setState({value:e.target.value})}render(){return i.a.createElement(d,{debug:!0},i.a.createElement("label",null,"Transmission Loss (dB):",i.a.createElement("span",null," "),i.a.createElement("input",{type:"number",id:"dbl",className:"control-dbl","data-action":"dbl",value:this.state.value,onChange:this.handleChange})),i.a.createElement(b,null,i.a.createElement(p,{element:this.audio}),i.a.createElement(h,{gain:Math.pow(10,this.state.value/20).toFixed(2)})))}},null),"Traffic-Fastmoving-Freeway":i.a.createElement(class extends i.a.Component{constructor(e){super(e),this.state={value:"0"},this.audio=new Audio("/assets/audio/fastmoving-freeway-traffic.mp3"),this.audio.autoplay=!0,this.audio.loop=!0,this.handleChange=this.handleChange.bind(this)}handleChange(e){this.setState({value:e.target.value})}render(){return i.a.createElement(d,{debug:!0},i.a.createElement("label",null,"Transmission Loss (dB):",i.a.createElement("span",null," "),i.a.createElement("input",{type:"number",id:"dbl",className:"control-dbl","data-action":"dbl",value:this.state.value,onChange:this.handleChange})),i.a.createElement(b,null,i.a.createElement(p,{element:this.audio}),i.a.createElement(h,{gain:Math.pow(10,this.state.value/20).toFixed(2)})))}},null),"Talking-Crowded-Restaurant":i.a.createElement(class extends i.a.Component{constructor(e){super(e),this.state={value:"0"},this.audio=new Audio("/assets/audio/crowded-restaurant.mp3"),this.audio.autoplay=!0,this.audio.loop=!0,this.handleChange=this.handleChange.bind(this)}handleChange(e){this.setState({value:e.target.value})}render(){return i.a.createElement(d,{debug:!0},i.a.createElement("label",null,"Transmission Loss (dB):",i.a.createElement("span",null," "),i.a.createElement("input",{type:"number",id:"dbl",className:"control-dbl","data-action":"dbl",value:this.state.value,onChange:this.handleChange})),i.a.createElement(b,null,i.a.createElement(p,{element:this.audio}),i.a.createElement(h,{gain:Math.pow(10,this.state.value/20).toFixed(2)})))}},null),"Talking-Crowded-Bar":i.a.createElement(class extends i.a.Component{constructor(e){super(e),this.state={value:"0"},this.audio=new Audio("/assets/audio/talking-crowded-bar.mp3"),this.audio.autoplay=!0,this.audio.loop=!0,this.handleChange=this.handleChange.bind(this)}handleChange(e){this.setState({value:e.target.value})}render(){return i.a.createElement(d,{debug:!0},i.a.createElement("label",null,"Transmission Loss (dB):",i.a.createElement("span",null," "),i.a.createElement("input",{type:"number",id:"dbl",className:"control-dbl","data-action":"dbl",value:this.state.value,onChange:this.handleChange})),i.a.createElement(b,null,i.a.createElement(p,{element:this.audio}),i.a.createElement(h,{gain:Math.pow(10,this.state.value/20).toFixed(2)})))}},null),"Shouting-Children":i.a.createElement(class extends i.a.Component{constructor(e){super(e),this.state={value:"0"},this.audio=new Audio("/assets/audio/children-shouting.mp3"),this.audio.autoplay=!0,this.audio.loop=!0,this.handleChange=this.handleChange.bind(this)}handleChange(e){this.setState({value:e.target.value})}render(){return i.a.createElement(d,{debug:!0},i.a.createElement("label",null,"Transmission Loss (dB):",i.a.createElement("span",null," "),i.a.createElement("input",{type:"number",id:"dbl",className:"control-dbl","data-action":"dbl",value:this.state.value,onChange:this.handleChange})),i.a.createElement(b,null,i.a.createElement(p,{element:this.audio}),i.a.createElement(h,{gain:Math.pow(10,this.state.value/20).toFixed(2)})))}},null),"Shouting-Wedding-Cheer":i.a.createElement(class extends i.a.Component{constructor(e){super(e),this.state={value:"0"},this.audio=new Audio("/assets/audio/loud-wedding-cheer.mp3"),this.audio.autoplay=!0,this.audio.loop=!0,this.handleChange=this.handleChange.bind(this)}handleChange(e){this.setState({value:e.target.value})}render(){return i.a.createElement(d,{debug:!0},i.a.createElement("label",null,"Transmission Loss (dB):",i.a.createElement("span",null," "),i.a.createElement("input",{type:"number",id:"dbl",className:"control-dbl","data-action":"dbl",value:this.state.value,onChange:this.handleChange})),i.a.createElement(b,null,i.a.createElement(p,{element:this.audio}),i.a.createElement(h,{gain:Math.pow(10,this.state.value/20).toFixed(2)})))}},null),"Music-Dragon-Dancing":i.a.createElement(class extends i.a.Component{constructor(e){super(e),this.state={value:"0"},this.audio=new Audio("/assets/audio/dragon-dancing.mp3"),this.audio.autoplay=!0,this.audio.loop=!0,this.handleChange=this.handleChange.bind(this)}handleChange(e){this.setState({value:e.target.value})}render(){return i.a.createElement(d,{debug:!0},i.a.createElement("label",null,"Transmission Loss (dB):",i.a.createElement("span",null," "),i.a.createElement("input",{type:"number",id:"dbl",className:"control-dbl","data-action":"dbl",value:this.state.value,onChange:this.handleChange})),i.a.createElement(b,null,i.a.createElement(p,{element:this.audio}),i.a.createElement(h,{gain:Math.pow(10,this.state.value/20).toFixed(2)})))}},null),"Thumps-On-Floor":i.a.createElement(class extends i.a.Component{constructor(e){super(e),this.state={value:"0"},this.audio=new Audio("/assets/audio/thumps-on-floor.mp3"),this.audio.autoplay=!0,this.audio.loop=!0,this.handleChange=this.handleChange.bind(this)}handleChange(e){this.setState({value:e.target.value})}render(){return i.a.createElement(d,{debug:!0},i.a.createElement("label",null,"Transmission Loss (dB):",i.a.createElement("span",null," "),i.a.createElement("input",{type:"number",id:"dbl",className:"control-dbl","data-action":"dbl",value:this.state.value,onChange:this.handleChange})),i.a.createElement(b,null,i.a.createElement(p,{element:this.audio}),i.a.createElement(h,{gain:Math.pow(10,this.state.value/20).toFixed(2)})))}},null)};const E=location.hash.slice(1);Object(s.render)(i.a.createElement("main",null,i.a.createElement("header",null,i.a.createElement("article",null,i.a.createElement("h1",null,i.a.createElement("strong",null,"Noise Transmission Reduction Simulator")),i.a.createElement("h2",null,"Lee Brenner, Bay Area Noise Control")),i.a.createElement("label",{htmlFor:"example-select"},"Select your scenario: "),i.a.createElement("select",{id:"example-select",onChange:e=>{location.hash=e.target.value,location.reload()},value:E},i.a.createElement("option",{value:"",disabled:!0},"Choose an example"),Object.keys(f).map((e,t)=>i.a.createElement("option",{key:t,value:e},e)))),i.a.createElement("hr",null),i.a.createElement("span",null),f[E]||null),document.getElementById("app"))}])});