/*

	Test cases are written for rectangle shapes only to test basic functionality
	since testing for shapes like circle and text is little difficult
	it is the assumption that testing for rectangle will suffice to test move,bringToFront,moveTobackground
	wfunctionalities, since the difference is only in how the shapes is, all the rendering,moving logic is the same
*/

var currentWindowOnload = window.onload;
  window.onload = function() {
    if (currentWindowOnload) {
      currentWindowOnload();
    }

    var shape1,
	    shape2,
	    shape3,
	    context,
	    ShapesConstructor;


	//Create three shapes, and paint them
	//After that move shape3 backwards with respect to shape2
	//then make sure all the indices are properly arranged and all the pixels are right
	ShapesConstructor = CanvasShapes.init();
	shape1 = new ShapesConstructor({
		x: 50,
		y: 0,
		width: 90,
		height: 90,
		type: 'RECTANGLE',
		fillStyle: '#00FF00'
	});

	shape2 =  new ShapesConstructor({
		x: 10,
		y: 10,
		width: 90,
		height: 90,
		type: 'RECTANGLE',
		fillStyle: '#0000FF'
	});


	shape3 = new ShapesConstructor({
		x: 50,
		y: 50,
		width: 90,
		height: 90,
		type: 'RECTANGLE',
		fillStyle: '#FF0000'
	});

	shape1.paint();
	shape2.paint();
	shape3.paint();

	context = ShapesConstructor.canvas.getContext('2d');
	describe('Test case for testing move functionality', function(){
		//Check if the the moved shape is
		//at the last and is at the specified co-ordinates
		var imageData,
		 	i,
		 	imageDataLength ;

		shape3.moveToBackGround(shape2);
		it('checking shapes position', function(){
			var shapes = ShapesConstructor.shapes;
			//after moving, check whether all the shapes in the shape array are in the correct order

			//check each reference in the shape array is the right one
			expect(shapes[0]).toBe(shape1);
			expect(shapes[1]).toBe(shape3);
			expect(shapes[2]).toBe(shape2);
			//check each shape has the right index after movement
			expect(shape1.index).toBe(0);
			expect(shape2.index).toBe(2);
			expect(shape3.index).toBe(1);

		});

		/**
			After this movement the pixels in the canvas should be like this
			1 and 2 constitute the visible area of shape 1
			!)from(50, 0) width of 90 and height of 10 it should be green
			2)from (100,10) with a width of 40 and height of 40 it should be green



			3 constitiues visible area of shape 2
			3)from (10,10) with a width of 90, height of 90 it should be blue since blue is the outmost element


			4,5 constitute visible area of shape3
			4)from (100,50) with a widht of 40 and height of 50 it should be red
			5)from (50, 100) with a width of 90 and height 0f 40 it should be red
		*/

		/*
			!)from(50, 0) width of 90 and height of 10 it should be green
			2)from (100,10) with a width of 40 and height of 40 it should be green

		*/
		it('checking case 1', function(){
			imageData = context.getImageData(50, 0, 90, 10 ).data;
			imageDataLength = imageData.length;
			for( i = 1; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});

		it('checking case 2', function(){
			imageData = context.getImageData(100, 10, 40, 40 ).data;
			imageDataLength = imageData.length;
			for( i = 1; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});
		/**	3 constitiues visible area of shape 2
			3)from (10,10) with a width of 90, height of 90 it should be blue since blue is the outmost element

		*/

		it('checking case 3', function(){
			imageData = context.getImageData(10, 10, 90, 90 ).data;
			imageDataLength = imageData.length;
			for( i = 2; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});
		/**
			4,5 constitute visible area of shape3
			4)from (100,50) with a widht of 40 and height of 50 it should be red
			5)from (50, 100) with a width of 90 and height 0f 40 it should be red
		*/

		it('checking case 4', function(){
			imageData = context.getImageData(100, 50, 40, 50 ).data;
			imageDataLength = imageData.length;
			for( i = 0; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});

		it('checking case 5', function(){
			imageData = context.getImageData(50, 100, 90, 40 ).data;
			imageDataLength = imageData.length;
			for( i = 0; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});

	});

  };