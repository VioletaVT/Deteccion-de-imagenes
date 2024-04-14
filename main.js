img= "";
estado= "";
objetos= [];
function preload(){
    img= loadImage("dog_cat.jpg");
}

function setup(){
    canvas= createCanvas(640,420);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML= "Status: detectando objetos";
}

function modelLoaded(){
    console.log("Modelo cargado");
    estado= true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error,results){
   if (error) {
     console.error(error);
   }
   console.log(results);

   objetos= results;
}

function draw(){
    image(img,0,0,640,420);
    /*fill("red");
    text("perro",45,75);
    noFill();
    stroke("red");
    rect(30,60,450,350);
    fill("blue");
    text("gato",320,120);
    noFill();
    stroke("blue");
    rect(300,90,270,320);*/

    if (estado!=""){
        for (var i=0; i<objetos.length; i++){
            document.getElementById("status").innerHTML= "Status: objeto detectado";
            fill("red");
            porcentaje= floor(objetos[i].confidence*100);
            text(objetos[i].label+" "+porcentaje+"%",objetos[i].x+15,objetos[i].y+15);
            noFill();
            stroke("red");
            rect(objetos[i].x,objetos[i].y,objetos[i].width,objetos[i].height);
        }
    }

}
