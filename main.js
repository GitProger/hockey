var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, canvas.width, canvas.height);

/*    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);
    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
*/
var player = {x: 50,  y: 160, count: 0};
var robot  = {x: 430, y: 160, count: 0};

function isTouch(a, b, c, c_x, c_y, r) {
    return ((Math.abs(a * c_x + b * c_y + c)) / Math.sqrt(a * a + b * b) ) <= r;
}

function rand(i) {
    return Math.floor(Math.random() * i);
}

class ball {
    constructor(x, y) {
        this.x = canvas.width  / 2;         
        this.y = canvas.height / 2;
        this.v_x = 1;
        this.v_y = 1;        
        this.color = "red";
        this.bor_x = x;
        this.bor_y = y;
        this.y_pointOfHit = 0;
    }

    move() {
        this.x += this.v_x;
        this.y += this.v_y;
        if ((this.x >= this.bor_x - 5) || (this.x <= 0 + 5)) {
            this.v_x *= -1;
            if ((this.x >= this.bor_x - 5)) 
                player.count++;
            else
                robot.count++; 
        }
        if ((this.y >= this.bor_y - 5) || (this.y <= 0 + 5))
            this.v_y *= -1;
        if (
            ((isTouch(1, 0, -50, this.x, this.y, 5)) && (this.y >= player.y - 25) && (this.y <= player.y + 25)) ||
            ((isTouch(1, 0, -430, this.x, this.y, 5)) && (this.y >= robot.y - 25) && (this.y <= robot.y + 25))
        ) {
           this.v_x *= -1;

           // for different angles
             // 0 - 0
             // 25 - 180
          // this.v_x = 1 + Math.floor(Math.cos((player.y - this.y) / 25 * Math.PI) * (rand(2) + 1));
         //  this.v_y = 1 + Math.floor(Math.sin((player.y - this.y) / 25 * Math.PI) * (rand(2) + 1));
           // end
        }
        


    }

    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
//        ctx.clearRect(0, 0, this.bor_x, this.bor_y);
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = "green";
        ctx.arc(this.x, this.y, 5, 0, 360, false);
        ctx.stroke();
        ctx.closePath();
    }
};



function moveup() { player.y -= 4; }
function movedown() { player.y += 4; }

function setScore() {
     var printBlock = document.getElementById("printBlock");
     printBlock.textContent = player.count + " : " + robot.count;
}


var mainball = new ball(canvas.width, canvas.height);


var compl = Number(prompt("Enter complexity (from 1 to 10)"));
if (compl < 1)
    compl = 1;
else
if (compl > 10)
    compl = 10;
compl *= 10;

function moveRobot() {
    if (rand(100) < compl) {
        if(robot.y > mainball.y_pointOfHit)
            robot.y -= Math.abs(mainball.v_y);
        else
            robot.y += Math.abs(mainball.v_y); 
    }
}


var timeout = setInterval(
    function() { 
        mainball.move();
        mainball.draw();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#0000ff";
        ctx.fillStyle = "yellow";
        ctx.moveTo(player.x, player.y - 25);
        ctx.lineTo(player.x, player.y + 25);
        ctx.moveTo(robot.x, robot.y - 25);
        ctx.lineTo(robot.x, robot.y + 25);
        ctx.stroke();
        ctx.closePath();

        moveRobot();
        setScore();
    },
    10);
