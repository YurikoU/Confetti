// https://youtu.be/nnoJCxTUUC0




//Screen size
let screen_w = window.innerWidth;
let screen_h = window.innerHeight;

//Number of paper stripes
const CONFETTI_MAX = 200;

//Paper stripe's color
const COLORS = [
    "#F55", "#55F", "#5C5", "#FA5", "#5AF"
];


//Generate a random integer between min and max
function randomInt ( min, max ) {
    return Math.floor( Math.random() * (max-min+1) + min );
}

//Manage the position and movement
class Confetti {
    constructor () {
        //Create a new HTML element
        this.elm = document.createElement("div");
        document.body.appendChild( this.elm );
        this.sty = this.elm.style;

        //Coordinate on X-axis and Y-axis
        this.x = randomInt( 0, screen_w );
        this.y = randomInt( 0, screen_h );

        this.vectorX = randomInt( -10, 10 );
        this.vectorY = randomInt(   5, 10 );

        this.angle   = 0;
        this.speed   = randomInt( 15, 40 );
        this.rotateX = randomInt( 0, 10 ) / 10;//from 0.0 to 1.0
        this.rotateY = randomInt( 0, 10 ) / 10;//from 0.0 to 1.0
        this.rotateZ = randomInt( 0, 10 ) / 10;//from 0.0 to 1.0

        //Apply CSS styles
        this.sty.position        = "fixed";
        this.sty.width           = '20px';
        this.sty.height          = "10px";
        this.sty.backgroundColor = COLORS[ randomInt(0, COLORS.length) ];//The randomly selected color      
    }

    update () {
        this.x += this.vectorX;
        this.y += this.vectorY;

        //Once a paper stripe reaches the bottom, the coordinate will be reset
        if ( screen_h <= this.y ) {
            this.x = randomInt( 0, screen_w );
            this.y = -20;
        }

        this.angle   += this.speed;
        this.sty.left = this.x + "px";
        this.sty.top  = this.y + 'px';

        this.sty.transform = "rotate3D( " + this.rotateX + ", " + this.rotateY + ", " + this.rotateZ + ", " + this.angle + "deg )";
    }
}


let paperStripes = [];

//Create paper stripes up to the maximum number
for ( let i = 0; i < CONFETTI_MAX; i++ ) {
    paperStripes.push( new Confetti() );
}


setInterval( mainLoop, 1000/20 );

//Each paper stripe moves by 1/20 seconds
function mainLoop () {
    for ( let i = 0; i < paperStripes.length; i++ ) {
        paperStripes[ i ].update();
    }
}