let canvas =document.getElementById("scratch");
let context =canvas.getContext("2d")

const init=()=>{
    let gradientcolor =context.createLinearGradient(0,0,135,135);
    gradientcolor.addColorStop(0,"#c3a3f1");
    gradientcolor.addColorStop(1,"#6414e9")
    context.fillStyle=gradientcolor;
    context.fillRect(0,0,200,200);
}
let mouseX=0;
let mouseY=0;
let isDragged=true;


let events={
    mouse:{
        down:"mousedown",
        move:"mousemove",
        up:"mouseup",
    },
    touch:{
        down:"touchstart",
        move:"touchmove",
        up:"touchend",
    },
};

let deviceType="";

const isTouchDevice=()=>{
       try{
        document.createEvent("TouchEvent")
        deviceType="touch";
        return true;
       }catch(e){
        deviceType="mouse";
        return false;
       }
};

let rectLeft=canvas.getBoundingClientRect().left;
let rectTop =canvas.getBoundingClientRect().top;

const getXY= (e)=>{
    mouseX =(!isTouchDevice()? e.pageX: e.touches[0].pageX)-rectLeft;
    mouseY =(!isTouchDevice()? e.pageY:e.touches[0].pageY)-rectTop;
};

isTouchDevice();

canvas.addEventListener(events[deviceType].down,(events)=>{
    isDragged=true;
    getXY(events);
    scratch(mouseX,mouseY);
});

canvas.addEventListener(events[deviceType].move,(events)=>{
     if(!isTouchDevice()){
        events.preventDefault();
     }
     if(isDragged){
        getXY(events);
        scratch(mouseX,mouseY);
     }
});
canvas.addEventListener(events[deviceType].up,()=>{
    isDragged=false;
});
canvas.addEventListener("mouseleave",()=>{
    isDragged=false;
});
const scratch=(x,y)=>{
    context.globalCompositeOperation="destination-out";
    context.beginPath();
    context.arc(x,y,12,0,2*Math.PI);
    context.fill();
};
window.onload=init();