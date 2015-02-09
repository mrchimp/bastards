/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
var Kinetic={};!function(){Kinetic={version:"4.7.4",stages:[],idCounter:0,ids:{},names:{},shapes:{},listenClickTap:!1,inDblClickWindow:!1,enableTrace:!1,traceArrMax:100,dblClickWindow:400,pixelRatio:void 0,UA:function(){var a=navigator.userAgent.toLowerCase(),b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}}(),Filters:{},Node:function(a){this._init(a)},Shape:function(a){this.__init(a)},Container:function(a){this.__init(a)},Stage:function(a){this.___init(a)},Layer:function(a){this.___init(a)},Group:function(a){this.___init(a)},isDragging:function(){var a=Kinetic.DD;return a?a.isDragging:!1},isDragReady:function(){var a=Kinetic.DD;return a?!!a.node:!1},_addId:function(a,b){void 0!==b&&(this.ids[b]=a)},_removeId:function(a){void 0!==a&&delete this.ids[a]},_addName:function(a,b){void 0!==b&&(void 0===this.names[b]&&(this.names[b]=[]),this.names[b].push(a))},_removeName:function(a,b){if(void 0!==a){var c=this.names[a];if(void 0!==c){for(var d=0;d<c.length;d++){var e=c[d];e._id===b&&c.splice(d,1)}0===c.length&&delete this.names[a]}}}}}(),function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.returnExports=b()}(this,function(){return Kinetic}),function(){Kinetic.Collection=function(){var a=[].slice.call(arguments),b=a.length,c=0;for(this.length=b;b>c;c++)this[c]=a[c];return this},Kinetic.Collection.prototype=[],Kinetic.Collection.prototype.each=function(a){for(var b=0;b<this.length;b++)a(this[b],b)},Kinetic.Collection.prototype.toArray=function(){var a,b=[],c=this.length;for(a=0;c>a;a++)b.push(this[a]);return b},Kinetic.Collection.toCollection=function(a){var b,c=new Kinetic.Collection,d=a.length;for(b=0;d>b;b++)c.push(a[b]);return c},Kinetic.Collection.mapMethods=function(a){var b,c=a.length;for(b=0;c>b;b++)!function(b){var c=a[b];Kinetic.Collection.prototype[c]=function(){var a,b=this.length;for(args=[].slice.call(arguments),a=0;b>a;a++)this[a][c].apply(this[a],args)}}(b)},Kinetic.Transform=function(){this.m=[1,0,0,1,0,0]},Kinetic.Transform.prototype={translate:function(a,b){this.m[4]+=this.m[0]*a+this.m[2]*b,this.m[5]+=this.m[1]*a+this.m[3]*b},scale:function(a,b){this.m[0]*=a,this.m[1]*=a,this.m[2]*=b,this.m[3]*=b},rotate:function(a){var b=Math.cos(a),c=Math.sin(a),d=this.m[0]*b+this.m[2]*c,e=this.m[1]*b+this.m[3]*c,f=this.m[0]*-c+this.m[2]*b,g=this.m[1]*-c+this.m[3]*b;this.m[0]=d,this.m[1]=e,this.m[2]=f,this.m[3]=g},getTranslation:function(){return{x:this.m[4],y:this.m[5]}},skew:function(a,b){var c=this.m[0]+this.m[2]*b,d=this.m[1]+this.m[3]*b,e=this.m[2]+this.m[0]*a,f=this.m[3]+this.m[1]*a;this.m[0]=c,this.m[1]=d,this.m[2]=e,this.m[3]=f},multiply:function(a){var b=this.m[0]*a.m[0]+this.m[2]*a.m[1],c=this.m[1]*a.m[0]+this.m[3]*a.m[1],d=this.m[0]*a.m[2]+this.m[2]*a.m[3],e=this.m[1]*a.m[2]+this.m[3]*a.m[3],f=this.m[0]*a.m[4]+this.m[2]*a.m[5]+this.m[4],g=this.m[1]*a.m[4]+this.m[3]*a.m[5]+this.m[5];this.m[0]=b,this.m[1]=c,this.m[2]=d,this.m[3]=e,this.m[4]=f,this.m[5]=g},invert:function(){var a=1/(this.m[0]*this.m[3]-this.m[1]*this.m[2]),b=this.m[3]*a,c=-this.m[1]*a,d=-this.m[2]*a,e=this.m[0]*a,f=a*(this.m[2]*this.m[5]-this.m[3]*this.m[4]),g=a*(this.m[1]*this.m[4]-this.m[0]*this.m[5]);this.m[0]=b,this.m[1]=c,this.m[2]=d,this.m[3]=e,this.m[4]=f,this.m[5]=g},getMatrix:function(){return this.m},setAbsolutePosition:function(a,b){var c=this.m[0],d=this.m[1],e=this.m[2],f=this.m[3],g=this.m[4],h=this.m[5],i=(c*(b-h)-d*(a-g))/(c*f-d*e),j=(a-g-e*i)/c;this.translate(j,i)}};var a="canvas",b="2d",c="[object Array]",d="[object Number]",e="[object String]",f=Math.PI/180,g=180/Math.PI,h="#",i="",j="0",k="Kinetic warning: ",l="Kinetic error: ",m="rgb(",n={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},o=/rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;Kinetic.Util={_isElement:function(a){return!(!a||1!=a.nodeType)},_isFunction:function(a){return!!(a&&a.constructor&&a.call&&a.apply)},_isObject:function(a){return!!a&&a.constructor==Object},_isArray:function(a){return Object.prototype.toString.call(a)==c},_isNumber:function(a){return Object.prototype.toString.call(a)==d},_isString:function(a){return Object.prototype.toString.call(a)==e},_hasMethods:function(a){var b,c=[];for(b in a)this._isFunction(a[b])&&c.push(b);return c.length>0},_isInDocument:function(a){for(;a=a.parentNode;)if(a==document)return!0;return!1},_simplifyArray:function(a){var b,c,d=[],e=a.length,f=Kinetic.Util;for(b=0;e>b;b++)c=a[b],f._isNumber(c)?c=Math.round(1e3*c)/1e3:f._isString(c)||(c=c.toString()),d.push(c);return d},_getXY:function(a){if(this._isNumber(a))return{x:a,y:a};if(this._isArray(a)){if(1===a.length){var b=a[0];if(this._isNumber(b))return{x:b,y:b};if(this._isArray(b))return{x:b[0],y:b[1]};if(this._isObject(b))return b}else if(a.length>=2)return{x:a[0],y:a[1]}}else if(this._isObject(a))return a;return null},_getSize:function(a){if(this._isNumber(a))return{width:a,height:a};if(this._isArray(a))if(1===a.length){var b=a[0];if(this._isNumber(b))return{width:b,height:b};if(this._isArray(b)){if(b.length>=4)return{width:b[2],height:b[3]};if(b.length>=2)return{width:b[0],height:b[1]}}else if(this._isObject(b))return b}else{if(a.length>=4)return{width:a[2],height:a[3]};if(a.length>=2)return{width:a[0],height:a[1]}}else if(this._isObject(a))return a;return null},_getPoints:function(a){var b,c,d=[];if(void 0===a)return[];if(c=a.length,this._isArray(a[0])){for(b=0;c>b;b++)d.push({x:a[b][0],y:a[b][1]});return d}if(this._isObject(a[0]))return a;for(b=0;c>b;b+=2)d.push({x:a[b],y:a[b+1]});return d},_getImage:function(c,d){var e,f;c?this._isElement(c)?d(c):this._isString(c)?(e=new Image,e.onload=function(){d(e)},e.src=c):c.data?(f=document.createElement(a),f.width=c.width,f.height=c.height,_context=f.getContext(b),_context.putImageData(c,0,0),this._getImage(f.toDataURL(),d)):d(null):d(null)},_rgbToHex:function(a,b,c){return((1<<24)+(a<<16)+(b<<8)+c).toString(16).slice(1)},_hexToRgb:function(a){a=a.replace(h,i);var b=parseInt(a,16);return{r:255&b>>16,g:255&b>>8,b:255&b}},getRandomColor:function(){for(var a=(16777215*Math.random()<<0).toString(16);a.length<6;)a=j+a;return h+a},get:function(a,b){return void 0===a?b:a},getRGB:function(a){var b;return a in n?(b=n[a],{r:b[0],g:b[1],b:b[2]}):a[0]===h?this._hexToRgb(a.substring(1)):a.substr(0,4)===m?(b=o.exec(a.replace(/ /g,"")),{r:parseInt(b[1],10),g:parseInt(b[2],10),b:parseInt(b[3],10)}):{r:0,g:0,b:0}},_merge:function(a,b){var c=this._clone(b);for(var d in a)c[d]=this._isObject(a[d])?this._merge(a[d],c[d]):a[d];return c},_clone:function(a){var b={};for(var c in a)b[c]=this._isObject(a[c])?this._clone(a[c]):a[c];return b},_degToRad:function(a){return a*f},_radToDeg:function(a){return a*g},_capitalize:function(a){return a.charAt(0).toUpperCase()+a.slice(1)},error:function(a){throw new Error(l+a)},warn:function(a){window.console&&console.warn&&console.warn(k+a)},extend:function(a,b){for(var c in b.prototype)c in a.prototype||(a.prototype[c]=b.prototype[c])},addMethods:function(a,b){var c;for(c in b)a.prototype[c]=b[c]},_getControlPoints:function(a,b,c,d){var e=a.x,f=a.y,g=b.x,h=b.y,i=c.x,j=c.y,k=Math.sqrt(Math.pow(g-e,2)+Math.pow(h-f,2)),l=Math.sqrt(Math.pow(i-g,2)+Math.pow(j-h,2)),m=d*k/(k+l),n=d*l/(k+l),o=g-m*(i-e),p=h-m*(j-f),q=g+n*(i-e),r=h+n*(j-f);return[{x:o,y:p},{x:q,y:r}]},_expandPoints:function(a,b){var c,d,e=a.length,f=[];for(c=1;e-1>c;c++)d=Kinetic.Util._getControlPoints(a[c-1],a[c],a[c+1],b),f.push(d[0]),f.push(a[c]),f.push(d[1]);return f},_removeLastLetter:function(a){return a.substring(0,a.length-1)}}}(),function(){var a=document.createElement("canvas"),b=a.getContext("2d"),c=window.devicePixelRatio||1,d=b.webkitBackingStorePixelRatio||b.mozBackingStorePixelRatio||b.msBackingStorePixelRatio||b.oBackingStorePixelRatio||b.backingStorePixelRatio||1,e=c/d;Kinetic.Canvas=function(a){this.init(a)},Kinetic.Canvas.prototype={init:function(a){a=a||{};var b=a.pixelRatio||Kinetic.pixelRatio||e;this.pixelRatio=b,this._canvas=document.createElement("canvas"),this._canvas.style.padding=0,this._canvas.style.margin=0,this._canvas.style.border=0,this._canvas.style.background="transparent",this._canvas.style.position="absolute",this._canvas.style.top=0,this._canvas.style.left=0},getContext:function(){return this.context},getPixelRatio:function(){return this.pixelRatio},setPixelRatio:function(a){this.pixelRatio=a,this.setSize(this.getWidth(),this.getHeight())},setWidth:function(a){this.width=this._canvas.width=a*this.pixelRatio,this._canvas.style.width=a+"px"},setHeight:function(a){this.height=this._canvas.height=a*this.pixelRatio,this._canvas.style.height=a+"px"},getWidth:function(){return this.width},getHeight:function(){return this.height},setSize:function(a,b){this.setWidth(a),this.setHeight(b)},toDataURL:function(a,b){try{return this._canvas.toDataURL(a,b)}catch(c){try{return this._canvas.toDataURL()}catch(d){return Kinetic.Util.warn("Unable to get data URL. "+d.message),""}}}},Kinetic.SceneCanvas=function(a){a=a||{};var b=a.width||0,c=a.height||0;Kinetic.Canvas.call(this,a),this.context=new Kinetic.SceneContext(this),this.setSize(b,c)},Kinetic.SceneCanvas.prototype={setWidth:function(a){var b=this.pixelRatio,c=this.getContext()._context;Kinetic.Canvas.prototype.setWidth.call(this,a),c.scale(b,b)},setHeight:function(a){var b=this.pixelRatio,c=this.getContext()._context;Kinetic.Canvas.prototype.setHeight.call(this,a),c.scale(b,b)}},Kinetic.Util.extend(Kinetic.SceneCanvas,Kinetic.Canvas),Kinetic.HitCanvas=function(a){a=a||{};var b=a.width||0,c=a.height||0;Kinetic.Canvas.call(this,a),this.context=new Kinetic.HitContext(this),this.setSize(b,c)},Kinetic.Util.extend(Kinetic.HitCanvas,Kinetic.Canvas)}(),function(){var a=",",b="(",c=")",d="([",e="])",f=";",g="()",h="=",i=["arc","arcTo","beginPath","bezierCurveTo","clearRect","clip","closePath","createLinearGradient","createPattern","createRadialGradient","drawImage","fill","fillText","getImageData","lineTo","moveTo","putImageData","quadraticCurveTo","rect","restore","rotate","save","scale","setLineDash","setTransform","stroke","strokeText","transform","translate"];Kinetic.Context=function(a){this.init(a)},Kinetic.Context.prototype={init:function(a){this.canvas=a,this._context=a._canvas.getContext("2d"),Kinetic.enableTrace&&(this.traceArr=[],this._enableTrace())},fillShape:function(a){a.getFillEnabled()&&this._fill(a)},strokeShape:function(a){a.getStrokeEnabled()&&this._stroke(a)},fillStrokeShape:function(a){var b=a.getFillEnabled();b&&this._fill(a),a.getStrokeEnabled()&&this._stroke(a)},getTrace:function(i){var j,k,l,m,n=this.traceArr,o=n.length,p="";for(j=0;o>j;j++)k=n[j],l=k.method,l?(m=k.args,p+=l,p+=i?g:Kinetic.Util._isArray(m[0])?d+m.join(a)+e:b+m.join(a)+c):(p+=k.property,i||(p+=h+k.val)),p+=f;return p},clearTrace:function(){this.traceArr=[]},_trace:function(a){var b,c=this.traceArr;c.push(a),b=c.length,b>=Kinetic.traceArrMax&&c.shift()},reset:function(){var a=this.getCanvas().getPixelRatio();this.setTransform(1*a,0,0,1*a,0,0)},getCanvas:function(){return this.canvas},clear:function(){var a,b,c=[].slice.call(arguments),d=this.getCanvas();c.length?(a=Kinetic.Util._getXY(c),b=Kinetic.Util._getSize(c),this.clearRect(a.x||0,a.y||0,b.width,b.height)):this.clearRect(0,0,d.getWidth(),d.getHeight())},_applyLineCap:function(a){var b=a.getLineCap();b&&this.setAttr("lineCap",b)},_applyOpacity:function(a){var b=a.getAbsoluteOpacity();1!==b&&this.setAttr("globalAlpha",b)},_applyLineJoin:function(a){var b=a.getLineJoin();b&&this.setAttr("lineJoin",b)},_applyAncestorTransforms:function(a){var b=a.getAbsoluteTransform().getMatrix();this.transform(b[0],b[1],b[2],b[3],b[4],b[5])},_clip:function(a){var b=a.getClipX()||0,c=a.getClipY()||0,d=a.getClipWidth(),e=a.getClipHeight();this.save(),this._applyAncestorTransforms(a),this.beginPath(),this.rect(b,c,d,e),this.clip(),this.reset(),a._drawChildren(this.getCanvas()),this.restore()},setAttr:function(a,b){this._context[a]=b},arc:function(){var a=arguments;this._context.arc(a[0],a[1],a[2],a[3],a[4],a[5])},beginPath:function(){this._context.beginPath()},bezierCurveTo:function(){var a=arguments;this._context.bezierCurveTo(a[0],a[1],a[2],a[3],a[4],a[5])},clearRect:function(){var a=arguments;this._context.clearRect(a[0],a[1],a[2],a[3])},clip:function(){this._context.clip()},closePath:function(){this._context.closePath()},createLinearGradient:function(){var a=arguments;return this._context.createLinearGradient(a[0],a[1],a[2],a[3])},createPattern:function(){var a=arguments;return this._context.createPattern(a[0],a[1])},createRadialGradient:function(){var a=arguments;return this._context.createRadialGradient(a[0],a[1],a[2],a[3],a[4],a[5])},drawImage:function(){var a=arguments,b=this._context;3===a.length?b.drawImage(a[0],a[1],a[2]):5===a.length?b.drawImage(a[0],a[1],a[2],a[3],a[4]):9===a.length&&b.drawImage(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8])},fill:function(){this._context.fill()},fillText:function(){var a=arguments;this._context.fillText(a[0],a[1],a[2])},getImageData:function(){var a=arguments;return this._context.getImageData(a[0],a[1],a[2],a[3])},lineTo:function(){var a=arguments;this._context.lineTo(a[0],a[1])},moveTo:function(){var a=arguments;this._context.moveTo(a[0],a[1])},rect:function(){var a=arguments;this._context.rect(a[0],a[1],a[2],a[3])},putImageData:function(){var a=arguments;this._context.putImageData(a[0],a[1],a[2])},quadraticCurveTo:function(){var a=arguments;this._context.quadraticCurveTo(a[0],a[1],a[2],a[3])},restore:function(){this._context.restore()},rotate:function(){var a=arguments;this._context.rotate(a[0])},save:function(){this._context.save()},scale:function(){var a=arguments;this._context.scale(a[0],a[1])},setLineDash:function(){var a=arguments,b=this._context;this._context.setLineDash?b.setLineDash(a[0]):"mozDash"in b?b.mozDash=a[0]:"webkitLineDash"in b&&(b.webkitLineDash=a[0])},setTransform:function(){var a=arguments;this._context.setTransform(a[0],a[1],a[2],a[3],a[4],a[5])},stroke:function(){this._context.stroke()},strokeText:function(){var a=arguments;this._context.strokeText(a[0],a[1],a[2])},transform:function(){var a=arguments;this._context.transform(a[0],a[1],a[2],a[3],a[4],a[5])},translate:function(){var a=arguments;this._context.translate(a[0],a[1])},_enableTrace:function(){var a,b,c=this,d=i.length,e=Kinetic.Util._simplifyArray,f=this.setAttr;for(a=0;d>a;a++)!function(a){var d,f=c[a];c[a]=function(){return b=e(Array.prototype.slice.call(arguments,0)),d=f.apply(c,arguments),c._trace({method:a,args:b}),d}}(i[a]);c.setAttr=function(){f.apply(c,arguments),c._trace({property:arguments[0],val:arguments[1]})}}},Kinetic.SceneContext=function(a){Kinetic.Context.call(this,a)},Kinetic.SceneContext.prototype={_fillColor:function(a){var b=a.getFill();this.setAttr("fillStyle",b),a._fillFunc(this)},_fillPattern:function(a){var b=a.getFillPatternImage(),c=a.getFillPatternX(),d=a.getFillPatternY(),e=a.getFillPatternScale(),f=a.getFillPatternRotation(),g=a.getFillPatternOffset(),h=a.getFillPatternRepeat();(c||d)&&this.translate(c||0,d||0),f&&this.rotate(f),e&&this.scale(e.x,e.y),g&&this.translate(-1*g.x,-1*g.y),this.setAttr("fillStyle",this.createPattern(b,h||"repeat")),this.fill()},_fillLinearGradient:function(a){var b=a.getFillLinearGradientStartPoint(),c=a.getFillLinearGradientEndPoint(),d=a.getFillLinearGradientColorStops(),e=this.createLinearGradient(b.x,b.y,c.x,c.y);if(d){for(var f=0;f<d.length;f+=2)e.addColorStop(d[f],d[f+1]);this.setAttr("fillStyle",e),this.fill()}},_fillRadialGradient:function(a){for(var b=a.getFillRadialGradientStartPoint(),c=a.getFillRadialGradientEndPoint(),d=a.getFillRadialGradientStartRadius(),e=a.getFillRadialGradientEndRadius(),f=a.getFillRadialGradientColorStops(),g=this.createRadialGradient(b.x,b.y,d,c.x,c.y,e),h=0;h<f.length;h+=2)g.addColorStop(f[h],f[h+1]);this.setAttr("fillStyle",g),this.fill()},_fill:function(a){var b=a.getFill(),c=a.getFillPatternImage(),d=a.getFillLinearGradientColorStops(),e=a.getFillRadialGradientColorStops(),f=a.getFillPriority();b&&"color"===f?this._fillColor(a):c&&"pattern"===f?this._fillPattern(a):d&&"linear-gradient"===f?this._fillLinearGradient(a):e&&"radial-gradient"===f?this._fillRadialGradient(a):b?this._fillColor(a):c?this._fillPattern(a):d?this._fillLinearGradient(a):e&&this._fillRadialGradient(a)},_stroke:function(a){var b=a.getStroke(),c=a.getStrokeWidth(),d=a.getDashArray(),e=a.getStrokeScaleEnabled();a.hasStroke()&&(e||(this.save(),this.setTransform(1,0,0,1,0,0)),this._applyLineCap(a),d&&a.getDashArrayEnabled()&&this.setLineDash(d),this.setAttr("lineWidth",c||2),this.setAttr("strokeStyle",b||"black"),a._strokeFunc(this),e||this.restore())},_applyShadow:function(a){var b=Kinetic.Util,c=a.getAbsoluteOpacity(),d=b.get(a.getShadowColor(),"black"),e=b.get(a.getShadowBlur(),5),f=b.get(a.getShadowOpacity(),0),g=b.get(a.getShadowOffset(),{x:0,y:0});f&&this.setAttr("globalAlpha",f*c),this.setAttr("shadowColor",d),this.setAttr("shadowBlur",e),this.setAttr("shadowOffsetX",g.x),this.setAttr("shadowOffsetY",g.y)}},Kinetic.Util.extend(Kinetic.SceneContext,Kinetic.Context),Kinetic.HitContext=function(a){Kinetic.Context.call(this,a)},Kinetic.HitContext.prototype={_fill:function(a){this.save(),this.setAttr("fillStyle",a.colorKey),a._fillFuncHit(this),this.restore()},_stroke:function(a){var b=a.getStroke(),c=a.getStrokeWidth();(b||c)&&(this._applyLineCap(a),this.setAttr("lineWidth",c||2),this.setAttr("strokeStyle",a.colorKey),a._strokeFuncHit(this))}},Kinetic.Util.extend(Kinetic.HitContext,Kinetic.Context)}(),function(){var a="add",b="b",c="Deg",d="g",e="get",f="#",g="r",h="RGB",i="set",j="B",k="G",l="Height",m="R",n="Width",o="X",p="Y";Kinetic.Factory={addGetterSetter:function(a,b,c){this.addGetter(a,b,c),this.addSetter(a,b)},addPointGetterSetter:function(a,b,c){this.addPointGetter(a,b,c),this.addPointSetter(a,b),this.addGetter(a,b+o,c),this.addGetter(a,b+p,c),this.addSetter(a,b+o),this.addSetter(a,b+p)},addBoxGetterSetter:function(a,b,c){this.addBoxGetter(a,b,c),this.addBoxSetter(a,b),this.addGetter(a,b+o,c),this.addGetter(a,b+p,c),this.addGetter(a,b+n,c),this.addGetter(a,b+l,c),this.addSetter(a,b+o),this.addSetter(a,b+p),this.addSetter(a,b+n),this.addSetter(a,b+l)},addPointsGetterSetter:function(a,b){this.addPointsGetter(a,b),this.addPointsSetter(a,b),this.addPointAdder(a,b)},addRotationGetterSetter:function(a,b,c){this.addRotationGetter(a,b,c),this.addRotationSetter(a,b)},addColorGetterSetter:function(a,c){this.addGetter(a,c),this.addSetter(a,c),this.addColorRGBGetter(a,c),this.addColorComponentGetter(a,c,g),this.addColorComponentGetter(a,c,d),this.addColorComponentGetter(a,c,b),this.addColorRGBSetter(a,c),this.addColorComponentSetter(a,c,g),this.addColorComponentSetter(a,c,d),this.addColorComponentSetter(a,c,b)},addColorRGBGetter:function(a,b){var c=e+Kinetic.Util._capitalize(b)+h;a.prototype[c]=function(){return Kinetic.Util.getRGB(this.attrs[b])}},addColorComponentGetter:function(a,b,c){var d=e+Kinetic.Util._capitalize(b),f=d+Kinetic.Util._capitalize(c);a.prototype[f]=function(){return this[d+h]()[c]}},addPointsGetter:function(a,b){var c=e+Kinetic.Util._capitalize(b);a.prototype[c]=function(){var a=this.attrs[b];return void 0===a?[]:a}},addGetter:function(a,b,c){var d=e+Kinetic.Util._capitalize(b);a.prototype[d]=function(){var a=this.attrs[b];return void 0===a?c:a}},addPointGetter:function(a,b){var c=e+Kinetic.Util._capitalize(b);a.prototype[c]=function(){var a=this;return{x:a[c+o](),y:a[c+p]()}}},addBoxGetter:function(a,b){var c=e+Kinetic.Util._capitalize(b);a.prototype[c]=function(){var a=this;return{x:a[c+o](),y:a[c+p](),width:a[c+n](),height:a[c+l]()}}},addRotationGetter:function(a,b,d){var f=e+Kinetic.Util._capitalize(b);a.prototype[f]=function(){var a=this.attrs[b];return void 0===a&&(a=d),a},a.prototype[f+c]=function(){var a=this.attrs[b];return void 0===a&&(a=d),Kinetic.Util._radToDeg(a)}},addColorRGBSetter:function(a,b){var c=i+Kinetic.Util._capitalize(b)+h;a.prototype[c]=function(a){var c=a&&void 0!==a.r?0|a.r:this.getAttr(b+m),d=a&&void 0!==a.g?0|a.g:this.getAttr(b+k),e=a&&void 0!==a.b?0|a.b:this.getAttr(b+j);this._setAttr(b,f+Kinetic.Util._rgbToHex(c,d,e))}},addColorComponentSetter:function(a,b,c){var d=i+Kinetic.Util._capitalize(b),e=d+Kinetic.Util._capitalize(c);a.prototype[e]=function(a){var b={};b[c]=a,this[d+h](b)}},addPointsSetter:function(a,b){var c=i+Kinetic.Util._capitalize(b);a.prototype[c]=function(a){var b=Kinetic.Util._getPoints(a);this._setAttr("points",b)}},addSetter:function(a,b){var c=i+Kinetic.Util._capitalize(b);a.prototype[c]=function(a){this._setAttr(b,a)}},addPointSetter:function(a,b){var c=i+Kinetic.Util._capitalize(b);a.prototype[c]=function(){var a=Kinetic.Util._getXY([].slice.call(arguments)),d=this.attrs[b],e=0,f=0;a&&(e=a.x,f=a.y,this._fireBeforeChangeEvent(b,d,a),void 0!==e&&this[c+o](e),void 0!==f&&this[c+p](f),this._fireChangeEvent(b,d,a))}},addBoxSetter:function(a,b){var c=i+Kinetic.Util._capitalize(b);a.prototype[c]=function(){var a,d,e,f,g=[].slice.call(arguments),h=Kinetic.Util._getXY(g),i=Kinetic.Util._getSize(g),j=Kinetic.Util._merge(h,i),k=this.attrs[b];j&&(a=j.x,d=j.y,e=j.width,f=j.height,this._fireBeforeChangeEvent(b,k,j),void 0!==a&&this[c+o](a),void 0!==d&&this[c+p](d),void 0!==e&&this[c+n](e),void 0!==f&&this[c+l](f),this._fireChangeEvent(b,k,j))}},addRotationSetter:function(a,b){var d=i+Kinetic.Util._capitalize(b);a.prototype[d]=function(a){this._setAttr(b,a)},a.prototype[d+c]=function(a){this._setAttr(b,Kinetic.Util._degToRad(a))}},addPointAdder:function(b,c){var d=a+Kinetic.Util._removeLastLetter(Kinetic.Util._capitalize(c));b.prototype[d]=function(){var a=Kinetic.Util._getXY([].slice.call(arguments)),b=this.attrs[c];a&&(this._fireBeforeChangeEvent(c,b,a),this.attrs[c].push(a),this._fireChangeEvent(c,b,a))}}}}(),function(){var a="absoluteOpacity",b="absoluteTransform",c="before",d="Change",e="children",f=".",g="",h="get",i="id",j="kinetic",k="listening",l="mouseenter",m="mouseleave",n="name",o="set",p="Shape",q=" ",r="stage",s="transform",t="Stage",u="visible",v=["xChange.kinetic","yChange.kinetic","scaleXChange.kinetic","scaleYChange.kinetic","skewXChange.kinetic","skewYChange.kinetic","rotationChange.kinetic","offsetXChange.kinetic","offsetYChange.kinetic"].join(q);Kinetic.Util.addMethods(Kinetic.Node,{_init:function(c){var d=this;this._id=Kinetic.idCounter++,this.eventListeners={},this.attrs={},this.cache={},this.setAttrs(c),this.on(v,function(){this._clearCache(s),d._clearSelfAndChildrenCache(b)}),this.on("visibleChange.kinetic",function(){d._clearSelfAndChildrenCache(u)}),this.on("listeningChange.kinetic",function(){d._clearSelfAndChildrenCache(k)}),this.on("opacityChange.kinetic",function(){d._clearSelfAndChildrenCache(a)})},clearCache:function(){this.cache={}},_clearCache:function(a){delete this.cache[a]},_getCache:function(a,b){var c=this.cache[a];return void 0===c&&(this.cache[a]=b.call(this)),this.cache[a]},_clearSelfAndChildrenCache:function(a){this._clearCache(a),this.children&&this.getChildren().each(function(b){b._clearSelfAndChildrenCache(a)})},on:function(a,b){var c,d,e,h,i,j=a.split(q),k=j.length;for(c=0;k>c;c++)d=j[c],e=d.split(f),h=e[0],i=e[1]||g,this.eventListeners[h]||(this.eventListeners[h]=[]),this.eventListeners[h].push({name:i,handler:b});return this},off:function(a){var b,c,d,e,g,h,i=a.split(q),j=i.length;for(b=0;j>b;b++)if(d=i[b],e=d.split(f),g=e[0],h=e[1],g)this.eventListeners[g]&&this._off(g,h);else for(c in this.eventListeners)this._off(c,h);return this},remove:function(){var c=this.getParent();return c&&c.children&&(c.children.splice(this.index,1),c._setChildrenIndices(),delete this.parent),this._clearSelfAndChildrenCache(r),this._clearSelfAndChildrenCache(b),this._clearSelfAndChildrenCache(u),this._clearSelfAndChildrenCache(k),this._clearSelfAndChildrenCache(a),this},destroy:function(){Kinetic._removeId(this.getId()),Kinetic._removeName(this.getName(),this._id),this.remove()},getAttr:function(a){var b=h+Kinetic.Util._capitalize(a);return Kinetic.Util._isFunction(this[b])?this[b]():this.attrs[a]},getAncestors:function(){for(var a=this.getParent(),b=new Kinetic.Collection;a;)b.push(a),a=a.getParent();return b},setAttr:function(){var a=Array.prototype.slice.call(arguments),b=a[0],c=o+Kinetic.Util._capitalize(b),d=this[c];return a.shift(),Kinetic.Util._isFunction(d)?d.apply(this,a):this.attrs[b]=a[0],this},getAttrs:function(){return this.attrs||{}},setAttrs:function(a){var b,c;if(a)for(b in a)b===e||(c=o+Kinetic.Util._capitalize(b),Kinetic.Util._isFunction(this[c])?this[c](a[b]):this._setAttr(b,a[b]));return this},isListening:function(){return this._getCache(k,this._isListening)},_isListening:function(){var a=this.getListening(),b=this.getParent();return a&&b&&!b.isListening()?!1:a},isVisible:function(){return this._getCache(u,this._isVisible)},_isVisible:function(){var a=this.getVisible(),b=this.getParent();return a&&b&&!b.isVisible()?!1:a},show:function(){return this.setVisible(!0),this},hide:function(){return this.setVisible(!1),this},getZIndex:function(){return this.index||0},getAbsoluteZIndex:function(){function a(i){for(b=[],c=i.length,d=0;c>d;d++)e=i[d],h++,e.nodeType!==p&&(b=b.concat(e.getChildren().toArray())),e._id===g._id&&(d=c);b.length>0&&b[0].getLevel()<=f&&a(b)}var b,c,d,e,f=this.getLevel(),g=this,h=0;return g.nodeType!==t&&a(g.getStage().getChildren()),h},getLevel:function(){for(var a=0,b=this.parent;b;)a++,b=b.parent;return a},setPosition:function(){var a=Kinetic.Util._getXY([].slice.call(arguments));return this.setX(a.x),this.setY(a.y),this},getPosition:function(){return{x:this.getX(),y:this.getY()}},getAbsolutePosition:function(){var a=this.getAbsoluteTransform().getMatrix(),b=new Kinetic.Transform,c=this.getOffset();return b.m=a.slice(),b.translate(c.x,c.y),b.getTranslation()},setAbsolutePosition:function(){var a,b=Kinetic.Util._getXY([].slice.call(arguments)),c=this._clearTransform();return this.attrs.x=c.x,this.attrs.y=c.y,delete c.x,delete c.y,a=this.getAbsoluteTransform(),a.invert(),a.translate(b.x,b.y),b={x:this.attrs.x+a.getTranslation().x,y:this.attrs.y+a.getTranslation().y},this.setPosition(b.x,b.y),this._setTransform(c),this},_setTransform:function(a){var c;for(c in a)this.attrs[c]=a[c];this._clearCache(s),this._clearSelfAndChildrenCache(b)},_clearTransform:function(){var a={x:this.getX(),y:this.getY(),rotation:this.getRotation(),scaleX:this.getScaleX(),scaleY:this.getScaleY(),offsetX:this.getOffsetX(),offsetY:this.getOffsetY(),skewX:this.getSkewX(),skewY:this.getSkewY()};return this.attrs.x=0,this.attrs.y=0,this.attrs.rotation=0,this.attrs.scaleX=1,this.attrs.scaleY=1,this.attrs.offsetX=0,this.attrs.offsetY=0,this.attrs.skewX=0,this.attrs.skewY=0,this._clearCache(s),this._clearSelfAndChildrenCache(b),a},move:function(){var a=Kinetic.Util._getXY([].slice.call(arguments)),b=this.getX(),c=this.getY();return void 0!==a.x&&(b+=a.x),void 0!==a.y&&(c+=a.y),this.setPosition(b,c),this},_eachAncestorReverse:function(a,b){var c,d,e=[],f=this.getParent();for(b&&e.unshift(this);f;)e.unshift(f),f=f.parent;for(c=e.length,d=0;c>d;d++)a(e[d])},rotate:function(a){return this.setRotation(this.getRotation()+a),this},rotateDeg:function(a){return this.setRotation(this.getRotation()+Kinetic.Util._degToRad(a)),this},moveToTop:function(){var a=this.index;return this.parent.children.splice(a,1),this.parent.children.push(this),this.parent._setChildrenIndices(),!0},moveUp:function(){var a=this.index,b=this.parent.getChildren().length;return b-1>a?(this.parent.children.splice(a,1),this.parent.children.splice(a+1,0,this),this.parent._setChildrenIndices(),!0):!1},moveDown:function(){var a=this.index;return a>0?(this.parent.children.splice(a,1),this.parent.children.splice(a-1,0,this),this.parent._setChildrenIndices(),!0):!1},moveToBottom:function(){var a=this.index;return a>0?(this.parent.children.splice(a,1),this.parent.children.unshift(this),this.parent._setChildrenIndices(),!0):!1},setZIndex:function(a){var b=this.index;return this.parent.children.splice(b,1),this.parent.children.splice(a,0,this),this.parent._setChildrenIndices(),this},getAbsoluteOpacity:function(){return this._getCache(a,this._getAbsoluteOpacity)},_getAbsoluteOpacity:function(){var a=this.getOpacity();return this.getParent()&&(a*=this.getParent().getAbsoluteOpacity()),a},moveTo:function(a){return Kinetic.Node.prototype.remove.call(this),a.add(this),this},toObject:function(){var a,b,c=Kinetic.Util,d={},e=this.getAttrs();d.attrs={};for(a in e)b=e[a],c._isFunction(b)||c._isElement(b)||c._isObject(b)&&c._hasMethods(b)||(d.attrs[a]=b);return d.className=this.getClassName(),d},toJSON:function(){return JSON.stringify(this.toObject())},getParent:function(){return this.parent},getLayer:function(){return this.getParent().getLayer()},getStage:function(){return this._getCache(r,this._getStage)},_getStage:function(){var a=this.getParent();return a?a.getStage():void 0},fire:function(a,b,c){return c?this._fireAndBubble(a,b||{}):this._fire(a,b||{}),this},getAbsoluteTransform:function(){return this._getCache(b,this._getAbsoluteTransform)},_getAbsoluteTransform:function(){var a,b=new Kinetic.Transform;return this._eachAncestorReverse(function(c){a=c.getTransform(),b.multiply(a)},!0),b},_getTransform:function(){var a=new Kinetic.Transform,b=this.getX(),c=this.getY(),d=this.getRotation(),e=this.getScaleX(),f=this.getScaleY(),g=this.getSkewX(),h=this.getSkewY(),i=this.getOffsetX(),j=this.getOffsetY();return(0!==b||0!==c)&&a.translate(b,c),0!==d&&a.rotate(d),(0!==g||0!==h)&&a.skew(g,h),(1!==e||1!==f)&&a.scale(e,f),(0!==i||0!==j)&&a.translate(-1*i,-1*j),a},clone:function(a){var b,c,d,e,f,g=this.getClassName(),h=new Kinetic[g](this.attrs);for(b in this.eventListeners)for(c=this.eventListeners[b],d=c.length,e=0;d>e;e++)f=c[e],f.name.indexOf(j)<0&&(h.eventListeners[b]||(h.eventListeners[b]=[]),h.eventListeners[b].push(f));return h.setAttrs(a),h},toDataURL:function(a){a=a||{};var b=a.mimeType||null,c=a.quality||null,d=this.getStage(),e=a.x||0,f=a.y||0,g=new Kinetic.SceneCanvas({width:a.width||d.getWidth(),height:a.height||d.getHeight(),pixelRatio:1}),h=g.getContext();return h.save(),(e||f)&&h.translate(-1*e,-1*f),this.drawScene(g),h.restore(),g.toDataURL(b,c)},toImage:function(a){Kinetic.Util._getImage(this.toDataURL(a),function(b){a.callback(b)})},setSize:function(){var a=Kinetic.Util._getSize(Array.prototype.slice.call(arguments));return this.setWidth(a.width),this.setHeight(a.height),this},getSize:function(){return{width:this.getWidth(),height:this.getHeight()}},getWidth:function(){return this.attrs.width||0},getHeight:function(){return this.attrs.height||0},getClassName:function(){return this.className||this.nodeType},getType:function(){return this.nodeType},_get:function(a){return this.nodeType===a?[this]:[]},_off:function(a,b){var c,d,e=this.eventListeners[a];for(c=0;c<e.length;c++)if(d=e[c].name,!("kinetic"===d&&"kinetic"!==b||b&&d!==b)){if(e.splice(c,1),0===e.length){delete this.eventListeners[a];break}c--}},_fireBeforeChangeEvent:function(a,b,e){this._fire(c+Kinetic.Util._capitalize(a)+d,{oldVal:b,newVal:e})},_fireChangeEvent:function(a,b,c){this._fire(a+d,{oldVal:b,newVal:c})},setId:function(a){var b=this.getId();return Kinetic._removeId(b),Kinetic._addId(this,a),this._setAttr(i,a),this},setName:function(a){var b=this.getName();return Kinetic._removeName(b,this._id),Kinetic._addName(this,a),this._setAttr(n,a),this},_setAttr:function(a,b){var c;void 0!==b&&(c=this.attrs[a],this._fireBeforeChangeEvent(a,c,b),this.attrs[a]=b,this._fireChangeEvent(a,c,b))},_fireAndBubble:function(a,b,c){var d=!0;b&&this.nodeType===p&&(b.targetNode=this),a===l&&c&&this._id===c._id?d=!1:a===m&&c&&this._id===c._id&&(d=!1),d&&(this._fire(a,b),b&&!b.cancelBubble&&this.parent&&(c&&c.parent?this._fireAndBubble.call(this.parent,a,b,c.parent):this._fireAndBubble.call(this.parent,a,b)))
},_fire:function(a,b){var c,d=this.eventListeners[a];if(d)for(c=0;c<d.length;c++)d[c].handler.call(this,b)},draw:function(){return this.drawScene(),this.drawHit(),this},shouldDrawHit:function(){return this.isListening()&&this.isVisible()&&!Kinetic.isDragging()},isDraggable:function(){return!1},getTransform:function(){return this._getCache(s,this._getTransform)}}),Kinetic.Node.create=function(a,b){return this._createNode(JSON.parse(a),b)},Kinetic.Node._createNode=function(a,b){var c,d,e,f=Kinetic.Node.prototype.getClassName.call(a),g=a.children;if(b&&(a.attrs.container=b),c=new Kinetic[f](a.attrs),g)for(d=g.length,e=0;d>e;e++)c.add(this._createNode(g[e]));return c},Kinetic.Factory.addGetterSetter(Kinetic.Node,"x",0),Kinetic.Factory.addGetterSetter(Kinetic.Node,"y",0),Kinetic.Factory.addGetterSetter(Kinetic.Node,"opacity",1),Kinetic.Factory.addGetter(Kinetic.Node,"name"),Kinetic.Factory.addGetter(Kinetic.Node,"id"),Kinetic.Factory.addRotationGetterSetter(Kinetic.Node,"rotation",0),Kinetic.Factory.addPointGetterSetter(Kinetic.Node,"scale",1),Kinetic.Factory.addPointGetterSetter(Kinetic.Node,"skew",0),Kinetic.Factory.addPointGetterSetter(Kinetic.Node,"offset",0),Kinetic.Factory.addSetter(Kinetic.Node,"width"),Kinetic.Factory.addSetter(Kinetic.Node,"height"),Kinetic.Factory.addGetterSetter(Kinetic.Node,"listening",!0),Kinetic.Factory.addGetterSetter(Kinetic.Node,"visible",!0),Kinetic.Collection.mapMethods(["on","off","remove","destroy","show","hide","move","rotate","moveToTop","moveUp","moveDown","moveToBottom","moveTo","fire","draw"])}(),function(){function a(a){window.setTimeout(a,1e3/60)}var b=500;Kinetic.Animation=function(a,b){this.func=a,this.setLayers(b),this.id=Kinetic.Animation.animIdCounter++,this.frame={time:0,timeDiff:0,lastTime:(new Date).getTime()}},Kinetic.Animation.prototype={setLayers:function(a){var b=[];b=a?a.length>0?a:[a]:[],this.layers=b},getLayers:function(){return this.layers},addLayer:function(a){var b,c,d=this.layers;if(d){for(b=d.length,c=0;b>c;c++)if(d[c]._id===a._id)return!1}else this.layers=[];return this.layers.push(a),!0},isRunning:function(){for(var a=Kinetic.Animation,b=a.animations,c=0;c<b.length;c++)if(b[c].id===this.id)return!0;return!1},start:function(){this.stop(),this.frame.timeDiff=0,this.frame.lastTime=(new Date).getTime(),Kinetic.Animation._addAnimation(this)},stop:function(){Kinetic.Animation._removeAnimation(this)},_updateFrameObject:function(a){this.frame.timeDiff=a-this.frame.lastTime,this.frame.lastTime=a,this.frame.time+=this.frame.timeDiff,this.frame.frameRate=1e3/this.frame.timeDiff}},Kinetic.Animation.animations=[],Kinetic.Animation.animIdCounter=0,Kinetic.Animation.animRunning=!1,Kinetic.Animation._addAnimation=function(a){this.animations.push(a),this._handleAnimation()},Kinetic.Animation._removeAnimation=function(a){for(var b=a.id,c=this.animations,d=c.length,e=0;d>e;e++)if(c[e].id===b){this.animations.splice(e,1);break}},Kinetic.Animation._runFrames=function(){var a,b,c,d,e,f,g,h,i={},j=this.animations;for(d=0;d<j.length;d++){for(a=j[d],b=a.layers,c=a.func,a._updateFrameObject((new Date).getTime()),f=b.length,e=0;f>e;e++)g=b[e],void 0!==g._id&&(i[g._id]=g);c&&c.call(a,a.frame)}for(h in i)i[h].draw()},Kinetic.Animation._animationLoop=function(){var a=this;this.animations.length>0?(this._runFrames(),Kinetic.Animation.requestAnimFrame(function(){a._animationLoop()})):this.animRunning=!1},Kinetic.Animation._handleAnimation=function(){var a=this;this.animRunning||(this.animRunning=!0,a._animationLoop())};var c=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||a}();Kinetic.Animation.requestAnimFrame=function(b){var d=Kinetic.isDragging?a:c;d(b)};var d=Kinetic.Node.prototype.moveTo;Kinetic.Node.prototype.moveTo=function(a){d.call(this,a)},Kinetic.Layer.prototype.batchDraw=function(){var a=this;this.batchAnim||(this.batchAnim=new Kinetic.Animation(function(){a.lastBatchDrawTime&&(new Date).getTime()-a.lastBatchDrawTime>b&&a.batchAnim.stop()},this)),this.lastBatchDrawTime=(new Date).getTime(),this.batchAnim.isRunning()||(this.draw(),this.batchAnim.start())},Kinetic.Stage.prototype.batchDraw=function(){this.getChildren().each(function(a){a.batchDraw()})}}(),function(){var a={node:1,duration:1,easing:1,onFinish:1,yoyo:1},b=1,c=2,d=3,e=0;Kinetic.Tween=function(b){var c,d=this,g=b.node,h=g._id,i=b.duration||1,j=b.easing||Kinetic.Easings.Linear,k=!!b.yoyo;this.node=g,this._id=e++,this.anim=new Kinetic.Animation(function(){d.tween.onEnterFrame()},g.getLayer()||g.getLayers()),this.tween=new f(c,function(a){d._tweenFunc(a)},j,0,1,1e3*i,k),this._addListeners(),Kinetic.Tween.attrs[h]||(Kinetic.Tween.attrs[h]={}),Kinetic.Tween.attrs[h][this._id]||(Kinetic.Tween.attrs[h][this._id]={}),Kinetic.Tween.tweens[h]||(Kinetic.Tween.tweens[h]={});for(c in b)void 0===a[c]&&this._addAttr(c,b[c]);this.reset(),this.onFinish=b.onFinish,this.onReset=b.onReset},Kinetic.Tween.attrs={},Kinetic.Tween.tweens={},Kinetic.Tween.prototype={_addAttr:function(a,b){var c,d,e,f,g,h,i,j=this.node,k=j._id;if(e=Kinetic.Tween.tweens[k][a],e&&delete Kinetic.Tween.attrs[k][e][a],c=j.getAttr(a),Kinetic.Util._isArray(b))for(b=Kinetic.Util._getPoints(b),d=[],g=b.length,f=0;g>f;f++)h=c[f],i=b[f],d.push({x:i.x-h.x,y:i.y-h.y});else d=b-c;Kinetic.Tween.attrs[k][this._id][a]={start:c,diff:d},Kinetic.Tween.tweens[k][a]=this._id},_tweenFunc:function(a){var b,c,d,e,f,g,h,i,j,k=this.node,l=Kinetic.Tween.attrs[k._id][this._id];for(b in l){if(c=l[b],d=c.start,e=c.diff,Kinetic.Util._isArray(d))for(f=[],h=d.length,g=0;h>g;g++)i=d[g],j=e[g],f.push({x:i.x+j.x*a,y:i.y+j.y*a});else f=d+e*a;k.setAttr(b,f)}},_addListeners:function(){var a=this;this.tween.onPlay=function(){a.anim.start()},this.tween.onReverse=function(){a.anim.start()},this.tween.onPause=function(){a.anim.stop()},this.tween.onFinish=function(){a.onFinish&&a.onFinish()},this.tween.onReset=function(){a.onReset&&a.onReset()}},play:function(){return this.tween.play(),this},reverse:function(){return this.tween.reverse(),this},reset:function(){var a=this.node;return this.tween.reset(),(a.getLayer()||a.getLayers()).draw(),this},seek:function(a){var b=this.node;return this.tween.seek(1e3*a),(b.getLayer()||b.getLayers()).draw(),this},pause:function(){return this.tween.pause(),this},finish:function(){var a=this.node;return this.tween.finish(),(a.getLayer()||a.getLayers()).draw(),this},destroy:function(){var a,b=this.node._id,c=this._id,d=Kinetic.Tween.tweens[b];this.pause();for(a in d)delete Kinetic.Tween.tweens[b][a];delete Kinetic.Tween.attrs[b][c]}};var f=function(a,b,c,d,e,f,g){this.prop=a,this.propFunc=b,this.begin=d,this._pos=d,this.duration=f,this._change=0,this.prevPos=0,this.yoyo=g,this._time=0,this._position=0,this._startTime=0,this._finish=0,this.func=c,this._change=e-this.begin,this.pause()};f.prototype={fire:function(a){var b=this[a];b&&b()},setTime:function(a){a>this.duration?this.yoyo?(this._time=this.duration,this.reverse()):this.finish():0>a?this.yoyo?(this._time=0,this.play()):this.reset():(this._time=a,this.update())},getTime:function(){return this._time},setPosition:function(a){this.prevPos=this._pos,this.propFunc(a),this._pos=a},getPosition:function(a){return void 0===a&&(a=this._time),this.func(a,this.begin,this._change,this.duration)},play:function(){this.state=c,this._startTime=this.getTimer()-this._time,this.onEnterFrame(),this.fire("onPlay")},reverse:function(){this.state=d,this._time=this.duration-this._time,this._startTime=this.getTimer()-this._time,this.onEnterFrame(),this.fire("onReverse")},seek:function(a){this.pause(),this._time=a,this.update(),this.fire("onSeek")},reset:function(){this.pause(),this._time=0,this.update(),this.fire("onReset")},finish:function(){this.pause(),this._time=this.duration,this.update(),this.fire("onFinish")},update:function(){this.setPosition(this.getPosition(this._time))},onEnterFrame:function(){var a=this.getTimer()-this._startTime;this.state===c?this.setTime(a):this.state===d&&this.setTime(this.duration-a)},pause:function(){this.state=b,this.fire("onPause")},getTimer:function(){return(new Date).getTime()}},Kinetic.Easings={BackEaseIn:function(a,b,c,d){var e=1.70158;return c*(a/=d)*a*((e+1)*a-e)+b},BackEaseOut:function(a,b,c,d){var e=1.70158;return c*((a=a/d-1)*a*((e+1)*a+e)+1)+b},BackEaseInOut:function(a,b,c,d){var e=1.70158;return(a/=d/2)<1?c/2*a*a*(((e*=1.525)+1)*a-e)+b:c/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+2)+b},ElasticEaseIn:function(a,b,c,d,e,f){var g=0;return 0===a?b:1==(a/=d)?b+c:(f||(f=.3*d),!e||e<Math.abs(c)?(e=c,g=f/4):g=f/(2*Math.PI)*Math.asin(c/e),-(e*Math.pow(2,10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f))+b)},ElasticEaseOut:function(a,b,c,d,e,f){var g=0;return 0===a?b:1==(a/=d)?b+c:(f||(f=.3*d),!e||e<Math.abs(c)?(e=c,g=f/4):g=f/(2*Math.PI)*Math.asin(c/e),e*Math.pow(2,-10*a)*Math.sin((a*d-g)*2*Math.PI/f)+c+b)},ElasticEaseInOut:function(a,b,c,d,e,f){var g=0;return 0===a?b:2==(a/=d/2)?b+c:(f||(f=d*.3*1.5),!e||e<Math.abs(c)?(e=c,g=f/4):g=f/(2*Math.PI)*Math.asin(c/e),1>a?-.5*e*Math.pow(2,10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)+b:.5*e*Math.pow(2,-10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)+c+b)},BounceEaseOut:function(a,b,c,d){return(a/=d)<1/2.75?c*7.5625*a*a+b:2/2.75>a?c*(7.5625*(a-=1.5/2.75)*a+.75)+b:2.5/2.75>a?c*(7.5625*(a-=2.25/2.75)*a+.9375)+b:c*(7.5625*(a-=2.625/2.75)*a+.984375)+b},BounceEaseIn:function(a,b,c,d){return c-Kinetic.Easings.BounceEaseOut(d-a,0,c,d)+b},BounceEaseInOut:function(a,b,c,d){return d/2>a?.5*Kinetic.Easings.BounceEaseIn(2*a,0,c,d)+b:.5*Kinetic.Easings.BounceEaseOut(2*a-d,0,c,d)+.5*c+b},EaseIn:function(a,b,c,d){return c*(a/=d)*a+b},EaseOut:function(a,b,c,d){return-c*(a/=d)*(a-2)+b},EaseInOut:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a+b:-c/2*(--a*(a-2)-1)+b},StrongEaseIn:function(a,b,c,d){return c*(a/=d)*a*a*a*a+b},StrongEaseOut:function(a,b,c,d){return c*((a=a/d-1)*a*a*a*a+1)+b},StrongEaseInOut:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a*a*a+b:c/2*((a-=2)*a*a*a*a+2)+b},Linear:function(a,b,c,d){return c*a/d+b}}}(),function(){Kinetic.DD={anim:new Kinetic.Animation,isDragging:!1,offset:{x:0,y:0},node:null,_drag:function(a){var b=Kinetic.DD,c=b.node;c&&(c._setDragPosition(a),b.isDragging||(b.isDragging=!0,c.fire("dragstart",a,!0)),c.fire("dragmove",a,!0))},_endDragBefore:function(a){var b,c,d=Kinetic.DD,e=d.node;e&&(b=e.nodeType,c=e.getLayer(),d.anim.stop(),d.isDragging&&(d.isDragging=!1,Kinetic.listenClickTap=!1,a&&(a.dragEndNode=e)),delete d.node,(c||e).draw())},_endDragAfter:function(a){a=a||{};var b=a.dragEndNode;a&&b&&b.fire("dragend",a,!0)}},Kinetic.Node.prototype.startDrag=function(){var a=Kinetic.DD,b=this.getStage(),c=this.getLayer(),d=b.getPointerPosition(),e=this.getAbsolutePosition();d&&(a.node&&a.node.stopDrag(),a.node=this,a.offset.x=d.x-e.x,a.offset.y=d.y-e.y,a.anim.setLayers(c||this.getLayers()),a.anim.start(),this._setDragPosition())},Kinetic.Node.prototype._setDragPosition=function(a){var b=Kinetic.DD,c=this.getStage().getPointerPosition(),d=this.getDragBoundFunc(),e={x:c.x-b.offset.x,y:c.y-b.offset.y};void 0!==d&&(e=d.call(this,e,a)),this.setAbsolutePosition(e)},Kinetic.Node.prototype.stopDrag=function(){var a=Kinetic.DD,b={};a._endDragBefore(b),a._endDragAfter(b)},Kinetic.Node.prototype.setDraggable=function(a){this._setAttr("draggable",a),this._dragChange()};var a=Kinetic.Node.prototype.destroy;Kinetic.Node.prototype.destroy=function(){var b=Kinetic.DD;b.node&&b.node._id===this._id&&this.stopDrag(),a.call(this)},Kinetic.Node.prototype.isDragging=function(){var a=Kinetic.DD;return a.node&&a.node._id===this._id&&a.isDragging},Kinetic.Node.prototype._listenDrag=function(){var a=this;this._dragCleanup(),"Stage"===this.getClassName()?this.on("contentMousedown.kinetic contentTouchstart.kinetic",function(b){Kinetic.DD.node||a.startDrag(b)}):this.on("mousedown.kinetic touchstart.kinetic",function(b){Kinetic.DD.node||a.startDrag(b)})},Kinetic.Node.prototype._dragChange=function(){if(this.attrs.draggable)this._listenDrag();else{this._dragCleanup();var a=this.getStage(),b=Kinetic.DD;a&&b.node&&b.node._id===this._id&&b.node.stopDrag()}},Kinetic.Node.prototype._dragCleanup=function(){this.off("mousedown.kinetic"),this.off("touchstart.kinetic")},Kinetic.Factory.addGetterSetter(Kinetic.Node,"dragBoundFunc"),Kinetic.Factory.addGetter(Kinetic.Node,"draggable",!1),Kinetic.Node.prototype.isDraggable=Kinetic.Node.prototype.getDraggable;var b=document.documentElement;b.addEventListener("mouseup",Kinetic.DD._endDragBefore,!0),b.addEventListener("touchend",Kinetic.DD._endDragBefore,!0),b.addEventListener("mouseup",Kinetic.DD._endDragAfter,!1),b.addEventListener("touchend",Kinetic.DD._endDragAfter,!1)}(),function(){Kinetic.Util.addMethods(Kinetic.Container,{__init:function(a){this.children=new Kinetic.Collection,Kinetic.Node.call(this,a)},getChildren:function(){return this.children},hasChildren:function(){return this.getChildren().length>0},removeChildren:function(){for(var a,b=this.children;b.length>0;)a=b[0],a.hasChildren()&&a.removeChildren(),a.remove();return this},destroyChildren:function(){for(var a=this.children;a.length>0;)a[0].destroy();return this},add:function(a){var b=this.children;return this._validateAdd(a),a.index=b.length,a.parent=this,b.push(a),this._fire("add",{child:a}),this},destroy:function(){this.hasChildren()&&this.destroyChildren(),Kinetic.Node.prototype.destroy.call(this)},find:function(a){var b,c,d,e,f,g,h,i=[],j=a.replace(/ /g,"").split(","),k=j.length;for(b=0;k>b;b++)if(d=j[b],"#"===d.charAt(0))f=this._getNodeById(d.slice(1)),f&&i.push(f);else if("."===d.charAt(0))e=this._getNodesByName(d.slice(1)),i=i.concat(e);else for(g=this.getChildren(),h=g.length,c=0;h>c;c++)i=i.concat(g[c]._get(d));return Kinetic.Collection.toCollection(i)},_getNodeById:function(a){var b=Kinetic.ids[a];return void 0!==b&&this.isAncestorOf(b)?b:null},_getNodesByName:function(a){var b=Kinetic.names[a]||[];return this._getDescendants(b)},_get:function(a){for(var b=Kinetic.Node.prototype._get.call(this,a),c=this.getChildren(),d=c.length,e=0;d>e;e++)b=b.concat(c[e]._get(a));return b},toObject:function(){var a=Kinetic.Node.prototype.toObject.call(this);a.children=[];for(var b=this.getChildren(),c=b.length,d=0;c>d;d++){var e=b[d];a.children.push(e.toObject())}return a},_getDescendants:function(a){for(var b=[],c=a.length,d=0;c>d;d++){var e=a[d];this.isAncestorOf(e)&&b.push(e)}return b},isAncestorOf:function(a){for(var b=a.getParent();b;){if(b._id===this._id)return!0;b=b.getParent()}return!1},clone:function(a){var b=Kinetic.Node.prototype.clone.call(this,a);return this.getChildren().each(function(a){b.add(a.clone())}),b},getAllIntersections:function(){for(var a=Kinetic.Util._getXY(Array.prototype.slice.call(arguments)),b=[],c=this.find("Shape"),d=c.length,e=0;d>e;e++){var f=c[e];f.isVisible()&&f.intersects(a)&&b.push(f)}return b},_setChildrenIndices:function(){this.children.each(function(a,b){a.index=b})},drawScene:function(a){var b=this.getLayer(),c=this.getClipWidth()&&this.getClipHeight();return!a&&b&&(a=b.getCanvas()),this.isVisible()&&(c?a.getContext()._clip(this):this._drawChildren(a)),this},_drawChildren:function(a){this.children.each(function(b){b.drawScene(a)})},drawHit:function(){var a,b=this.getClipWidth()&&this.getClipHeight()&&"Stage"!==this.nodeType,c=0,d=0,e=[];if(this.shouldDrawHit()){for(b&&(a=this.getLayer().hitCanvas,a.getContext()._clip(this)),e=this.children,d=e.length,c=0;d>c;c++)e[c].drawHit();b&&a.getContext()._context.restore()}return this}}),Kinetic.Util.extend(Kinetic.Container,Kinetic.Node),Kinetic.Container.prototype.get=Kinetic.Container.prototype.find,Kinetic.Factory.addBoxGetterSetter(Kinetic.Container,"clip")}(),function(){function a(a){a.fill()}function b(a){a.stroke()}function c(a){a.fill()}function d(a){a.stroke()}function e(){this._clearCache(f)}var f="hasShadow";Kinetic.Util.addMethods(Kinetic.Shape,{__init:function(f){this.nodeType="Shape",this._fillFunc=a,this._strokeFunc=b,this._fillFuncHit=c,this._strokeFuncHit=d;for(var g,h=Kinetic.shapes;;)if(g=Kinetic.Util.getRandomColor(),g&&!(g in h))break;this.colorKey=g,h[g]=this,Kinetic.Node.call(this,f),this._setDrawFuncs(),this.on("shadowColorChange.kinetic shadowBlurChange.kinetic shadowOffsetChange.kinetic shadowOpacityChange.kinetic shadowEnabledChanged.kinetic",e)},hasChildren:function(){return!1},getChildren:function(){return[]},getContext:function(){return this.getLayer().getContext()},getCanvas:function(){return this.getLayer().getCanvas()},hasShadow:function(){return this._getCache(f,this._hasShadow)},_hasShadow:function(){return this.getShadowEnabled()&&0!==this.getShadowOpacity()&&!!(this.getShadowColor()||this.getShadowBlur()||this.getShadowOffsetX()||this.getShadowOffsetY())},hasFill:function(){return!!(this.getFill()||this.getFillPatternImage()||this.getFillLinearGradientColorStops()||this.getFillRadialGradientColorStops())},hasStroke:function(){return!(!this.getStroke()&&!this.getStrokeWidth())},_get:function(a){return this.className===a||this.nodeType===a?[this]:[]},intersects:function(){var a,b=Kinetic.Util._getXY(Array.prototype.slice.call(arguments)),c=this.getStage(),d=c.bufferHitCanvas;return d.getContext().clear(),this.drawScene(d),a=d.context.getImageData(0|b.x,0|b.y,1,1).data,a[3]>0},enableFill:function(){return this._setAttr("fillEnabled",!0),this},disableFill:function(){return this._setAttr("fillEnabled",!1),this},enableStroke:function(){return this._setAttr("strokeEnabled",!0),this},disableStroke:function(){return this._setAttr("strokeEnabled",!1),this},enableStrokeScale:function(){return this._setAttr("strokeScaleEnabled",!0),this},disableStrokeScale:function(){return this._setAttr("strokeScaleEnabled",!1),this},enableShadow:function(){return this._setAttr("shadowEnabled",!0),this},disableShadow:function(){return this._setAttr("shadowEnabled",!1),this},enableDashArray:function(){return this._setAttr("dashArrayEnabled",!0),this},disableDashArray:function(){return this._setAttr("dashArrayEnabled",!1),this},destroy:function(){return Kinetic.Node.prototype.destroy.call(this),delete Kinetic.shapes[this.colorKey],this},_useBufferCanvas:function(){return(this.hasShadow()||1!==this.getAbsoluteOpacity())&&this.hasFill()&&this.hasStroke()},drawScene:function(a){var b,c,d,e=a||this.getLayer().getCanvas(),f=e.getContext(),g=this.getDrawFunc(),h=this.hasShadow();return g&&this.isVisible()&&(this._useBufferCanvas()?(b=this.getStage(),c=b.bufferCanvas,d=c.getContext(),d.clear(),d.save(),d._applyLineJoin(this),d._applyAncestorTransforms(this),g.call(this,d),d.restore(),f.save(),h&&(f.save(),f._applyShadow(this),f.drawImage(c._canvas,0,0),f.restore()),f._applyOpacity(this),f.drawImage(c._canvas,0,0),f.restore()):(f.save(),f._applyLineJoin(this),f._applyAncestorTransforms(this),h&&(f.save(),f._applyShadow(this),g.call(this,f),f.restore()),f._applyOpacity(this),g.call(this,f),f.restore())),this},drawHit:function(){var a=this.getAttrs(),b=a.drawHitFunc||a.drawFunc,c=this.getLayer().hitCanvas,d=c.getContext();return b&&this.shouldDrawHit()&&(d.save(),d._applyLineJoin(this),d._applyAncestorTransforms(this),b.call(this,d),d.restore()),this},_setDrawFuncs:function(){!this.attrs.drawFunc&&this.drawFunc&&this.setDrawFunc(this.drawFunc),!this.attrs.drawHitFunc&&this.drawHitFunc&&this.setDrawHitFunc(this.drawHitFunc)}}),Kinetic.Util.extend(Kinetic.Shape,Kinetic.Node),Kinetic.Factory.addColorGetterSetter(Kinetic.Shape,"stroke"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"lineJoin"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"lineCap"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"strokeWidth"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"drawFunc"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"drawHitFunc"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"dashArray"),Kinetic.Factory.addColorGetterSetter(Kinetic.Shape,"shadowColor"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"shadowBlur"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"shadowOpacity"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternImage"),Kinetic.Factory.addColorGetterSetter(Kinetic.Shape,"fill"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternX"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternY"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillLinearGradientColorStops"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillRadialGradientStartRadius"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillRadialGradientEndRadius"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillRadialGradientColorStops"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternRepeat"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillEnabled",!0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"strokeEnabled",!0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"shadowEnabled",!0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"dashArrayEnabled",!0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPriority","color"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"strokeScaleEnabled",!0),Kinetic.Factory.addPointGetterSetter(Kinetic.Shape,"fillPatternOffset",0),Kinetic.Factory.addPointGetterSetter(Kinetic.Shape,"fillPatternScale",1),Kinetic.Factory.addPointGetterSetter(Kinetic.Shape,"fillLinearGradientStartPoint",0),Kinetic.Factory.addPointGetterSetter(Kinetic.Shape,"fillLinearGradientEndPoint",0),Kinetic.Factory.addPointGetterSetter(Kinetic.Shape,"fillRadialGradientStartPoint",0),Kinetic.Factory.addPointGetterSetter(Kinetic.Shape,"fillRadialGradientEndPoint",0),Kinetic.Factory.addPointGetterSetter(Kinetic.Shape,"shadowOffset",0),Kinetic.Factory.addRotationGetterSetter(Kinetic.Shape,"fillPatternRotation",0)}(),function(){function a(a,b){a.content.addEventListener(b,function(c){a[I+b](c)},!1)}var b="Stage",c="string",d="px",e="mouseout",f="mouseleave",g="mouseover",h="mouseenter",i="mousemove",j="mousedown",k="mouseup",l="click",m="dblclick",n="touchstart",o="touchend",p="tap",q="dbltap",r="touchmove",s="contentMouseout",t="contentMouseover",u="contentMousemove",v="contentMousedown",w="contentMouseup",x="contentClick",y="contentDblclick",z="contentTouchstart",A="contentTouchend",B="contentDbltap",C="contentTouchmove",D="div",E="relative",F="inline-block",G="kineticjs-content",H=" ",I="_",J="container",K="",L=[j,i,k,e,n,r,o,g],M=L.length;Kinetic.Util.addMethods(Kinetic.Stage,{___init:function(a){this.nodeType=b,Kinetic.Container.call(this,a),this._id=Kinetic.idCounter++,this._buildDOM(),this._bindContentEvents(),Kinetic.stages.push(this)},_validateAdd:function(a){"Layer"!==a.getType()&&Kinetic.Util.error("You may only add layers to the stage.")},setContainer:function(a){return typeof a===c&&(a=document.getElementById(a)),this._setAttr(J,a),this},draw:function(){return Kinetic.Node.prototype.draw.call(this),this},setHeight:function(a){return Kinetic.Node.prototype.setHeight.call(this,a),this._resizeDOM(),this},setWidth:function(a){return Kinetic.Node.prototype.setWidth.call(this,a),this._resizeDOM(),this},clear:function(){var a,b=this.children,c=b.length;for(a=0;c>a;a++)b[a].clear();return this},destroy:function(){var a=this.content;Kinetic.Container.prototype.destroy.call(this),a&&Kinetic.Util._isInDocument(a)&&this.getContainer().removeChild(a)},getPointerPosition:function(){return this.pointerPos},getStage:function(){return this},getContent:function(){return this.content},toDataURL:function(a){function b(e){var f=i[e],j=f.toDataURL(),k=new Image;k.onload=function(){h.drawImage(k,0,0),e<i.length-1?b(e+1):a.callback(g.toDataURL(c,d))},k.src=j}a=a||{};var c=a.mimeType||null,d=a.quality||null,e=a.x||0,f=a.y||0,g=new Kinetic.SceneCanvas({width:a.width||this.getWidth(),height:a.height||this.getHeight(),pixelRatio:1}),h=g.getContext()._context,i=this.children;(e||f)&&h.translate(-1*e,-1*f),b(0)},toImage:function(a){var b=a.callback;a.callback=function(a){Kinetic.Util._getImage(a,function(a){b(a)})},this.toDataURL(a)},getIntersection:function(){var a,b,c=Kinetic.Util._getXY(Array.prototype.slice.call(arguments)),d=this.getChildren(),e=d.length,f=e-1;for(a=f;a>=0;a--)if(b=d[a].getIntersection(c))return b;return null},_resizeDOM:function(){if(this.content){var a,b,c=this.getWidth(),e=this.getHeight(),f=this.getChildren(),g=f.length;for(this.content.style.width=c+d,this.content.style.height=e+d,this.bufferCanvas.setSize(c,e),this.bufferHitCanvas.setSize(c,e),a=0;g>a;a++)b=f[a],b.getCanvas().setSize(c,e),b.hitCanvas.setSize(c,e),b.draw()}},add:function(a){return Kinetic.Container.prototype.add.call(this,a),a.canvas.setSize(this.attrs.width,this.attrs.height),a.hitCanvas.setSize(this.attrs.width,this.attrs.height),a.draw(),this.content.appendChild(a.canvas._canvas),this},getParent:function(){return null},getLayer:function(){return null},getLayers:function(){return this.getChildren()},_bindContentEvents:function(){var b;for(b=0;M>b;b++)a(this,L[b])},_mouseover:function(a){this._fire(t,a)},_mouseout:function(a){this._setPointerPosition(a);var b=this.targetShape;b&&!Kinetic.isDragging()&&(b._fireAndBubble(e,a),b._fireAndBubble(f,a),this.targetShape=null),this.pointerPos=void 0,this._fire(s,a)},_mousemove:function(a){this._setPointerPosition(a);var b=Kinetic.DD,c=this.getIntersection(this.getPointerPosition()),d=c&&c.shape?c.shape:void 0;d?Kinetic.isDragging()||255!==c.pixel[3]||this.targetShape&&this.targetShape._id===d._id?d._fireAndBubble(i,a):(this.targetShape&&(this.targetShape._fireAndBubble(e,a,d),this.targetShape._fireAndBubble(f,a,d)),d._fireAndBubble(g,a,this.targetShape),d._fireAndBubble(h,a,this.targetShape),this.targetShape=d):this.targetShape&&!Kinetic.isDragging()&&(this.targetShape._fireAndBubble(e,a),this.targetShape._fireAndBubble(f,a),this.targetShape=null),this._fire(u,a),b&&b._drag(a),a.preventDefault&&a.preventDefault()},_mousedown:function(a){this._setPointerPosition(a);var b=this.getIntersection(this.getPointerPosition()),c=b&&b.shape?b.shape:void 0;Kinetic.listenClickTap=!0,c&&(this.clickStartShape=c,c._fireAndBubble(j,a)),this._fire(v,a),a.preventDefault&&a.preventDefault()},_mouseup:function(a){this._setPointerPosition(a);var b=this.getIntersection(this.getPointerPosition()),c=b&&b.shape?b.shape:void 0,d=!1;Kinetic.inDblClickWindow?(d=!0,Kinetic.inDblClickWindow=!1):Kinetic.inDblClickWindow=!0,setTimeout(function(){Kinetic.inDblClickWindow=!1},Kinetic.dblClickWindow),c&&(c._fireAndBubble(k,a),Kinetic.listenClickTap&&c._id===this.clickStartShape._id&&(c._fireAndBubble(l,a),d&&c._fireAndBubble(m,a))),this._fire(w,a),Kinetic.listenClickTap&&(this._fire(x,a),d&&this._fire(y,a)),Kinetic.listenClickTap=!1,a.preventDefault&&a.preventDefault()},_touchstart:function(a){this._setPointerPosition(a);var b=this.getIntersection(this.getPointerPosition()),c=b&&b.shape?b.shape:void 0;Kinetic.listenClickTap=!0,c&&(this.tapStartShape=c,c._fireAndBubble(n,a),c.isListening()&&a.preventDefault&&a.preventDefault()),this._fire(z,a)},_touchend:function(a){this._setPointerPosition(a);var b=this.getIntersection(this.getPointerPosition()),c=b&&b.shape?b.shape:void 0,d=!1;Kinetic.inDblClickWindow?(d=!0,Kinetic.inDblClickWindow=!1):Kinetic.inDblClickWindow=!0,setTimeout(function(){Kinetic.inDblClickWindow=!1},Kinetic.dblClickWindow),c&&(c._fireAndBubble(o,a),Kinetic.listenClickTap&&c._id===this.tapStartShape._id&&(c._fireAndBubble(p,a),d&&c._fireAndBubble(q,a)),c.isListening()&&a.preventDefault&&a.preventDefault()),Kinetic.listenClickTap&&(this._fire(A,a),d&&this._fire(B,a)),Kinetic.listenClickTap=!1},_touchmove:function(a){this._setPointerPosition(a);var b=Kinetic.DD,c=this.getIntersection(this.getPointerPosition()),d=c&&c.shape?c.shape:void 0;d&&(d._fireAndBubble(r,a),d.isListening()&&a.preventDefault&&a.preventDefault()),this._fire(C,a),b&&b._drag(a)},_setPointerPosition:function(a){var b,a=a?a:window.event,c=this._getContentPosition(),d=a.offsetX,e=a.clientX,f=null,g=null;void 0!==a.touches?1===a.touches.length&&(b=a.touches[0],f=b.clientX-c.left,g=b.clientY-c.top):void 0!==d?(f=d,g=a.offsetY):"mozilla"===Kinetic.UA.browser?(f=a.layerX,g=a.layerY):void 0!==e&&c&&(f=e-c.left,g=a.clientY-c.top),null!==f&&null!==g&&(this.pointerPos={x:f,y:g})},_getContentPosition:function(){var a=this.content.getBoundingClientRect?this.content.getBoundingClientRect():{top:0,left:0};return{top:a.top,left:a.left}},_buildDOM:function(){var a=this.getContainer();a.innerHTML=K,this.content=document.createElement(D),this.content.style.position=E,this.content.style.display=F,this.content.className=G,this.content.setAttribute("role","presentation"),a.appendChild(this.content),this.bufferCanvas=new Kinetic.SceneCanvas({pixelRatio:1}),this.bufferHitCanvas=new Kinetic.HitCanvas,this._resizeDOM()},_onContent:function(a,b){var c,d,e=a.split(H),f=e.length;for(c=0;f>c;c++)d=e[c],this.content.addEventListener(d,b,!1)}}),Kinetic.Util.extend(Kinetic.Stage,Kinetic.Container),Kinetic.Factory.addGetter(Kinetic.Stage,"container")}(),function(){var a="#",b="beforeDraw",c="draw";Kinetic.Util.addMethods(Kinetic.Layer,{___init:function(a){this.nodeType="Layer",this.canvas=new Kinetic.SceneCanvas,this.hitCanvas=new Kinetic.HitCanvas,Kinetic.Container.call(this,a)},_validateAdd:function(a){var b=a.getType();"Group"!==b&&"Shape"!==b&&Kinetic.Util.error("You may only add groups and shapes to a layer.")},getIntersection:function(){var b,c,d,e=Kinetic.Util._getXY(Array.prototype.slice.call(arguments));if(this.isVisible()&&this.isListening()){if(b=this.hitCanvas.context._context.getImageData(0|e.x,0|e.y,1,1).data,255===b[3])return c=Kinetic.Util._rgbToHex(b[0],b[1],b[2]),d=Kinetic.shapes[a+c],{shape:d,pixel:b};if(b[0]>0||b[1]>0||b[2]>0||b[3]>0)return{pixel:b}}return null},drawScene:function(a){return a=a||this.getCanvas(),this._fire(b,{node:this}),this.getClearBeforeDraw()&&a.getContext().clear(),Kinetic.Container.prototype.drawScene.call(this,a),this._fire(c,{node:this}),this},drawHit:function(){var a=this.getLayer();return a&&a.getClearBeforeDraw()&&a.getHitCanvas().getContext().clear(),Kinetic.Container.prototype.drawHit.call(this),this},getCanvas:function(){return this.canvas},getHitCanvas:function(){return this.hitCanvas},getContext:function(){return this.getCanvas().getContext()},clear:function(){var a=this.getContext(),b=this.getHitCanvas().getContext();return a.clear.apply(a,arguments),b.clear.apply(b,arguments),this},setVisible:function(a){return Kinetic.Node.prototype.setVisible.call(this,a),a?(this.getCanvas()._canvas.style.display="block",this.hitCanvas._canvas.style.display="block"):(this.getCanvas()._canvas.style.display="none",this.hitCanvas._canvas.style.display="none"),this},setZIndex:function(a){Kinetic.Node.prototype.setZIndex.call(this,a);var b=this.getStage();return b&&(b.content.removeChild(this.getCanvas()._canvas),a<b.getChildren().length-1?b.content.insertBefore(this.getCanvas()._canvas,b.getChildren()[a+1].getCanvas()._canvas):b.content.appendChild(this.getCanvas()._canvas)),this},moveToTop:function(){Kinetic.Node.prototype.moveToTop.call(this);var a=this.getStage();a&&(a.content.removeChild(this.getCanvas()._canvas),a.content.appendChild(this.getCanvas()._canvas))},moveUp:function(){if(Kinetic.Node.prototype.moveUp.call(this)){var a=this.getStage();a&&(a.content.removeChild(this.getCanvas()._canvas),this.index<a.getChildren().length-1?a.content.insertBefore(this.getCanvas()._canvas,a.getChildren()[this.index+1].getCanvas()._canvas):a.content.appendChild(this.getCanvas()._canvas))}},moveDown:function(){if(Kinetic.Node.prototype.moveDown.call(this)){var a=this.getStage();if(a){var b=a.getChildren();a.content.removeChild(this.getCanvas()._canvas),a.content.insertBefore(this.getCanvas()._canvas,b[this.index+1].getCanvas()._canvas)}}},moveToBottom:function(){if(Kinetic.Node.prototype.moveToBottom.call(this)){var a=this.getStage();if(a){var b=a.getChildren();a.content.removeChild(this.getCanvas()._canvas),a.content.insertBefore(this.getCanvas()._canvas,b[1].getCanvas()._canvas)}}},getLayer:function(){return this},remove:function(){var a=this.getStage(),b=this.getCanvas(),c=b._canvas;return Kinetic.Node.prototype.remove.call(this),a&&c&&Kinetic.Util._isInDocument(c)&&a.content.removeChild(c),this
},getStage:function(){return this.parent}}),Kinetic.Util.extend(Kinetic.Layer,Kinetic.Container),Kinetic.Factory.addGetterSetter(Kinetic.Layer,"clearBeforeDraw",!0)}(),function(){Kinetic.Util.addMethods(Kinetic.Group,{___init:function(a){this.nodeType="Group",Kinetic.Container.call(this,a)},_validateAdd:function(a){var b=a.getType();"Group"!==b&&"Shape"!==b&&Kinetic.Util.error("You may only add groups and shapes to groups.")}}),Kinetic.Util.extend(Kinetic.Group,Kinetic.Container)}(),function(){Kinetic.Rect=function(a){this.___init(a)},Kinetic.Rect.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Rect"},drawFunc:function(a){var b=this.getCornerRadius(),c=this.getWidth(),d=this.getHeight();a.beginPath(),b?(a.moveTo(b,0),a.lineTo(c-b,0),a.arc(c-b,b,b,3*Math.PI/2,0,!1),a.lineTo(c,d-b),a.arc(c-b,d-b,b,0,Math.PI/2,!1),a.lineTo(b,d),a.arc(b,d-b,b,Math.PI/2,Math.PI,!1),a.lineTo(0,b),a.arc(b,b,b,Math.PI,3*Math.PI/2,!1)):a.rect(0,0,c,d),a.closePath(),a.fillStrokeShape(this)}},Kinetic.Util.extend(Kinetic.Rect,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Rect,"cornerRadius",0)}(),function(){var a=2*Math.PI-1e-4,b="Circle";Kinetic.Circle=function(a){this.___init(a)},Kinetic.Circle.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className=b},drawFunc:function(b){b.beginPath(),b.arc(0,0,this.getRadius(),0,a,!1),b.closePath(),b.fillStrokeShape(this)},getWidth:function(){return 2*this.getRadius()},getHeight:function(){return 2*this.getRadius()},setWidth:function(a){Kinetic.Node.prototype.setWidth.call(this,a),this.setRadius(a/2)},setHeight:function(a){Kinetic.Node.prototype.setHeight.call(this,a),this.setRadius(a/2)}},Kinetic.Util.extend(Kinetic.Circle,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Circle,"radius",0)}(),function(){var a=2*Math.PI-1e-4,b="Ellipse";Kinetic.Ellipse=function(a){this.___init(a)},Kinetic.Ellipse.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className=b},drawFunc:function(b){var c=this.getRadius();b.beginPath(),b.save(),c.x!==c.y&&b.scale(1,c.y/c.x),b.arc(0,0,c.x,0,a,!1),b.restore(),b.closePath(),b.fillStrokeShape(this)},getWidth:function(){return 2*this.getRadius().x},getHeight:function(){return 2*this.getRadius().y},setWidth:function(a){Kinetic.Node.prototype.setWidth.call(this,a),this.setRadius({x:a/2})},setHeight:function(a){Kinetic.Node.prototype.setHeight.call(this,a),this.setRadius({y:a/2})}},Kinetic.Util.extend(Kinetic.Ellipse,Kinetic.Shape),Kinetic.Factory.addPointGetterSetter(Kinetic.Ellipse,"radius",0)}(),function(){Kinetic.Wedge=function(a){this.___init(a)},Kinetic.Wedge.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Wedge"},drawFunc:function(a){a.beginPath(),a.arc(0,0,this.getRadius(),0,this.getAngle(),this.getClockwise()),a.lineTo(0,0),a.closePath(),a.fillStrokeShape(this)}},Kinetic.Util.extend(Kinetic.Wedge,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Wedge,"radius",0),Kinetic.Factory.addRotationGetterSetter(Kinetic.Wedge,"angle",0),Kinetic.Factory.addGetterSetter(Kinetic.Wedge,"clockwise",!1)}(),function(){var a="Image",b="set";Kinetic.Image=function(a){this.___init(a)},Kinetic.Image.prototype={___init:function(b){Kinetic.Shape.call(this,b),this.className=a},_useBufferCanvas:function(){return(this.hasShadow()||1!==this.getAbsoluteOpacity())&&this.hasStroke()},drawFunc:function(a){var b,c,d,e=this.getWidth(),f=this.getHeight();this.getFilter()&&this._applyFilter&&(this.applyFilter(),this._applyFilter=!1),this.filterCanvas?(d=this.filterCanvas._canvas,c=[d,0,0,e,f]):(d=this.getImage(),d&&(b=this.getCrop(),b?(b.x=b.x||0,b.y=b.y||0,b.width=b.width||d.width-b.x,b.height=b.height||d.height-b.y,c=[d,b.x,b.y,b.width,b.height,0,0,e,f]):c=[d,0,0,e,f])),a.beginPath(),a.rect(0,0,e,f),a.closePath(),a.fillStrokeShape(this),d&&a.drawImage.apply(a,c)},drawHitFunc:function(a){var b=this.getWidth(),c=this.getHeight(),d=this.imageHitRegion;d?(a.drawImage(d,0,0),a.beginPath(),a.rect(0,0,b,c),a.closePath(),a.strokeShape(this)):(a.beginPath(),a.rect(0,0,b,c),a.closePath(),a.fillStrokeShape(this))},applyFilter:function(){var a,b,c,d=this.getImage(),e=(this.getWidth(),this.getHeight(),this.getFilter()),f=this.getCrop()||{};f.x=f.x||0,f.y=f.y||0,f.width=f.width||d.width-f.x,f.height=f.height||d.height-f.y,this.filterCanvas&&this.filterCanvas.getWidth()===f.width&&this.filterCanvas.getHeight()===f.height?(a=this.filterCanvas,a.getContext().clear()):a=this.filterCanvas=new Kinetic.SceneCanvas({width:f.width,height:f.height,pixelRatio:1}),b=a.getContext();try{b.drawImage(d,f.x,f.y,f.width,f.height,0,0,f.width,f.height),c=b.getImageData(0,0,f.width,f.height),e.call(this,c),b.putImageData(c,0,0)}catch(g){this.clearFilter(),Kinetic.Util.warn("Unable to apply filter. "+g.message)}},clearFilter:function(){this.filterCanvas=null,this._applyFilter=!1},createImageHitRegion:function(a){var b,c,d,e,f,g=this,h=this.getWidth(),i=this.getHeight(),j=new Kinetic.SceneCanvas({width:h,height:i,pixelRatio:1}),k=j.getContext()._context,l=this.getImage();k.drawImage(l,0,0);try{for(b=k.getImageData(0,0,h,i),c=b.data,f=c.length,d=Kinetic.Util._hexToRgb(this.colorKey),e=0;f>e;e+=4)c[e+3]>0&&(c[e]=d.r,c[e+1]=d.g,c[e+2]=d.b);Kinetic.Util._getImage(b,function(b){g.imageHitRegion=b,a&&a()})}catch(m){Kinetic.Util.warn("Unable to create image hit region. "+m.message)}},clearImageHitRegion:function(){delete this.imageHitRegion},getWidth:function(){var a=this.getImage();return this.attrs.width||(a?a.width:0)},getHeight:function(){var a=this.getImage();return this.attrs.height||(a?a.height:0)},destroy:function(){return Kinetic.Shape.prototype.destroy.call(this),delete this.filterCanvas,delete this.attrs,this}},Kinetic.Util.extend(Kinetic.Image,Kinetic.Shape),Kinetic.Factory.addFilterGetterSetter=function(a,b,c){this.addGetter(a,b,c),this.addFilterSetter(a,b)},Kinetic.Factory.addFilterSetter=function(a,c){var d=b+Kinetic.Util._capitalize(c);a.prototype[d]=function(a){this._setAttr(c,a),this._applyFilter=!0}},Kinetic.Factory.addGetterSetter(Kinetic.Image,"image"),Kinetic.Factory.addBoxGetterSetter(Kinetic.Image,"crop"),Kinetic.Factory.addFilterGetterSetter(Kinetic.Image,"filter")}(),function(){Kinetic.Polygon=function(a){this.___init(a)},Kinetic.Polygon.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Polygon"},drawFunc:function(a){var b=this.getPoints(),c=b.length;a.beginPath(),a.moveTo(b[0].x,b[0].y);for(var d=1;c>d;d++)a.lineTo(b[d].x,b[d].y);a.closePath(),a.fillStrokeShape(this)}},Kinetic.Util.extend(Kinetic.Polygon,Kinetic.Shape),Kinetic.Factory.addPointsGetterSetter(Kinetic.Polygon,"points")}(),function(){function a(a){a.fillText(this.partialText,0,0)}function b(a){a.strokeText(this.partialText,0,0)}var c="auto",d="canvas",e="center",f="Change.kinetic",g="2d",h="-",i="",j="left",k="text",l="Text",m="middle",n="normal",o="px ",p=" ",q="right",r="word",s="char",t="none",u=["fontFamily","fontSize","fontStyle","padding","align","lineHeight","text","width","height","wrap"],v=u.length,w=document.createElement(d).getContext(g);Kinetic.Text=function(a){this.___init(a)},Kinetic.Text.prototype={___init:function(d){var e=this;void 0===d.width&&(d.width=c),void 0===d.height&&(d.height=c),Kinetic.Shape.call(this,d),this._fillFunc=a,this._strokeFunc=b,this.className=l;for(var g=0;v>g;g++)this.on(u[g]+f,e._setTextData);this._setTextData()},drawFunc:function(a){var b=this.getPadding(),c=(this.getFontStyle(),this.getFontSize(),this.getFontFamily(),this.getTextHeight()),d=this.getLineHeight()*c,f=this.textArr,g=f.length,h=this.getWidth();a.setAttr("font",this._getContextFont()),a.setAttr("textBaseline",m),a.setAttr("textAlign",j),a.save(),a.translate(b,0),a.translate(0,b+c/2);for(var i=0;g>i;i++){var k=f[i],l=k.text,n=k.width;a.save(),this.getAlign()===q?a.translate(h-n-2*b,0):this.getAlign()===e&&a.translate((h-n-2*b)/2,0),this.partialText=l,a.fillStrokeShape(this),a.restore(),a.translate(0,d)}a.restore()},drawHitFunc:function(a){var b=this.getWidth(),c=this.getHeight();a.beginPath(),a.rect(0,0,b,c),a.closePath(),a.fillStrokeShape(this)},setText:function(a){var b=Kinetic.Util._isString(a)?a:a.toString();this._setAttr(k,b)},getWidth:function(){return this.attrs.width===c?this.getTextWidth()+2*this.getPadding():this.attrs.width},getHeight:function(){return this.attrs.height===c?this.getTextHeight()*this.textArr.length*this.getLineHeight()+2*this.getPadding():this.attrs.height},getTextWidth:function(){return this.textWidth},getTextHeight:function(){return this.textHeight},_getTextSize:function(a){var b,c=w,d=this.getFontSize();return c.save(),c.font=this._getContextFont(),b=c.measureText(a),c.restore(),{width:b.width,height:parseInt(d,10)}},_getContextFont:function(){return this.getFontStyle()+p+this.getFontSize()+o+this.getFontFamily()},_addTextLine:function(a,b){return this.textArr.push({text:a,width:b})},_getTextWidth:function(a){return w.measureText(a).width},_setTextData:function(){var a=this.getText().split("\n"),b=+this.getFontSize(),d=0,e=this.getLineHeight()*b,f=this.attrs.width,g=this.attrs.height,i=f!==c,j=g!==c,k=this.getPadding(),l=f-2*k,m=g-2*k,n=0,q=this.getWrap(),r=q!==t,u=q!==s&&r;this.textArr=[],w.save(),w.font=this.getFontStyle()+p+b+o+this.getFontFamily();for(var v=0,x=a.length;x>v;++v){var y=a[v],z=this._getTextWidth(y);if(i&&z>l)for(;y.length>0;){for(var A=0,B=y.length,C="",D=0;B>A;){var E=A+B>>>1,F=y.slice(0,E+1),G=this._getTextWidth(F);l>=G?(A=E+1,C=F,D=G):B=E}if(!C)break;if(u){var H=Math.max(C.lastIndexOf(p),C.lastIndexOf(h))+1;H>0&&(A=H,C=C.slice(0,A),D=this._getTextWidth(C))}if(this._addTextLine(C,D),n+=e,!r||j&&n+e>m)break;if(y=y.slice(A),y.length>0&&(z=this._getTextWidth(y),l>=z)){this._addTextLine(y,z),n+=e;break}}else this._addTextLine(y,z),n+=e,d=Math.max(d,z);if(j&&n+e>m)break}w.restore(),this.textHeight=b,this.textWidth=d}},Kinetic.Util.extend(Kinetic.Text,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Text,"fontFamily","Arial"),Kinetic.Factory.addGetterSetter(Kinetic.Text,"fontSize",12),Kinetic.Factory.addGetterSetter(Kinetic.Text,"fontStyle",n),Kinetic.Factory.addGetterSetter(Kinetic.Text,"padding",0),Kinetic.Factory.addGetterSetter(Kinetic.Text,"align",j),Kinetic.Factory.addGetterSetter(Kinetic.Text,"lineHeight",1),Kinetic.Factory.addGetterSetter(Kinetic.Text,"wrap",r),Kinetic.Factory.addGetter(Kinetic.Text,k,i),Kinetic.Factory.addSetter(Kinetic.Text,"width"),Kinetic.Factory.addSetter(Kinetic.Text,"height")}(),function(){Kinetic.Line=function(a){this.___init(a)},Kinetic.Line.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Line"},drawFunc:function(a){var b,c,d=this.getPoints(),e=d.length;for(a.beginPath(),a.moveTo(d[0].x,d[0].y),b=1;e>b;b++)c=d[b],a.lineTo(c.x,c.y);a.strokeShape(this)}},Kinetic.Util.extend(Kinetic.Line,Kinetic.Shape),Kinetic.Factory.addPointsGetterSetter(Kinetic.Line,"points")}(),function(){Kinetic.Spline=function(a){this.___init(a)},Kinetic.Spline.prototype={___init:function(a){var b=this;Kinetic.Shape.call(this,a),this.className="Spline",this.on("pointsChange.kinetic tensionChange.kinetic",function(){b._setAllPoints()}),this._setAllPoints()},drawFunc:function(a){var b,c,d,e,f=this.getPoints(),g=f.length,h=this.getTension();if(a.beginPath(),a.moveTo(f[0].x,f[0].y),0!==h&&g>2){for(b=this.allPoints,c=b.length,d=2,a.quadraticCurveTo(b[0].x,b[0].y,b[1].x,b[1].y);c-1>d;)a.bezierCurveTo(b[d].x,b[d++].y,b[d].x,b[d++].y,b[d].x,b[d++].y);a.quadraticCurveTo(b[c-1].x,b[c-1].y,f[g-1].x,f[g-1].y)}else for(d=1;g>d;d++)e=f[d],a.lineTo(e.x,e.y);a.strokeShape(this)},_setAllPoints:function(){this.allPoints=Kinetic.Util._expandPoints(this.getPoints(),this.getTension())}},Kinetic.Util.extend(Kinetic.Spline,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Spline,"tension",1),Kinetic.Factory.addPointsGetterSetter(Kinetic.Spline,"points")}(),function(){Kinetic.Blob=function(a){this.___init(a)},Kinetic.Blob.prototype={___init:function(a){var b=this;Kinetic.Shape.call(this,a),this.className="Blob",this.on("pointsChange.kinetic tensionChange.kinetic",function(){b._setAllPoints()}),this._setAllPoints()},drawFunc:function(a){var b,c,d,e,f=this.getPoints(),g=f.length,h=this.getTension();if(a.beginPath(),a.moveTo(f[0].x,f[0].y),0!==h&&g>2)for(b=this.allPoints,c=b.length,d=0;c-1>d;)a.bezierCurveTo(b[d].x,b[d++].y,b[d].x,b[d++].y,b[d].x,b[d++].y);else for(d=1;g>d;d++)e=f[d],a.lineTo(e.x,e.y);a.closePath(),a.fillStrokeShape(this)},_setAllPoints:function(){var a=this.getPoints(),b=a.length,c=this.getTension(),d=Kinetic.Util,e=d._getControlPoints(a[b-1],a[0],a[1],c),f=d._getControlPoints(a[b-2],a[b-1],a[0],c);this.allPoints=Kinetic.Util._expandPoints(this.getPoints(),this.getTension()),this.allPoints.unshift(e[1]),this.allPoints.push(f[0]),this.allPoints.push(a[b-1]),this.allPoints.push(f[1]),this.allPoints.push(e[0]),this.allPoints.push(a[0])}},Kinetic.Util.extend(Kinetic.Blob,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Blob,"tension",1),Kinetic.Factory.addPointsGetterSetter(Kinetic.Blob,"points")}(),function(){Kinetic.Sprite=function(a){this.___init(a)},Kinetic.Sprite.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Sprite",this.anim=new Kinetic.Animation;var b=this;this.on("animationChange.kinetic",function(){b.setIndex(0)})},drawFunc:function(a){var b=this.getAnimation(),c=this.getIndex(),d=this.getAnimations()[b][c],e=this.getImage();e&&a.drawImage(e,d.x,d.y,d.width,d.height,0,0,d.width,d.height)},drawHitFunc:function(a){var b=this.getAnimation(),c=this.getIndex(),d=this.getAnimations()[b][c];a.beginPath(),a.rect(0,0,d.width,d.height),a.closePath(),a.fillShape(this)},_useBufferCanvas:function(){return(this.hasShadow()||1!==this.getAbsoluteOpacity())&&this.hasStroke()},start:function(){var a=this,b=this.getLayer();this.anim.setLayers(b),this.interval=setInterval(function(){var b=a.getIndex();a._updateIndex(),a.afterFrameFunc&&b===a.afterFrameIndex&&(a.afterFrameFunc(),delete a.afterFrameFunc,delete a.afterFrameIndex)},1e3/this.getFrameRate()),this.anim.start()},stop:function(){this.anim.stop(),clearInterval(this.interval)},afterFrame:function(a,b){this.afterFrameIndex=a,this.afterFrameFunc=b},_updateIndex:function(){var a=this.getIndex(),b=this.getAnimation(),c=this.getAnimations(),d=c[b],e=d.length;e-1>a?this.setIndex(a+1):this.setIndex(0)}},Kinetic.Util.extend(Kinetic.Sprite,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Sprite,"animation"),Kinetic.Factory.addGetterSetter(Kinetic.Sprite,"animations"),Kinetic.Factory.addGetterSetter(Kinetic.Sprite,"image"),Kinetic.Factory.addGetterSetter(Kinetic.Sprite,"index",0),Kinetic.Factory.addGetterSetter(Kinetic.Sprite,"frameRate",17)}(),function(){Kinetic.Path=function(a){this.___init(a)},Kinetic.Path.prototype={___init:function(a){this.dataArray=[];var b=this;Kinetic.Shape.call(this,a),this.className="Path",this.dataArray=Kinetic.Path.parsePathData(this.getData()),this.on("dataChange.kinetic",function(){b.dataArray=Kinetic.Path.parsePathData(this.getData())})},drawFunc:function(a){var b=this.dataArray,c=!1;a.beginPath();for(var d=0;d<b.length;d++){var e=b[d].command,f=b[d].points;switch(e){case"L":a.lineTo(f[0],f[1]);break;case"M":a.moveTo(f[0],f[1]);break;case"C":a.bezierCurveTo(f[0],f[1],f[2],f[3],f[4],f[5]);break;case"Q":a.quadraticCurveTo(f[0],f[1],f[2],f[3]);break;case"A":var g=f[0],h=f[1],i=f[2],j=f[3],k=f[4],l=f[5],m=f[6],n=f[7],o=i>j?i:j,p=i>j?1:i/j,q=i>j?j/i:1;a.translate(g,h),a.rotate(m),a.scale(p,q),a.arc(0,0,o,k,k+l,1-n),a.scale(1/p,1/q),a.rotate(-m),a.translate(-g,-h);break;case"z":a.closePath(),c=!0}}c?a.fillStrokeShape(this):a.strokeShape(this)}},Kinetic.Util.extend(Kinetic.Path,Kinetic.Shape),Kinetic.Path.getLineLength=function(a,b,c,d){return Math.sqrt((c-a)*(c-a)+(d-b)*(d-b))},Kinetic.Path.getPointOnLine=function(a,b,c,d,e,f,g){void 0===f&&(f=b),void 0===g&&(g=c);var h=(e-c)/(d-b+1e-8),i=Math.sqrt(a*a/(1+h*h));b>d&&(i*=-1);var j,k=h*i;if(d===b)j={x:f,y:g+k};else if((g-c)/(f-b+1e-8)===h)j={x:f+i,y:g+k};else{var l,m,n=this.getLineLength(b,c,d,e);if(1e-8>n)return void 0;var o=(f-b)*(d-b)+(g-c)*(e-c);o/=n*n,l=b+o*(d-b),m=c+o*(e-c);var p=this.getLineLength(f,g,l,m),q=Math.sqrt(a*a-p*p);i=Math.sqrt(q*q/(1+h*h)),b>d&&(i*=-1),k=h*i,j={x:l+i,y:m+k}}return j},Kinetic.Path.getPointOnCubicBezier=function(a,b,c,d,e,f,g,h,i){function j(a){return a*a*a}function k(a){return 3*a*a*(1-a)}function l(a){return 3*a*(1-a)*(1-a)}function m(a){return(1-a)*(1-a)*(1-a)}var n=h*j(a)+f*k(a)+d*l(a)+b*m(a),o=i*j(a)+g*k(a)+e*l(a)+c*m(a);return{x:n,y:o}},Kinetic.Path.getPointOnQuadraticBezier=function(a,b,c,d,e,f,g){function h(a){return a*a}function i(a){return 2*a*(1-a)}function j(a){return(1-a)*(1-a)}var k=f*h(a)+d*i(a)+b*j(a),l=g*h(a)+e*i(a)+c*j(a);return{x:k,y:l}},Kinetic.Path.getPointOnEllipticalArc=function(a,b,c,d,e,f){var g=Math.cos(f),h=Math.sin(f),i={x:c*Math.cos(e),y:d*Math.sin(e)};return{x:a+(i.x*g-i.y*h),y:b+(i.x*h+i.y*g)}},Kinetic.Path.parsePathData=function(a){if(!a)return[];var b=a,c=["m","M","l","L","v","V","h","H","z","Z","c","C","q","Q","t","T","s","S","a","A"];b=b.replace(new RegExp(" ","g"),",");for(var d=0;d<c.length;d++)b=b.replace(new RegExp(c[d],"g"),"|"+c[d]);var e=b.split("|"),f=[],g=0,h=0;for(d=1;d<e.length;d++){var i=e[d],j=i.charAt(0);i=i.slice(1),i=i.replace(new RegExp(",-","g"),"-"),i=i.replace(new RegExp("-","g"),",-"),i=i.replace(new RegExp("e,-","g"),"e-");var k=i.split(",");k.length>0&&""===k[0]&&k.shift();for(var l=0;l<k.length;l++)k[l]=parseFloat(k[l]);for(;k.length>0&&!isNaN(k[0]);){var m,n,o,p,q,r,s,t,u,v,w=null,x=[],y=g,z=h;switch(j){case"l":g+=k.shift(),h+=k.shift(),w="L",x.push(g,h);break;case"L":g=k.shift(),h=k.shift(),x.push(g,h);break;case"m":g+=k.shift(),h+=k.shift(),w="M",x.push(g,h),j="l";break;case"M":g=k.shift(),h=k.shift(),w="M",x.push(g,h),j="L";break;case"h":g+=k.shift(),w="L",x.push(g,h);break;case"H":g=k.shift(),w="L",x.push(g,h);break;case"v":h+=k.shift(),w="L",x.push(g,h);break;case"V":h=k.shift(),w="L",x.push(g,h);break;case"C":x.push(k.shift(),k.shift(),k.shift(),k.shift()),g=k.shift(),h=k.shift(),x.push(g,h);break;case"c":x.push(g+k.shift(),h+k.shift(),g+k.shift(),h+k.shift()),g+=k.shift(),h+=k.shift(),w="C",x.push(g,h);break;case"S":n=g,o=h,m=f[f.length-1],"C"===m.command&&(n=g+(g-m.points[2]),o=h+(h-m.points[3])),x.push(n,o,k.shift(),k.shift()),g=k.shift(),h=k.shift(),w="C",x.push(g,h);break;case"s":n=g,o=h,m=f[f.length-1],"C"===m.command&&(n=g+(g-m.points[2]),o=h+(h-m.points[3])),x.push(n,o,g+k.shift(),h+k.shift()),g+=k.shift(),h+=k.shift(),w="C",x.push(g,h);break;case"Q":x.push(k.shift(),k.shift()),g=k.shift(),h=k.shift(),x.push(g,h);break;case"q":x.push(g+k.shift(),h+k.shift()),g+=k.shift(),h+=k.shift(),w="Q",x.push(g,h);break;case"T":n=g,o=h,m=f[f.length-1],"Q"===m.command&&(n=g+(g-m.points[0]),o=h+(h-m.points[1])),g=k.shift(),h=k.shift(),w="Q",x.push(n,o,g,h);break;case"t":n=g,o=h,m=f[f.length-1],"Q"===m.command&&(n=g+(g-m.points[0]),o=h+(h-m.points[1])),g+=k.shift(),h+=k.shift(),w="Q",x.push(n,o,g,h);break;case"A":p=k.shift(),q=k.shift(),r=k.shift(),s=k.shift(),t=k.shift(),u=g,v=h,g=k.shift(),h=k.shift(),w="A",x=this.convertEndpointToCenterParameterization(u,v,g,h,s,t,p,q,r);break;case"a":p=k.shift(),q=k.shift(),r=k.shift(),s=k.shift(),t=k.shift(),u=g,v=h,g+=k.shift(),h+=k.shift(),w="A",x=this.convertEndpointToCenterParameterization(u,v,g,h,s,t,p,q,r)}f.push({command:w||j,points:x,start:{x:y,y:z},pathLength:this.calcLength(y,z,w||j,x)})}("z"===j||"Z"===j)&&f.push({command:"z",points:[],start:void 0,pathLength:0})}return f},Kinetic.Path.calcLength=function(a,b,c,d){var e,f,g,h=Kinetic.Path;switch(c){case"L":return h.getLineLength(a,b,d[0],d[1]);case"C":for(e=0,f=h.getPointOnCubicBezier(0,a,b,d[0],d[1],d[2],d[3],d[4],d[5]),t=.01;1>=t;t+=.01)g=h.getPointOnCubicBezier(t,a,b,d[0],d[1],d[2],d[3],d[4],d[5]),e+=h.getLineLength(f.x,f.y,g.x,g.y),f=g;return e;case"Q":for(e=0,f=h.getPointOnQuadraticBezier(0,a,b,d[0],d[1],d[2],d[3]),t=.01;1>=t;t+=.01)g=h.getPointOnQuadraticBezier(t,a,b,d[0],d[1],d[2],d[3]),e+=h.getLineLength(f.x,f.y,g.x,g.y),f=g;return e;case"A":e=0;var i=d[4],j=d[5],k=d[4]+j,l=Math.PI/180;if(Math.abs(i-k)<l&&(l=Math.abs(i-k)),f=h.getPointOnEllipticalArc(d[0],d[1],d[2],d[3],i,0),0>j)for(t=i-l;t>k;t-=l)g=h.getPointOnEllipticalArc(d[0],d[1],d[2],d[3],t,0),e+=h.getLineLength(f.x,f.y,g.x,g.y),f=g;else for(t=i+l;k>t;t+=l)g=h.getPointOnEllipticalArc(d[0],d[1],d[2],d[3],t,0),e+=h.getLineLength(f.x,f.y,g.x,g.y),f=g;return g=h.getPointOnEllipticalArc(d[0],d[1],d[2],d[3],k,0),e+=h.getLineLength(f.x,f.y,g.x,g.y)}return 0},Kinetic.Path.convertEndpointToCenterParameterization=function(a,b,c,d,e,f,g,h,i){var j=i*(Math.PI/180),k=Math.cos(j)*(a-c)/2+Math.sin(j)*(b-d)/2,l=-1*Math.sin(j)*(a-c)/2+Math.cos(j)*(b-d)/2,m=k*k/(g*g)+l*l/(h*h);m>1&&(g*=Math.sqrt(m),h*=Math.sqrt(m));var n=Math.sqrt((g*g*h*h-g*g*l*l-h*h*k*k)/(g*g*l*l+h*h*k*k));e==f&&(n*=-1),isNaN(n)&&(n=0);var o=n*g*l/h,p=n*-h*k/g,q=(a+c)/2+Math.cos(j)*o-Math.sin(j)*p,r=(b+d)/2+Math.sin(j)*o+Math.cos(j)*p,s=function(a){return Math.sqrt(a[0]*a[0]+a[1]*a[1])},t=function(a,b){return(a[0]*b[0]+a[1]*b[1])/(s(a)*s(b))},u=function(a,b){return(a[0]*b[1]<a[1]*b[0]?-1:1)*Math.acos(t(a,b))},v=u([1,0],[(k-o)/g,(l-p)/h]),w=[(k-o)/g,(l-p)/h],x=[(-1*k-o)/g,(-1*l-p)/h],y=u(w,x);return t(w,x)<=-1&&(y=Math.PI),t(w,x)>=1&&(y=0),0===f&&y>0&&(y-=2*Math.PI),1==f&&0>y&&(y+=2*Math.PI),[q,r,g,h,v,y,j,f]},Kinetic.Factory.addGetterSetter(Kinetic.Path,"data")}(),function(){function a(a){a.fillText(this.partialText,0,0)}function b(a){a.strokeText(this.partialText,0,0)}var c="",d="Calibri",e="normal";Kinetic.TextPath=function(a){this.___init(a)},Kinetic.TextPath.prototype={___init:function(c){var d=this;this.dummyCanvas=document.createElement("canvas"),this.dataArray=[],Kinetic.Shape.call(this,c),this._fillFunc=a,this._strokeFunc=b,this._fillFuncHit=a,this._strokeFuncHit=b,this.className="TextPath",this.dataArray=Kinetic.Path.parsePathData(this.attrs.data),this.on("dataChange.kinetic",function(){d.dataArray=Kinetic.Path.parsePathData(this.attrs.data)}),this.on("textChange.kinetic textStroke.kinetic textStrokeWidth.kinetic",d._setTextData),d._setTextData()},drawFunc:function(a){a.setAttr("font",this._getContextFont()),a.setAttr("textBaseline","middle"),a.setAttr("textAlign","left"),a.save();for(var b=this.glyphInfo,c=0;c<b.length;c++){a.save();var d=b[c].p0;a.translate(d.x,d.y),a.rotate(b[c].rotation),this.partialText=b[c].text,a.fillStrokeShape(this),a.restore()}a.restore()},getTextWidth:function(){return this.textWidth},getTextHeight:function(){return this.textHeight},setText:function(a){Kinetic.Text.prototype.setText.call(this,a)},_getTextSize:function(a){var b=this.dummyCanvas,c=b.getContext("2d");c.save(),c.font=this._getContextFont();var d=c.measureText(a);return c.restore(),{width:d.width,height:parseInt(this.attrs.fontSize,10)}},_setTextData:function(){var a=this,b=this._getTextSize(this.attrs.text);this.textWidth=b.width,this.textHeight=b.height,this.glyphInfo=[];for(var c,d,e,f=this.attrs.text.split(""),g=-1,h=0,i=function(){h=0;for(var b=a.dataArray,d=g+1;d<b.length;d++){if(b[d].pathLength>0)return g=d,b[d];"M"==b[d].command&&(c={x:b[d].points[0],y:b[d].points[1]})}return{}},j=function(b){var f=a._getTextSize(b).width,g=0,j=0;for(d=void 0;Math.abs(f-g)/f>.01&&25>j;){j++;for(var k=g;void 0===e;)e=i(),e&&k+e.pathLength<f&&(k+=e.pathLength,e=void 0);if(e==={}||void 0===c)return void 0;var l=!1;switch(e.command){case"L":Kinetic.Path.getLineLength(c.x,c.y,e.points[0],e.points[1])>f?d=Kinetic.Path.getPointOnLine(f,c.x,c.y,e.points[0],e.points[1],c.x,c.y):e=void 0;break;case"A":var m=e.points[4],n=e.points[5],o=e.points[4]+n;0===h?h=m+1e-8:f>g?h+=Math.PI/180*n/Math.abs(n):h-=Math.PI/360*n/Math.abs(n),(0>n&&o>h||n>=0&&h>o)&&(h=o,l=!0),d=Kinetic.Path.getPointOnEllipticalArc(e.points[0],e.points[1],e.points[2],e.points[3],h,e.points[6]);break;case"C":0===h?h=f>e.pathLength?1e-8:f/e.pathLength:f>g?h+=(f-g)/e.pathLength:h-=(g-f)/e.pathLength,h>1&&(h=1,l=!0),d=Kinetic.Path.getPointOnCubicBezier(h,e.start.x,e.start.y,e.points[0],e.points[1],e.points[2],e.points[3],e.points[4],e.points[5]);break;case"Q":0===h?h=f/e.pathLength:f>g?h+=(f-g)/e.pathLength:h-=(g-f)/e.pathLength,h>1&&(h=1,l=!0),d=Kinetic.Path.getPointOnQuadraticBezier(h,e.start.x,e.start.y,e.points[0],e.points[1],e.points[2],e.points[3])}void 0!==d&&(g=Kinetic.Path.getLineLength(c.x,c.y,d.x,d.y)),l&&(l=!1,e=void 0)}},k=0;k<f.length&&(j(f[k]),void 0!==c&&void 0!==d);k++){var l=Kinetic.Path.getLineLength(c.x,c.y,d.x,d.y),m=0,n=Kinetic.Path.getPointOnLine(m+l/2,c.x,c.y,d.x,d.y),o=Math.atan2(d.y-c.y,d.x-c.x);this.glyphInfo.push({transposeX:n.x,transposeY:n.y,text:f[k],rotation:o,p0:c,p1:d}),c=d}}},Kinetic.TextPath.prototype._getContextFont=Kinetic.Text.prototype._getContextFont,Kinetic.Util.extend(Kinetic.TextPath,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.TextPath,"fontFamily",d),Kinetic.Factory.addGetterSetter(Kinetic.TextPath,"fontSize",12),Kinetic.Factory.addGetterSetter(Kinetic.TextPath,"fontStyle",e),Kinetic.Factory.addGetter(Kinetic.TextPath,"text",c)}(),function(){Kinetic.RegularPolygon=function(a){this.___init(a)},Kinetic.RegularPolygon.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="RegularPolygon"},drawFunc:function(a){var b,c,d,e=this.attrs.sides,f=this.attrs.radius;for(a.beginPath(),a.moveTo(0,0-f),b=1;e>b;b++)c=f*Math.sin(2*b*Math.PI/e),d=-1*f*Math.cos(2*b*Math.PI/e),a.lineTo(c,d);a.closePath(),a.fillStrokeShape(this)}},Kinetic.Util.extend(Kinetic.RegularPolygon,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.RegularPolygon,"radius",0),Kinetic.Factory.addGetterSetter(Kinetic.RegularPolygon,"sides",0)}(),function(){Kinetic.Star=function(a){this.___init(a)},Kinetic.Star.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Star"},drawFunc:function(a){var b=a._context,c=this.attrs.innerRadius,d=this.attrs.outerRadius,e=this.attrs.numPoints;b.beginPath(),b.moveTo(0,0-this.attrs.outerRadius);for(var f=1;2*e>f;f++){var g=0===f%2?d:c,h=g*Math.sin(f*Math.PI/e),i=-1*g*Math.cos(f*Math.PI/e);b.lineTo(h,i)}b.closePath(),a.fillStrokeShape(this)}},Kinetic.Util.extend(Kinetic.Star,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Star,"numPoints",0),Kinetic.Factory.addGetterSetter(Kinetic.Star,"innerRadius",0),Kinetic.Factory.addGetterSetter(Kinetic.Star,"outerRadius",0)}(),function(){var a=["fontFamily","fontSize","fontStyle","padding","lineHeight","text"],b="Change.kinetic",c="none",d="up",e="right",f="down",g="left",h="Label",i=a.length;Kinetic.Label=function(a){this.____init(a)},Kinetic.Label.prototype={____init:function(a){var b=this;this.className=h,Kinetic.Group.call(this,a),this.on("add.kinetic",function(a){b._addListeners(a.child),b._sync()})},getText:function(){return this.find("Text")[0]},getTag:function(){return this.find("Tag")[0]},_addListeners:function(c){var d,e=this,f=function(){e._sync()};for(d=0;i>d;d++)c.on(a[d]+b,f)},getWidth:function(){return this.getText().getWidth()},getHeight:function(){return this.getText().getHeight()},_sync:function(){var a,b,c,h,i,j,k=this.getText(),l=this.getTag();if(k&&l){switch(a=k.getWidth(),b=k.getHeight(),c=l.getPointerDirection(),h=l.getPointerWidth(),pointerHeight=l.getPointerHeight(),i=0,j=0,c){case d:i=a/2,j=-1*pointerHeight;break;case e:i=a+h,j=b/2;break;case f:i=a/2,j=b+pointerHeight;break;case g:i=-1*h,j=b/2}l.setAttrs({x:-1*i,y:-1*j,width:a,height:b}),k.setAttrs({x:-1*i,y:-1*j})}}},Kinetic.Util.extend(Kinetic.Label,Kinetic.Group),Kinetic.Tag=function(a){this.___init(a)},Kinetic.Tag.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Tag"},drawFunc:function(a){var b=this.getWidth(),c=this.getHeight(),h=this.getPointerDirection(),i=this.getPointerWidth(),j=this.getPointerHeight();this.getCornerRadius(),a.beginPath(),a.moveTo(0,0),h===d&&(a.lineTo((b-i)/2,0),a.lineTo(b/2,-1*j),a.lineTo((b+i)/2,0)),a.lineTo(b,0),h===e&&(a.lineTo(b,(c-j)/2),a.lineTo(b+i,c/2),a.lineTo(b,(c+j)/2)),a.lineTo(b,c),h===f&&(a.lineTo((b+i)/2,c),a.lineTo(b/2,c+j),a.lineTo((b-i)/2,c)),a.lineTo(0,c),h===g&&(a.lineTo(0,(c+j)/2),a.lineTo(-1*i,c/2),a.lineTo(0,(c-j)/2)),a.closePath(),a.fillStrokeShape(this)}},Kinetic.Util.extend(Kinetic.Tag,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Tag,"pointerDirection",c),Kinetic.Factory.addGetterSetter(Kinetic.Tag,"pointerWidth",0),Kinetic.Factory.addGetterSetter(Kinetic.Tag,"pointerHeight",0),Kinetic.Factory.addGetterSetter(Kinetic.Tag,"cornerRadius",0)}(),function(){Kinetic.Filters.Grayscale=function(a){for(var b=a.data,c=0;c<b.length;c+=4){var d=.34*b[c]+.5*b[c+1]+.16*b[c+2];b[c]=d,b[c+1]=d,b[c+2]=d}}}(),function(){Kinetic.Filters.Brighten=function(a){for(var b=this.getFilterBrightness(),c=a.data,d=0;d<c.length;d+=4)c[d]+=b,c[d+1]+=b,c[d+2]+=b},Kinetic.Factory.addFilterGetterSetter(Kinetic.Image,"filterBrightness",0)}(),function(){Kinetic.Filters.Invert=function(a){for(var b=a.data,c=0;c<b.length;c+=4)b[c]=255-b[c],b[c+1]=255-b[c+1],b[c+2]=255-b[c+2]}}(),function(){function a(){this.r=0,this.g=0,this.b=0,this.a=0,this.next=null}function b(b,e){var f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D=b.data,E=b.width,F=b.height,G=e+e+1,H=E-1,I=F-1,J=e+1,K=J*(J+1)/2,L=new a,M=null,N=L,O=null,P=null,Q=c[e],R=d[e];for(h=1;G>h;h++)N=N.next=new a,h==J&&(M=N);for(N.next=L,l=k=0,g=0;F>g;g++){for(u=v=w=x=m=n=o=p=0,q=J*(y=D[k]),r=J*(z=D[k+1]),s=J*(A=D[k+2]),t=J*(B=D[k+3]),m+=K*y,n+=K*z,o+=K*A,p+=K*B,N=L,h=0;J>h;h++)N.r=y,N.g=z,N.b=A,N.a=B,N=N.next;for(h=1;J>h;h++)i=k+((h>H?H:h)<<2),m+=(N.r=y=D[i])*(C=J-h),n+=(N.g=z=D[i+1])*C,o+=(N.b=A=D[i+2])*C,p+=(N.a=B=D[i+3])*C,u+=y,v+=z,w+=A,x+=B,N=N.next;for(O=L,P=M,f=0;E>f;f++)D[k+3]=B=p*Q>>R,0!==B?(B=255/B,D[k]=(m*Q>>R)*B,D[k+1]=(n*Q>>R)*B,D[k+2]=(o*Q>>R)*B):D[k]=D[k+1]=D[k+2]=0,m-=q,n-=r,o-=s,p-=t,q-=O.r,r-=O.g,s-=O.b,t-=O.a,i=l+((i=f+e+1)<H?i:H)<<2,u+=O.r=D[i],v+=O.g=D[i+1],w+=O.b=D[i+2],x+=O.a=D[i+3],m+=u,n+=v,o+=w,p+=x,O=O.next,q+=y=P.r,r+=z=P.g,s+=A=P.b,t+=B=P.a,u-=y,v-=z,w-=A,x-=B,P=P.next,k+=4;l+=E}for(f=0;E>f;f++){for(v=w=x=u=n=o=p=m=0,k=f<<2,q=J*(y=D[k]),r=J*(z=D[k+1]),s=J*(A=D[k+2]),t=J*(B=D[k+3]),m+=K*y,n+=K*z,o+=K*A,p+=K*B,N=L,h=0;J>h;h++)N.r=y,N.g=z,N.b=A,N.a=B,N=N.next;for(j=E,h=1;e>=h;h++)k=j+f<<2,m+=(N.r=y=D[k])*(C=J-h),n+=(N.g=z=D[k+1])*C,o+=(N.b=A=D[k+2])*C,p+=(N.a=B=D[k+3])*C,u+=y,v+=z,w+=A,x+=B,N=N.next,I>h&&(j+=E);for(k=f,O=L,P=M,g=0;F>g;g++)i=k<<2,D[i+3]=B=p*Q>>R,B>0?(B=255/B,D[i]=(m*Q>>R)*B,D[i+1]=(n*Q>>R)*B,D[i+2]=(o*Q>>R)*B):D[i]=D[i+1]=D[i+2]=0,m-=q,n-=r,o-=s,p-=t,q-=O.r,r-=O.g,s-=O.b,t-=O.a,i=f+((i=g+J)<I?i:I)*E<<2,m+=u+=O.r=D[i],n+=v+=O.g=D[i+1],o+=w+=O.b=D[i+2],p+=x+=O.a=D[i+3],O=O.next,q+=y=P.r,r+=z=P.g,s+=A=P.b,t+=B=P.a,u-=y,v-=z,w-=A,x-=B,P=P.next,k+=E}}var c=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],d=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];
Kinetic.Filters.Blur=function(a){var c=0|this.getFilterRadius();c>0&&b(a,c)},Kinetic.Factory.addFilterGetterSetter(Kinetic.Image,"filterRadius",0)}(),function(){function a(a,b,c){var d=4*(c*a.width+b),e=[];return e.push(a.data[d++],a.data[d++],a.data[d++],a.data[d++]),e}function b(a,b){return Math.sqrt(Math.pow(a[0]-b[0],2)+Math.pow(a[1]-b[1],2)+Math.pow(a[2]-b[2],2))}function c(a){for(var b=[0,0,0],c=0;c<a.length;c++)b[0]+=a[c][0],b[1]+=a[c][1],b[2]+=a[c][2];return b[0]/=a.length,b[1]/=a.length,b[2]/=a.length,b}function d(d,e){var f=a(d,0,0),g=a(d,d.width-1,0),h=a(d,0,d.height-1),i=a(d,d.width-1,d.height-1),j=e||10;if(b(f,g)<j&&b(g,i)<j&&b(i,h)<j&&b(h,f)<j){for(var k=c([g,f,i,h]),l=[],m=0;m<d.width*d.height;m++){var n=b(k,[d.data[4*m],d.data[4*m+1],d.data[4*m+2]]);l[m]=j>n?0:255}return l}}function e(a,b){for(var c=0;c<a.width*a.height;c++)a.data[4*c+3]=b[c]}function f(a,b,c){for(var d=[1,1,1,1,0,1,1,1,1],e=Math.round(Math.sqrt(d.length)),f=Math.floor(e/2),g=[],h=0;c>h;h++)for(var i=0;b>i;i++){for(var j=h*b+i,k=0,l=0;e>l;l++)for(var m=0;e>m;m++){var n=h+l-f,o=i+m-f;if(n>=0&&c>n&&o>=0&&b>o){var p=n*b+o,q=d[l*e+m];k+=a[p]*q}}g[j]=2040===k?255:0}return g}function g(a,b,c){for(var d=[1,1,1,1,1,1,1,1,1],e=Math.round(Math.sqrt(d.length)),f=Math.floor(e/2),g=[],h=0;c>h;h++)for(var i=0;b>i;i++){for(var j=h*b+i,k=0,l=0;e>l;l++)for(var m=0;e>m;m++){var n=h+l-f,o=i+m-f;if(n>=0&&c>n&&o>=0&&b>o){var p=n*b+o,q=d[l*e+m];k+=a[p]*q}}g[j]=k>=1020?255:0}return g}function h(a,b,c){for(var d=[1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9],e=Math.round(Math.sqrt(d.length)),f=Math.floor(e/2),g=[],h=0;c>h;h++)for(var i=0;b>i;i++){for(var j=h*b+i,k=0,l=0;e>l;l++)for(var m=0;e>m;m++){var n=h+l-f,o=i+m-f;if(n>=0&&c>n&&o>=0&&b>o){var p=n*b+o,q=d[l*e+m];k+=a[p]*q}}g[j]=k}return g}Kinetic.Filters.Mask=function(a){var b=this.getFilterThreshold(),c=d(a,b);return c&&(c=f(c,a.width,a.height),c=g(c,a.width,a.height),c=h(c,a.width,a.height),e(a,c)),a},Kinetic.Factory.addFilterGetterSetter(Kinetic.Image,"filterThreshold",0)}(),function(){var a=function(a,b,c){a/=255,b/=255,c/=255;var d=Math.max(a,b,c),e=Math.min(a,b,c),f=d-e,g=f/2,h=f/(1-Math.abs(2*g-1)),i=0;return d==a?i=(b-c)/f%6:d==b?i=(c-a)/f+2:d==c&&(i=(a-b)/f+4),[(60*i+360)%360,h,g]},b=function(a,b,c,d){a/=255,b/=255,c/=255;var e=Math.max(a,b,c),f=Math.min(a,b,c),g=e-f,h=g/2,i=(g/(1-Math.abs(2*h-1)),0);e==a?i=(b-c)/g%6:e==b?i=(c-a)/g+2:e==c&&(i=(a-b)/g+4),i*=60,i%=360,i+=d,i%=360,i/=60;var j=0,k=0,l=0,m=g*(1-Math.abs(i%2-1)),n=h-g/2;return i>=0&&1>i?(j=g,k=m):i>=1&&2>i?(k=g,j=m):i>=2&&3>i?(k=g,l=m):i>=3&&4>i?(l=g,k=m):i>=4&&5>i?(l=g,j=m):i>=5&&6>i&&(j=g,l=m),j+=n,k+=n,l+=n,j=255*j,k=255*k,l=255*l,[j,k,l]},c=function(a,c){for(var d,e=a.data,f=0;f<e.length;f+=4)d=b(e[f+0],e[f+1],e[f+2],c),e[f+0]=d[0],e[f+1]=d[1],e[f+2]=d[2]};Kinetic.Filters.ShiftHue=function(a){c(a,this.getFilterHueShiftDeg()%360)},Kinetic.Factory.addFilterGetterSetter(Kinetic.Image,"filterHueShiftDeg",0),Kinetic.Filters.Colorize=function(b){for(var d=b.data,e=this.getFilterColorizeColor(),f=a(e[0],e[1],e[2]),g=f[0],h=0;h<d.length;h+=4)d[h+1]=0,d[h+2]=0;c(b,g)},Kinetic.Factory.addFilterGetterSetter(Kinetic.Image,"filterColorizeColor",[255,0,0])}(),function(){var a=function(a,b){var c=a.data,d=a.width,e=a.height,f=d*e,g=[];g.length=4*d*e;var h,i,j,k,l,m,n,o,p,q,r,s=b.length,t=b[0].length,u=Math.floor(b.length/2),v=Math.floor(b[0].length/2);for(m=0;e>m;m+=1)for(l=0;d>l;l+=1){for(h=0,i=0,j=0,k=0,q=0;s>q;q+=1)for(r=0;t>r;r+=1)n=(l+q-u)%d,n=n>0?n:-n,o=(m+q-v)%e,o=o>0?o:-o,p=4*(o*d+n),h+=b[r][q]*c[p+0],i+=b[r][q]*c[p+1],j+=b[r][q]*c[p+2];p=4*(m*d+l),g[p+0]=h,g[p+1]=i,g[p+2]=j}var w=4*f;for(p=0;w>p;p+=4)c[p+0]=g[p+0],c[p+1]=g[p+1],c[p+2]=g[p+2]},b=function(a,b,c){var d=a-b;return Math.pow(Math.E,-d*d/(2*c*c))},c=function(a,c,d){0===a%2&&(a+=1);var e,f,g,h=[];for(e=0;a>e;e+=1){for(g=[],f=0;a>f;f+=1)g.push(c*b(e,a/2,d)*b(f,a/2,d));h.push(g)}return h},d=function(a,b){var d=c(a,b,1),e=Math.floor(a/2);return d[e][e]+=1-b,d},e=function(a,b){var d=c(a,-b,1),e=Math.floor(a/2);return d[e][e]+=1+b,d};Kinetic.Factory.addFilterGetterSetter(Kinetic.Image,"filterAmount",50),Kinetic.Filters.UnsharpMask=function(b){a(b,e(5,this.getFilterAmount()/100))},Kinetic.Filters.SoftBlur=function(b){a(b,d(5,this.getFilterAmount()/100))},Kinetic.Filters.Edge=function(b){var c=this.getFilterAmount()/100;0!==c&&a(b,[[0,-1*c,0],[-1*c,1-c+4*c,-1*c],[0,-1*c,0]])},Kinetic.Filters.Emboss=function(b){var c=this.getFilterAmount()/100;0!==c&&a(b,[[-1*c,-.5*c,0],[-.5*c,1+.5*c,.5*c],[0,.5*c,1*c]])}}();
//     Backbone.js 1.1.2

//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    factory(root, exports, _);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this, function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.2';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model, options);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i] || {};
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute || 'id'];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);
          this._addReference(model, options);
        }

        // Do not add multiple models with the same `id`.
        model = existing || model;
        if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
        modelMap[model.id] = true;
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) return attrs;
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      if (model.id != null) this._byId[model.id] = model;
      if (!model.collection) model.collection = this;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch =
    typeof window !== 'undefined' && !!window.ActiveXObject &&
      !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        router.execute(callback, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = decodeURI(this.location.pathname + this.location.search);
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
        this.iframe = frame.hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot() && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;

}));

//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

/*!jQuery Knob*/
/**
 * Downward compatible, touchable dial
 *
 * Version: 1.2.0 (15/07/2012)
 * Requires: jQuery v1.7+
 *
 * Copyright (c) 2012 Anthony Terrien
 * Under MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to vor, eskimoblood, spiffistan, FabrizioC
 */
(function($) {

    /**
     * Kontrol library
     */
    "use strict";

    /**
     * Definition of globals and core
     */
    var k = {}, // kontrol
        max = Math.max,
        min = Math.min;

    k.c = {};
    k.c.d = $(document);
    k.c.t = function (e) {
        return e.originalEvent.touches.length - 1;
    };

    /**
     * Kontrol Object
     *
     * Definition of an abstract UI control
     *
     * Each concrete component must call this one.
     * <code>
     * k.o.call(this);
     * </code>
     */
    k.o = function () {
        var s = this;

        this.o = null; // array of options
        this.$ = null; // jQuery wrapped element
        this.i = null; // mixed HTMLInputElement or array of HTMLInputElement
        this.g = null; // deprecated 2D graphics context for 'pre-rendering'
        this.v = null; // value ; mixed array or integer
        this.cv = null; // change value ; not commited value
        this.x = 0; // canvas x position
        this.y = 0; // canvas y position
        this.w = 0; // canvas width
        this.h = 0; // canvas height
        this.$c = null; // jQuery canvas element
        this.c = null; // rendered canvas context
        this.t = 0; // touches index
        this.isInit = false;
        this.fgColor = null; // main color
        this.pColor = null; // previous color
        this.dH = null; // draw hook
        this.cH = null; // change hook
        this.eH = null; // cancel hook
        this.rH = null; // release hook
        this.scale = 1; // scale factor
        this.relative = false;
        this.relativeWidth = false;
        this.relativeHeight = false;
        this.$div = null; // component div

        this.run = function () {
            var cf = function (e, conf) {
                var k;
                for (k in conf) {
                    s.o[k] = conf[k];
                }
                s.init();
                s._configure()
                 ._draw();
            };

            if(this.$.data('kontroled')) return;
            this.$.data('kontroled', true);

            this.extend();
            this.o = $.extend(
                {
                    // Config
                    min : this.$.data('min') || 0,
                    max : this.$.data('max') || 100,
                    stopper : true,
                    readOnly : this.$.data('readonly') || (this.$.attr('readonly') == 'readonly'),

                    // UI
                    cursor : (this.$.data('cursor') === true && 30)
                                || this.$.data('cursor')
                                || 0,
                    thickness : (
                                this.$.data('thickness')
                                && Math.max(Math.min(this.$.data('thickness'), 1), 0.01)
                                )
                                || 0.35,
                    lineCap : this.$.data('linecap') || 'butt',
                    width : this.$.data('width') || 200,
                    height : this.$.data('height') || 200,
                    displayInput : this.$.data('displayinput') == null || this.$.data('displayinput'),
                    displayPrevious : this.$.data('displayprevious'),
                    fgColor : this.$.data('fgcolor') || '#87CEEB',
                    inputColor: this.$.data('inputcolor'),
                    font: this.$.data('font') || 'Arial',
                    fontWeight: this.$.data('font-weight') || 'bold',
                    inline : false,
                    step : this.$.data('step') || 1,

                    // Hooks
                    draw : null, // function () {}
                    change : null, // function (value) {}
                    cancel : null, // function () {}
                    release : null, // function (value) {}
                    error : null // function () {}
                }, this.o
            );

            // finalize options
            if(!this.o.inputColor) {
                this.o.inputColor = this.o.fgColor;
            }

            // routing value
            if(this.$.is('fieldset')) {

                // fieldset = array of integer
                this.v = {};
                this.i = this.$.find('input')
                this.i.each(function(k) {
                    var $this = $(this);
                    s.i[k] = $this;
                    s.v[k] = $this.val();

                    $this.bind(
                        'change keyup'
                        , function () {
                            var val = {};
                            val[k] = $this.val();
                            s.val(val);
                        }
                    );
                });
                this.$.find('legend').remove();

            } else {

                // input = integer
                this.i = this.$;
                this.v = this.$.val();
                (this.v == '') && (this.v = this.o.min);

                this.$.bind(
                    'change keyup'
                    , function () {
                        s.val(s._validate(s.$.val()));
                    }
                );

            }

            (!this.o.displayInput) && this.$.hide();

            // adds needed DOM elements (canvas, div)
            this.$c = $(document.createElement('canvas'));
            if (typeof G_vmlCanvasManager !== 'undefined') {
              G_vmlCanvasManager.initElement(this.$c[0]);
            }
            this.c = this.$c[0].getContext ? this.$c[0].getContext('2d') : null;
            if (!this.c) {
                this.o.error && this.o.error();
                return;
            }

            // hdpi support
            this.scale = (window.devicePixelRatio || 1) /
                        (
                            this.c.webkitBackingStorePixelRatio ||
                            this.c.mozBackingStorePixelRatio ||
                            this.c.msBackingStorePixelRatio ||
                            this.c.oBackingStorePixelRatio ||
                            this.c.backingStorePixelRatio || 1
                        );

            // detects relative width / height
            this.relativeWidth = ((this.o.width % 1 !== 0)
                                    && this.o.width.indexOf('%'));
            this.relativeHeight = ((this.o.height % 1 !== 0)
                                    && this.o.height.indexOf('%'));

            this.relative = (this.relativeWidth || this.relativeHeight);

            // wraps all elements in a div
            this.$div = $('<div style="'
                        + (this.o.inline ? 'display:inline;' : '')
                        + '"></div>');

            this.$.wrap(this.$div).before(this.$c);
            this.$div = this.$.parent();

            // computes size and carves the component
            this._carve();

            // prepares props for transaction
            if (this.v instanceof Object) {
                this.cv = {};
                this.copy(this.v, this.cv);
            } else {
                this.cv = this.v;
            }

            // binds configure event
            this.$
                .bind("configure", cf)
                .parent()
                .bind("configure", cf);

            // finalize init
            this._listen()
                ._configure()
                ._xy()
                .init();

            this.isInit = true;

            // the most important !
            this._draw();

            return this;
        };

        this._carve = function() {
            if(this.relative) {
                var w = this.relativeWidth
                            ? this.$div.parent().width()
                                * parseInt(this.o.width) / 100
                            : this.$div.parent().width(),
                    h = this.relativeHeight
                            ? this.$div.parent().height()
                                * parseInt(this.o.height) / 100
                            : this.$div.parent().height();

                // apply relative
                this.w = this.h = Math.min(w, h);
            } else {
                this.w = this.o.width;
                this.h = this.o.height;
            }

            // finalize div
            this.$div.css({
                'width': this.w + 'px',
                'height': this.h + 'px'
            });

            // finalize canvas with computed width
            this.$c.attr({
                width: this.w,
                height: this.h
            });

            // scaling
            if (this.scale !== 1) {
                this.$c[0].width = this.$c[0].width * this.scale;
                this.$c[0].height = this.$c[0].height * this.scale;
                this.$c.width(this.w);
                this.$c.height(this.h);
            }

            return this;
        }

        this._draw = function () {

            // canvas pre-rendering
            var d = true;

            s.g = s.c;

            s.clear();

            s.dH
            && (d = s.dH());

            (d !== false) && s.draw();

        };

        this._touch = function (e) {

            var touchMove = function (e) {

                var v = s.xy2val(
                            e.originalEvent.touches[s.t].pageX,
                            e.originalEvent.touches[s.t].pageY
                            );
                s.change(s._validate(v));
                s._draw();
            };

            // get touches index
            this.t = k.c.t(e);

            // First touch
            touchMove(e);

            // Touch events listeners
            k.c.d
                .bind("touchmove.k", touchMove)
                .bind(
                    "touchend.k"
                    , function () {
                        k.c.d.unbind('touchmove.k touchend.k');

                        if (
                            s.rH
                            && (s.rH(s.cv) === false)
                        ) return;

                        s.val(s.cv);
                    }
                );

            return this;
        };

        this._mouse = function (e) {

            var mouseMove = function (e) {
                var v = s.xy2val(e.pageX, e.pageY);
                s.change(s._validate(v));
                s._draw();
            };

            // First click
            mouseMove(e);

            // Mouse events listeners
            k.c.d
                .bind("mousemove.k", mouseMove)
                .bind(
                    // Escape key cancel current change
                    "keyup.k"
                    , function (e) {
                        if (e.keyCode === 27) {
                            k.c.d.unbind("mouseup.k mousemove.k keyup.k");

                            if (
                                s.eH
                                && (s.eH() === false)
                            ) return;

                            s.cancel();
                        }
                    }
                )
                .bind(
                    "mouseup.k"
                    , function (e) {
                        k.c.d.unbind('mousemove.k mouseup.k keyup.k');

                        if (
                            s.rH
                            && (s.rH(s.cv) === false)
                        ) return;

                        s.val(s.cv);
                    }
                );

            return this;
        };

        this._xy = function () {
            var o = this.$c.offset();
            this.x = o.left;
            this.y = o.top;
            return this;
        };

        this._listen = function () {

            if (!this.o.readOnly) {
                this.$c
                    .bind(
                        "mousedown"
                        , function (e) {
                            e.preventDefault();
                            s._xy()._mouse(e);
                         }
                    )
                    .bind(
                        "touchstart"
                        , function (e) {
                            e.preventDefault();
                            s._xy()._touch(e);
                         }
                    );

                this.listen();
            } else {
                this.$.attr('readonly', 'readonly');
            }

            if(this.relative) {
                $(window).resize(function() {
                    s._carve()
                     .init();
                    s._draw();
                });
            }

            return this;
        };

        this._configure = function () {

            // Hooks
            if (this.o.draw) this.dH = this.o.draw;
            if (this.o.change) this.cH = this.o.change;
            if (this.o.cancel) this.eH = this.o.cancel;
            if (this.o.release) this.rH = this.o.release;

            if (this.o.displayPrevious) {
                this.pColor = this.h2rgba(this.o.fgColor, "0.4");
                this.fgColor = this.h2rgba(this.o.fgColor, "0.6");
            } else {
                this.fgColor = this.o.fgColor;
            }

            return this;
        };

        this._clear = function () {
            this.$c[0].width = this.$c[0].width;
        };

        this._validate = function(v) {
            return (~~ (((v < 0) ? -0.5 : 0.5) + (v/this.o.step))) * this.o.step;
        };

        // Abstract methods
        this.listen = function () {}; // on start, one time
        this.extend = function () {}; // each time configure triggered
        this.init = function () {}; // each time configure triggered
        this.change = function (v) {}; // on change
        this.val = function (v) {}; // on release
        this.xy2val = function (x, y) {}; //
        this.draw = function () {}; // on change / on release
        this.clear = function () { this._clear(); };

        // Utils
        this.h2rgba = function (h, a) {
            var rgb;
            h = h.substring(1,7)
            rgb = [parseInt(h.substring(0,2),16)
                   ,parseInt(h.substring(2,4),16)
                   ,parseInt(h.substring(4,6),16)];
            return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + a + ")";
        };

        this.copy = function (f, t) {
            for (var i in f) { t[i] = f[i]; }
        };
    };


    /**
     * k.Dial
     */
    k.Dial = function () {
        k.o.call(this);

        this.startAngle = null;
        this.xy = null;
        this.radius = null;
        this.lineWidth = null;
        this.cursorExt = null;
        this.w2 = null;
        this.PI2 = 2*Math.PI;

        this.extend = function () {
            this.o = $.extend(
                {
                    bgColor : this.$.data('bgcolor') || '#EEEEEE',
                    angleOffset : this.$.data('angleoffset') || 0,
                    angleArc : this.$.data('anglearc') || 360,
                    inline : true
                }, this.o
            );
        };

        this.val = function (v) {
            if (null != v) {
                this.cv = this.o.stopper ? max(min(v, this.o.max), this.o.min) : v;
		this.v = this.cv;
                this.$.val(this.v);
                this._draw();
            } else {
                return this.v;
            }
        };

        this.xy2val = function (x, y) {
            var a, ret;

            a = Math.atan2(
                        x - (this.x + this.w2)
                        , - (y - this.y - this.w2)
                    ) - this.angleOffset;

            if(this.angleArc != this.PI2 && (a < 0) && (a > -0.5)) {
                // if isset angleArc option, set to min if .5 under min
                a = 0;
            } else if (a < 0) {
                a += this.PI2;
            }

            ret = ~~ (0.5 + (a * (this.o.max - this.o.min) / this.angleArc))
                    + this.o.min;

            this.o.stopper
            && (ret = max(min(ret, this.o.max), this.o.min));

            return ret;
        };

        this.listen = function () {
            // bind MouseWheel
            var s = this, mwTimerStop, mwTimerRelease,
                mw = function (e) {
                            e.preventDefault();

                            var ori = e.originalEvent
                                ,deltaX = ori.detail || ori.wheelDeltaX
                                ,deltaY = ori.detail || ori.wheelDeltaY
                                ,v = s._validate(s.$.val())
                                    + (deltaX>0 || deltaY>0 ? s.o.step : deltaX<0 || deltaY<0 ? -s.o.step : 0);

                            v = max(min(v, s.o.max), s.o.min);
                            
                            s.val(v);

                            if(s.rH) {
                                // Handle mousewheel stop
                                clearTimeout(mwTimerStop);
                                mwTimerStop = setTimeout(function() {
                                    s.rH(v);
                                    mwTimerStop = null;
                                }, 100);

                                // Handle mousewheel releases
                                if(!mwTimerRelease) {
                                    mwTimerRelease = setTimeout(function() {
                                        if(mwTimerStop) s.rH(v);
                                        mwTimerRelease = null;
                                    }, 200);
                                }
                            }
                        }
                , kval, to, m = 1, kv = {37:-s.o.step, 38:s.o.step, 39:s.o.step, 40:-s.o.step};

            this.$
                .bind(
                    "keydown"
                    ,function (e) {
                        var kc = e.keyCode;

                        // numpad support
                        if(kc >= 96 && kc <= 105) {
                            kc = e.keyCode = kc - 48;
                        }

                        kval = parseInt(String.fromCharCode(kc));

                        if (isNaN(kval)) {

                            (kc !== 13)         // enter
                            && (kc !== 8)       // bs
                            && (kc !== 9)       // tab
                            && (kc !== 189)     // -
                            && e.preventDefault();

                            // arrows
                            if ($.inArray(kc,[37,38,39,40]) > -1) {
                                e.preventDefault();

                                var v = parseInt(s.$.val()) + kv[kc] * m;

                                s.o.stopper
                                && (v = max(min(v, s.o.max), s.o.min));

                                s.change(v);
                                s._draw();

                                // long time keydown speed-up
                                to = window.setTimeout(
                                    function () { m*=2; }
                                    ,30
                                );
                            }
                        }
                    }
                )
                .bind(
                    "keyup"
                    ,function (e) {
                        if (isNaN(kval)) {
                            if (to) {
                                window.clearTimeout(to);
                                to = null;
                                m = 1;
                                s.val(s.$.val());
                            }
                        } else {
                            // kval postcond
                            (s.$.val() > s.o.max && s.$.val(s.o.max))
                            || (s.$.val() < s.o.min && s.$.val(s.o.min));
                        }

                    }
                );

            this.$c.bind("mousewheel DOMMouseScroll", mw);
            this.$.bind("mousewheel DOMMouseScroll", mw)
        };

        this.init = function () {

            if (
                this.v < this.o.min
                || this.v > this.o.max
            ) this.v = this.o.min;

            this.$.val(this.v);
            this.w2 = this.w / 2;
            this.cursorExt = this.o.cursor / 100;
            this.xy = this.w2 * this.scale;
            this.lineWidth = this.xy * this.o.thickness;
            this.lineCap = this.o.lineCap;
            this.radius = this.xy - this.lineWidth / 2;

            this.o.angleOffset
            && (this.o.angleOffset = isNaN(this.o.angleOffset) ? 0 : this.o.angleOffset);

            this.o.angleArc
            && (this.o.angleArc = isNaN(this.o.angleArc) ? this.PI2 : this.o.angleArc);

            // deg to rad
            this.angleOffset = this.o.angleOffset * Math.PI / 180;
            this.angleArc = this.o.angleArc * Math.PI / 180;

            // compute start and end angles
            this.startAngle = 1.5 * Math.PI + this.angleOffset;
            this.endAngle = 1.5 * Math.PI + this.angleOffset + this.angleArc;

            var s = max(
                            String(Math.abs(this.o.max)).length
                            , String(Math.abs(this.o.min)).length
                            , 2
                            ) + 2;

            this.o.displayInput
                && this.i.css({
                        'width' : ((this.w / 2 + 4) >> 0) + 'px'
                        ,'height' : ((this.w / 3) >> 0) + 'px'
                        ,'position' : 'absolute'
                        ,'vertical-align' : 'middle'
                        ,'margin-top' : ((this.w / 3) >> 0) + 'px'
                        ,'margin-left' : '-' + ((this.w * 3 / 4 + 2) >> 0) + 'px'
                        ,'border' : 0
                        ,'background' : 'none'
                        ,'font' : this.o.fontWeight + ' ' + ((this.w / s) >> 0) + 'px ' + this.o.font
                        ,'text-align' : 'center'
                        ,'color' : this.o.inputColor || this.o.fgColor
                        ,'padding' : '0px'
                        ,'-webkit-appearance': 'none'
                        })
                || this.i.css({
                        'width' : '0px'
                        ,'visibility' : 'hidden'
                        });
        };

        this.change = function (v) {
            if (v == this.cv) return;
            this.cv = v;
            if (
                this.cH
                && (this.cH(v) === false)
            ) return;
        };

        this.angle = function (v) {
            return (v - this.o.min) * this.angleArc / (this.o.max - this.o.min);
        };

        this.draw = function () {

            var c = this.g,                 // context
                a = this.angle(this.cv)    // Angle
                , sat = this.startAngle     // Start angle
                , eat = sat + a             // End angle
                , sa, ea                    // Previous angles
                , r = 1;

            c.lineWidth = this.lineWidth;

            c.lineCap = this.lineCap;

            this.o.cursor
                && (sat = eat - this.cursorExt)
                && (eat = eat + this.cursorExt);

            c.beginPath();
                c.strokeStyle = this.o.bgColor;
                c.arc(this.xy, this.xy, this.radius, this.endAngle - 0.00001, this.startAngle + 0.00001, true);
            c.stroke();

            if (this.o.displayPrevious) {
                ea = this.startAngle + this.angle(this.v);
                sa = this.startAngle;
                this.o.cursor
                    && (sa = ea - this.cursorExt)
                    && (ea = ea + this.cursorExt);

                c.beginPath();
                    c.strokeStyle = this.pColor;
                    c.arc(this.xy, this.xy, this.radius, sa - 0.00001, ea + 0.00001, false);
                c.stroke();
                r = (this.cv == this.v);
            }

            c.beginPath();
                c.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                c.arc(this.xy, this.xy, this.radius, sat - 0.00001, eat + 0.00001, false);
            c.stroke();
        };

        this.cancel = function () {
            this.val(this.v);
        };
    };

    $.fn.dial = $.fn.knob = function (o) {
        return this.each(
            function () {
                var d = new k.Dial();
                d.o = o;
                d.$ = $(this);
                d.run();
            }
        ).parent();
    };

})(jQuery);

/**
 * A bunch of random generators.
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
 */
var Rand = {
  getInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getColor: function(min, max, greyscale) {
    if (min > 255) min = 255;
    if (max > 255) max = 255;
    
    if (greyscale) {
      var bit = Rand.getInt(min, max).toString(16);
      if (bit.length == 1) { bit = '0'+bit; }
      return '#'+bit.repeat(3);
    } else {
      return '#'+String(Rand.getInt(min, max))+String(getRandomInt(min, max))+String(getRandomInt(min, max));
    }
  }
};

/**
 * A ship.
 *
 * Natural habitat: game.my_ship and game.enemies
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
 */
var Ship = Backbone.Model.extend({
  defaults: {
    name:         'name',
    affiliation:  'enemy',
    power:        20,
    max_power:    100,
    missiles:     6,
    max_missiles: 20,
    fuel:         10,
    max_fuel:     50,
    oxygen:       100,
    hull:         20,
    max_hull:     100,
    type:         'default',
    tmpl:         '',
    x:            0,
    y:            0,
    crew:         [],
    section_list: {},
    sections:     [],
    is_dead:      false,
    weapons:      [],
    shipTypes: {
      'default': {
        max_hull: 100,
        section_list: [
          {
            'name': 'Shield',
            'type': 'shield'
          },
          {
            'name': 'Engine',
            'type': 'engine'
          },
          {
            'name': 'O2',
            'type': 'oxygen'
          },
          {
            'name': 'Medic',
            'type': 'medic'
          },
          {
            'name': 'Weapons',
            'type': 'weapons'
          },
          {
            'name': 'Bridge',
            'type': 'bridge'
          }
        ]
      }
    }
  },
  display: {
    hull: function () { return (this.hull / this.max_hull) * Bastards.game.bar_width; },
    oxygen: function () { return (this.oxygen / 100) * Bastards.game.bar_width; },
    power: function () { return (this.power / this.max_power) * Bastards.game.bar_width; },
    missiles: function () { return (this.missiles / this.max_missiles) * Bastards.game.bar_width; },
    fuel: function () { return (this.fuel / this.max_fuel) * Bastards.game.bar_width; },
    warp: function () { return (this.warp / 100 * Bastards.game.bar_width); },
    bar_width: function () { return (Bastards.game.bar_width); },
    is_dead: function () { return (this.is_dead ? 'dead' : ''); }
  },
  initialize: function () {
    $.extend(this, options);
    $.extend(this, this.shipTypes[options.type]);

    for (var x = 0; x < this.shipTypes[this.type].section_list.length; x++) {
      this.addSection(this.shipTypes[this.type].section_list[x]);
    }
  },
  addCrew: function (fng) {
    this.crew.push(fng);
    
    //game.message(this.name+' +crew: '+options.name);
    Bastards.game.refreshScreen();
  },
  addSection: function (options) {
    options.ship = this;
    
    this.sections.push(new ShipSection(options));
    //game.message(this.name+' +section: '+options.name);
    
    Bastards.game.refreshScreen();
  },
  addWeapon: function (options) {
    this.weapons.push(new Weapon(options));
    Bastards.game.refreshScreen();
  },
  getSection: function(type) {
    return $.grep(this.sections, function(e){ return e.type == 'shield'; })[0];
  },
  hit: function (aggressor, weapon_index) {
    var weapon = aggressor.weapons[weapon_index];
    
    if (weapon.ammo_type == 'laser') {
      if (aggressor.power <= 1) {
        Bastards.game.message('Not enough power to use laser!');
        Bastards.game.refreshScreen();
        return false;
      } else {
        aggressor.power -= weapon.power_used;
      }
    }

    if (!weapon.fire()) {
      if (weapon.ammo > 0) {
        Bastards.game.message('Not enough ammo! ' + weapon.name + ' takes ' + weapon.rounds_per_shot + ' ammo per shot.');
      } else {
        Bastards.game.message('No ammo!');
      }
      Bastards.game.refreshScreen();
      return false;
    }

    Bastards.game.message('------------------------------------------');
    Bastards.game.message('<span class="' + aggressor.affiliation + '">' + aggressor + '</span> fires ' + aggressor.weapons[weapon_index] + ' at <span class="'+this.affiliation+'">' + this + '</span>!');
    
    // if (weapon.ammo_type == 'missile' && aggressor.missiles < 1) {
    
    // }
    
    // Do some evade stuff
    var engine = this.getSection('engine');
    var bridge = this.getSection('bridge');  
    var evade_chance = 0.5;
    
    // Do some shield stuff
    if (weapon.blocked_by.shield) {
      var shield = this.getSection('shield'),
          shield_factor;

      if (shield) {
        //game.message('Ship has a shield with '+ shield.hp +' hp');
        shield_factor = (weapon.hull_damage / 100) * shield.hp;
        Bastards.game.message('Shield: ' + shield.hp + 'hp, factor: ' + shield_factor); 
      } else {
        shield_factor = 0;
        //game.message('No shield.');
      }

      this.hull -= weapon.hull_damage;

      if (this.hull < 0) { 
        this.hull = 0; 
        this.die();
        return false;
      }
    }
    
    // Hit a crew member
    var random_crew = this.crew[Bastards.game.dice(Bastards.game.my_ship.crew.length)];
    var damage_done = random_crew.hit(weapon.crew_damage);
    
    // Hit a section
    this.sections[Bastards.game.dice(this.sections.length)].hit(weapon.section_damage);
    
    // Show some graphics
    var explosion = Kinetic.circle({
      fill: '#f00',
      radius: 0,
      x: this.x,
      y: this.y
    });
    

    Bastards.game.refreshScreen();
  },
  die: function () {
    this.is_dead = true;
    if (Bastards.game.my_ship.is_dead) {
      Bastards.game.end('Your ship exploded.');
    }
  },
  toHtml: function () {
    return Mustache.render(this.tmpl, this);
  },
  toString: function () {
    return this.name;
  },
  warp: function () {
    var move_x = Rand.getInt(-10,10);
    var move_y = Rand.getInt(-10,10);
    
    this.x = this.x + move_x;
    this.y = this.y + move_x;
    
    this.shape.move(move_x, move_y);
    this.label.move(move_x, move_y);
    Bastards.game.stage.draw();
    Bastards.game.message(this.name + ' warps: ' + move_x + ', ' + move_y);
  },
  tick: function () {
    for (var x = 0; x < this.crew.length; x++) {
      this.crew[x].tick();
    }
  }
});

/**
 * A crew member aboard a ship.
 *
 * Natural habitat: ship.crew
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
**/
var CrewMember = Backbone.Model.extend({
  default: {
    name:           'Unknown Soldier',
    race:           'human',
    repair_factor:  1,
    walk_speed:     1,
    color:          '#900',
    max_hp:         100,
    hp:             100,
    is_alive:       true,
    display: {
      hp: function () {
        return (this.hp / this.max_hp) * Bastards.game.bar_width;
      }
    } 
  },
  hit: function (damage) {
    if (!this.is_alive) { 
      game.message(this.name+' is already dead.');
      return false;
    }
    
    this.hp -= damage;
    
    Bastards.game.refreshScreen();
    console.log(this);
    Bastards.game.message(this.name+' hit: <span class="'+(this.ship.affiliation == 'friend' ? 'bad' : 'good')+'">-' + damage + ' hp</span>');
    
    if (this.hp < 1) {
      this.hp = 0;
      this.kill(); 
    }
    
    return damage;
  },
  kill: function () {
    if (!this.is_alive) { 
      Bastards.game.message(this.name+' is already dead.');
      return false;
    }
    
    this.is_alive = false;
    
    Bastards.game.message(this.name+' died!');
    Bastards.game.refreshScreen();
  },
  toString: function () {
    return this.name;
  },
  tick: function () {
    if (this.hp < this.max_hp) {
      this.hp += 1;
    }
  }
});


/**
 * A section of a ship.
 * 
 * Natural Habitat: ship.sections
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
 */
var ShipSection = Backbone.Model.extend({
  defaults: {
    name:         'Corridor', // required
    type:         'corridor',
    hp:           100,
    display_name: '', // required
    max_power:    '',
    steps:        1,
    isManned:     false,
    ship:         '',
    display: {
      hp: function () {
        return ( this.hp / 100 ) * Bastards.game.bar_width;
      }
    }
  },
  hit: function (damage) {
    Bastards.game.message(this.ship + ' ' + this + ' hit: ' + '<span class="' + (this.ship.affiliation == 'friend' ? 'bad' : 'good') + '">-' + damage + ' hp</span>');
    this.hp -= damage;
    if (this.hp < 1) {
      this.hp = 0;
    }
    return damage;
  },
  toString: function () {
    return this.name;
  }
});


/**
 * The game itself.
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
**/
var Game = Backbone.Model.extend({
  defaults: {
    game: this,
    enemies: [],
    tick_rate: 3000,
    my_ship: '',
    ship_tmpl: '',
    paused: true,
    bar_width: 40,
    clock: null,
    available_weapons: [
      {
        name: 'Laser',
        hull_damage: 10,
        crew_damage: 30,
        section_damage: 40,
        ammo_type: 'laser',
        rounds_per_shot: 2,
        ammo: 45,
        blocked_by: {
          shield: true
        }
      },
      {
        name: 'Missile',
        hull_damage: 30,
        crew_damage: 10,
        section_damage: 40,
        ammo_type: 'missile',
        rounds_per_shot: 1,
        ammo: 5,
        blocked_by: {
          shield: false
        }
      }
    ]
  },
  // names from - http://www.rhetoricalramblings.com/robotname/index.html
  // more - http://www.seventhsanctum.com/generate.php?Genname=quickchar
  // even more - http://donjon.bin.sh/scifi/name/#terran_male
  available_names: [
    'Athogotubo', 'Bokrazstlaz', 'Dekephost', 'Egubogurh',
    'Elz\'siggo', 'Gar\'kegogo', 'Gashot', 'Gh-shu',
    'Glothacana', 'Gne-dac', 'Han\'yigothal', 'Hatt', 'Hog-kil',
    'Hort', 'It-me', 'Lia\'uateiq', 'Moig', 'Na-ha', 'Nosh',
    'Ot-mi', 'Othuglos', 'Pholl', 'Raihath', 'Yske-chau',
    'Zhu-moa', 'Maephua', 'Math', 'Mellolhu', 'Minaloll',
    'Nath', 'Oken'
  ],
  init: function () {
    var t = this;
  },
  setShip: function (options) {
    'use strict';

    this.my_ship = new Ship(options);
    this.my_ship.addWeapon(Bastards.game.available_weapons[0]);
    this.my_ship.addWeapon(Bastards.game.available_weapons[1]);
  },
  allDead: function () {
    for (x = 1; x < this.enemies.length; x++) {
      if (!this.enemies[x].is_dead) {
        return false;
      }
    }
    return true;
  },
  message: function (msg) {
    $('#messages').append(msg + '<br>');
    $('#messages').scrollTop($('#messages')[0].scrollHeight);
  },
  dice: function(sides) {
    if (!sides) { sides = 6; }
    return Math.floor(Math.random() * sides);
  },
  refreshScreen: function() {
    var x;

    $('#ships').html('');
    
    // display crew
    if (this.my_ship) {
      $('#ships').append(this.my_ship.toHtml());
      
      // set health colours
      for (x = 0; x < this.my_ship.crew.length; x++) {
        var hp = this.my_ship.crew[x].hp,
            max_hp = this.my_ship.crew[x].max_hp,
            dim = 70,
            color = '#' + this.makeHex((max_hp - hp), max_hp, dim) + this.makeHex(hp, max_hp, dim) + '00';
        
        $(".crew[data-name='" + this.my_ship.crew[x].name + "'] .hp").css({
          'color': color
        });
      }
    }
    
    if (this.enemies.length > 0) {
      for (x = 0; x < this.enemies.length; x++) {
        $('#ships').append(this.enemies[x].toHtml());
      }
    }
  },
  addEnemy: function (options) {
    var enemy_ship = new Ship(options),
    fng;

    for (var x = 0; x < 3; x++) {
      fng = new CrewMember({
        name: this.available_names[Math.floor(Math.random() * this.available_names.length)]
      });
      
      fng.ship = enemy_ship;
      
      enemy_ship.addCrew(fng);
    }

    enemy_ship.addWeapon(Bastards.game.available_weapons[0]);
    enemy_ship.addWeapon(Bastards.game.available_weapons[1]);

    this.enemies.push(enemy_ship);
    this.message('A ship appears: ' + enemy_ship);
    this.refreshScreen();
  },
  makeHex: function (num, max, dim) {
    if (!dim) {
      dim = 0;
    }
    if (!max) {
      max = 100;
    }
    
    max_color = 255 - dim;
    dec = Math.floor(((num / max) * max_color));
    
    if (dec > max_color) {
      dec = max_color;
    }
    
    hex = dec.toString(16);
    
    while (hex.length < 2) {
      hex = "0" + hex;
    }

    return hex;
  },
  toString: function () {
    return 'Bastards, Thieves and Pirates Game';
  },
  playPause: function () {
    if (this.paused) {
      this.paused = false;
      this.message('<br>### Resuming game... ###');
      
      window.gameClock = window.setInterval(function() {
        Bastards.game.tick();
      }, this.tick_rate);
      
      $('.pauseBtn').removeClass('paused');
    } else {
      this.paused = true;
      this.message('<br>### Game is paused! ###');
      
      window.clearInterval(gameClock);
      
      $('.pauseBtn').addClass('paused');
    }
  },
  tick: function () {
    if (Math.random() > 0.7) {
      var aggressor = this.enemies[Rand.getInt(0,2)],
          rand_ship = Rand.getInt(0,3),
          target;

      if (rand_ship == 3) {
        target = this.my_ship;
      } else {
        target = this.enemies[rand_ship];
      }
      
      target.hit(aggressor, Rand.getInt(0,aggressor.weapons.length - 1));
    }
      
    // increment power
    for (var x = 0; x < Bastards.game.enemies.length; x++) {
      this.enemies[x].tick();
    }
  },
  end: function (message) {
    $('#popover').html('<h1>GAME OVER</h1><p>' + message + '</p><p><a href="" class="goRestart">Play again?</a></p>').fadeIn(200);
  }
});

/**
 * A ship's weapon.
 *
 * Natural Habitat: ship.weapons
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
**/
var Weapon = Backbone.Model.extend({
  defaults: {
    name: '',
    hull_damage: 15,
    crew_damage: 15,
    section_damage: 30,
    ammo: 0,
    ammo_type: 'laser',
    power_used: 1,
    missiles_used: 0,
    rounds_per_shot: 1,
    blocked_by: {
      shield: true
    }
  },
  toString: function () {
    return this.name;
  },
  fire: function () {
    if (this.ammo >= this.rounds_per_shot) {
      this.ammo = this.ammo - this.rounds_per_shot;
      return true;
    } else {
      return false;
    }
  }
});

/**
 * Set up a game, add players, control etc.
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
 */

String.prototype.repeat = function(num) {
  'use strict';

  return new Array(num + 1).join( this );
};

var Bastards = {};

$(function () {
  'use strict';

  var i;

  Bastards.game = new Game({
    space_width: 310,
    space_height: 250
  });

  Bastards.game.init();
  
  Bastards.game.setShip({
    name: 'The Heavy Hawk',
    type: 'default',
    tmpl: $('#shipTmpl').html(),
    affiliation: 'friend',
    x: Rand.getInt(30, Bastards.game.space_width-10),
    y: Rand.getInt(30, Bastards.game.space_height-10),
    crew: [
      new CrewMember({name:'Jase Barner'}),
      new CrewMember({name:'Harry Raige'}),
      new CrewMember({name:'Patry Gibbon'})
    ]
  });

  for (i = 0; i < Bastards.game.my_ship.crew.length; i++) {
    Bastards.game.my_ship.crew[i].ship = Bastards.game.my_ship;
  }
  
  Bastards.game.addEnemy({
    name: 'Bastards',
    tmpl: $('#shipTmpl').html(),
    x: Rand.getInt(30, Bastards.game.space_width-10),
    y: Rand.getInt(30, Bastards.game.space_height-10)
  });

  Bastards.game.addEnemy({
    name: 'Thieves',
    tmpl: $('#shipTmpl').html(),
    x: Rand.getInt(30, Bastards.game.space_width-10),
    y: Rand.getInt(30, Bastards.game.space_height-10)
  });

  Bastards.game.addEnemy({
    name: 'Pirates',
    tmpl: $('#shipTmpl').html(),
    x: Rand.getInt(30, Bastards.game.space_width-10),
    y: Rand.getInt(30, Bastards.game.space_height-10)
  });

  // Create space -  Let there be light, etc...
  Bastards.game.stage = new Kinetic.Stage({
    container: 'space',
    width: 320,
    height: 250
  });
  
  // Create some layers
  var layer_stars = new Kinetic.Layer();
  var layer_ships = new Kinetic.Layer();
  var layer_message = new Kinetic.Layer();
  
  // Create some stars
  for (i = 0; i < 500; i++) {
    var randcol = Rand.getColor(0, 180, true),
    star = new Kinetic.Rect({
      x: Rand.getInt(7, Bastards.game.space_width - 7),
      y: Rand.getInt(7, Bastards.game.space_height - 7),
      width: 3,
      height: 3,
      fill: randcol,
      stroke: 'black',
      strokeWidth: 0
    });

    layer_stars.add(star);
  }
  
  // show enemy ships on canvas
  for (i = 0; i < Bastards.game.enemies.length; i++) {
    Bastards.game.enemies[i].shape = new Kinetic.Rect({
      x: Bastards.game.enemies[i].x,
      y: Bastards.game.enemies[i].y,
      width: 5,
      height: 5,
      fill: '#f00',
      stroke: 'black',
      strokeWidth: 0
    });

    layer_ships.add(Bastards.game.enemies[i].shape);

    Bastards.game.enemies[i].label = new Kinetic.Text({
      x: Bastards.game.enemies[i].x + 10,
      y: Bastards.game.enemies[i].y - 5,
      text: Bastards.game.enemies[i].name,
      fill: '#c00',
      fontFamily: 'arial',
      shadowColor: '#f00',
      shadowBlur: 10,
      shadowOffset: 0,
      shadowOpacity: 1
    });

    layer_ships.add(Bastards.game.enemies[i].label);
  }
  
  // add the hawk
  Bastards.game.my_ship.shape = new Kinetic.Rect({
    x: Bastards.game.my_ship.x,
    y: Bastards.game.my_ship.y,
    width: 5,
    height: 5,
    fill: '#00cc00',
    stroke: 'black',
    strokeWidth: 0
  });

  Bastards.game.my_ship.label = new Kinetic.Text({
    x: Bastards.game.my_ship.x + 10,
    y: Bastards.game.my_ship.y - 5,
    text: Bastards.game.my_ship.name,
    fill: '#00cc00',
    fontFamily: 'arial',
    shadowColor: '#00ff00',
    shadowBlur: 10,
    shadowOffset: 0,
    shadowOpacity: 1
  });
  
  // Set up message output
  var message = new Kinetic.Text({
    x: 10,
    y: 10,
    text: '------',
    fontSize: 16,
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fill: 'green',
    opacity: 0
  });

  layer_message.add(message);
  
  layer_ships.add(Bastards.game.my_ship.shape);
  layer_ships.add(Bastards.game.my_ship.label);
  
  Bastards.game.stage.add(layer_stars);
  Bastards.game.stage.add(layer_ships);
  Bastards.game.stage.add(layer_message);
  
  /**
   * Add some controls
   */
  $('#hitShip').on('click', function() {
    Bastards.game.my_ship.hit(Bastards.game.enemies[Bastards.game.dice(Bastards.game.enemies.length)], 0);
  });
  
  $('#hitSomeone').on('click', function () {
    Bastards.game.my_ship.crew[game.dice(Bastards.game.my_ship.crew.length)].hit(30);
  });
  
  $('#fireLaser').on('click', function () {
    Bastards.game.enemies[Bastards.game.dice(Bastards.game.enemies.length)].hit(Bastards.game.my_ship, 0);
  });
  
  $('#fireMissile').on('click', function () {
    Bastards.game.enemies[Bastards.game.dice(Bastards.game.enemies.length)].hit(Bastards.game.my_ship, 1);
  });
  
  $('#doWarp').on('click', function () {
    Bastards.game.my_ship.warp();
  });
  
  $('.pauseBtn').on('click', function () {
    Bastards.game.playPause();
  });
  
  $('.goRefresh').on('click', function() {
    window.refresh();
  });

  $('.dial').knob({
    min: 0,
    max: 100,
    step: 1,
    angleOffset: 225,
    angleArc: 270,
    width: 90,
    height: 90,
    // displayInput: false,
    thickness: 0.3,
    fgColor: '#e70',
    bgColor: '#3d1c00',
    // skin: 'tron',
    // lineCap: 'round',
    font: '"digital7"'
  });
  
  $(window).resize(function () {
    $('#messages').scrollTop($('#messages')[0].scrollHeight);
  });
  
  /**
   * Add keyboard shortcuts
   */
  $(document).keydown(function (e) {
    var keyCode = e.keyCode || e.which;

    switch (keyCode) {
      case 80: // P - Pause
        Bastards.game.playPause();
        break;
      case 76: // L - Laser
        Bastards.game.enemies[game.dice(Bastards.game.enemies.length)].hit(Bastards.game.my_ship, 0);
        break;
      case 77: // M - Missile
        Bastards.game.enemies[game.dice(Bastards.game.enemies.length)].hit(Bastards.game.my_ship, 1);
        break;
      case 87: // W - Warp
        Bastards.game.my_ship.warp();
        break;
    }
  });
});
