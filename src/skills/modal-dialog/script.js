import word from "../skill2/words.js";
import inputEvent from "../skill1/script";
import addWord from "../skill2/script";
import enWordd from "../skill3/script";
import enSpeak from "../skill4/script";
import sequencee from "../skill5/script";
import ruTranslate from "../skill6/script";
import skil7 from "../skill7/script";
import ruSpeak from "../skill8/script";
import task from "../skill9/script";
import task11 from "../skill11/script"
import task10 from '../skill10/script'
import task12 from '../skill12/script'
import task13 from '../skill13/script'
import task14 from '../skill14/script'
import task15 from '../skill15/script'

const newWordForSkill2 = new word("./data/words-skill2.json");
const newWordForSkill3 = new word("./data/words-skill3.json");
const newWordForSkill4 = new word("./data/words-skill4.json");
const newWordForSkill6 = new word("./data/words-skill6.json");
const newWordForSkill7 = new word("./data/words-skill7.json");
const newWordForSkill8 = new word("./data/words-skill8.json");
const newWordForSkill9 = new word("./data/words-skill9.json");
const newWordForSkill10 = new word("./data/words-skill10.json");
const newWordForSkill13 = new word("./data/words-skill13.json");
const newWordForSkill15 = new word("./data/words-skill15.json");

let jsonWord = new word("./data/findMistake.json");

const skill1 = 1;
const skill2 = 2;
const skill3 = 3;
const skill4 = 4;
const skill5 = 5;
const skill6 = 6;
const skill7 = 7;
const skill8 = 8;
const skill9 = 9;
const skill10 = 10;
const skill11 = 11;
const skill12 = 12;
const skill13 = 13;
const skill14 = 14;
const skill15 = 15;

export default class modal{
  constructor(stackmanager) {
    let event;
    let skillNumber = Math.floor(Math.random() * 15) + 1;
    for (var i = 1; i <= 4; i++) {
      let button = document.getElementById("b" + i);
      button.setAttribute("data-target", "#mySkill" + skillNumber);
     button.onclick = addListener;      
    }
    window.onkeydown = function(e){
      if(e.code === "Digit1"||e.code === "Digit2"||e.code === "Digit3"||e.code === "Digit4"){
        $("#myModal").modal("hide");
        addListener(e);
        $("#mySkill" + skillNumber).modal("show");
      }
      window.onkeydown = function(e){
        if(e.code === 'Space'){
         new modal(stackmanager);
        }
      }
    }
    $("#myModal").modal("show");

    function addListener(e) {
      if (skillNumber === skill1) {
        var span1 = document.getElementById("span1-skill1");
        var span2 = document.getElementById("span2-skill1");
        span1.innerHTML = Math.floor(Math.random() * 100) + 1;
        span2.innerHTML = Math.floor(Math.random() * 100) + 1;
        event = new inputEvent();
        event.addListener(stackmanager, e);
      }

      if (skillNumber === skill2) {
        let correctWord = newWordForSkill2.getRandomWord();
        let randomArray = correctWord.split("");
        randomArray.sort = Array.prototype.sort;

        new addWord(
          randomArray.sort(compareRandom).join(""),
          correctWord,
          stackmanager,
          e
        );
        function compareRandom(a, b) {
          return Math.random() - 0.5;
        }
      }
      if (skillNumber === skill3) {
        let enWord = document.getElementById("enWord");
        let randomWord = newWordForSkill3.getRandomWord();
        enWord.innerHTML = randomWord["correct"];
        new enWordd(randomWord, stackmanager, e);
      }
      if (skillNumber === skill4) {
        let speakWord = newWordForSkill4.getRandomWord();
        new enSpeak(speakWord, stackmanager, e);
      }
      if (skillNumber === skill5) {
        let sequence = document.getElementById("sequence-skill5");
        let randomNumber = Math.floor(Math.random() * 100) + 1;
        let randomStep = Math.floor(Math.random() * 10) + 1;
        sequence.innerHTML =
          randomNumber +
          ",  " +
          (randomNumber + randomStep) +
          ",  " +
          (randomNumber + 2 * randomStep);
        new sequencee(randomNumber, randomStep, stackmanager, e);
      }
      if (skillNumber === skill6) {
        let ruWord = document.getElementById("enWornd-skill6");
        let word = newWordForSkill6.getRandomWord();
        ruWord.innerHTML = word["correct"];
        new ruTranslate(word, stackmanager, e);
      }
      if (skillNumber === skill7) {
        let color = newWordForSkill7.getRandomWord();
        let span = document.getElementById("color-skill7");
        span.innerHTML = color["correct"];
        new skil7(stackmanager,color, e);
      }
      if (skillNumber === skill8) {
        new ruSpeak(stackmanager, e);
      }
      if (skillNumber === skill9) {
        let speakWord = newWordForSkill9.getRandomWord();
        let question = document.getElementById('question-skill9');
        question.innerHTML = speakWord['question'];
        new task(speakWord, stackmanager,e);
      }
      if(skillNumber === skill10){
        let json = newWordForSkill10.getRandomWord();
        new task10(json,stackmanager,e);
      }
      if(skillNumber === skill11){
       task11(stackmanager,jsonWord,e);
      }
      if(skillNumber === skill12){
        new task12(stackmanager,e);
       }
       
      if(skillNumber === skill13){
        let json = newWordForSkill13.getRandomWord();
        new task13(json,stackmanager,e);
       }
       if(skillNumber === skill14){
        new task14(stackmanager,e);
       }

       if(skillNumber === skill15){
         let json = newWordForSkill15.getRandomWord();
        new task15(json,stackmanager,e);
       }
      for (var i = 1; i <= 4; i++) {
        var button = document.getElementById("b" + i);
        button.removeEventListener("click", addListener);
      }
    }
  }
}
