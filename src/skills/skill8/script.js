import "./words-skill8.json";
import "./style.css";
import prov from "../proverkaKnopki";

let ENTER = 13;
let signs = ['+','-','/','*'];
export default class {
  constructor(stackmanager, ev) {
   let input = document.getElementById('task-input6');
   let test = document.getElementById('test-skill8');
   $("#mySkill8").on('shown.bs.modal', function() {
    $('#task-input6').focus()
  });
  input.value ='';
    let firstArgument =  Math.floor(Math.random() * 10) + 1;
    let secondArgument =  Math.floor(Math.random() * 4) + 1;
    let sign =  signs[Math.floor(Math.random() * 4)];
    let resolve =Math.floor(eval(firstArgument + sign +firstArgument*secondArgument)*10)/10;
    test.innerHTML = firstArgument + sign +firstArgument*secondArgument;
    input.onkeydown = function event(e){
      if(e.keyCode === ENTER){
        if(resolve === +input.value){
          stackmanager.attack("hero", prov(ev));
        }else{
          stackmanager.attack("monstr", "MonsterAttack");
        }
        $("#mySkill8").modal("hide");
      }
    }
    
    let Attack = document.getElementById('Attack');
    Attack.style.display = 'inline-block';
  }
}
