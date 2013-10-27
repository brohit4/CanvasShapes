CanvasShapes = {
    /**
        Input: A config object to initialize the CanvasShapes, this typically contains
                the canvas element to create the shapes on or the configurations to create a
                canvas.
        Ouput : A constructor function which will be used for creating the shapes and
                maintaining the shapes.
    */

    init: function(config) {
        var ShapesConstructor,
            canvasConfig;

        config = config || {};
        canvasConfig = config.canvasConfig || {};
        ShapesConstructor = function(params){
            var me = this,
                cons,
                defaultColor;

            cons = console;

            /*
                Defaulting the params to empty
                object in case params is missed out during shape creation
            */
            params = params || {};

            /*
                to check if the passed in shape type is a shape type that is supported
            */

            if (!ShapesConstructor.validShapes.hasOwnProperty(params.type)) {
                if (cons) {
                    cons.error('Please pass a valid shape type. This is an invalid shape type--' + params.type);
                }
                return;
            }
            me.type = params.type;

            //If x and y co-ordinates are missing return immediately
            if (typeof params.x !== 'number' || typeof params.x !== 'number' || params.x < 0 ||params.y < 0) {
                if (cons) {
                    cons.error('Co-ordinates missing for the created shape or onvalid co-ordinates');
                }
                return;
            }
            me.x = params.x;
            me.y = params.y;
            defaultColor = ShapesConstructor.defaultColor;
            me.fillStyle = params.fillStyle || defaultColor;
            if (params.type === 'RECTANGLE') {
                //If width and height for a rectangle shape are not passed, dont do further processing
                //else set width,height and fillstyle properties
                if (!params.width || !params.height) {
                    if (cons) {
                        cons.error('Please pass in width and height for the rectangle');
                    }
                    return;
                }
                me.width = params.width;
                me.height = params.height;


            }

            //if radius for a circle is not passed stop
            //else set the radius and fillStyle
            if (params.type === 'CIRCLE') {
                if (!params.radius) {
                    if (cons) {
                        cons.error('Please pass in radius for the circle');
                    }
                    return;
                }
                me.radius = params.radius;
            }

            if (params.type === 'TEXT') {
                if (!params.text || !params.font) {
                    //Make fotn property mandatory so that height of the text can be calculated easily
                    if (cons) {
                        cons.error('Please pass in the value of the text and the font size');
                    }
                    return;
                }
                me.text = params.text;
                me.font = params.font;
            }



            return me;
        };

        /**
            An array in the ShapesConstructor constructor to maintain all the list of shapes
        */
        ShapesConstructor.shapes = [];

        ShapesConstructor.defaultColor = '#FBFBFB';

        ShapesConstructor.shapeIndex = 0;

        /**
            validShapes object is used to maintain all the valis shapes ShapesConstructor supports
            so that if any other different shape is passed there will be a error logged and
            further processing is stopped
        */
        ShapesConstructor.validShapes = {
            'RECTANGLE': true,
            'CIRCLE': true,
            'TEXT': true
        };

        /**
            input - fromIndex, toIndex
            Ouptut -  None

            This function decreases the index of all the shapes by 1 which are within the passed
            index range
        */
        ShapesConstructor.decrementDepth = function(fromIndex, toIndex) {
            var me = this,
                shapes,
                i,
                length;

            shapes = me.shapes;
            length = shapes.length;
            toIndex = toIndex || length;

            if (toIndex >=  length) {
                //Since it is index it will be length-1
                toIndex = length - 1;
            }
            for ( i = fromIndex;  i <= toIndex ; i++){
                shapes[i].index = shapes[i].index - 1;
            }

        };

        ShapesConstructor.prototype = {
            /**
                Input - None
                Output - None

                Paint function adds the shape to the shapes array which will be used to manipulate repaints
                and then calls the draw
            */
            paint: function() {
                var me = this;
                //Store the index at which this shape is stored in the ShapesConstructor array
                me.index = ShapesConstructor.shapeIndex++;
                /*
                    The new object that is being created is added to the shapes array
                */
                if (ShapesConstructor.shapes) {
                    ShapesConstructor.shapes.push(me);
                }
                //draw the shape
                me.draw();
            },
            /**
                Input - None
                Output - None

                draw function draws the current shape at the shapes x,y
                and with shapes dimensions
            */
            draw: function(params) {
                var me = this,
                    canvas,
                    context;

                //If canvas element is not created, create it and store itss reference in ShapesConstructor
                if (!ShapesConstructor.canvas) {
                    canvas = document.createElement('canvas');
                    //canvas.id = 'ShapesConstructor';
                    canvas.width = canvasConfig.width || (window.innerWidth - 100);
                    canvas.height = canvasConfig.height || window.innerHeight;
                    document.body.appendChild(canvas);
                    ShapesConstructor.canvas = canvas;
                }
                else{
                    canvas = ShapesConstructor.canvas;
                }

                context = canvas.getContext('2d');
                params = params || {};

                context.fillStyle = params.fillStyle || me.fillStyle;

                if (me.type === 'RECTANGLE') {
                    context.fillRect(me.x, me.y, me.width, me.height);
                }
                else if (me.type === 'CIRCLE') {

                    context.beginPath();
                    context.arc(me.x, me.y, me.radius, 0, 2 * Math.PI, false);
                    context.closePath();
                    context.fill();
                }
                else if (me.type === 'TEXT') {
                    context.font = me.font;
                    context.fillText(me.text, me.x, me.y);
                }
            },
            clearShape: function() {
                this.draw({
                    fillStyle: ShapesConstructor.clearColor
                });
            },
            /**
                Input - newx, the newer x position of the shape
                        newy, the newer y position of the shape
                Output - None

                move method will set the x,y of the current shape to the new x,y
                and redraws the current shape and as well as the effected shapes due
                to the movement.Also this moves the current shape to end of the shapes list,
                which is it will have the least depth now.

                if newy/newx is undefined, the current y/x position is used

            */
            move: function(newx, newy) {
                var me = this;

                //Before moving this to the new position, current shape needs to be reset
                // impacted shapes at the current positions need to be redrawn

                me.clearShape();
                me.redrawAffectedShapes();
                if (newx){
                    me.x = newx;
                }
                if (newy) {
                    me.y = newy;
                }

                me.draw();
                /*
                    after this this shape will be having the lowest depth
                    i.e, it is it should be the last element in the shapes list

                    First the neccessary indices are modified and then this element is moved to the last
                */
                ShapesConstructor.decrementDepth(me.index + 1);

                ShapesConstructor.shapes.splice(me.index, 1);
                //The modified length is the index of the current shape
                me.index = ShapesConstructor.shapes.length;
                ShapesConstructor.shapes.push(me);

            },

            /**
                Input - shape, the shape to check
                output - true if shape contains this shape, else false

                contains method will check if this shape is phyiscally
                contained in passed shape

                Assumption:EveryShape is approximated to a rectangle
                This might lead to a slightly more number of redraws

                This method's main use is to determine whether the passed shape has to be
                redrawn due to this shapes movement or change of depth

                This is acheived by checking if any of the corner of the current shape(circle approximated to rectangle) is
                in the passed shape
            */
            contains: function(shape) {

                var me = this,
                    currentRectCoordinates,
                    shapesRectCoordinates,
                    contains = false,
                    isCoordinateinBox;

                currentRectCoordinates = me.getRectCoordinates();
                shapesRectCoordinates = shape.getRectCoordinates();

                //function to check if a given co-ordinate is in the box
                isCoordinateinBox = function(x, y, box) {
                    if ((x >= box.x) &&
                    (x <= box.x + box.width) &&
                    (y >= box.y) &&
                    (y <= box.y + box.height)
                    ) {
                        return true;
                    }
                    return false;
                };

                //Check if any of the four corners is within the shapes box, if any of it is found return true
                //else return false
                //isCoordinateInBox is being used by using 'call' so that it doesnt pollute the global scope

                //check if top left corner of current shape is in passed shape
                if (isCoordinateinBox(currentRectCoordinates.x, currentRectCoordinates.y, shapesRectCoordinates)) {
                    return true;
                }
                //check if top right corner of current shape is in passed shape
                else if (isCoordinateinBox(currentRectCoordinates.x + currentRectCoordinates.width, currentRectCoordinates.y, shapesRectCoordinates)) {
                    return true;
                }
                //check if bottom right corner of current shape is in passed shape
                else if (isCoordinateinBox(currentRectCoordinates.x + currentRectCoordinates.width, currentRectCoordinates.y + currentRectCoordinates.height, shapesRectCoordinates)) {
                    return true;
                }
                //check if bottom left corner of current shape is in passed shape
                else if (isCoordinateinBox(currentRectCoordinates.x, currentRectCoordinates.y + currentRectCoordinates.height, shapesRectCoordinates)) {
                    return true;
                }
                return false;

            },
            /**
                Input - excludeArray, a list of the same length as ShapesConstructor.shapes length
                        which at indices whose shape needs to be ignored while calcualting the containedShapes
                        will have the value of true
                        considerSelf, whether to incldue self in the contained shapes or not
                Output - This will return all list of shapes from ShapesConstructor.shapes which
                        contain this shape

                This functions the contains function for every element in shapes array to calculate the
                contained shapes. it will optionally ignore the truth based indices in the exclude array
                and the modify the exclude array with the corresponding new contained elements
                It looks if the passed shape index is greater than the current shape index then only it needs to be redrawn
                This method will look into whether this shapes containes the other shape or the other shape contains this shape

            */
            containedShapes: function(excludeArray, considerSelf, considerDepth) {
                var me = this,
                    i = 0,
                    length,
                    shapesList,
                    shape,
                    containedShapes = [],
                    includeShape;

                shapesList = ShapesConstructor.shapes;
                length = shapesList.length;
                excludeArray = excludeArray || new Array(length);
                for (; i < length; i++) {
                    //ConsiderSelf in cases of self needs to be redrawn
                    if (i !== me.index || considerSelf) {
                        shape = shapesList[i];
                        //To check if two shapes overlap it is verified by either the passed shape contains this shape or this
                        //shape contains the passed shape
                        //Also of the shape considering depthif it below this shape it neednot be redrawn
                        if (considerDepth) {
                            includeShape = !excludeArray[shape.index] && (me.index <= shape.index );
                        }
                        else{
                            includeShape = !excludeArray[shape.index];
                        }
                        if (includeShape && (me.contains(shape) || shape.contains(me))) {
                            containedShapes.push(shape);
                            //Modify the excludeArray too
                            excludeArray[shape.index] = true;
                        }
                    }
                }
                return containedShapes;
            },
            /**
                Input - consierSelf, boolean value whether to consider self in the affected array
                Output - List of affected shapes

                Affected shapes are those shapes which need to be redrawn when an element is moved from
                its current position without changing the depth order.

                First the shapes' contained shapes are retrieved and then the contained shapes of the contained
                shapes are retrieved and so on.
                While retreiving the contained shapes of contained shapes already contained shapes are ignored.

            */

            affectedShapes: function(considerSelf, considerDepth, affectedShapesData) {
                var me = this,
                    i = 0,
                    length,
                    shapesList,
                    shape,
                    affectedShapes = [],
                    affectedShape,
                    affectedMetaArray;

                shapesList = ShapesConstructor.shapes;
                length = shapesList.length;
                affectedMetaArray = affectedShapesData || new Array(length);

                //First retrieve the first level of contained shapes and maintain the
                //contained shapes in affectedMetaArray
                affectedShapes = me.containedShapes(affectedMetaArray, considerSelf, considerDepth);

                //This is to get the contained shapes of the contained shapes ignoring
                // akready tracked shapes
                while(affectedShapes.length) {
                    affectedShape = affectedShapes.splice(0, 1)[0];
                    affectedShapes = affectedShapes.concat(affectedShape.containedShapes(affectedMetaArray, considerSelf));
                }

                //Based on the affected meta array list out all the shapes ignoring the current shape if considerSelf is false
                for (; i < length; i++) {
                    considerElement = i === me.index ? considerSelf:  true;
                    if (affectedMetaArray[i] && considerElement){
                        affectedShapes.push(shapesList[i]);
                    }
                }
                return {
                    shapes: affectedShapes,
                    metaData: affectedMetaArray
                };
            },
            /**
                Input - shape from which this shape needs to be moved front
                Output -  None

                bringToFront method will bring this shape above the passed shape.
                First ShapesConstructor.shapes is reordered properly and affected containers are redrawn
                This will lead to a redraw of the affected containers
            */
            bringToFront: function(shape) {
                var me = this,
                    myIndex,
                    shapeIndex,
                    shapes;

                myIndex = me.index;
                shapeIndex = shape.index;
                if (myIndex < shapeIndex) {
                    shapes = ShapesConstructor.shapes;
                    //Re-order shapes array
                    ShapesConstructor.decrementDepth(myIndex + 1, shapeIndex);
                    me.index = shapeIndex;
                    shapes.splice(myIndex, 1 );
                    shapes.splice(shapeIndex, 0 , me);

                    //Redraw affected array of the shpae passed, since redrawing affected shapes of this
                    //shape might ignore some shapes due to change of index
                    shape.redrawAffectedShapes(true, true);


                }
                else {
                    if (console) {
                        console.info('Shape already above');
                    }
                }

            },
            /**
                Input- params
                        The new params of the corresponding shape
                        if it is RECTANGLE the new width and height;
                        if it is circle the new radius
                        if it is text the new text
                output - None
                    This function modifies the shape with the new dimensions and in process if
                    shapes needs to redrawn considering depth in mind they will be redrawn
            */
            modifyDimensions: function(params){
                var me = this,
                    width,
                    height,
                    radius,
                    affectedShapes;

                params = params || {};

                //Get the affected shapes before modifying the dimensions, since these also need to be redrawn
                affectedShapes = me.affectedShapes(true).metaData;

                /*
                    Do validations whether the passed parameters are appropriate for the shape
                    type
                */

                if (me.type === 'RECTANGLE'){
                    width = params.width;
                    if(typeof width === 'number' && width >= 0){
                        me.width = params.width;
                    }

                    height = params.height;
                    if(typeof height === 'number' && height >= 0){
                        me.height = params.height;

                    }

                }
                else if(me.type === 'CIRCLE'){
                    radius = me.radius;
                    if(typeof radius === 'number' && radius >= 0){
                        me.radius = params.radius;
                    }

                }
                else if(me.type === 'TEXT'){
                    me.text = params.text || '';
                }

                //Redraw all the affected shapes considering the new dimensions and also including the affected shapes before
                //modifying dimensions
                affectedShapes = me.affectedShapes(true, true, affectedShapes).shapes;
                me.redrawShapes(affectedShapes);

            },
            /**
                Input - shape from which this shape needs to be moved back
                Output -  None

                moveToBackGround method will move this shape below the passed in shape
                First ShapesConstructor.shapes is reordered properly and affected containers are redrawn
                This will lead to a redraw of the affected containers
            */
            moveToBackGround: function(shape) {
                var me = this,
                    myIndex,
                    shapeIndex,
                    shapes;

                myIndex = me.index;
                shapeIndex = shape.index;
                if (myIndex > shapeIndex) {
                    shapes = ShapesConstructor.shapes;
                    //Re-order shapes array
                    ShapesConstructor.decrementDepth(shapeIndex + 1, myIndex);
                    shapes.splice(shapeIndex, 1);
                    shapes.splice(myIndex, 0 , shape);
                    //Change the indices
                    shape.index = myIndex;

                    //re draw affected shapes
                    me.redrawAffectedShapes(true, true);

                }




                else {
                    if (console) {
                        console.info('Shape already below');
                    }
                }
            },
            /**
                Input - None
                Output - None

                this method redraws all the contained shapes for a particular shape
            */
            redrawContainedShapes: function(shape) {
                var me = this,
                    containedShapes;

                containedShapes = me.containedShapes();
                me.redrawShapes(containedShapes);

            },
            /**
                Input - considerSelf whether to redraw self or not
                Output - None

                this method redraws all the affected shapes for a particular shape using
                getAffectedShapes
            */
            redrawAffectedShapes:  function(considerSelf, considerDepth) {
                var me = this,
                    affectedShapes;

                affectedShapes = me.affectedShapes(considerSelf, considerDepth).shapes;
                me.redrawShapes(affectedShapes);
            },
            redrawShapes: function(shapes){
                var i = 0,
                    shapesLength;

                shapesLength = shapes.length;

                for(; i < shapesLength; i++) {
                    shapes[i].draw();
                }
            },
            /**
                Input - None
                Output - rectCoordinates which has x,y,width and height

                This method approximates a shape to a minimal rectangular shape
                and returns the x,y of the top left corner and the width and height

                This is used while to test if a shapes contains another shape

            */
            getRectCoordinates: function() {
                var me = this,
                    currentRectCoordinates,
                    canvas,
                    context,
                    textWidth,
                    fontSize;
                if (me.type === 'RECTANGLE') {

                    currentRectCoordinates = {
                        x: me.x,
                        y: me.y,
                        width: me.width,
                        height: me.height
                    };
                }
                else if (me.type === 'CIRCLE') {
                    //USe radius to approximate width and height of rectangle
                    currentRectCoordinates = {
                        x: me.x -  me.radius,
                        y: me.y -  me.radius,
                        width: 2 * me.radius,
                        height: 2 * me.radius
                    };
                }
                else if (me.type === 'TEXT') {
                    canvas = ShapesConstructor.canvas;
                    context = canvas.getContext('2d');
                    textWidth = context.measureText(me.text).width;
                    fontSize = me.font;
                    currentRectCoordinates = {
                        x: me.x,
                        y: me.y,
                        width: textWidth,
                        height: Number(fontSize.substr(0, fontSize.length - 2))//Assuming px is thr in the font string
                    };
                }

                return currentRectCoordinates;
            }

        };

        ShapesConstructor.clearColor = config.clearColor || '#FFF';
        ShapesConstructor.canvas = config.canvas;
        /*ShapesConstructor function will be used to create shapes for this particular canvas*/
        return ShapesConstructor;
    }
};