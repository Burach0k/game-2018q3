import "./style.css";
import prov from "../proverkaKnopki";

let ENTER = 13;
let signs = ['+','-'];
export default class {
  constructor(stackmanager, ev) {
   let input = document.getElementById('task-input7');
   let test = document.getElementById('test-skill12');
   let test2 = document.getElementById('test2-skill12');
   console.log(input);
   $("#mySkill12").on('shown.bs.modal', function() {
    $('#task-input7').focus()
  });
    let firstArgument =  Math.floor(Math.random() * 10) + 1;
    let secondArgument =  Math.floor(Math.random() * 5) + 1;
    let sign =  signs[Math.floor(Math.random() * 2)];
    let resolve = Math.floor(eval(firstArgument + sign + firstArgument*secondArgument*-1)*10)/10;
    console.log(resolve);
    test.innerHTML = firstArgument + sign;
    test2.innerHTML =' = '+ firstArgument*secondArgument;
    input.onkeydown = function event(e){
      if(e.keyCode === ENTER){
        if(resolve === +input.value){
          stackmanager.attack("hero", prov(ev));
        }else{
          stackmanager.attack("monstr", "MonsterAttack");
        }
        $("#mySkill12").modal("hide");
      }
    }
    input.value ='';
    
    let Attack = document.getElementById('Attack');
    Attack.style.display = 'inline-block';
  }
}
