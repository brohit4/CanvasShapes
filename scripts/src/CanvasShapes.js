
/**
	Global constructor to create shapes of the following types:
	CIRCLE
	RECTANGLE
	TEXT

	It has the Following properties in the constructor (static properties):
	shapes:this is an array of all shapes created which needs to be maintained for
			various functionalities like redrawing the canvas


	USAGE: TO be updated
*/
CanvasShapes = function(params){
	var me = this;

	/* 
		Defaulting the params to empty
		object in case params is missed out during shape creation
	*/
	params = params || {};


	/*
		The new object that is being created is added to the shapes array
	*/
	if (CanVasShapes.shapes) {
		CanvasShapes.shapes.push(me);
	}
};

/**
	An array in the CanVasShapes constructor to maintain all the list of shapes
*/
CanvasShapes.shapes = [];

/**
	addMethod is way to augment the CanvasShapes prototype,
	if there are more objects which needs this functionality addMethod should be 
	added to Object.prototype
*/
CanvasShapes.addMethod = function(methodName, method){
	CanvasShapes.prototype[methodName] = method;
};


/**
	draw function to draw the current shape at the shapes x,y
	and with shapes dimensions if any
*/
CanVasShapes.addMethod('draw', function() {
	var me = this;
});

/**
	move method will set the x,y of the current shape to the new x,y
	and redraws the current shape and as well as the effected shapes due
	to the movement
*/
CanVasShapes.addMethod('move', function(newx, newy) {
	var me = this;
});