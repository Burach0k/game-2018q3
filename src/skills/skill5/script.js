import "./style.css";
import prov from "../proverkaKnopki"

let ENTER = 13;
export default class {
  constructor(number, step, stackmanager,ev) {
    let input = document.getElementById("task-input4");
    $("#mySkill5").on('shown.bs.modal', function() {
      $('#task-input4').focus()
    });
    input.value = "";
    input.addEventListener("keydown", event);
    function event(e) {
      if (e.keyCode === ENTER) {
        if(Number(number+step*3) ===Number(input.value)){
          stackmanager.attack("hero",  prov(ev));
        }else{
          stackmanager.attack("monstr", "MonsterAttack");
        }
        input.removeEventListener("keydown", event);
        $("#mySkill5").modal("hide");
      }
    }
    
    let Attack = document.getElementById('Attack');
    Attack.style.display = 'inline-block';
  }
}
