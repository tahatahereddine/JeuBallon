const elem = document.getElementById("ballon");
const canvas = document.getElementById("canvas");


function dessinerTerrain(){
  canvas.style.width= parseInt(document.getElementById("w").value) + "px";
  canvas.style.height= parseInt(document.getElementById("h").value) + "px";
  canvas.style.border="2px solid brown";
  canvas.style.backgroundColor = document.querySelector('input[name="c"]:checked').value;
}

function dessinerBallon() {
  
  const ballon = document.getElementById("ballon");
  let d = parseInt(document.getElementById("d").value);
  ballon.style.width = d + "px";
  ballon.style.height = d + "px";
  ballon.style.borderRadius = "50%";
  
  ballon.style.backgroundColor = document.querySelector('input[name="cr"]:checked').value;
  ballon.style.border = "2px solid " + document.querySelector('input[name="cc"]:checked').value;



  if(!drapeau){
    if( document.getElementById("pox").value !== "" && document.getElementById("poy").value !== ""){
      ballon.style.left = document.getElementById("pox").value %  parseInt(canvas.style.width) + "px"; // % pour ne pas depasser 
      ballon.style.bottom = document.getElementById("poy").value % parseInt(canvas.style.height)+ "px"; // le canvas contenaire
    }else {
      ballon.style.bottom = document.getElementById('canvas').offsetHeight - elem.offsetHeight - 4 + "px";
      ballon.style.left =  "0px";
    }
  }
    

  if(!display){
    elem.style.visibility = 'visible';
    display = true;
  }
}


var drapeau = false;
var left = true;
var top= false;
var bottom = true;
var right = false;
var id = null;

function start() {
  drapeau = !drapeau;
  let vitesse = parseInt(document.getElementById("v").value);
  if(!drapeau && id !== null){
    clearInterval(id);
  }
  if (!display){
    dessinerBallon();
    
    if(document.getElementById("pox").value !== "" && document.getElementById("poy").value !== ""){
      ballon.style.left = document.getElementById("pox").value %  parseInt(canvas.style.width) + "px";
      ballon.style.bottom = document.getElementById("poy").value % parseInt(canvas.style.height)+ "px";
    }else{
      ballon.style.bottom = document.getElementById('canvas').offsetHeight - elem.offsetHeight - 4 + "px";
      ballon.style.left =  "0px";
    }
    elem.style.visibility = 'visible';
    display = true;
  }
  id = null;
  

  let posY = parseInt(ballon.style.bottom) || document.getElementById('canvas').offsetHeight - elem.offsetHeight - 4;
  let posX = parseInt(ballon.style.left) || 0;

  
  if(drapeau && id === null){
    id = setInterval(frame, vitesse);
  }
    
  function frame() 
  {
    let WIDTH = document.getElementById('canvas').offsetWidth;
    let HEIGHT = document.getElementById('canvas').offsetHeight;

    let width = elem.offsetWidth;
    let height = elem.offsetHeight;

    if (!drapeau) {
      clearInterval(id);
      return;
    }

    if (bottom) 
    {
      posY++;
      elem.style.bottom = posY + "px";
      if (posY >= HEIGHT - height - 4) // si le ballon touche la parois du top
      {
        bottom = false;
        top = true;
      } 
    }else if (top) 
    {
      posY--;
      elem.style.bottom = posY + "px";
      if (posY == 0) // si le ballon touche la parois du bottom
      {
        bottom = true;
        top = false;
      }
    }
    if (left)
    {
      posX++;
      elem.style.left = posX + "px";
      if (posX >= WIDTH - width - 4) // si le ballon touche la parois a droite
      {
        right = true;
        left = false;
      } 
    }
    else if (right)
    {
      posX--;
      elem.style.left = posX + "px";
      if (posX == 0)  // si le ballon touche la parois a gauche
      {
        right = false;
        left = true;
      }
    }
 }
}

var display = true;
function stop() {
  clearInterval(id);  
  id = null;
  elem.style.visibility = 'hidden';
  display = false;
  drapeau = false;
  left = true;
  top= false;
  bottom = true;
  right = false;
}
