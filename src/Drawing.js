export default function drawLine (startX,startY,endX,endY,context,width,height,thick,color) {
    let convertStartX = (Math.round(width*startX) / 10) * 10;
    let convertStartY = Math.round(height*startY);
    let convertEndX = Math.round(width*endX);
    let convertEndY = Math.round(height*endY);

    context.strokeStyle= "#" + color;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = thick;

    context.beginPath();
    context.moveTo(convertStartX,convertStartY);
    context.lineTo(convertEndX,convertEndY);
    context.closePath();
    context.stroke();
}