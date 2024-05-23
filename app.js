let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let buttons = ["c1","c2","c3","c4"];
let flag = 0;


function GoOutFullscreen() {
	if(document.exitFullscreen)
		document.exitFullscreen();
	else if(document.mozCancelFullScreen)
		document.mozCancelFullScreen();
	else if(document.webkitExitFullscreen)
		document.webkitExitFullscreen();
	else if(document.msExitFullscreen)
		document.msExitFullscreen();
}
function GoInFullscreen(element) {
	if(element.requestFullscreen)
		element.requestFullscreen();
	else if(element.mozRequestFullScreen)
		element.mozRequestFullScreen();
	else if(element.webkitRequestFullscreen)
		element.webkitRequestFullscreen();
	else if(element.msRequestFullscreen)
		element.msRequestFullscreen();
}
function IsFullScreenCurrently() {
	var full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
	
	// If no element is in full-screen
	if(full_screen_element === null)
		return false;
	else
		return true;
}
$("#go-button").on('click', function() {
	if(IsFullScreenCurrently())
		GoOutFullscreen();
	else
		GoInFullscreen($("#element").get(0));
});
$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function() {
	if(IsFullScreenCurrently()) {
		$("#element span").text('Full Screen Mode Enabled');
		$("#go-button").text('Disable Full Screen');
	}
	else {
		$("#element span").text('Full Screen Mode Disabled');
		$("#go-button").text('Enable Full Screen');
	}
});


function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    }, 250)
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250)
}
function myPlay2() {
    var a = document.querySelector('#S');
    a.play();
} ;
function myPlay() {
    var a = document.querySelector('#C');
    a.play();
} ;
function myPlay1() {
    var a = document.querySelector('#E');
    a.play();
} ;

function levelUp(){
    
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIndex = Math.floor(Math.random()*3);
    let randColor = buttons[randIndex];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIndex);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    myPlay();
    gameFlash(randBtn);
    
}

function checkAns(idx){
    // let idx = level - 1;
    if(userSeq[idx] === gameSeq[idx]){
        // console.log("same value");
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML = `Game Over !! Your score was <b>${level}</b><br> press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        myPlay1();
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "black";
        }, 1000);
        reset();
    }
}

function btnPress(){
    console.log(this);
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

document.addEventListener("keypress",function(){
    
    // if(started == false){
    //     started = true;
    // }
    // levelUp();
    if (started == false) {
        myPlay2();
        console.log("Game Started");
        started = true;
        if (flag == 0){
            setTimeout(() => {
                userSeq = [];
                level++;
                h2.innerText = `Level ${level}`;44
                let randIndex = Math.floor(Math.random()*3);
                let randColor = buttons[randIndex];
                let randBtn = document.querySelector(`.${randColor}`);
                // console.log(randIndex);
                // console.log(randColor);
                // console.log(randBtn);
                gameSeq.push(randColor);
                console.log(gameSeq);
                myPlay();
                gameFlash(randBtn);
            }, 2000);
            flag++;
        }
        else{
            levelUp(); 
        }
        // levelUp();      
        
    }
});


let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnPress);
    btn.addEventListener("click",myPlay);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}