img = "";
status = "";
objects = [];
song = "";

function preload() {
   song = loadSound("bellas_lullaby.mp3");
   img = loadImage("baby.jpg");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw()
{
    image(video, 0, 0, 380, 380); 
    
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);

        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("num_of_obj").innerHTML = "Number of Objects detected are : " + objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person")
            {
                song.stop();
                document.getElementById("status").innerHTML = "Status : Person detected";
            }
            else{
                song.play();
                document.getElementById("status").innerHTML = "Status : No person detected";
            }
            if(objects.length == 0)
            {
                song.play();
                document.getElementById("status").innerHTML = "Status : No person detected"
            }
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResults(error, results)
{
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}