(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{201:function(module,exports,__webpack_require__){"use strict";var reactIs=__webpack_require__(132),REACT_STATICS={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},KNOWN_STATICS={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},MEMO_STATICS={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},TYPE_STATICS={};function getStatics(component){return reactIs.isMemo(component)?MEMO_STATICS:TYPE_STATICS[component.$$typeof]||REACT_STATICS}TYPE_STATICS[reactIs.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},TYPE_STATICS[reactIs.Memo]=MEMO_STATICS;var defineProperty=Object.defineProperty,getOwnPropertyNames=Object.getOwnPropertyNames,getOwnPropertySymbols=Object.getOwnPropertySymbols,getOwnPropertyDescriptor=Object.getOwnPropertyDescriptor,getPrototypeOf=Object.getPrototypeOf,objectPrototype=Object.prototype;module.exports=function hoistNonReactStatics(targetComponent,sourceComponent,blacklist){if("string"!=typeof sourceComponent){if(objectPrototype){var inheritedComponent=getPrototypeOf(sourceComponent);inheritedComponent&&inheritedComponent!==objectPrototype&&hoistNonReactStatics(targetComponent,inheritedComponent,blacklist)}var keys=getOwnPropertyNames(sourceComponent);getOwnPropertySymbols&&(keys=keys.concat(getOwnPropertySymbols(sourceComponent)));for(var targetStatics=getStatics(targetComponent),sourceStatics=getStatics(sourceComponent),i=0;i<keys.length;++i){var key=keys[i];if(!(KNOWN_STATICS[key]||blacklist&&blacklist[key]||sourceStatics&&sourceStatics[key]||targetStatics&&targetStatics[key])){var descriptor=getOwnPropertyDescriptor(sourceComponent,key);try{defineProperty(targetComponent,key,descriptor)}catch(e){}}}}return targetComponent}},418:function(module,exports){function isPromise(obj){return!!obj&&("object"==typeof obj||"function"==typeof obj)&&"function"==typeof obj.then}module.exports=isPromise,module.exports.default=isPromise},419:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.isFSA=isFSA,exports.isError=function(action){return isFSA(action)&&!0===action.error};var _lodash=_interopRequireDefault(__webpack_require__(420)),_lodash2=_interopRequireDefault(__webpack_require__(421));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function isFSA(action){return(0,_lodash.default)(action)&&(0,_lodash2.default)(action.type)&&Object.keys(action).every(isValidKey)}function isValidKey(key){return["type","payload","error","meta"].indexOf(key)>-1}},490:function(module,__webpack_exports__,__webpack_require__){"use strict";function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable})),keys.push.apply(keys,symbols)}return keys}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach(function(key){_defineProperty(target,key,source[key])}):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}return target}function _typeof(obj){"@babel/helpers - typeof";return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var vendorPrefix;__webpack_require__.d(__webpack_exports__,"a",function(){return alignElement}),__webpack_require__.d(__webpack_exports__,"b",function(){return alignPoint});var jsCssMap={Webkit:"-webkit-",Moz:"-moz-",ms:"-ms-",O:"-o-"};function getVendorPrefix(){if(void 0!==vendorPrefix)return vendorPrefix;vendorPrefix="";var style=document.createElement("p").style;for(var key in jsCssMap)key+"Transform"in style&&(vendorPrefix=key);return vendorPrefix}function getTransitionName(){return getVendorPrefix()?"".concat(getVendorPrefix(),"TransitionProperty"):"transitionProperty"}function getTransformName(){return getVendorPrefix()?"".concat(getVendorPrefix(),"Transform"):"transform"}function setTransitionProperty(node,value){var name=getTransitionName();name&&(node.style[name]=value,"transitionProperty"!==name&&(node.style.transitionProperty=value))}function setTransform(node,value){var name=getTransformName();name&&(node.style[name]=value,"transform"!==name&&(node.style.transform=value))}var getComputedStyleX,matrix2d=/matrix\((.*)\)/,matrix3d=/matrix3d\((.*)\)/;function forceRelayout(elem){var originalStyle=elem.style.display;elem.style.display="none",elem.offsetHeight,elem.style.display=originalStyle}function css(el,name,v){var value=v;if("object"!==_typeof(name))return void 0!==value?("number"==typeof value&&(value="".concat(value,"px")),void(el.style[name]=value)):getComputedStyleX(el,name);for(var i in name)name.hasOwnProperty(i)&&css(el,i,name[i])}function getScroll(w,top){var ret=w["page".concat(top?"Y":"X","Offset")],method="scroll".concat(top?"Top":"Left");if("number"!=typeof ret){var d=w.document;"number"!=typeof(ret=d.documentElement[method])&&(ret=d.body[method])}return ret}function getScrollLeft(w){return getScroll(w)}function getScrollTop(w){return getScroll(w,!0)}function getOffset(el){var pos=function(elem){var box,x,y,doc=elem.ownerDocument,body=doc.body,docElem=doc&&doc.documentElement;return box=elem.getBoundingClientRect(),x=Math.floor(box.left),y=Math.floor(box.top),{left:x-=docElem.clientLeft||body.clientLeft||0,top:y-=docElem.clientTop||body.clientTop||0}}(el),doc=el.ownerDocument,w=doc.defaultView||doc.parentWindow;return pos.left+=getScrollLeft(w),pos.top+=getScrollTop(w),pos}function isWindow(obj){return null!==obj&&void 0!==obj&&obj==obj.window}function getDocument(node){return isWindow(node)?node.document:9===node.nodeType?node:node.ownerDocument}var _RE_NUM_NO_PX=new RegExp("^(".concat(/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,")(?!px)[a-z%]+$"),"i"),RE_POS=/^(top|right|bottom|left)$/,CURRENT_STYLE="currentStyle",RUNTIME_STYLE="runtimeStyle",LEFT="left",PX="px";function getOffsetDirection(dir,option){return"left"===dir?option.useCssRight?"right":dir:option.useCssBottom?"bottom":dir}function oppositeOffsetDirection(dir){return"left"===dir?"right":"right"===dir?"left":"top"===dir?"bottom":"bottom"===dir?"top":void 0}function setLeftTop(elem,offset,option){"static"===css(elem,"position")&&(elem.style.position="relative");var presetH=-999,presetV=-999,horizontalProperty=getOffsetDirection("left",option),verticalProperty=getOffsetDirection("top",option),oppositeHorizontalProperty=oppositeOffsetDirection(horizontalProperty),oppositeVerticalProperty=oppositeOffsetDirection(verticalProperty);"left"!==horizontalProperty&&(presetH=999),"top"!==verticalProperty&&(presetV=999);var originalTransition="",originalOffset=getOffset(elem);("left"in offset||"top"in offset)&&(originalTransition=function(node){return node.style.transitionProperty||node.style[getTransitionName()]}(elem)||"",setTransitionProperty(elem,"none")),"left"in offset&&(elem.style[oppositeHorizontalProperty]="",elem.style[horizontalProperty]="".concat(presetH,"px")),"top"in offset&&(elem.style[oppositeVerticalProperty]="",elem.style[verticalProperty]="".concat(presetV,"px")),forceRelayout(elem);var old=getOffset(elem),originalStyle={};for(var key in offset)if(offset.hasOwnProperty(key)){var dir=getOffsetDirection(key,option),preset="left"===key?presetH:presetV,off=originalOffset[key]-old[key];originalStyle[dir]=dir===key?preset+off:preset-off}css(elem,originalStyle),forceRelayout(elem),("left"in offset||"top"in offset)&&setTransitionProperty(elem,originalTransition);var ret={};for(var _key in offset)if(offset.hasOwnProperty(_key)){var _dir=getOffsetDirection(_key,option),_off=offset[_key]-originalOffset[_key];ret[_dir]=_key===_dir?originalStyle[_dir]+_off:originalStyle[_dir]-_off}css(elem,ret)}function setTransform$1(elem,offset){var originalOffset=getOffset(elem),originalXY=function(node){var style=window.getComputedStyle(node,null),transform=style.getPropertyValue("transform")||style.getPropertyValue(getTransformName());if(transform&&"none"!==transform){var matrix=transform.replace(/[^0-9\-.,]/g,"").split(",");return{x:parseFloat(matrix[12]||matrix[4],0),y:parseFloat(matrix[13]||matrix[5],0)}}return{x:0,y:0}}(elem),resultXY={x:originalXY.x,y:originalXY.y};"left"in offset&&(resultXY.x=originalXY.x+offset.left-originalOffset.left),"top"in offset&&(resultXY.y=originalXY.y+offset.top-originalOffset.top),function(node,xy){var style=window.getComputedStyle(node,null),transform=style.getPropertyValue("transform")||style.getPropertyValue(getTransformName());if(transform&&"none"!==transform){var arr,match2d=transform.match(matrix2d);match2d?((arr=(match2d=match2d[1]).split(",").map(function(item){return parseFloat(item,10)}))[4]=xy.x,arr[5]=xy.y,setTransform(node,"matrix(".concat(arr.join(","),")"))):((arr=transform.match(matrix3d)[1].split(",").map(function(item){return parseFloat(item,10)}))[12]=xy.x,arr[13]=xy.y,setTransform(node,"matrix3d(".concat(arr.join(","),")")))}else setTransform(node,"translateX(".concat(xy.x,"px) translateY(").concat(xy.y,"px) translateZ(0)"))}(elem,resultXY)}function each(arr,fn){for(var i=0;i<arr.length;i++)fn(arr[i])}function isBorderBoxFn(elem){return"border-box"===getComputedStyleX(elem,"boxSizing")}"undefined"!=typeof window&&(getComputedStyleX=window.getComputedStyle?function(elem,name,cs){var computedStyle=cs,val="",d=getDocument(elem);return(computedStyle=computedStyle||d.defaultView.getComputedStyle(elem,null))&&(val=computedStyle.getPropertyValue(name)||computedStyle[name]),val}:function(elem,name){var ret=elem[CURRENT_STYLE]&&elem[CURRENT_STYLE][name];if(_RE_NUM_NO_PX.test(ret)&&!RE_POS.test(name)){var style=elem.style,left=style[LEFT],rsLeft=elem[RUNTIME_STYLE][LEFT];elem[RUNTIME_STYLE][LEFT]=elem[CURRENT_STYLE][LEFT],style[LEFT]="fontSize"===name?"1em":ret||0,ret=style.pixelLeft+PX,style[LEFT]=left,elem[RUNTIME_STYLE][LEFT]=rsLeft}return""===ret?"auto":ret});var BOX_MODELS=["margin","border","padding"],CONTENT_INDEX=-1,PADDING_INDEX=2,BORDER_INDEX=1;function getPBMWidth(elem,props,which){var prop,j,i,value=0;for(j=0;j<props.length;j++)if(prop=props[j])for(i=0;i<which.length;i++){var cssProp=void 0;cssProp="border"===prop?"".concat(prop).concat(which[i],"Width"):prop+which[i],value+=parseFloat(getComputedStyleX(elem,cssProp))||0}return value}var domUtils={getParent:function(element){var parent=element;do{parent=11===parent.nodeType&&parent.host?parent.host:parent.parentNode}while(parent&&1!==parent.nodeType&&9!==parent.nodeType);return parent}};function getWH(elem,name,ex){var extra=ex;if(isWindow(elem))return"width"===name?domUtils.viewportWidth(elem):domUtils.viewportHeight(elem);if(9===elem.nodeType)return"width"===name?domUtils.docWidth(elem):domUtils.docHeight(elem);var which="width"===name?["Left","Right"]:["Top","Bottom"],borderBoxValue="width"===name?Math.floor(elem.getBoundingClientRect().width):Math.floor(elem.getBoundingClientRect().height),isBorderBox=isBorderBoxFn(elem),cssBoxValue=0;(null===borderBoxValue||void 0===borderBoxValue||borderBoxValue<=0)&&(borderBoxValue=void 0,(null===(cssBoxValue=getComputedStyleX(elem,name))||void 0===cssBoxValue||Number(cssBoxValue)<0)&&(cssBoxValue=elem.style[name]||0),cssBoxValue=parseFloat(cssBoxValue)||0),void 0===extra&&(extra=isBorderBox?BORDER_INDEX:CONTENT_INDEX);var borderBoxValueOrIsBorderBox=void 0!==borderBoxValue||isBorderBox,val=borderBoxValue||cssBoxValue;return extra===CONTENT_INDEX?borderBoxValueOrIsBorderBox?val-getPBMWidth(elem,["border","padding"],which):cssBoxValue:borderBoxValueOrIsBorderBox?extra===BORDER_INDEX?val:val+(extra===PADDING_INDEX?-getPBMWidth(elem,["border"],which):getPBMWidth(elem,["margin"],which)):cssBoxValue+getPBMWidth(elem,BOX_MODELS.slice(extra),which)}each(["Width","Height"],function(name){domUtils["doc".concat(name)]=function(refWin){var d=refWin.document;return Math.max(d.documentElement["scroll".concat(name)],d.body["scroll".concat(name)],domUtils["viewport".concat(name)](d))},domUtils["viewport".concat(name)]=function(win){var prop="client".concat(name),doc=win.document,body=doc.body,documentElementProp=doc.documentElement[prop];return"CSS1Compat"===doc.compatMode&&documentElementProp||body&&body[prop]||documentElementProp}});var cssShow={position:"absolute",visibility:"hidden",display:"block"};function getWHIgnoreDisplay(){for(var _len=arguments.length,args=new Array(_len),_key2=0;_key2<_len;_key2++)args[_key2]=arguments[_key2];var val,elem=args[0];return 0!==elem.offsetWidth?val=getWH.apply(void 0,args):function(elem,options,callback){var name,old={},style=elem.style;for(name in options)options.hasOwnProperty(name)&&(old[name]=style[name],style[name]=options[name]);for(name in callback.call(elem),options)options.hasOwnProperty(name)&&(style[name]=old[name])}(elem,cssShow,function(){val=getWH.apply(void 0,args)}),val}function mix(to,from){for(var i in from)from.hasOwnProperty(i)&&(to[i]=from[i]);return to}each(["width","height"],function(name){var first=name.charAt(0).toUpperCase()+name.slice(1);domUtils["outer".concat(first)]=function(el,includeMargin){return el&&getWHIgnoreDisplay(el,name,includeMargin?0:BORDER_INDEX)};var which="width"===name?["Left","Right"]:["Top","Bottom"];domUtils[name]=function(elem,v){var val=v;return void 0!==val?elem?(isBorderBoxFn(elem)&&(val+=getPBMWidth(elem,["padding","border"],which)),css(elem,name,val)):void 0:elem&&getWHIgnoreDisplay(elem,name,CONTENT_INDEX)}});var utils={getWindow:function(node){if(node&&node.document&&node.setTimeout)return node;var doc=node.ownerDocument||node;return doc.defaultView||doc.parentWindow},getDocument:getDocument,offset:function(el,value,option){if(void 0===value)return getOffset(el);!function(elem,offset,option){if(option.ignoreShake){var oriOffset=getOffset(elem),oLeft=oriOffset.left.toFixed(0),oTop=oriOffset.top.toFixed(0),tLeft=offset.left.toFixed(0),tTop=offset.top.toFixed(0);if(oLeft===tLeft&&oTop===tTop)return}option.useCssRight||option.useCssBottom?setLeftTop(elem,offset,option):option.useCssTransform&&getTransformName()in document.body.style?setTransform$1(elem,offset):setLeftTop(elem,offset,option)}(el,value,option||{})},isWindow:isWindow,each:each,css:css,clone:function(obj){var i,ret={};for(i in obj)obj.hasOwnProperty(i)&&(ret[i]=obj[i]);if(obj.overflow)for(i in obj)obj.hasOwnProperty(i)&&(ret.overflow[i]=obj.overflow[i]);return ret},mix:mix,getWindowScrollLeft:function(w){return getScrollLeft(w)},getWindowScrollTop:function(w){return getScrollTop(w)},merge:function(){for(var ret={},i=0;i<arguments.length;i++)utils.mix(ret,i<0||arguments.length<=i?void 0:arguments[i]);return ret},viewportWidth:0,viewportHeight:0};mix(utils,domUtils);var getParent=utils.getParent;function getOffsetParent(element){if(utils.isWindow(element)||9===element.nodeType)return null;var parent,body=utils.getDocument(element).body,positionStyle=utils.css(element,"position");if(!("fixed"===positionStyle||"absolute"===positionStyle))return"html"===element.nodeName.toLowerCase()?null:getParent(element);for(parent=getParent(element);parent&&parent!==body&&9!==parent.nodeType;parent=getParent(parent))if("static"!==(positionStyle=utils.css(parent,"position")))return parent;return null}var getParent$1=utils.getParent;function getVisibleRectForElement(element,alwaysByViewport){for(var visibleRect={left:0,right:1/0,top:0,bottom:1/0},el=getOffsetParent(element),doc=utils.getDocument(element),win=doc.defaultView||doc.parentWindow,body=doc.body,documentElement=doc.documentElement;el;){if(-1!==navigator.userAgent.indexOf("MSIE")&&0===el.clientWidth||el===body||el===documentElement||"visible"===utils.css(el,"overflow")){if(el===body||el===documentElement)break}else{var pos=utils.offset(el);pos.left+=el.clientLeft,pos.top+=el.clientTop,visibleRect.top=Math.max(visibleRect.top,pos.top),visibleRect.right=Math.min(visibleRect.right,pos.left+el.clientWidth),visibleRect.bottom=Math.min(visibleRect.bottom,pos.top+el.clientHeight),visibleRect.left=Math.max(visibleRect.left,pos.left)}el=getOffsetParent(el)}var originalPosition=null;utils.isWindow(element)||9===element.nodeType||(originalPosition=element.style.position,"absolute"===utils.css(element,"position")&&(element.style.position="fixed"));var scrollX=utils.getWindowScrollLeft(win),scrollY=utils.getWindowScrollTop(win),viewportWidth=utils.viewportWidth(win),viewportHeight=utils.viewportHeight(win),documentWidth=documentElement.scrollWidth,documentHeight=documentElement.scrollHeight,bodyStyle=window.getComputedStyle(body);if("hidden"===bodyStyle.overflowX&&(documentWidth=win.innerWidth),"hidden"===bodyStyle.overflowY&&(documentHeight=win.innerHeight),element.style&&(element.style.position=originalPosition),alwaysByViewport||function(element){if(utils.isWindow(element)||9===element.nodeType)return!1;var doc=utils.getDocument(element),body=doc.body,parent=null;for(parent=getParent$1(element);parent&&parent!==body&&parent!==doc;parent=getParent$1(parent))if("fixed"===utils.css(parent,"position"))return!0;return!1}(element))visibleRect.left=Math.max(visibleRect.left,scrollX),visibleRect.top=Math.max(visibleRect.top,scrollY),visibleRect.right=Math.min(visibleRect.right,scrollX+viewportWidth),visibleRect.bottom=Math.min(visibleRect.bottom,scrollY+viewportHeight);else{var maxVisibleWidth=Math.max(documentWidth,scrollX+viewportWidth);visibleRect.right=Math.min(visibleRect.right,maxVisibleWidth);var maxVisibleHeight=Math.max(documentHeight,scrollY+viewportHeight);visibleRect.bottom=Math.min(visibleRect.bottom,maxVisibleHeight)}return visibleRect.top>=0&&visibleRect.left>=0&&visibleRect.bottom>visibleRect.top&&visibleRect.right>visibleRect.left?visibleRect:null}function getRegion(node){var offset,w,h;if(utils.isWindow(node)||9===node.nodeType){var win=utils.getWindow(node);offset={left:utils.getWindowScrollLeft(win),top:utils.getWindowScrollTop(win)},w=utils.viewportWidth(win),h=utils.viewportHeight(win)}else offset=utils.offset(node),w=utils.outerWidth(node),h=utils.outerHeight(node);return offset.width=w,offset.height=h,offset}function getAlignOffset(region,align){var V=align.charAt(0),H=align.charAt(1),w=region.width,h=region.height,x=region.left,y=region.top;return"c"===V?y+=h/2:"b"===V&&(y+=h),"c"===H?x+=w/2:"r"===H&&(x+=w),{left:x,top:y}}function getElFuturePos(elRegion,refNodeRegion,points,offset,targetOffset){var p1=getAlignOffset(refNodeRegion,points[1]),p2=getAlignOffset(elRegion,points[0]),diff=[p2.left-p1.left,p2.top-p1.top];return{left:Math.round(elRegion.left-diff[0]+offset[0]-targetOffset[0]),top:Math.round(elRegion.top-diff[1]+offset[1]-targetOffset[1])}}function isFailX(elFuturePos,elRegion,visibleRect){return elFuturePos.left<visibleRect.left||elFuturePos.left+elRegion.width>visibleRect.right}function isFailY(elFuturePos,elRegion,visibleRect){return elFuturePos.top<visibleRect.top||elFuturePos.top+elRegion.height>visibleRect.bottom}function flip(points,reg,map){var ret=[];return utils.each(points,function(p){ret.push(p.replace(reg,function(m){return map[m]}))}),ret}function flipOffset(offset,index){return offset[index]=-offset[index],offset}function convertOffset(str,offsetLen){return(/%$/.test(str)?parseInt(str.substring(0,str.length-1),10)/100*offsetLen:parseInt(str,10))||0}function normalizeOffset(offset,el){offset[0]=convertOffset(offset[0],el.width),offset[1]=convertOffset(offset[1],el.height)}function doAlign(el,tgtRegion,align,isTgtRegionVisible){var points=align.points,offset=align.offset||[0,0],targetOffset=align.targetOffset||[0,0],overflow=align.overflow,source=align.source||el;offset=[].concat(offset),targetOffset=[].concat(targetOffset);var newOverflowCfg={},fail=0,visibleRect=getVisibleRectForElement(source,!(!(overflow=overflow||{})||!overflow.alwaysByViewport)),elRegion=getRegion(source);normalizeOffset(offset,elRegion),normalizeOffset(targetOffset,tgtRegion);var elFuturePos=getElFuturePos(elRegion,tgtRegion,points,offset,targetOffset),newElRegion=utils.merge(elRegion,elFuturePos);if(visibleRect&&(overflow.adjustX||overflow.adjustY)&&isTgtRegionVisible){if(overflow.adjustX&&isFailX(elFuturePos,elRegion,visibleRect)){var newPoints=flip(points,/[lr]/gi,{l:"r",r:"l"}),newOffset=flipOffset(offset,0),newTargetOffset=flipOffset(targetOffset,0);(function(elFuturePos,elRegion,visibleRect){return elFuturePos.left>visibleRect.right||elFuturePos.left+elRegion.width<visibleRect.left})(getElFuturePos(elRegion,tgtRegion,newPoints,newOffset,newTargetOffset),elRegion,visibleRect)||(fail=1,points=newPoints,offset=newOffset,targetOffset=newTargetOffset)}if(overflow.adjustY&&isFailY(elFuturePos,elRegion,visibleRect)){var _newPoints=flip(points,/[tb]/gi,{t:"b",b:"t"}),_newOffset=flipOffset(offset,1),_newTargetOffset=flipOffset(targetOffset,1);(function(elFuturePos,elRegion,visibleRect){return elFuturePos.top>visibleRect.bottom||elFuturePos.top+elRegion.height<visibleRect.top})(getElFuturePos(elRegion,tgtRegion,_newPoints,_newOffset,_newTargetOffset),elRegion,visibleRect)||(fail=1,points=_newPoints,offset=_newOffset,targetOffset=_newTargetOffset)}fail&&(elFuturePos=getElFuturePos(elRegion,tgtRegion,points,offset,targetOffset),utils.mix(newElRegion,elFuturePos));var isStillFailX=isFailX(elFuturePos,elRegion,visibleRect),isStillFailY=isFailY(elFuturePos,elRegion,visibleRect);if(isStillFailX||isStillFailY){var _newPoints2=points;isStillFailX&&(_newPoints2=flip(points,/[lr]/gi,{l:"r",r:"l"})),isStillFailY&&(_newPoints2=flip(points,/[tb]/gi,{t:"b",b:"t"})),points=_newPoints2,offset=align.offset||[0,0],targetOffset=align.targetOffset||[0,0]}newOverflowCfg.adjustX=overflow.adjustX&&isStillFailX,newOverflowCfg.adjustY=overflow.adjustY&&isStillFailY,(newOverflowCfg.adjustX||newOverflowCfg.adjustY)&&(newElRegion=function(elFuturePos,elRegion,visibleRect,overflow){var pos=utils.clone(elFuturePos),size={width:elRegion.width,height:elRegion.height};return overflow.adjustX&&pos.left<visibleRect.left&&(pos.left=visibleRect.left),overflow.resizeWidth&&pos.left>=visibleRect.left&&pos.left+size.width>visibleRect.right&&(size.width-=pos.left+size.width-visibleRect.right),overflow.adjustX&&pos.left+size.width>visibleRect.right&&(pos.left=Math.max(visibleRect.right-size.width,visibleRect.left)),overflow.adjustY&&pos.top<visibleRect.top&&(pos.top=visibleRect.top),overflow.resizeHeight&&pos.top>=visibleRect.top&&pos.top+size.height>visibleRect.bottom&&(size.height-=pos.top+size.height-visibleRect.bottom),overflow.adjustY&&pos.top+size.height>visibleRect.bottom&&(pos.top=Math.max(visibleRect.bottom-size.height,visibleRect.top)),utils.mix(pos,size)}(elFuturePos,elRegion,visibleRect,newOverflowCfg))}return newElRegion.width!==elRegion.width&&utils.css(source,"width",utils.width(source)+newElRegion.width-elRegion.width),newElRegion.height!==elRegion.height&&utils.css(source,"height",utils.height(source)+newElRegion.height-elRegion.height),utils.offset(source,{left:newElRegion.left,top:newElRegion.top},{useCssRight:align.useCssRight,useCssBottom:align.useCssBottom,useCssTransform:align.useCssTransform,ignoreShake:align.ignoreShake}),{points:points,offset:offset,targetOffset:targetOffset,overflow:newOverflowCfg}}function alignElement(el,refNode,align){var target=align.target||refNode;return doAlign(el,getRegion(target),align,!function(target,alwaysByViewport){var visibleRect=getVisibleRectForElement(target,alwaysByViewport),targetRegion=getRegion(target);return!visibleRect||targetRegion.left+targetRegion.width<=visibleRect.left||targetRegion.top+targetRegion.height<=visibleRect.top||targetRegion.left>=visibleRect.right||targetRegion.top>=visibleRect.bottom}(target,align.overflow&&align.overflow.alwaysByViewport))}function alignPoint(el,tgtPoint,align){var pageX,pageY,doc=utils.getDocument(el),win=doc.defaultView||doc.parentWindow,scrollX=utils.getWindowScrollLeft(win),scrollY=utils.getWindowScrollTop(win),viewportWidth=utils.viewportWidth(win),viewportHeight=utils.viewportHeight(win),tgtRegion={left:pageX="pageX"in tgtPoint?tgtPoint.pageX:scrollX+tgtPoint.clientX,top:pageY="pageY"in tgtPoint?tgtPoint.pageY:scrollY+tgtPoint.clientY,width:0,height:0},pointInView=pageX>=0&&pageX<=scrollX+viewportWidth&&pageY>=0&&pageY<=scrollY+viewportHeight,points=[align.points[0],"cc"];return doAlign(el,tgtRegion,_objectSpread2(_objectSpread2({},align),{},{points:points}),pointInView)}alignElement.__getOffsetParent=getOffsetParent,alignElement.__getVisibleRectForElement=getVisibleRectForElement},60:function(module,exports,__webpack_require__){
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType)if(arg.toString===Object.prototype.toString)for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key);else classes.push(arg.toString())}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):"function"==typeof define&&"object"==typeof define.amd&&define.amd?define("classnames",[],function(){return classNames}):window.classNames=classNames}()}}]);