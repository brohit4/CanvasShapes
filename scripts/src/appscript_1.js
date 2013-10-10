var rectshape,
	rectshape1,
	circle,
	circle1,
	buttonred,
	buttongreen,
	moveRedCircle,
	bringGreenRectToFront;


//Create 4 shapes with respective coordinates and dimensions
//they have the following depth order - rectshape1,rectshape,circle1,circle
rectshape = new CanvasShapes({
	x: 10,
	y: 10,
	width: 100,
	height: 100,
	type: 'RECTANGLE',
	fillStyle: '#0000FF'
});


rectshape1 = new CanvasShapes({
	x: 100,
	y: 100,
	width: 100,
	height: 100,
	type: 'RECTANGLE',
	fillStyle: '#00FF00'
});



circle = new CanvasShapes({
	x: 300,
	y: 200,
	radius: 50,
	type: 'CIRCLE',
	fillStyle: 'FF0000'
});
circle1 = new CanvasShapes({
	x: 500,
	y: 100,
	radius: 50,
	type: 'CIRCLE',
	fillStyle: 'FF0000'
});

//Paint them in the corresponding depth order
rectshape1.paint();
rectshape.paint();
circle1.paint();
circle.paint();


buttonred = document.getElementById('buttonred');
buttongreen = document.getElementById('buttongreen');


moveRedCircle = function(){
	circle.move(200,200);
};
bringGreenRectToFront = function(){
	rectshape1.bringToFront(circle);
};	

//Add listeners to buttons for corresponding actions
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

/*
Some functions to test various functionalities need to add corresponding buttons to these
circle.move(200,200);
rectshape.move(190,190);

rectshape1.bringToFront(circle);

rectshape1.moveToBackGround(circle);
*/



