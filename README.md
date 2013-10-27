CanvasShapes
============
CanvasShapes helps create various canvas shapes like circle,rect,text etc and provide various fucntions to modify,move the shapes.
These methods will redraw the canvas in an optimal way.

###Usage:
Make sure `node` is installed and is in the system path.<br/>
Then use `npm install` to load all the dependencies.<br/>
Then use the command `grunt` to do all the build process.

After that run app1.html/app2.html in a browser  for a sample application



To use `CanvasShapes` -
use 'CanvasShapes.init()' to get a constructor function , which can create shapes.

To create a shape use this snippet of code, this creates a canvas element too<br/>

    var shapesConstructor = CanvasShapes.init({
        canvasConfig: {
            width: 500,
            height: 500
        }
    });
    var shape = new shapesConstructor({
        type: 'RECTANGLE',
        x: 50,
        y: 50,
        fillStyle: '#FDFDFD',
        width: 50,
        height: 50

    });
    shape.paint();
Once you create multiple shapes in the Canvas, you can use `move`,`modiyDimensions`,`moveToBackGround`,`bringToFront` on the created shape, so that minimal number of shapes need to be redrawn from the rest of shapes rather than a every element redraw to complete the operation performed.


There is also support to move multiple shapes at once
Use the initialized constructor and call    moveShapes(shapeData).For more details see app2.html