const canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 500;
const savebtn = document.getElementById("save");

let context = canvas.getContext("2d");
let start_background_color="white";
context.fillStyle = start_background_color;
context.fillRect(0,0,canvas.width,canvas.height);

let draw_color = "black";
let eraser_color = "white";
let draw_width = "7";
let is_drawing = false;

let whichbutton= -1;
let Currentmode= "Draw";

let restore_array = [];
let index= -1;

canvas.addEventListener("touchstart",start, false);// mobile
canvas.addEventListener("touchmove",draw, false);  // mobile
canvas.addEventListener("mousedown",start, false);
canvas.addEventListener("mousemove",draw, false);

canvas.addEventListener("touchend",stop, false);   // mobile
canvas.addEventListener("mouseup",stop, false);
canvas.addEventListener("mouseout",stop, false);

canvas.addEventListener('contextmenu', e => {
    e.preventDefault();
  });


savebtn.addEventListener("click",function(e){
    var link = document.createElement("a");
    link.href = canvas.toDataURL("image/png",1.0);
    link.download = "download.png";
    document.body.appendChild(link);
    link.click();
    link.delete;
})

function start(event){
    
    if(event.button==0){
        whichbutton=0;
    }
    else if(event.button==2){
        whichbutton=2;
    }

    is_drawing=true;
    context.beginPath();
    context.moveTo(event.clientX -canvas.offsetLeft,event.clientY - canvas.offsetTop);
    event.preventDefault();


}

function draw(event){
    if(is_drawing){
        context.lineTo(event.clientX -canvas.offsetLeft,event.clientY - canvas.offsetTop);

        if(whichbutton==0){
            context.strokeStyle =draw_color;
            context.lineWidth = draw_width;
        }
        else if(whichbutton==2){
            context.strokeStyle =eraser_color;
            context.lineWidth = draw_width;
}
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
}

function stop(event){
    whichbutton=-1;
    if(is_drawing){
        context.stroke();
        context.closePath();
        is_drawing=false;
    }
    event.preventDefault();
    if(event.type != "mouseout"){
        restore_array.push(context.getImageData(0,0,canvas.width,canvas.height));
        index+=1;
    }
}

function clear_canvas(){
    context.fillStyle = start_background_color;
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillRect(0,0,canvas.width,canvas.height);

    restore_array=[];
    index = -1;
}

function undo(){
    if(index<=0){
        clear_canvas();
    }
    else{
        index -=1;
     restore_array.pop();
     context.putImageData(restore_array[index],0,0);
    }
}

function redo(){

    }

function SwitchColors(mode){

    if(mode!=Currentmode){
        let prevmain=draw_color;
        draw_color=eraser_color
        eraser_color=prevmain;
        Currentmode=mode;
    }
}
