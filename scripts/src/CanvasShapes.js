
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
	if (CanvasShapes.shapes) {
		CanvasShapes.shapes.push(me);
	}
};

/**
	An array in the CanvasShapes constructor to maintain all the list of shapes
*/
CanvasShapes.shapes = [];

CanvasShapes.shapeIndex = 0 ;

/**
	validShapes object is used to maintain all the valis shapes CanvasShapes supports
	so that if any other different shape is passed there will be a error logged and
	further processing is stopped
*/
Canvas.validShapes = {
	'RECTANGLE': true,
	'CIRCLE': true,
	'TEXT': true
};

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
CanvasShapes.addMethod('draw', function() {
	var me = this;
});

/**
	move method will set the x,y of the current shape to the new x,y
	and redraws the current shape and as well as the effected shapes due
	to the movement
*/
CanvasShapes.addMethod('move', function(newx, newy) {
	var me = this;
});

/**
	contains method will check if the passed shape is phyiscally
	contained in this shape

	This method's main use is to determine whether the passed shape has to be 
	redrawn due to this shapes movement or change of depth
*/
CanvasShapes.addMethod('contains', function(shape) {
	
});

/**
	bringToFront method will bring this shape above the passed shape.
	This will lead to a redraw of the affected containers
*/
CanvasShapes.addMethod('bringToFront', function(shape) {
	
});

/**
	bringToFront method will move this shape below the passed in shape
	This will lead to a redraw of the affected containers
*/
CanvasShapes.addMethod('moveToBackGround', function(shape) {
	
});