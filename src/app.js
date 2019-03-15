
import {login, writeInDatabse} from "./login/login";
import table from "./table/table";

import preloader from "./preloadre/index.html"
import loader from "./preloadre/script"

import "./template/template.css";
import "./battle/style.css";
import "./preloadre/style.css";
import battleHTML from "./battle/index.html";
import Hero from "./battle/hero";
import Monster from "./battle/monster";
import StackManager from "./battle/stackManager";

import modalDialogHtml from "./skills/modal-dialog/modal";
import modalDialog from "./skills/modal-dialog/script"

const SPASE = 32;
let text;
let context;
let canvas;

function makeCounter(min, max, speed, cicle) {
  let mymax = +max.toFixed(2);
  let mymin = +min.toFixed(2);
  let increase = true;
  let step = +speed.toFixed(2);
  let result = mymin;
  let counter = function () {
  if (increase) {
  
  if (+result.toFixed(2) > mymax && cicle) {
  increase = false;
  result -= step;
  } else if (+result.toFixed(2) > mymax && !cicle)
  result = min;
  else {
  result += step;
  result = +result.toFixed(2)
  }
  } else {
  
  if (+result.toFixed(2) < mymin) {
  increase = true;
  result += step;
  } else {
  result -= step;
  result = +result.toFixed(2);
  }
  }
  return result;
  }
  counter.max = mymax;
  counter.min = mymin;
  return counter;
  }


let numberOfRound = 0;
let counters1 = [];
let counters2 = [];
let monstr = new Monster();
let hero = new Hero();
let stackmanager = new StackManager(hero, monstr);
let coefficient = (document.body.clientWidth / 1920 + document.body.clientHeight / 969) / 2;
let ConfigurationObject={};

counters1.push(makeCounter(-3, 3, 0.1, true));
counters1.push(makeCounter(0, 2, 0.10, true));
counters1.push(makeCounter(0, document.body.clientWidth -850 * coefficient, 20.0 * coefficient, false));
counters1.push(makeCounter(0, 10 * coefficient, 0.4 * coefficient, true));

counters2.push(makeCounter(-3, 3, 0.1, true));
counters2.push(makeCounter(0, 2, 0.10, true));
counters2.push(makeCounter(0, document.body.clientWidth - 850 * coefficient, 20.0 * coefficient, false));
counters2.push(makeCounter(0, 10 * coefficient, 0.4 * coefficient, true));
counters2.push(makeCounter(0, 300 * coefficient, 3 * coefficient, false));
counters2.push(makeCounter(0, 100 * coefficient, 1 * coefficient, false));




async function startGameLoop() {
  if (!monstr.Live) {
    await monstr.loadLocalData();
    text.innerHTML = `Раунд ${++numberOfRound}`
    monsterName.innerHTML=monstr.nickName;
  }
  if (!hero.Live) {
   ConfigurationObject.Score=stackmanager.TotalScore;
    alert("У нас тут приличное заведение, проваливай!"+stackmanager.TotalScore);
    writeInDatabse(ConfigurationObject,table);
    return 
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  stackmanager.analys(context);
  heroHealth.value = hero.Health;
  monsterHealth.value = monstr.Health;
  requestAnimationFrame(startGameLoop);
}

async function predraw() {
    document.body.innerHTML= preloader + battleHTML + modalDialogHtml;
    canvas = document.getElementById("BattleGround");
    context = canvas.getContext('2d');
    const Attack = document.getElementById("Attack");
    text = document.getElementById("text-round");

    canvas.width = document.body.clientWidth;
    canvas.height = 0.8 * document.body.clientHeight;
    
    Attack.onclick = function(){
      new modalDialog(stackmanager);
    }
    window.onkeydown =function(e){
      if(e.keyCode === SPASE){
        new modalDialog(stackmanager);
        Attack.style.display = 'none';
      }
    };
    window.onresize = () => {

        coefficient = (document.body.clientWidth / 1920 + document.body.clientHeight / 969) / 2;
      
        counters1 = [];
        counters2 = [];
      
        canvas.width = document.body.clientWidth;
        canvas.height = 0.8 * document.body.clientHeight;
      
        counters1.push(makeCounter(-3, 3, 0.1, true));
        counters1.push(makeCounter(0, 2, 0.10, true));
        counters1.push(makeCounter(0, document.body.clientWidth - 850 * coefficient, 20.0 * coefficient, false));
        counters1.push(makeCounter(0, 10 * coefficient, 0.4 * coefficient, true));
      
        counters2.push(makeCounter(-3, 3, 0.1, true));
        counters2.push(makeCounter(0, 2, 0.10, true));
        counters2.push(makeCounter(0, document.body.clientWidth - 850 * coefficient, 20.0 * coefficient, false));
        counters2.push(makeCounter(0, 10 * coefficient, 0.4 * coefficient, true));
        counters2.push(makeCounter(0, 300 * coefficient, 3 * coefficient, false));
        counters2.push(makeCounter(0, 100 * coefficient, 1 * coefficient, false));
      
        hero.setProperties(200, document.body.clientHeight - 640 * coefficient, counters2, coefficient);
        monstr.setProperties(document.body.clientWidth - 500 * coefficient, document.body.clientHeight - 640 * coefficient, counters1, coefficient);
      
      }

  await monstr.loadMetaData().then(()=> hero.loadMetaData(ConfigurationObject)).then(()=>loader());
  hero.setProperties(200, document.body.clientHeight - 640 * coefficient, counters2, coefficient);
  monstr.setProperties(document.body.clientWidth - 500 * coefficient, document.body.clientHeight - 640 * coefficient, counters1, coefficient);
  stackmanager.Score=0;
  heroName.innerHTML=hero.nickName;
  return ConfigurationObject;
}


async function startGame(){
  await predraw().then(() => startGameLoop());
}

login(ConfigurationObject,startGame);

