up.addEventListener("click" , moveup);
down.addEventListener("click", movedown);



var vx = 0;
var vy = 0;
var c = 0;
var pause = false;

addEventListener("keydown" , function(e) { 
    if (e.keyCode === 38) {
        moveup();
    }
    if (e.keyCode === 40) {
        movedown();
    }
    if (e.keyCode === 32) {
        pause = !pause;
        if (pause) {
            vx = mainball.v_x;
            vy = mainball.v_y;
            c = compl;
            mainball.v_x = 0;
            mainball.v_y = 0;
            compl = 0;            
        } else {
            mainball.v_x = vx;
            mainball.v_y = vy;
            compl = c;
            vx = 0;
            vy = 0;
            c = 0;                      
        }
    }   
});
