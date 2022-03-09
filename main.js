img="";
status1="";
objects=[];
var sound="";

function preload(){
    img=loadImage("luggage-1650171_640.jpg");
    sound=loadSound("danger_warning.mp3");
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status1!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        object_detector.detect(video, gotresult);
       for(i=0;i<objects.length;i++){
           document.getElementById("status").innerHTML="status:object detected";
           if(objects[i].label==object_name){
               document.getElementById("status").innerHTML="Status: "+ object_name +" found";
               sound.stop();
           }
           else{
            document.getElementById("status").innerHTML="Status: "+ object_name +" Not found";
            sound.play();
           }
           fill(r, g, b)
           percent=floor(objects[i].confidence*100);
           text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
           noFill();
           stroke(r, g, b);
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       }
    }

}

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}
function modelloaded(){
    console.log("model is loaded");
    status1=true;
   
}

function gotresult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
function start(){
    object_detector=ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
    object_name=document.getElementById("item").value;
}