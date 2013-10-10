var text,
	circle,
	buttongreen,
	bringCircleToFront;


text = new CanvasShapes({
	x: 100,
	y: 100,
	type: 'TEXT',
	font: '8px',
	fillStyle: '#00FF00',
	text: 'Rohit'
});

circle = new CanvasShapes({
	x: 130,
	y: 50,
	radius: 50,
	type: 'CIRCLE',
	fillStyle: 'FF0000'
});
circle.paint();
text.paint();



buttongreen = document.getElementById('buttongreen');
bringCircleToFront = function(){
	circle.bringToFront(text);
};	

//Add listeners to buttons for corresponding actions
if (buttongreen.addEventListener) {
	buttongreen.addEventListener('click', bringCircleToFront);
}
else {
	buttongreen.attachEvent('click', bringCircleToFront);
}