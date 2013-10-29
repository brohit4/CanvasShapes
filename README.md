CanvasShapes
============
CanvasShapes helps create various canvas shapes like circle, rectangle, text using a HTML canvas element. The library provides various functions to modify a shape's dimensions,move a shape to different position etc in an optimal way so that minimal shapes are redrawn so that there are no patches due to the movement or resize.

Usage:
=====

To use this library include CanvasShapes.js in your markup.

For a minified version use CanvasShapes.min.js instead.

Both these files are located in scripts/src and scripts/min folders respectively.

#Shape creation:

Before starting shape creation, you need to initialize the library with the configurations you need like, the width and height of the canvas on which the shapes need to be created. The initialization will give you a constructor function which can be used to create shapes on the canvas.

    var shapesConstructor = CanvasShapes.init({
        canvasConfig: {
            width: 500,
            height: 500
        }
    });

Once the library is initialized you can create a rectangular shape by the following:


    var shape = new shapesConstructor({
        type: 'RECTANGLE',
        x: 50,
        y: 50,
        fillStyle: '#FDFDFD',
        width: 50,
        height: 50

    });

This only creates the shape. For that shape to be painted on the canvas, you need to call the method paint.

    shape.paint()

The paint method also adds the shape into a shapes array the library maintains so that it can use for its calculation for a minimal redraw.

#Functions supported
These are the functions the library supports on each shape.

    -   move

    -   paint

    -   modifyDimensions

    -   moveToBackGround

    -   bringToFront

The library has functions to aggregate these operations for multiple shapes.
For e.g, suppose we want to move multiple shapes in a canvas, using the `move` function we might redraw the same shape multiple times which is unneccesary.

To move multiple shapes in the canvas, moveShapes function has to be used on the constructor that was initialized

    shapesConstructor.moveShapes([{
        realIndex: 1,//The index of the shape to be moved
        x: 300,//new x position
        y: 500//new y position
    }, {
        realIndex: 7,
        x: 100,
        y: 50
    }]);

For more details about the function the library supports look into the documentation in doc folder.

For sample applications and usage app1.html and app2.html are put in markup folder. Have a look at those.