//background
let gameScreen = 0;
let bg0, bg1, bg2, bg3, bg4;//回家背景

//ending
let goodend, badend;

//characters
let teacher, holylights = [], walker, black;

//buttons
let StartGamebtn, Introductionbtn, NextPagebtn, ToGamebtn;

//timer
let timer = 20;

//points
let score = 3;
let point0, point1, point2, point3;

//items
// let spray,umbrella,whistle,earphone,hands;
let items = [];

//music
let sounds = [];


let start = false;

function preload() {
    //black
    black = createSprite(100, 450);

    //background
    bg0 = loadImage('assets/OpenBG.png');
    bg1 = loadImage('assets/explain1.png');
    bg2 = loadImage('assets/explain2.png');
    bg3 = loadImage('assets/bg.jpg');
    bg4 = loadImage('assets/sweethome.jpg');//載回家圖片

    //buttons
    StartGamebtn = loadImage('assets/entrybutton.png');
    Introductionbtn = loadImage('assets/explainbutton.png');
    NextPagebtn = loadImage('assets/nextstep.png');
    ToGamebtn = loadImage('assets/entrybutton.png');

    //ending
    goodend = loadImage('assets/welcome_home.png');//好結局圖片
    badend = loadImage('assets/gameover.png');//好結局圖片

    //icon
    point0 = loadImage('assets/light0.png')
    point1 = loadImage('assets/light1.png');
    point2 = loadImage('assets/light2.png');
    point3 = loadImage('assets/light3.png');

    //teacher
    teacher = loadImage('assets/teacher01.png');//教官圖片
    teacher.scale = 15;//教官大小

    //walker
    walker = createSprite(400, 450);
    walker.scale = 0.05;

    //items
    items[0] = createSprite(1024, 500);
    items[0].addImage('items[0]', loadImage('assets/spray.png'))
    items[0].scale = 0.05;
    items[1] = createSprite(600, 470);
    items[1].addImage('items[1]', loadImage('assets/umbrella.png'))
    items[1].scale = 0.05;
    items[2] = createSprite(600, 580);
    items[2].addImage('items[2]', loadImage('assets/whistle.png'))
    items[2].scale = 0.08;
    items[3] = createSprite(1024, 480);
    items[3].addImage('items[3]', loadImage('assets/earphones.png'))
    items[3].scale = 0.06;
    items[4] = createSprite(1024, 560);
    items[4].addImage('items[4]', loadImage('assets/hands.png'))
    items[4].scale = 0.08;
    //numbers
    items[5] = createSprite(1024, 620);
    items[5].addImage('items[5]', loadImage('assets/wrong1.png'));
    items[5].scale = 0.5;
    items[6] = createSprite(1024, 450);
    items[6].addImage('items[6]', loadImage('assets/correct1.png'));
    items[6].scale = 0.5;


    // music
    sounds.gameProcess = createAudio('assets/dangerousmusic.mp3');
    sounds.mainScreenMusic = createAudio('assets/mainScreenmusic.mp3');
    sounds.successMusic = createAudio('assets/successMusic.mp3');
    sounds.gameoverMusic = createAudio('assets/gameOverMusic.mp3')
    // soundgameProcess = loadSound('assets/dangerousmusic.mp3');

}

function setup() {
    createCanvas(1024, 768);
    //black animation moving
    black.addAnimation('black', loadAnimation('assets/black1.png', 'assets/black2.png', 'assets/black3.png', 'assets/black4.png', 'assets/black5.png', 'assets/black6.png', 'assets/black7.png', 'assets/black8.png', 'assets/black9.png', 'assets/black10.png'));
    //black.setVelocity(5, 0);
    black.visible = false;
    //walker
    walker.addAnimation('walker', loadAnimation('assets/walk1.png', 'assets/walk2.png'));
    //buttons
    btnStartGame = createSprite(200, 550);
    btnIntroduction = createSprite(800, 550);
    btnStartGame.addImage('btnStartGame', StartGamebtn);
    btnIntroduction.addImage('btnIntroduction', Introductionbtn);
    btnNextPage = createSprite(800, 300);
    btnNextPage.addImage('btnNextPage', NextPagebtn);
    btnToGame = createSprite(800, 100);
    btnToGame.addImage('btnToGame', ToGamebtn);

    //ending
    wintheGame = createSprite(500, 400);
    wintheGame.addImage('wintheGame', goodend);
    wintheGame.visible = false;
    losttheGame = createSprite(500, 400);
    losttheGame.addImage('losttheGame', badend);
    losttheGame.visible = false;


    //holy lights
    for (let i = 0; i < 4; i++) {
        holylights[i] = createSprite(200 + i * 100, 0);
        holylights[i].addImage(`holylights`, loadImage('assets/holylight02.png'));
        holylights[i].visible = false;
    }

    holylights[0].setVelocity(0, 10);//仿作業之聖光速度
    holylights[1].setVelocity(0, 12);//仿作業之聖光速度
    holylights[2].setVelocity(0, 7);//仿作業之聖光速度
    holylights[3].setVelocity(0, 8);//仿作業之聖光速度

    //teacher
    superteacher = createSprite(500, 0);//教官產生
    superteacher.addImage('superteacher', teacher);//教官產生
    superteacher.visible = false;//教官暫不出現
    // superteacher.setVelocity(0,1)

    //score
    Score = createSprite(130, 60);
    Score.addImage('0', point0);
    Score.addImage('1', point1);
    Score.addImage('2', point2);
    Score.addImage('3', point3);
    Score.changeImage('3');

    //items
    items[0].setVelocity(-1, 0);
    items[1].setVelocity(-1.9, 0);
    items[2].setVelocity(-2.6, 0);
    items[3].setVelocity(-7, 0);
    items[4].setVelocity(-6.2, 0);
    items[5].setVelocity(-2.7, 0);
    items[6].setVelocity(-0.2, 0);

    //music
    // soundgameProcess.loop();


}

function draw() {
    walker.setCollider("rectangle", 0, 0, 50, 50);
    walker.debug = true;

    if (gameScreen == 0) {
        mainScreen();
    } else if (gameScreen == 1) {
        gameInformation1();
    } else if (gameScreen == 2) {
        gameInformation2();
    } else if (gameScreen == 3) {

        gameStart();
        //過去再回來
        for (let i = 0; i < items.length; i++) {
            if (items[i].position.x <= 0) {
                items[i].position.x = 1024;
                items[i].position.y = random(500, 650);  //random的部分//取範圍
                items[i].visible = true;
            }
        }
        // sounds.gameProcess.play();
    } else if (gameScreen == 4) {
        gameOver();

    } else if (gameScreen == 5) {
        gameWinTeacher();
    } else if (gameScreen == 6) {
        gameWin();
    }
    //moving
    if (keyIsDown(UP_ARROW)) {
        walker.setVelocity(0, -2);
        if (walker.position.y <= 400) {
            walker.setVelocity(0, 0);
        }
    } else if (keyIsDown(DOWN_ARROW)) {
        walker.setVelocity(0, 2);
        if (walker.position.y >= 650) {
            walker.setVelocity(0, 0);
        }
    }


    //icon

    drawSprites();

}

//music
function mainScreen() {

    background(bg0);

    btnStartGame.setCollider("rectangle", 200, 550, 200, 200);
    btnStartGame.setDefaultCollider();
    btnStartGame.mouseActive = true;

    btnIntroduction.setCollider("rectangle", 800, 550, 100, 100);
    btnIntroduction.setDefaultCollider();
    btnIntroduction.mouseActive = true;
    btnNextPage.visible = false;
    btnToGame.visible = false;
    Score.visible = false;
    for (let i = 0; i < 7; i++) {
        items[i].visible = false;
    }


    if (btnStartGame.mouseIsPressed) {
        start = true;
        gameScreen = 3;
        btnStartGame.visible = false;
        btnIntroduction.visible = false;
        for (let i = 0; i < 7; i++) {
            items[i].visible = true;
        }


    }
    if (btnIntroduction.mouseIsPressed) {
        gameScreen = 1
        btnStartGame.visible = false;
        btnIntroduction.visible = false;
        walker.visible = false;
        btnNextPage.visible = true;
        for (let i = 0; i < 7; i++) {
            items[i].visible = false;
        }
    }


}

function gameInformation1() {
    background(bg1);
    btnNextPage.setCollider("rectangle", 800, 300, 200, 200);
    btnNextPage.setDefaultCollider();
    btnNextPage.mouseActive = true;
    btnToGame.visible = false;
    // black.visible = false;


    if (btnNextPage.mouseIsPressed) {
        gameScreen = 2
        btnNextPage.visible = false;
        for (let i = 0; i < 7; i++) {
            items[i].visible = false;
        }
    }
}

function gameInformation2() {
    background(bg2);
    btnToGame.setCollider("rectangle", 800, 100, 200, 200);
    btnToGame.setDefaultCollider();
    btnToGame.mouseActive = true;
    btnToGame.visible = true;


    if (btnToGame.mouseIsPressed) {
        gameScreen = 3;
        start = true;
        btnToGame.visible = false;
        for (let i = 0; i < 7; i++) {
            items[i].visible = false;
        }
    }
}

function changeLight() {
    console.log(score);
    if (score == 3) {
        Score.changeImage('3');
    } else if (score == 2) {
        Score.changeImage('2');
    } else if (score == 1) {
        Score.changeImage('1');
    } else {
        Score.changeImage('0');
        gameOver();
    }
}

function gameStart() {
    background(bg3);
    if (start == false) return;

    walker.visible = true;
    // for(let i = 0;i<7 ;i++){
    //     items[i].visible=true;
    // }
    Score.visible = true;
    timer.visible = true;//計時器出現

    //timer
    textAlign(CENTER, CENTER);//計時器字型
    textSize(50);//計時器字型
    fill("white");//計時器字型
    text(timer, 900, 100);//計時器字型
    noStroke();//計時器字型

    if (frameCount % 60 == 0 && timer > 0) {//計時器算法，未與得分搭配
        timer--;//計時器算法
    }//計時器算法
    if (timer == 0) {
        gameWin();
    }//聖光移動


    for (let i = 0; i < 7; i++) {
        items[i].setDefaultCollider();
        items[i].debug = true;
        let distance = items[i].position.x - walker.position.x;
        if (items[i].overlap(walker) && items[i].visible) {
            console.log("撞到:" + i);

            items[i].visible = false;
            if (i < 3 && score < 3) {
                score++;
                changeLight();
            } else if (i >= 3 && i < 6 && score > 0) {
                score--;
                changeLight();
            } else if (i == 6) {
                gameWinTeacher();
            }
        } else if (items[i].position.x < walker.position.x) {
            items[i].visible = false;
        }
    }
}

function gameWinTeacher() {
    start = false;
    gameScreen = 5;
    background(bg3);
    timer.visible = false;
    // holy light
    for (let i = 1; i < 4; i++) {
        holylights[i].visible = true;
        if (holylights[i].position.y >= 330) {
            holylights[i].position.y = 0;
            holylights[i].position.x = random(0, 1024);
        }
    }
    //teacher
    superteacher.visible = true;
    if (superteacher.position.y <= 200) {
        superteacher.setVelocity(0, 20);
    } else if (superteacher.position.y >= 200) {
        superteacher.setVelocity(0, 0);
    }
    wintheGame.visible = true;
    for (let i = 0; i < 7; i++) {
        items[i].visible = false;
    }
    walker.visible = false;
}


function gameWin() {
    background(bg4);
    wintheGame.visible = true;
    superteacher.visible = false;
    walker.visible = false;
    for (let i = 0; i < 4; i++) {
        holylights[i].visible = false;
    }
    for (let i = 0; i < 7; i++) {
        items[i].visible = false;
    }

}

function gameOver() {
    start = false;
    losttheGame.visible = true;
    for (let i = 0; i < 7; i++) {
        items[i].visible = false;
    }
    black.visible = true;
    black.setVelocity(4, 0);
    black.scale = 2.5;
    //walker.setVelocity(11,0)
    if (black.overlap(walker)) {
        walker.visible = false;
    }
    // if (black.overlap(walker) && black.positionY >= walker.positionY) {
    //     walker.visible = false;
    // }
}


function preload() {
    //black
    black = createSprite(100, 450);

    //background
    bg0 = loadImage('assets/OpenBG.png');
    bg1 = loadImage('assets/explain1.png');
    bg2 = loadImage('assets/explain2.png');
    bg3 = loadImage('assets/bg.jpg');
    bg4 = loadImage('assets/sweethome.jpg');//載回家圖片

    //buttons
    StartGamebtn = loadImage('assets/entrybutton.png');
    Introductionbtn = loadImage('assets/explainbutton.png');
    NextPagebtn = loadImage('assets/nextstep.png');
    ToGamebtn = loadImage('assets/entrybutton.png');

    //ending
    goodend = loadImage('assets/welcome_home.png');//好結局圖片
    badend = loadImage('assets/gameover.png');//好結局圖片

    //icon
    point0 = loadImage('assets/light0.png')
    point1 = loadImage('assets/light1.png');
    point2 = loadImage('assets/light2.png');
    point3 = loadImage('assets/light3.png');

    //teacher
    teacher = loadImage('assets/teacher01.png');//教官圖片
    teacher.scale = 15;//教官大小

    //walker
    walker = createSprite(400, 450);
    walker.scale = 0.05;

    //items
    items[0] = createSprite(1024, 500);
    items[0].addImage('items[0]', loadImage('assets/spray.png'))
    items[0].scale = 0.05;
    items[1] = createSprite(600, 470);
    items[1].addImage('items[1]', loadImage('assets/umbrella.png'))
    items[1].scale = 0.05;
    items[2] = createSprite(600, 580);
    items[2].addImage('items[2]', loadImage('assets/whistle.png'))
    items[2].scale = 0.08;
    items[3] = createSprite(1024, 480);
    items[3].addImage('items[3]', loadImage('assets/earphones.png'))
    items[3].scale = 0.06;
    items[4] = createSprite(1024, 560);
    items[4].addImage('items[4]', loadImage('assets/hands.png'))
    items[4].scale = 0.08;
    //numbers
    items[5] = createSprite(1024, 620);
    items[5].addImage('items[5]', loadImage('assets/wrong1.png'));
    items[5].scale = 0.5;
    items[6] = createSprite(1024, 450);
    items[6].addImage('items[6]', loadImage('assets/correct1.png'));
    items[6].scale = 0.5;


    // music
    sounds.gameProcess = createAudio('assets/dangerousmusic.mp3');
    sounds.mainScreenMusic = createAudio('assets/mainScreenmusic.mp3');
    sounds.successMusic = createAudio('assets/successMusic.mp3');
    sounds.gameoverMusic = createAudio('assets/gameOverMusic.mp3')
    // soundgameProcess = loadSound('assets/dangerousmusic.mp3');

    // gameProcess = loadSound('assets/dangerousmusic.mp3')
    // mainScreenMusic=
    // successMusic
    // gameoverMusic
}

function setup() {
    createCanvas(1024, 768);
    //black animation moving
    black.addAnimation('black', loadAnimation('assets/black1.png', 'assets/black2.png', 'assets/black3.png', 'assets/black4.png', 'assets/black5.png', 'assets/black6.png', 'assets/black7.png', 'assets/black8.png', 'assets/black9.png', 'assets/black10.png'));
    //black.setVelocity(5, 0);
    black.visible = false;
    //walker
    walker.addAnimation('walker', loadAnimation('assets/walk1.png', 'assets/walk2.png'));
    //buttons
    btnStartGame = createSprite(200, 550);
    btnIntroduction = createSprite(800, 550);
    btnStartGame.addImage('btnStartGame', StartGamebtn);
    btnIntroduction.addImage('btnIntroduction', Introductionbtn);
    btnNextPage = createSprite(800, 300);
    btnNextPage.addImage('btnNextPage', NextPagebtn);
    btnToGame = createSprite(800, 100);
    btnToGame.addImage('btnToGame', ToGamebtn);

    //ending
    wintheGame = createSprite(500, 400);
    wintheGame.addImage('wintheGame', goodend);
    wintheGame.visible = false;
    losttheGame = createSprite(500, 400);
    losttheGame.addImage('losttheGame', badend);
    losttheGame.visible = false;


    //holy lights
    for (let i = 0; i < 4; i++) {
        holylights[i] = createSprite(200 + i * 100, 0);
        holylights[i].addImage(`holylights`, loadImage('assets/holylight02.png'));
        holylights[i].visible = false;
    }

    holylights[0].setVelocity(0, 10);//仿作業之聖光速度
    holylights[1].setVelocity(0, 12);//仿作業之聖光速度
    holylights[2].setVelocity(0, 7);//仿作業之聖光速度
    holylights[3].setVelocity(0, 8);//仿作業之聖光速度

    //teacher
    superteacher = createSprite(500, 0);//教官產生
    superteacher.addImage('superteacher', teacher);//教官產生
    superteacher.visible = false;//教官暫不出現
    // superteacher.setVelocity(0,1)

    //score
    Score = createSprite(130, 60);
    Score.addImage('0', point0);
    Score.addImage('1', point1);
    Score.addImage('2', point2);
    Score.addImage('3', point3);
    Score.changeImage('3');

    //items
    items[0].setVelocity(-0.7, 0);
    items[1].setVelocity(-0.3, 0);
    items[2].setVelocity(-1, 0);
    items[3].setVelocity(-0.5, 0);
    items[4].setVelocity(-1.2, 0);
    items[5].setVelocity(-0.145, 0);
    items[6].setVelocity(-2, 0);

    //music
    // soundgameProcess.loop();


}

function draw() {
    walker.setCollider("rectangle", 0, 0, 50, 50);
    // walker.debug = true;

    if (gameScreen == 0) {
        mainScreen();
    } else if (gameScreen == 1) {
        gameInformation1();
    } else if (gameScreen == 2) {
        gameInformation2();
    } else if (gameScreen == 3) {

        gameStart();
        //過去再回來
        for (let i = 0; i < items.length; i++) {
            if (items[i].position.x <= 0) {
                items[i].position.x = 1024;
                items[i].position.y = random(500, 650);  //random的部分//取範圍
                items[i].visible = true;
            }
        }
        // sounds.gameProcess.play();
    } else if (gameScreen == 4) {
        gameOver();

    } else if (gameScreen == 5) {
        gameWinTeacher();
    } else if (gameScreen == 6) {
        gameWin();
    }
    //moving
    if (keyIsDown(UP_ARROW)) {
        walker.setVelocity(0, -2);
        if (walker.position.y <= 400) {
            walker.setVelocity(0, 0);
        }
    } else if (keyIsDown(DOWN_ARROW)) {
        walker.setVelocity(0, 2);
        if (walker.position.y >= 650) {
            walker.setVelocity(0, 0);
        }
    } else if (keyIsDown(RIGHT_ARROW)) {
        walker.setVelocity(2, 0);
    } else if (keyIsDown(LEFT_ARROW)) {
        walker.setVelocity(-2, 0);
    } else {
        walker.setVelocity(0, 0);
    }


    //icon

    drawSprites();

}

//music
function mainScreen() {

    background(bg0);

    btnStartGame.setCollider("rectangle", 200, 550, 200, 200);
    btnStartGame.setDefaultCollider();
    btnStartGame.mouseActive = true;

    btnIntroduction.setCollider("rectangle", 800, 550, 100, 100);
    btnIntroduction.setDefaultCollider();
    btnIntroduction.mouseActive = true;
    btnNextPage.visible = false;
    btnToGame.visible = false;
    Score.visible = false;
    for (let i = 0; i < 7; i++) {
        items[i].visible = false;
    }


    if (btnStartGame.mouseIsPressed) {
        start = true;
        gameScreen = 3;
        btnStartGame.visible = false;
        btnIntroduction.visible = false;
        for (let i = 0; i < 7; i++) {
            items[i].visible = true;
        }


    }
    if (btnIntroduction.mouseIsPressed) {
        gameScreen = 1
        btnStartGame.visible = false;
        btnIntroduction.visible = false;
        walker.visible = false;
        btnNextPage.visible = true;
        for (let i = 0; i < 7; i++) {
            items[i].visible = false;
        }
    }


}

function gameInformation1() {
    background(bg1);
    btnNextPage.setCollider("rectangle", 800, 300, 200, 200);
    btnNextPage.setDefaultCollider();
    btnNextPage.mouseActive = true;
    btnToGame.visible = false;
    // black.visible = false;


    if (btnNextPage.mouseIsPressed) {
        gameScreen = 2
        btnNextPage.visible = false;
        for (let i = 0; i < 7; i++) {
            items[i].visible = false;
        }
    }
}

function gameInformation2() {
    background(bg2);
    btnToGame.setCollider("rectangle", 800, 100, 200, 200);
    btnToGame.setDefaultCollider();
    btnToGame.mouseActive = true;
    btnToGame.visible = true;


    if (btnToGame.mouseIsPressed) {
        gameScreen = 3;
        start = true;
        btnToGame.visible = false;
        for (let i = 0; i < 7; i++) {
            items[i].visible = false;
        }
    }
}

function changeLight() {
    console.log(score);
    if (score == 3) {
        Score.changeImage('3');
    } else if (score == 2) {
        Score.changeImage('2');
    } else if (score == 1) {
        Score.changeImage('1');
    } else {
        Score.changeImage('0');
        gameOver();
    }
}

function gameStart() {
    background(bg3);
    if (start == false) return;

    walker.visible = true;
    // for(let i = 0;i<7 ;i++){
    //     items[i].visible=true;
    // }
    Score.visible = true;
    timer.visible = true;//計時器出現

    //timer
    textAlign(CENTER, CENTER);//計時器字型
    textSize(50);//計時器字型
    fill("white");//計時器字型
    text(timer, 900, 100);//計時器字型
    noStroke();//計時器字型

    if (frameCount % 60 == 0 && timer > 0) {//計時器算法，未與得分搭配
        timer--;//計時器算法
    }//計時器算法
    if (timer == 0) {
        gameWin();
    }//聖光移動


    for (let i = 0; i < 7; i++) {
        items[i].setDefaultCollider();
        // items[i].debug = true;
        let distance = items[i].position.x - walker.position.x;
        if (items[i].overlap(walker) && items[i].visible) {
            console.log("撞到:" + i);

            items[i].visible = false;
            if (i < 3 && score < 3) {
                score++;
                changeLight();
            } else if (i >= 3 && i < 6 && score > 0) {
                score--;
                changeLight();
            } else if (i == 6) {
                gameWinTeacher();
            }
        } else if (items[i].position.x < walker.position.x) {
            items[i].visible = false;
        }
    }
}

function gameWinTeacher() {
    start = false;
    gameScreen = 5;
    background(bg3);
    timer.visible = false;
    // holy light
    for (let i = 1; i < 4; i++) {
        holylights[i].visible = true;
        if (holylights[i].position.y >= 330) {
            holylights[i].position.y = 0;
            holylights[i].position.x = random(0, 1024);
        }
    }
    //teacher
    superteacher.visible = true;
    if (superteacher.position.y <= 200) {
        superteacher.setVelocity(0, 20);
    } else if (superteacher.position.y >= 200) {
        superteacher.setVelocity(0, 0);
    }
    wintheGame.visible = true;
    for (let i = 0; i < 7; i++) {
        items[i].visible = false;
    }
    walker.visible = false;
}


function gameWin() {
    background(bg4);
    wintheGame.visible = true;
    superteacher.visible = false;
    walker.visible = false;
    for (let i = 0; i < 4; i++) {
        holylights[i].visible = false;
    }
    for (let i = 0; i < 7; i++) {
        items[i].visible = false;
    }

}

function gameOver() {
    start = false;
    losttheGame.visible = true;
    for (let i = 0; i < 7; i++) {
        items[i].removed = true;
    }
    black.setDefaultCollider();
    // black.debug = true;
    if(black.visible = true){
        walker.removed = true;
    }
    black.setVelocity(4, 0);
    black.scale = 2.5;
    //walker.setVelocity(11,0)
    // let distance = black.position.x - walker.position.x;
    // if (black.overlap(walker) && distance > 0) {
    //     walker.removed = true;
    //     console.log('je')
    // if (black.overlap(walker) && black.positionY >= walker.positionY) {
    //     walker.visible = false;
    // }
}
