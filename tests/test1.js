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
	    context;


	//Create three shapes, and move the first shapeto a different position
	//check all the indices are correct and then all the shapes are at the correct position
	
	shape1 =  new CanvasShapes({
		x: 10,
		y: 10,
		width: 90,
		height: 90,
		type: 'RECTANGLE',
		fillStyle: '#0000FF'
	});

	shape2 = new CanvasShapes({
		x: 100,
		y: 100,
		width: 90,
		height: 90,
		type: 'RECTANGLE',
		fillStyle: '#00FF00'
	});
	shape3 = new CanvasShapes({
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

	context = CanvasShapes.canvas.getContext('2d');
	describe('Test case for testing move functionality', function(){
		//Check if the the moved shape is
		//at the last and is at the specified co-ordinates
		var imageData,
		 	i,
		 	imageDataLength ;
		

		shape1.move(150, 150);
		

		it('checking shapes position', function(){
			var shapes = CanvasShapes.shapes;
			//after moving, check whether all the shapes in the shape array are in the correct order
			
			//check each reference in the shape array is the right one
			expect(shapes[0]).toBe(shape2);
			expect(shapes[1]).toBe(shape3);
			expect(shapes[2]).toBe(shape1);
			//check each shape has the right index after movement
			expect(shape1.index).toBe(2);
			expect(shape2.index).toBe(0);
			expect(shape3.index).toBe(1);
			
		});
		
		
		/**
			!)from (150,150)  with a width and height of shape1's dimensions should be blue
			since this is the outermost shape and its every pixel should be shown
			
		*/
		it('checking all the pixels in rectangle area of case 1', function(){
			imageData = context.getImageData(150, 150, shape1.width, shape1.height).data;
			imageDataLength = imageData.length;
			for( i = 2; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});


		
		/**
			the visible area of shape2 is divided into 3 rectangles

			from (100,140) with a width and height of 40,40
			from (140,100) with a width and height of 10,90
			from (150,100) with a width and height of 40,50
			
		*/
		it('checking case 2.1', function(){
			imageData = context.getImageData(100, 140, 40, 40 ).data;
			imageDataLength = imageData.length;
			for( i = 1; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});
		it('checking case 2.2', function(){
			imageData = context.getImageData(140, 100, 10, 90 ).data;
			imageDataLength = imageData.length;
			for( i = 1; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});
		it('checking case 2.3', function(){
			imageData = context.getImageData(150, 100, 40, 50 ).data;
			imageDataLength = imageData.length;
			for( i = 1; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});

		/**
			shape3 should also be completely visible
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