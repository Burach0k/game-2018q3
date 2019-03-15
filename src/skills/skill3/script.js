import prov from "../proverkaKnopki";
import "./words-skill3.json";
import "./style.css";
export default class {
  constructor(jsonWord, stackmanager,ev) {
    let flag = false;
    var input = document.getElementById("task-input2");
    $("#mySkill3").on('shown.bs.modal', function() {
      $('#task-input2').focus()
    });
    input.value ='';
    input.addEventListener("keydown", event);
    function event(e) {
      if (e.keyCode === 13) {
        for (const key in jsonWord) {
          if (jsonWord.hasOwnProperty(key)) {
            if (jsonWord[key] === input.value.toLowerCase()) {
              flag = true;
              break;
            }
          }
        }
        if (flag) {
          stackmanager.specialAttack("hero",  prov(ev));
        } else {
          stackmanager.attack("monstr", "MonsterAttack");
        }
        $("#mySkill3").modal("hide");
        input.removeEventListener("keydown", event);
      }
    }
    
    let Attack = document.getElementById('Attack');
    Attack.style.display = 'inline-block';
  }
}
