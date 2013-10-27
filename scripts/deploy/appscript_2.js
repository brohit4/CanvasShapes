CanvasShapes={init:function(a){var b,c;return a=a||{},c=a.canvasConfig||{},b=function(a){var c,d,e=this;if(c=console,a=a||{},!b.validShapes.hasOwnProperty(a.type))return c&&c.error("Please pass a valid shape type. This is an invalid shape type--"+a.type),void 0;if(e.type=a.type,"number"!=typeof a.x||"number"!=typeof a.x||a.x<0||a.y<0)return c&&c.error("Co-ordinates missing for the created shape or onvalid co-ordinates"),void 0;if(e.x=a.x,e.y=a.y,d=b.defaultColor,e.fillStyle=a.fillStyle||d,"RECTANGLE"===a.type){if(!a.width||!a.height)return c&&c.error("Please pass in width and height for the rectangle"),void 0;e.width=a.width,e.height=a.height}if("CIRCLE"===a.type){if(!a.radius)return c&&c.error("Please pass in radius for the circle"),void 0;e.radius=a.radius}if("TEXT"===a.type){if(!a.text||!a.font)return c&&c.error("Please pass in the value of the text and the font size"),void 0;e.text=a.text,e.font=a.font}return e},b.shapes=[],b.defaultColor="#FBFBFB",b.shapeIndex=0,b.validShapes={RECTANGLE:!0,CIRCLE:!0,TEXT:!0},b.decrementDepth=function(a,b){var c,d,e,f=this;for(c=f.shapes,e=c.length,b=b||e,b>=e&&(b=e-1),d=a;b>=d;d++)c[d].index=c[d].index-1},b.prototype={paint:function(){var a=this;a.index=b.shapeIndex++,b.shapes&&b.shapes.push(a),a.draw()},draw:function(a){var d,e,f=this;b.canvas?d=b.canvas:(d=document.createElement("canvas"),d.width=c.width||window.innerWidth-100,d.height=c.height||window.innerHeight,document.body.appendChild(d),b.canvas=d),e=d.getContext("2d"),a=a||{},e.fillStyle=a.fillStyle||f.fillStyle,"RECTANGLE"===f.type?e.fillRect(f.x,f.y,f.width,f.height):"CIRCLE"===f.type?(e.beginPath(),e.arc(f.x,f.y,f.radius,0,2*Math.PI,!1),e.closePath(),e.fill()):"TEXT"===f.type&&(e.font=f.font,e.fillText(f.text,f.x,f.y))},clearShape:function(){this.draw({fillStyle:b.clearColor})},move:function(a,c){var d=this;d.clearShape(),d.redrawAffectedShapes(),a&&(d.x=a),c&&(d.y=c),d.draw(),b.decrementDepth(d.index+1),b.shapes.splice(d.index,1),d.index=b.shapes.length,b.shapes.push(d)},contains:function(a){var b,c,d,e=this;return b=e.getRectCoordinates(),c=a.getRectCoordinates(),d=function(a,b,c){return a>=c.x&&a<=c.x+c.width&&b>=c.y&&b<=c.y+c.height?!0:!1},d(b.x,b.y,c)?!0:d(b.x+b.width,b.y,c)?!0:d(b.x+b.width,b.y+b.height,c)?!0:d(b.x,b.y+b.height,c)?!0:!1},containedShapes:function(a,c,d){var e,f,g,h,i=this,j=0,k=[];for(f=b.shapes,e=f.length,a=a||new Array(e);e>j;j++)(j!==i.index||c)&&(g=f[j],h=d?!a[g.index]&&i.index<=g.index:!a[g.index],h&&(i.contains(g)||g.contains(i))&&(k.push(g),a[g.index]=!0));return k},affectedShapes:function(a,c,d){var e,f,g,h,i=this,j=0,k=[];for(f=b.shapes,e=f.length,h=d||new Array(e),k=i.containedShapes(h,a,c);k.length;)g=k.splice(0,1)[0],k=k.concat(g.containedShapes(h,a));for(;e>j;j++)considerElement=j===i.index?a:!0,h[j]&&considerElement&&k.push(f[j]);return{shapes:k,metaData:h}},bringToFront:function(a){var c,d,e,f=this;c=f.index,d=a.index,d>c?(e=b.shapes,b.decrementDepth(c+1,d),f.index=d,e.splice(c,1),e.splice(d,0,f),a.redrawAffectedShapes(!0,!0)):console&&console.info("Shape already above")},modifyDimensions:function(a){var b,c,d,e,f=this;a=a||{},e=f.affectedShapes(!0).metaData,"RECTANGLE"===f.type?(b=a.width,"number"==typeof b&&b>=0&&(f.width=a.width),c=a.height,"number"==typeof c&&c>=0&&(f.height=a.height)):"CIRCLE"===f.type?(d=f.radius,"number"==typeof d&&d>=0&&(f.radius=a.radius)):"TEXT"===f.type&&(f.text=a.text||""),e=f.affectedShapes(!0,!0,e).shapes,f.redrawShapes(e)},moveToBackGround:function(a){var c,d,e,f=this;c=f.index,d=a.index,c>d?(e=b.shapes,b.decrementDepth(d+1,c),e.splice(d,1),e.splice(c,0,a),a.index=c,f.redrawAffectedShapes(!0,!0)):console&&console.info("Shape already below")},redrawContainedShapes:function(){var a,b=this;a=b.containedShapes(),b.redrawShapes(a)},redrawAffectedShapes:function(a,b){var c,d=this;c=d.affectedShapes(a,b).shapes,d.redrawShapes(c)},redrawShapes:function(a){var b,c=0;for(b=a.length;b>c;c++)a[c].draw()},getRectCoordinates:function(){var a,c,d,e,f,g=this;return"RECTANGLE"===g.type?a={x:g.x,y:g.y,width:g.width,height:g.height}:"CIRCLE"===g.type?a={x:g.x-g.radius,y:g.y-g.radius,width:2*g.radius,height:2*g.radius}:"TEXT"===g.type&&(c=b.canvas,d=c.getContext("2d"),e=d.measureText(g.text).width,f=g.font,a={x:g.x,y:g.y,width:e,height:Number(f.substr(0,f.length-2))}),a}},b.clearColor=a.clearColor||"#FFF",b.canvas=a.canvas,b.moveShapes=function(a){var c,d,e,f,g,h,i,j,k;for(i=a.length,d=b.shapes,g=0;i>g;g++){for(f=a[g],j=f.realIndex,e=d[j],c=e.affectedShapes(!1,!0,c).metaData,e.clearShape(),e.x=f.x,e.y=f.y,k=d.length,h=j+1;k>h;h++)d[h].index=h-1,c[h-1]=c[h];d.splice(j,1),e.index=d.length,d.push(e),c[d.length-1]=!0}for(k=d.length,g=0;k>g;g++)c[g]&&d[g].draw()},b}};
var x,y,totalShapes,canvasWidth,canvasHeight,shapeData=[],frameData=[],frameCount,reqstAnimationFrames,createRandomData,animateShapes,data,canvasWidth,canvasHeight;createRandomData=function(a,b,c,d){var e,f,g,h,i,j,k,l,m=[],n=[];for(e=a+b,g=d.height,f=d.width,k=0;e>k;k++)m.push({x:Math.floor(1e3*Math.random()%f),y:Math.floor(1e3*Math.random()%g),color:"hsl("+Math.floor(1e3*Math.random()%360)+", 70%,70%)"});for(h=function(a,b){var c,d,e=[],f=[];for(a=a||0,b=b||0,c=0;b>c;c++)f.push({realIndex:c});for(;e.length!==a;)d=1e3*Math.random()*b%f.length,e.push(f.splice(d,1)[0]);return e},k=0;c>k;k++){for(i=h(a,e),l=0;a>l;l++)j=i[l],j.x=1e3*Math.random()%f,j.y=1e3*Math.random()%g;n.push(i)}return{shapeData:m,frameData:n}},reqstAnimationFrames=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame,animateShapes=function(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p;for(d=CanvasShapes.init({canvasConfig:c.canvasConfig}),o=0;o<a.length;o++)f=a[o],f=new d({type:"RECTANGLE",x:f.x,y:f.y,fillStyle:f.color,width:50,height:50}),f.paint();for(e=CanvasShapes.init({canvasConfig:c.canvasConfig}),o=0;o<a.length;o++)f=a[o],f=new e({type:"RECTANGLE",x:f.x,y:f.y,fillStyle:f.color,width:50,height:50}),f.paint();g=0,m=function(){g||(i=(new Date).getTime()),k=b[g],console.time("Time for library usage"),d.moveShapes(k),console.timeEnd("Time for library usage"),g++,j=(new Date).getTime(),console.log(1e3*g/(j-i)),frameCount>g?reqstAnimationFrames(m):(h=0,i=(new Date).getTime(),reqstAnimationFrames(n))},n=function(){for(k=b[h],shapes=e.shapes,console.time("Time for Vanilla Redraw"),o=0;x>o;o++){for(l=k[o],p=0;p<shapes.length;p++)shapes[p].clearShape();for(f=shapes[l.realIndex],f.x=l.x,f.y=l.y,e.decrementDepth(l.realIndex+1),f=shapes.splice(l.realIndex,1),f.index=shapes.length,shapes.push(f[0]),p=0;p<shapes.length;p++)shapes[p].draw()}console.timeEnd("Time for Vanilla Redraw"),h++,j=(new Date).getTime(),console.log(1e3*h/(j-i)),frameCount>h&&reqstAnimationFrames(n)},reqstAnimationFrames(m)},x=10,y=10,frameCount=1,canvasWidth=500,canvasHeight=500,data=createRandomData(x,y,frameCount,{width:canvasWidth,height:canvasHeight}),shapeData=data.shapeData,frameData=data.frameData,animateShapes(shapeData,frameData,{canvasConfig:{width:canvasWidth,height:canvasHeight}});