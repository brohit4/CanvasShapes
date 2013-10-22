
window.onload = function(){
var rectshape,
	rectshape1,
	circle,
	circle1,
	buttonred,
	buttongreen,
	moveRedCircle,
	bringGreenRectToFront;

shapesfn =  CanvasShapes.init();

//Create 4 shapes with respective coordinates and dimensions
//they have the following depth order - rectshape1,rectshape,circle1,circle
rectshape = new shapesfn({
	x: 10,
	y: 10,
	width: 90,
	height: 90,
	type: 'RECTANGLE',
	fillStyle: '#0000FF'
});


rectshape1 = new shapesfn({
	x: 110,
	y: 110,
	width: 100,
	height: 100,
	type: 'RECTANGLE',
	fillStyle: '#00FF00'
});



circle = new shapesfn({
	x: 150,
	y: 50,
	radius: 50,
	type: 'CIRCLE',
	fillStyle: 'FF0000'
});

new shapesfn({
	x: 30,
	y: 70,
	radius: 60,
	type: 'CIRCLE',
	fillStyle: 'FF0DD0'
}).paint();
new shapesfn({
	x: 40,
	y: 100,
	radius: 50,
	type: 'CIRCLE',
	fillStyle: 'FFF00F'
}).paint();

/*circle1 = new shapesfn({
	x: 500,
	y: 100,
	radius: 50,
	type: 'CIRCLE',
	fillStyle: 'FF0000'
});*/

//Paint them in the corresponding depth order
rectshape1.paint();
rectshape.paint();
circle.paint();
/*circle1.paint();
*/

buttonred = document.getElementById('buttonred');
buttongreen = document.getElementById('buttongreen');


moveRect = function(){
	rectshape1.move(150,50);
};
bringCircleToFront = function(){
	circle.bringToFront(rectshape1);
};
//Adding an if check for the tests to work
if (buttonred) {

	//Add listeners to buttons for corresponding actions
	if (buttonred.addEventListener) {
		buttonred.addEventListener('click', moveRect);
	}
	else if (buttonred.attachEvent){
		buttonred.attachEvent('click', moveRect);
	}
}

if (buttongreen) {
	if (buttongreen.addEventListener) {
		buttongreen.addEventListener('click', bringCircleToFront);
	}
	else if (buttongreen.attachEvent){
		buttongreen.attachEvent('click', bringCircleToFront);
	}
}

/*
Some functions to test various functionalities need to add corresponding buttons to these
circle.move(200,200);
rectshape.move(190,190);

rectshape1.bringToFront(circle);

rectshape1.moveToBackGround(circle);
*/



};