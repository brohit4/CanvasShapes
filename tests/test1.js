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
		shape1.fillStyle = '#0000FF';
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
		
		it('checking all the pixels in rectangle area', function(){
			imageData = context.getImageData(150, 150, shape1.width, shape1.height).data;
			imageDataLength = imageData.length;
			for( i = 2; i < imageDataLength; i = i +4){
					expect(imageData[i]).toBe(255);
			}
		});

	});	
	
  };