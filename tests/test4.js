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
		//After that resize shape1
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

	describe('Test case for testing bringToFront functionality', function(){
		//Check if the the moved shape is
		//at the last and is at the specified co-ordinates
		var imageData,
		 	i,
		 	imageDataLength ;
		shape1.modifyDimensions({
			width: 150,
			height: 150
		});

		it('checking shapes position', function(){
			var shapes = ShapesConstructor.shapes;
			//after resizing shape1 there should be no change in depth order
			expect(shapes[0]).toBe(shape1);
			expect(shapes[1]).toBe(shape2);
			expect(shapes[2]).toBe(shape3);
			//check each shape has the right index after movement
			expect(shape1.index).toBe(0);
			expect(shape2.index).toBe(1);
			expect(shape3.index).toBe(2);


		});

		/*
			1) After resizing shape1 the visible area of shape 1 is divided in 4
			rectangles

			from (50,0) width a width of 150 and height of 10
			from (100,10) with a width of 100 and height of 40
			from (140,50)with a width of 60 and height of 100
			from (50,150) with a width of 150 and height of 10


		*/
		it('checking case 1.1', function(){
			imageData = context.getImageData(50, 0, 150, 10 ).data;
			imageDataLength = imageData.length;
			for( i = 1; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});

		it('checking case 1.2', function(){
			imageData = context.getImageData(100, 10, 100, 40 ).data;
			imageDataLength = imageData.length;
			for( i = 1; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});
		it('checking case 1.3', function(){
			imageData = context.getImageData(140, 50, 60, 100 ).data;
			imageDataLength = imageData.length;
			for( i = 1; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});
		it('checking case 1.4', function(){
			imageData = context.getImageData(50, 140, 90, 10 ).data;
			imageDataLength = imageData.length;
			for( i = 1; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});

		/*
			2) Visible area of shape2 is split into rectangles
			(10,10) with a width and height of 40,90
			(50,10) with a width and height of 50,40
		*/
		it('checking case 2.1', function(){
			imageData = context.getImageData(10, 10, 40, 90 ).data;
			imageDataLength = imageData.length;
			for( i = 2; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});
		it('checking case 2.2', function(){
			imageData = context.getImageData(50, 10, 50, 40 ).data;
			imageDataLength = imageData.length;
			for( i = 2; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});


		/**
			3)from (50,50) with a widht of 90 and height of 90 it should be red since shape 3 is the topmost
		*/
		it('checking case 3', function(){
			imageData = context.getImageData(50, 50, 90, 90 ).data;
			imageDataLength = imageData.length;
			for( i = 0; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});
	});
  };