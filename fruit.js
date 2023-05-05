Status = "";
fruit_image = "";
objects = [];

function preload()
{
    fruit_image = loadImage("fruit basket.jpg");
}

function setup()
{
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}

function modelLoaded()
{
    console.log("model loaded!");
    Status = true;
    object_detector.detect(fruit_image,gotResults);
}
function gotResults(results,error)
{
    if(error)
    {
        console.error(error)
    }
    console.log(results);
    objects = results;
}
function draw()
{
    image(fruit_image,0,0,640,350);
    if(Status != "")
    {
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#fc0303")
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x - 100, objects[i].y - 100);
            noFill();
            stroke("#fc0303");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}