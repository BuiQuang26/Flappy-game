var c = document.getElementById('canvas');
var ctx = c.getContext("2d");
var screen = window.matchMedia("(max-width: 756px)") //screen > 756px --> x.matches = false
const btnPlay = document.querySelector('.btn-play')
const btnFly = document.querySelector('.btn-fly')
const btnAgain = document.querySelector('.btn-again')
const textGameover = document.querySelector('.game-over')
const scoreNumber = document.querySelector('.score__number')
const figureBird = document.querySelector('.bird')
const figureNgan = document.querySelector('.Ngân')

// secton img 
var form = new Image();
var bird = new Image();
var cottren = new Image();
var cotduoi = new Image();
var dat = new Image();

if (screen.matches){
    form.src = "Hinh-nen-bau-troi-564x1000.jpg";
}
else{
    form.src = "bautroi.jpg";
}

cottren.src = "cot.png"
cotduoi.src = "cot-duoi.png"
dat.src = "dat.png"


var y = 75;
var dy = 1;
var x = 150;
var dcx = 1.5;

var cotx1 = 500;
var cotx2 = 900;
var cotx3 = 1300;

var yTren1 = -200;
var yTren2 = -150;
var yTren3 = -250;

var yDuoi1,yDuoi2,yduoi3;

yDuoi1 = cottren.height + 105 + yTren1;
yDuoi2 = cottren.height + 105 + yTren2;
yDuoi3 = cottren.height + 105 + yTren3;

var click = false;
var score = 0;


function vehinh() {
        ctx.drawImage(form, 0, 0, 600, 400);
        ctx.drawImage(cotduoi, cotx1, yDuoi1);
        ctx.drawImage(cottren, cotx1, yTren1);
        ctx.drawImage(cotduoi, cotx2, yDuoi2);
        ctx.drawImage(cottren, cotx2, yTren2);
        ctx.drawImage(cotduoi, cotx3, yDuoi3);
        ctx.drawImage(cottren, cotx3, yTren3);
        
    ctx.drawImage(bird, x, y);
    ctx.drawImage(dat, 0, 310);
    ctx.drawImage(dat, dat.width, 310);
    
}

var n_move = 0;

function move() {
    // n_move +=1;
    
    // if(n_move === 5)
    // {
        //     click = false;
        //     dy = 1;
        //     n_move = 0;
        // }
        // else{
            // }
            // if (click) {
                //     dy = -2;
                // }
    if (cotx1 < -50) {
        cotx1 = 1300;
        yTren1 = -Math.random() * cottren.height - 100;
        if(ngan){
            yDuoi1 = cottren.height + 200 + yTren1;
        }
        else{
            yDuoi1 = cottren.height + 105 + yTren1;
        }
    }
    if (cotx2 < -50) {
        cotx2 = 1300;
        yTren2 = -Math.random() * cottren.height - 100;
        if(ngan){
            yDuoi2 = cottren.height + 200 + yTren2;
        }
        else{
            yDuoi2 = cottren.height + 105 + yTren2;
        }
    }
    if (cotx3 < -50) {
        cotx3 = 1300;
        yTren3 = -Math.random() * cottren.height - 100;
        if(ngan){
            yDuoi3 = cottren.height + 200 + yTren3;
        }
        else{
            yDuoi3 = cottren.height + 105 + yTren3;
        }
    }
    if (click) {
        
    }
    y += dy;
    cotx1 -= dcx;
    cotx2 -= dcx;
    cotx3 -= dcx;
}

// section control 
var play = false;
btnPlay.addEventListener("click", function () {
    play = true;
});

btnFly.addEventListener("click", function (e) {
    for (var i = 0; i < 10; i++) {
        y += -2;
        vehinh();
    }
});

btnAgain.addEventListener('click', function () {
    location.reload();
});

// chon nhan vat 
var figure = false;
figureBird.addEventListener('click',function (){
    figureBird.style.backgroundColor = "#ff4f23";
    figureNgan.style.backgroundColor = "#fff";
    bird.src = "bird.png";
    figure = true;
    yDuoi1 = cottren.height + 105 + yTren1;
    yDuoi2 = cottren.height + 105 + yTren2;
    yDuoi3 = cottren.height + 105 + yTren3;
    ngan = false;
});

var ngan = false;
figureNgan.addEventListener('click',function (){
    figureNgan.style.backgroundColor = "#ff4f23";
    figureBird.style.backgroundColor = "#fff";
    bird.src = "kimngan0112.png";
    // bird.width = bird.width - 95;
    // bird.height = bird.height - 80;
    figure = true;
    ngan = true;
    yDuoi1 = cottren.height + 200 + yTren1;
    yDuoi2 = cottren.height + 200 + yTren2;
    yDuoi3 = cottren.height + 200 + yTren3;
});

var x_dk = true;
var dk_level = true;
var w_road = 105;

// main app 
window.onload = function anh() {
    if(ngan){
        w_road = 200;
    }
    else{
        w_road = 105;
    }
    // đk game over 
    if (y >= 310 - bird.height || (y < yDuoi1 - w_road ||
            y > yDuoi1 - bird.height) && cotx1 < x + bird.width && x + bird.width < cotx1 + cottren.width+20 ||
        (y < yDuoi2 - w_road ||
            y > yDuoi2 - bird.height) && cotx2 < x + bird.width && x + bird.width < cotx2 + cottren.width+20 ||
        (y < yDuoi3 - w_road ||
            y > yDuoi3 - bird.height) && cotx3 < x + bird.width && x + bird.width < cotx3 + cottren.width+20) {
                // game over
                textGameover.style.display = 'block';

    } else {
        // click --> play 
        if(figure){
            if (play) {
                move();
            }
        }
        // score 
        if (x + bird.width > cotx1 + cottren.width ||
            x + bird.width > cotx2 + cottren.width ||
            x + bird.width > cotx3 + cottren.width) {
            if (x_dk) {
                score += 1;
                document.querySelector('.score__number').innerHTML = score;
            }
            if (x + bird.width > cotx1 + cottren.width ||
                x + bird.width > cotx2 + cottren.width ||
                x + bird.width > cotx3 + cottren.width) {
                x_dk = false;
            }
        } else {
            x_dk = true
        }

        if(score >= 5 && score %  5 == 0){
            if(dk_level){
                dy += 0.2;
                dcx += 0.5;
            }
            if(score >= 5 && score %  5 == 0)
            {
                dk_level = false;
            }
        }else{
            dk_level = true;
        }

        vehinh();
        requestAnimationFrame(anh);
    };
}
