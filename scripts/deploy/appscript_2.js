CanvasShapes=function(a){var b,c,d=this;if(b=console,a=a||{},!CanvasShapes.validShapes.hasOwnProperty(a.type))return b&&b.error("Please pass a valid shape type. This is an invalid shape type--"+a.type),void 0;if(d.type=a.type,"number"!=typeof a.x||"number"!=typeof a.x||a.x<0||a.y<0)return b&&b.error("Co-ordinates missing for the created shape or onvalid co-ordinates"),void 0;if(d.x=a.x,d.y=a.y,c=CanvasShapes.defaultColor,d.fillStyle=a.fillStyle||c,"RECTANGLE"===a.type){if(!a.width||!a.height)return b&&b.error("Please pass in width and height for the rectangle"),void 0;d.width=a.width,d.height=a.height}if("CIRCLE"===a.type){if(!a.radius)return b&&b.error("Please pass in radius for the circle"),void 0;d.radius=a.radius}if("TEXT"===a.type){if(!a.text||!a.font)return b&&b.error("Please pass in the value of the text and the font size"),void 0;d.text=a.text,d.font=a.font}return d},CanvasShapes.shapes=[],CanvasShapes.defaultColor="#FBFBFB",CanvasShapes.shapeIndex=0,CanvasShapes.validShapes={RECTANGLE:!0,CIRCLE:!0,TEXT:!0},CanvasShapes.decrementDepth=function(a,b){var c,d,e,f=this;for(c=f.shapes,e=c.length,b=b||e,b>=e&&(b=e-1),d=a;b>=d;d++)c[d].index=c[d].index-1},CanvasShapes.addMethod=function(a,b){CanvasShapes.prototype[a]=b},CanvasShapes.addMethod("paint",function(){var a=this;a.index=CanvasShapes.shapeIndex++,CanvasShapes.shapes&&CanvasShapes.shapes.push(a),a.draw()}),CanvasShapes.addMethod("draw",function(a){var b,c,d=this;CanvasShapes.canvas?b=CanvasShapes.canvas:(b=document.createElement("canvas"),b.id="canvasshapes",b.width=window.innerWidth-100,b.height=window.innerHeight,document.body.appendChild(b),CanvasShapes.canvas=b),c=b.getContext("2d"),a=a||{},c.fillStyle=a.fillStyle||d.fillStyle,"RECTANGLE"===d.type?c.fillRect(d.x,d.y,d.width,d.height):"CIRCLE"===d.type?(c.beginPath(),c.arc(d.x,d.y,d.radius,0,2*Math.PI,!1),c.closePath(),c.fill()):"TEXT"===d.type&&(c.font=d.font,c.fillText(d.text,d.x,d.y))}),CanvasShapes.addMethod("move",function(a,b){var c=this;c.draw({fillStyle:"#FFF"}),c.redrawAffectedShapes(),a&&(c.x=a),b&&(c.y=b),c.draw(),CanvasShapes.decrementDepth(c.index+1),CanvasShapes.shapes.splice(c.index,1),c.index=CanvasShapes.shapes.length,CanvasShapes.shapes.push(c)}),CanvasShapes.addMethod("contains",function(a){var b,c,d,e=this;return b=e.getRectCoordinates(),c=a.getRectCoordinates(),d=function(a,b,c){return a>=c.x&&a<=c.x+c.width&&b>=c.y&&b<=c.y+c.height?!0:!1},d(b.x,b.y,c)?!0:d(b.x+b.width,b.y,c)?!0:d(b.x+b.width,b.y+b.height,c)?!0:d(b.x,b.y+b.height,c)?!0:!1}),CanvasShapes.addMethod("containedShapes",function(a){var b,c,d,e=this,f=0,g=[];for(c=CanvasShapes.shapes,b=c.length,a=a||new Array(b);b>f;f++)f!==e.index&&(d=c[f],a[d.index]||!e.contains(d)&&!d.contains(e)||(g.push(d),a[d.index]=!0));return g}),CanvasShapes.addMethod("affectedShapes",function(a){var b,c,d,e,f=this,g=0,h=[];for(c=CanvasShapes.shapes,b=c.length,e=new Array(b),h=f.containedShapes(e);h.length;)d=h.splice(0,1)[0],h=h.concat(d.containedShapes(e));for(;b>g;g++)considerElement=g===f.index?a:!0,e[g]&&considerElement&&h.push(c[g]);return h}),CanvasShapes.addMethod("bringToFront",function(a){var b,c,d,e=this;b=e.index,c=a.index,c>b?(d=CanvasShapes.shapes,CanvasShapes.decrementDepth(b+1,c),d.splice(b,1),d.splice(c,0,e),e.index=c,e.redrawAffectedShapes(!0)):console&&console.info("Shape already above")}),CanvasShapes.addMethod("moveToBackGround",function(a){var b,c,d,e=this;b=e.index,c=a.index,b>c?(d=CanvasShapes.shapes,CanvasShapes.decrementDepth(c+1,b),d.splice(c,1),d.splice(b,0,a),a.index=b,e.redrawAffectedShapes(!0)):console&&console.info("Shape already below")}),CanvasShapes.addMethod("redrawContainedShapes",function(){var a,b,c=this,d=0;for(a=c.containedShapes(),b=a.length;b>d;d++)a[d].draw()}),CanvasShapes.addMethod("redrawAffectedShapes",function(a){var b,c,d=this,e=0;for(b=d.affectedShapes(a),c=b.length;c>e;e++)b[e].draw()}),CanvasShapes.addMethod("getRectCoordinates",function(){var a,b,c,d,e,f=this;return"RECTANGLE"===f.type?a={x:f.x,y:f.y,width:f.width,height:f.height}:"CIRCLE"===f.type?a={x:f.x-f.radius,y:f.y-f.radius,width:2*f.radius,height:2*f.radius}:"TEXT"===f.type&&(b=CanvasShapes.canvas,c=b.getContext("2d"),d=c.measureText(f.text).width,e=f.font,a={x:f.x,y:f.y,width:d,height:Number(e.substr(0,e.length-2))}),a});
var text,circle,text1,text2,buttongreen,bringCircleToFront;text=new CanvasShapes({x:100,y:100,type:"TEXT",font:"8px",fillStyle:"#00FF00",text:"Rohit"}),text1=new CanvasShapes({x:100,y:50,type:"TEXT",font:"8px",fillStyle:"#00FF00",text:"REct"}),text2=new CanvasShapes({x:40,y:50,type:"TEXT",font:"8px",fillStyle:"#00FF00",text:"circle"}),circle=new CanvasShapes({x:130,y:50,radius:50,type:"CIRCLE",fillStyle:"FF0000"}),circle.paint(),text.paint(),text1.paint(),text2.paint(),buttongreen=document.getElementById("buttongreen"),bringCircleToFront=function(){circle.bringToFront(text)},buttongreen&&(buttongreen.addEventListener?buttongreen.addEventListener("click",bringCircleToFront):buttongreen.attachEvent&&buttongreen.attachEvent("click",bringCircleToFront));