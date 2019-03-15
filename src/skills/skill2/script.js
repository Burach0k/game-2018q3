import prov from "../proverkaKnopki";
import "./words-skill2.json";
import "./style.css";

export default class {
  constructor(word, correctWord, stackmanager,ev) {
    var wordArray = [];
    var cont = document.getElementById("contain");
let flag = false;


    
    for (var i = 0; i < word.length; i++) {
      wordArray[i] = document.createElement("div");
      wordArray[i].innerHTML = word[i];
      cont.append(wordArray[i]);
      wordArray[i].id = "word" + i;
      wordArray[i].tabIndex =  i
      wordArray[i].addEventListener("mousedown", addEvent);
      wordArray[i].addEventListener('keydown', addEvent);
    }


    window.addEventListener('keydown', arrow);
    let k = 0;
    function arrow(e){
      if(e.key === 'ArrowRight'){
        let word1 = cont.children[k].innerHTML;
        let oldK=k;
        k++;
        if(k === cont.children.length){
          k = 0;
        }
        let word2 = cont.children[k].innerHTML;
        if(flag === true){
        cont.children[k].innerHTML = word1;
        cont.children[oldK].innerHTML= word2;
      }
        cont.children[k].focus();
      }
      if(e.key === 'ArrowLeft'){
        let word1 = cont.children[k].innerHTML;
        let oldK=k;
        k--;
        if(k<0){
          k = cont.children.length-1;
        }
        let word2 = cont.children[k].innerHTML;
        if(flag === true){
          cont.children[k].innerHTML = word1;
          cont.children[oldK].innerHTML= word2;
        }
        cont.children[k].focus();
      }
    }






    function addEvent(e) {
      let word = [];
      let fathEl = document.getElementById("contain");
      if (e.type === "mousedown") {
      var element = document.getElementById(e.srcElement.id);
      var koor = fathEl.getBoundingClientRect();
      element.style.position = "absolute";
      element.style.userSelect = "none";
      element.ondragstart = function() {
        return false;
      };
      for (var i = 0; i < fathEl.children.length; i++) {
        word[i] = fathEl.children[i].innerHTML;
      }
      moveAt(e);
      element.style.zIndex = 9000;
      function moveAt(e) {
        element.style.left = e.x - koor.left - 20 + "px";
        element.style.top = e.y - koor.top - 20 + "px";
      }
      document.onmousemove = function(e) {
        moveAt(e);
      };
      element.onmouseup = function(e) {
        element.style.position = "static";
        if (validation(element, e) === correctWord) {
        stackmanager.attack("hero",  prov(ev));
          $("#mySkill2").modal("hide");
          window.removeEventListener('keydown', arrow);
          cont.innerHTML ='';
        }
        document.onmousemove = null;
        element.onmouseup = null;
      };
    }
    if(e.key === "Enter"){
      var element = document.getElementById(e.srcElement.id);
      flag = !flag;
      let mas = [];
      for (var i = 0; i < fathEl.children.length; i++) {
        mas.push(fathEl.children[i].innerHTML);
      }
      if (mas.join("") ===correctWord){
        stackmanager.attack("hero",  prov(ev));
          $("#mySkill2").modal("hide");
          window.removeEventListener('keydown', arrow);
          cont.innerHTML =''; 
        }
      
    }
    function validation(pos, e) {
      word.splice(pos.id.substr(4), 1);
      for (var i = 0; i < fathEl.children.length; i++) {
        if (e.x - 15 < fathEl.children[i].getBoundingClientRect().left) {
          word.splice(i - 1, 0, pos.innerHTML);
          break;
        } else {
          if (i === fathEl.children.length - 1)
            word.splice(fathEl.children.length - 1, 0, pos.innerHTML);
        }
      }
      for (var i = 0; i < fathEl.children.length; i++) {
        fathEl.children[i].innerHTML = word[i];
      }
      return word.join("");
    }
  }
  
  let Attack = document.getElementById('Attack');
  Attack.style.display = 'inline-block';
  }
}
