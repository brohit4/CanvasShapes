  /*
	Pseudo code

	Genrate Random data
    1)Genrate random co-ordinates for x+y shapes
    2)Generate random colors for x+y shapes
    3)Generate data sets which contains which x shapes need to be moved and what      position they need to be moved


	Use the same random data for drawing using library
    1) init the Library
    2) Create x+y shapes using the random data
    3) using getAnimationFrames use the dat created in 1.3 and move the steps accoringly using the shape.move()


	Measure Average FPS for library usage
	1) in getAnimationFrames maintain frame rate

	Use the same random data for drawing using vanilla draw
    1) init the Library
    2) Create x+y shapes using the random data
    3) using getAnimationFrames use the dat created in 1.3 and modify the co-ordinates using the dat 1.3 and move it to the end of the shapes list
    4) redraw all shapes in the list in the same order

	Measure Average FPS for vanilla draw
	1) in getAnimationFrames maintain frame rate

	Compare Both Average FPS
  */

  var x,
    y,
    totalShapes,
    canvasWidth,
    canvasHeight,
    shapeData = [],
    frameData = [],
    frameCount,
    reqstAnimationFrames,
    createRandomData,
    animateShapes,
    data,
    canvasWidth,
    canvasHeight;




    createRandomData = function(x, y, frameCount, canvasConfig){
        var totalShapes,
            shapeData = [],
            canvasWidth,
            canvasHeight,
            selectShapes,
            selectedShapes,
            selectedShape,
            frameData = [],
            i,
            j;

        totalShapes = x+y;
        canvasHeight = canvasConfig.height;
        canvasWidth = canvasConfig.width;

        /*
        Generate Random data
        1)Generate random co-ordinates for x+y shapes
        2)Generate random colors for x+y shapes
        3)Generate data sets which contains which x shapes need to be moved and what
              position they need to be moved
        */
        //Generating random co-ordiantes and random colors
        for (i = 0; i < totalShapes; i++) {
            shapeData.push({
                x: Math.floor((Math.random() * 1000) % canvasWidth),
                y: Math.floor((Math.random() * 1000) % canvasHeight),
                color: 'hsl(' + Math.floor((Math.random() * 1000) % 360) + ', 70%,70%)'
            });
        }

        /*
    +    Input -noOfshapes, the number of shapes to select
                totalShape, the number of total shapes from which the shapes need to be selected
        Output- An array of length noOfShapes objects which have a property index
                 which value is the index based on totalShapes
        Fucntion to select x shapes from x+y shapes*/
        selectShapes = function(noOfShapes, totalShapes){
            var selectedShapes = [],
                shapesArray = [],
                i,
                randomIndex;

            noOfShapes = noOfShapes || 0;
            totalShapes = totalShapes || 0;
            for (i = 0; i < totalShapes; i++) {
                shapesArray.push({
                    realIndex: i
                });
            }

            while(selectedShapes.length !== noOfShapes){
                randomIndex = (Math.random() * 1000 * totalShapes) % shapesArray.length;
                selectedShapes.push(shapesArray.splice(randomIndex, 1)[0]);
            }
            return selectedShapes;
        };

        /*Generate frame data where each frame datum has
        indices of which x shapes to be moved to their new positions
            and their new positions
        */
        for (i = 0 ; i < frameCount; i++) {
            selectedShapes = selectShapes(x, totalShapes);
            for (j = 0; j < x; j++){
                selectedShape = selectedShapes[j];
                //For each selected shape generate new positions x,y
                selectedShape.x = (Math.random() * 1000) % canvasWidth;
                selectedShape.y = (Math.random() * 1000) % canvasHeight;
            }
            frameData.push(selectedShapes);
        }
        return {
            shapeData: shapeData,
            frameData: frameData
        };
    };




    //The function to be called to put the new frame considering cross browser issues
    reqstAnimationFrames = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
    //Create Shapes using CanvasShapes library and paint them
    animateShapes = function(shapeData, frameData, config){
        var shapesConstructor,
            shapesConstructor1,
            shape,
            frameCounter,
            frameCounter1,
            initialDate,
            currentDate,
            selectedShapes,
            selectedShape,
            libraryCallBack,
            vanillaCallBack,
            i,
            j;

        shapesConstructor = CanvasShapes.init({
			clearColor: '#000',
            canvasConfig: config.canvasConfig
        });

        for ( i = 0; i < shapeData.length; i++){
            shape = shapeData[i];
            shape = new shapesConstructor({
                type: 'RECTANGLE',
                x: shape.x,
                y: shape.y,
                fillStyle: shape.color,
                width: 50,
                height: 50

            });
            shape.paint();
        }
        //Animate the shapes using frame data and vanilla redraw of entire canvas
        //Paint the shapes for the firstTime
        shapesConstructor1 = CanvasShapes.init({
			clearColor: '#000',
            canvasConfig: config.canvasConfig
        });

        for ( i = 0; i < shapeData.length; i++){
            shape = shapeData[i];
            shape = new shapesConstructor1({
                type: 'RECTANGLE',
                x: shape.x,
                y: shape.y,
                fillStyle: shape.color,
                width: 50,
                height: 50

            });
            shape.paint();
        }

        //Animate the shapes using frame data and CanvasShapes library
        frameCounter = 0;
        var libFPS = document.getElementById('libfps'),
			vanFPS = document.getElementById('vanfps');

        libraryCallBack = function() {
            if (!frameCounter) {
                initialDate = new Date().getTime();
            }
            selectedShapes = frameData[frameCounter];
            //shapes = shapesConstructor.shapes;
            console.time('Time for library usage');
            /*for (i = 0 ; i < x; i++){
                selectedShape = selectedShapes[i];
                shape = shapes[selectedShape.realIndex];
                shape.move(selectedShape.x, selectedShape.y);
            }*/
            shapesConstructor.moveShapes(selectedShapes);
            console.timeEnd('Time for library usage');
            frameCounter++;
            currentDate = new Date().getTime();
            libFPS.innerHTML = frameCounter * 1000 /(currentDate - initialDate);
            if (frameCounter < frameCount){
                reqstAnimationFrames(libraryCallBack);
            }
            else{
                //Start vanilla animation
                frameCounter1 = 0;
                initialDate = new Date().getTime();
                reqstAnimationFrames(vanillaCallBack);
            }
        };

        vanillaCallBack = function(){

            //Get the shapes that need to be affected for this frame
            selectedShapes = frameData[frameCounter1];

            shapes = shapesConstructor1.shapes;
            console.time('Time for Vanilla Redraw');
            for (i = 0 ; i < x; i++){
                selectedShape = selectedShapes[i];
                for (j = 0; j < shapes.length; j++  ){
                    shapes[j].clearShape();
                }
                shape = shapes[selectedShape.realIndex];
                shape.x = selectedShape.x;
                shape.y = selectedShape.y;
                //Modify the indices of the rest of the shapes due to the movement
                shapesConstructor1.decrementDepth(selectedShape.realIndex + 1);

                shape = shapes.splice(selectedShape.realIndex, 1);
                shape.index = shapes.length;
                shapes.push(shape[0]);

                //Redraw all the shapes again in the order
                for (j = 0; j < shapes.length; j++  ){
                    shapes[j].draw();
                }
            }
            console.timeEnd('Time for Vanilla Redraw');
            frameCounter1++;
            //End console timing

            currentDate = new Date().getTime();
            vanFPS.innerHTML = frameCounter1 * 1000/(currentDate -  initialDate );
            //frameCounter1 = frameCounter1 % frameCount;
            if (frameCounter1 < frameCount){
                reqstAnimationFrames(vanillaCallBack);
            }
        };

        reqstAnimationFrames(libraryCallBack);
    };

    /*Initialize variables, these variables can be changed for variance testing*/
    x = 10;
    y = 100;
    frameCount = 100;
    canvasWidth = 300;
    canvasHeight = 300;
    //frameRate = 1000/50;
    data = createRandomData(x, y, frameCount, {
        width: canvasWidth,
        height: canvasHeight
    });
    shapeData = data.shapeData;
    frameData = data.frameData;
    animateShapes(shapeData, frameData, {
        canvasConfig: {
            width: canvasWidth,
            height: canvasHeight
        }
    });
