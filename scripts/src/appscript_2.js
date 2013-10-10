var text,
	circle,
	text1,
	text2,
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

text1 = new CanvasShapes({
	x: 100,
	y: 50,
	type: 'TEXT',
	font: '8px',
	fillStyle: '#00FF00',
	text: 'REct'
});
text2 = new CanvasShapes({
	x: 40,
	y: 50,
	type: 'TEXT',
	font: '8px',
	fillStyle: '#00FF00',
	text: 'circle'
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
text1.paint();
text2.paint();



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