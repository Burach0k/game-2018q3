import "./words-skill4.json";
import "./style.css";
import prov from "../proverkaKnopki";

export default class {
  constructor(word, stackmanager,ev) {
    let button = document.getElementById("voiceButton");
    button.addEventListener("click", voise);
    window.addEventListener('keydown', voise);
    function voise(e) {
      if(e.type === 'click'||e.key === 'Control'){
      let utter = new SpeechSynthesisUtterance();
      utter.text = word;
      speechSynthesis.speak(utter);}
    }
    let input = document.getElementById("task-input3");
    $("#mySkill4").on('shown.bs.modal', function() {
      $('#task-input3').focus()
    });
    input.value = "";
    input.addEventListener("keydown", validVoice);
    function validVoice(e) {
      if (e.keyCode === 13) {
        if (input.value === word) {
          stackmanager.attack("hero",  prov(ev));
        } else {
          stackmanager.attack("monstr", "MonsterAttack");
        }
        input.removeEventListener("keydown", validVoice);
        button.removeEventListener("click", voise);
        window.removeEventListener('keydown',voise);
        $("#mySkill4").modal("hide");
      }
    }
    
    let Attack = document.getElementById('Attack');
    Attack.style.display = 'inline-block';
  }
}
