var shapesfn,
    rectshape,
    i,
    j,
    totalWidth,
    totalHeight,
    squareSize,
    tankimage;





squareSize = 50;
totalWidth = 700;
totalHeight = 300;
shapesfn =  CanvasShapes.init({
    canvasConfig: {
        width: totalWidth,
        height: totalHeight
    }
});
tankimage = new Image();

tankimage.onload = function(){
    for( i = 0; i < totalWidth; i = i + squareSize) {
   for( j = 0; j < totalHeight; j = j + squareSize) {
    rectshape = new shapesfn({
        url: '../img/tank.jpg',
        sourceCoords: {
            sx: i,
            sy: j,
            sw: squareSize,
            sh: squareSize
        },
        x:  i,
        y: j,
        width: squareSize,
        height: squareSize,
        type: 'IMAGE',
        fillStyle: '#0000FF'
    });
    rectshape.paint();
   } 
}

rectshape = new shapesfn({
        url: '../img/fish.jpg',
        sourceCoords: {
            sx: 70,
            sy: 60,
            sw: 120,
            sh: 70
        },
        x: 0,
        y: 0,
        width: 70,
        height: 70,
        type: 'IMAGE',
        fillStyle: '#0000FF'
    });
    rectshape.paint();

    setInterval(function(){
       rectshape.move(Math.floor((Math.random() * 1000) % totalWidth), Math.floor((Math.random() * 1000) % totalHeight));
    }, 1000/5);
};

tankimage.src = '../img/tank.jpg';

