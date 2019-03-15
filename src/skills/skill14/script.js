import "./style.css";
import prov from "../proverkaKnopki"

let ENTER = 13;
export default class {
  constructor(stackmanager,ev) {
    let input = document.getElementById("task-input9");
    let text = document.getElementById("sequence-skill14");
    $("#mySkill14").on('shown.bs.modal', function() {
      $('#task-input9').focus()
    });
    input.value = "";
    let delitel = Math.floor(Math.random() * 10) + 2;
    text.innerHTML =delitel;
    let correct;
    for(var i = delitel; i>1;i--){
        if(delitel%i === 0){
            correct = i;
        }
    }
    input.addEventListener("keydown", event);
    function event(e) {
      if (e.keyCode === ENTER) {
        if(correct ===Number(input.value)){
          stackmanager.attack("hero",  prov(ev));
        }else{
          stackmanager.attack("monstr", "MonsterAttack");
        }
        input.removeEventListener("keydown", event);
        $("#mySkill14").modal("hide");
      }
    }
    
    let Attack = document.getElementById('Attack');
    Attack.style.display = 'inline-block';
  }
}
