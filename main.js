song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristscore = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup() { canvas = createCanvas(500, 500); canvas.center(); video = createCapture(VIDEO); video.hide(); video.size(500,500); pose = ml5.poseNet(video, modelLoaded); pose.on('pose', gotposes); }

function modelLoaded() {
    console.log('poseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    if(leftWristscore >0.2)
    {
        fill("blue");
        stroke("blue");
        circle(leftWristX, leftWristY, 20);
        numberleftWrist = Number(leftWristY);
        remove_decimals = floor(numberleftWrist);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

    

function play()
{
    song.play()
    song.setVolume(1);
    song.rate(1);
}

function gotposes(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristscore = results[0].pose.keypoints[9].score;
        console.log("leftWristscore = " + leftWristscore);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY"+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY"+ rightWristY);
    }
}