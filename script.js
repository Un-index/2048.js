
// 2048.main.js

let tempP, done;

let math = {
  random: (max, min)=>{return Math.floor(Math.random()*(max-min)+min)},
  clamp: (min, max, n) =>{return ((n<min && min) || n>max && max) || n}
}

const cells = document.querySelectorAll(".free");
let t = {};

cells.forEach(cell => {
  t[cell.id] = cell.getBoundingClientRect()

});

console.log(t)

let $ = (id)=>{return document.getElementById(id)}

let fill = (id, n)=>{let obj = $(id); obj.className = "taken"; obj.innerHTML = n || 2 }
let free = (id)=>{let obj = $(id); obj.className = "free"; let old = obj.innerHTML; obj.innerHTML = "&nbsp"; return old}

function restart(){

if(document.querySelector(".taken")){
  const occ = document.querySelectorAll(".taken");
  occ.forEach(obj => {obj.className = "free"; obj.innerHTML = "&nbsp"});
}  
let rand1 = math.random(1, 16);
let rand2 = math.random(1 + rand1, (rand1>=16 && 14 || 16));

if(tempP){
  let {a, b} = tempP;
  rand1 = (rand1 != a &&  rand1 != b) && rand1 || rand1-1
  //rand2 = rand2 != b && rand2 || rand2-1
}
  
fill(rand1);
fill(rand2);

tempP = {a:rand1, b:rand2};

};

restart();


function wait(n){
  return setTimeout((n || 0.03)* 1000, function(){});
}
let reset = $("reset");

reset.addEventListener("click", restart)


let {width, height} = t[1]
width += 27
height += 27


function isBetween(n, n1, n2){
  return n >= n1 && n <= n2
}

let deb = false;
let swipe = direction =>{
if(done){done=false;restart(); }
  // l, r, u, d
  if(deb){return}
  deb = true
  
  
  
  // loop through every div and animate it in a certain direction, unless it is at the edges of the grid (left,right,up,down)

  
  
  const w4 =  width * 3.7;
  const h4 = height * 3.7;
  
  const taken = document.querySelectorAll(".taken");
  taken.forEach(obj=>{
    let match;
    const id = obj.id;
    let type;
    //if(id == 1 || id == 5 || id == 9 || id == 13){return}
    let diff, v;
    // for l,r,u,d there's differences...
    if(id>12){ // only when there's nothing else in the path will you tween freely to the complete left border
      
       for(let i = 1; i<5; i++){
         let o = Number(i) + Number(id);
         if(o>16 || o<12){continue}
         o = $(o)
        
         if(obj.innerHTML == o.innerHTML){ match = true;        console.log(obj.innerHTML, o.innerHTML)
           diff = id - i
           v = o
           $(id).innerHTML = Number($(id).innerHTML) + Number(o.innerHTML)
           //o.innerHTML = " "
           free(o.id)
           //v = o.innerHTML
           //continue  
         }else{
           // no successful match for the current object o,
           // 
           
         }
        };
      
      
       diff = diff || id - 13 
       type = 13
       }else if(id>8){
                  
         for(let i = 1; i<5; i++){
         let o = Number(i) + Number(id);
         if(o<8 || o>12){continue}
         o = $(o)

         if(obj.innerHTML == o.innerHTML){match = true;
                    console.log(obj.innerHTML, o.innerHTML)
           diff = id - i
           v = o
           //v = o.innerHTML
           $(id).innerHTML = Number($(id).innerHTML)+Number(o.innerHTML)
           free(o.id)
           //o.innerHTML = " "
          // continue
         }
        };
      
      
      
       diff = diff || id - 9
       type = 9
       }else if(id>4){
               
       for(let i = 1; i<5; i++){
        let o = Number(i) + Number(id);
         if(o<4 || o>8){continue}
         o = $(o)
          
         if(obj.innerHTML == o.innerHTML){  match = true;       console.log(obj.innerHTML, o.innerHTML)
           diff = id - i
           v=o
                      $(id).innerHTML = Number($(id).innerHTML) + Number(o.innerHTML)
           free(o.id)
           //o.innerHTML = " "
           //continue
         }
        };
      
      
       diff = diff || id - 5
          type = 5
         }
         else{
                 
       for(let i = 1; i<5; i++){
          let o = Number(i) + Number(id);
          if(o<1 || o>4){continue}
          o = $(o);
         if(obj.innerHTML == o.innerHTML){    match = true;     console.log(obj.innerHTML, o.innerHTML)
           diff = id - i
           v=o
                      $(id).innerHTML = Number($(id).innerHTML) +  Number(o.innerHTML)
           free(o.id)
           //o.innerHTML = " "
           //continue
         }
        };
      
      
       diff = diff || id - 1
            type = 1
         }
    // will tween *diff* tiles to the left
    
    // animations exist only for visual effect, they don't tween the object's position permanently - we take care of that
    
    diff = math.clamp(0,3,diff)
    //console.log(id, "targ: ", type, id)
    
    //let old = free(id)
    //let target = $(v||type-3)
    //if(target){target.className = "free"
    //target.innerHTML = "&nbsp"
    //console.log("old: ", old, "tart: ", target.innerHTML)
    //$(id).innerHTML = Number(old) + Number(target.innerHTML)
    //console.log(Number(old),"+",Number(target.innerHTML), Number(old) + Number(target.innerHTML))}
    
    
    
    //console.log("diff:", diff)
    

    
    if(!match){      
   
      // no match the ENTIRE row for this cell/tile
      // find the cell closest to the the current cell $(id) and move the id to that position, since there was no match
      if(!(id == 1 || id == 5 || id == 9 || id == 13)){
      diff = type
      for(let i = type;i<id;i++){
        let f = $(i);
        if(f.className=="free"){
          // if the cell is free,
          diff = id - type
          free(id);
          fill(i);
          break
        };
      };
      }

    }
    
    let prev = $(math.clamp(1, 16, id-1)).className
    if(prev!="taken"){
    let dir = (direction == "l" || direction == "r") && "X(" || "Y("
    let w = String(math.clamp(0, w4, diff*width)).replace("-", "");
    let h = String(math.clamp(0, h4, diff*height)).replace("-", "");
    
    dir += (direction == "l" && "-"+w+"px)") || (direction == "r" && w+"px)") || (direction == "u" && h+"px)") || (direction == "d" && "-"+h+"px)")

  
    
    
    let anim = obj.animate([
        { transform:  "translate"+ dir }
      ], { 
        duration:110
      });
    }
  let htm = obj.innerHTML
  obj.innerHTML = htm =="NaN" && "&nbsp" || htm
    
  
  //anim.onfinish = ()=>{}

   if(!document.querySelector(".free")){
      if(window.confirm("game over!\nrestart?")){
        done = true;
        restart();
      };
      
      
    }
})
 // in the above block, the function runs for EVERY existing tile 
  
  
  
    if(!done){
    let rand = math.random(1, 17);
    while($(rand).className == "taken"){
     rand = math.random(1, 17);
     wait()
    }
    fill(rand)
    }
  
  wait()
  deb = false
}




function $eval(){
    const cells = document.querySelectorAll(".free");
    let t = {};

    cells.forEach(cell => {
      let id = cell.id
      let invalid = id == 1 || id == 5 || id == 9 || id == 13
      

    });    
  
  
  
}




// got the switch statement from somewhere, changed it to my needs
document.onkeydown = function(e) {
    switch(e.which) {
        case 37: // left
        
        swipe("l")
        //$eval()
        break;

        case 38: // up
        
        $eval()
        break;

        case 39: // right
        
        $eval()
        break;

        case 40: // down
        
        $eval()
        break;

        default: return; 
    }
    e.preventDefault(); 
};