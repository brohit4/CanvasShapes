var rectshape = new CanvasShapes({
	x: 10,
	y: 10,
	width: 100,
	height: 100,
	type: 'RECTANGLE',
	fillStyle: '#0000FF'
});


var rectshape1 = new CanvasShapes({
	x: 100,
	y: 100,
	width: 100,
	height: 100,
	type: 'RECTANGLE',
	fillStyle: '#00FF00'
});
rectshape1.paint();
rectshape.paint();
var circle = new CanvasShapes({
	x: 300,
	y: 200,
	radius: 50,
	type: 'CIRCLE',
	fillStyle: 'FF0000'
});
var circle1 = new CanvasShapes({
	x: 500,
	y: 100,
	radius: 50,
	type: 'CIRCLE',
	fillStyle: 'FF0000'
});
circle1.paint();
circle.paint();

var buttonred = document.getElementById('buttonred'),
	buttongreen = document.getElementById('buttongreen'),
	moveRedCircle,
	bringGreenRectToFront;

moveRedCircle = function(){
	circle.move(200,200);
};
bringGreenRectToFront = function(){
	rectshape1.bringToFront(circle);
};	
if (buttonred.addEventListener) {
	buttonred.addEventListener('click', moveRedCircle);
}
else {
	buttonred.attachEvent('click', moveRedCircle);
}

if (buttongreen.addEventListener) {
	buttongreen.addEventListener('click', bringGreenRectToFront);
}
else {
	buttongreen.attachEvent('click', bringGreenRectToFront);
}

circle.move(200,200);
rectshape.move(190,190);

rectshape1.bringToFront(circle);

rectshape1.moveToBackGround(circle);
//rectshape1.bringToFront(circle);

var canvas = document.getElementById('canvasshapes');
var context = canvas.getContext('2d');

var imgData = context.getImageData(100, 100, 50, 50);
debugger;

