let word;
let word_list;
let chosen_word;

class Game {
  constructor(word, word_element, health_element, on_succeed, on_fail) {
    this.word = word;
    this.element = word_element;
    this.health_element = health_element
    this.health = 7;
    this.on_succeed = on_succeed;
    this.on_fail = on_fail;
    this.element.innerHTML = "_" * this.word.length;
    this.already_tried = "";
  }
  updateHealth() {
    this.health_element.innerHTML = this.health.toString();
  }
  tryLetter(letter) {
    if (this.isAlpha(letter) && !this.already_tried.includes(letter)) {
      let indices = [];
      this.already_tried += letter;
      for(let iter = 0; iter < str.length; iter++) {
        if (str[iter] === letter) indices.push(iter);
      }
      if (indices.length == 0) {
        this.health -= 1;
        this.updateHealth();
        if (this.health == 0) {
          this.on_fail()
        }
      }
      if (indices.length != 0) {
        split_string = this.element.innerHTML.split();
        for (let indic of indices) {
          [indic];
        }
      }

    }
  }
  isAlpha(letter){
    return typeof letter === "string" && letter.length === 1
      && (letter >= "a" && letter <= "z" || letter >= "A" && letter <= "Z");
  }
}


document.addEventListener("DOMContentLoaded", function () {
    words = document.getElementById("words");
    fetch("words.txt")
    .then((res) => res.text())
    .then((text) => {
        // Do something with "text"
        words.innerHTML = text;
    })
    .catch((e) => console.error(e));
    document.addEventListener('keydown', (event) => {
        console.log(`You pressed: ${event.key}`);
    });
})