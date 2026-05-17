let word_list;
let game;
let word_element;
let health_element;
let reset_button;
let won;
let over;

class Game {
  constructor(word, word_element, health_element, on_succeed, on_fail) {
    this.word = word;
    this.element = word_element;
    this.health_element = health_element
    this.health = 7;
    this.on_succeed = on_succeed;
    this.on_fail = on_fail;
    this.element.innerHTML = "_".repeat(this.word.length);
    this.already_tried = "";
    this.updateHealth();
  }
  updateHealth() {
    this.health_element.innerHTML = this.health.toString();
  }
  tryLetter(letter) {
    if (this.health == 0) {
      this.on_fail()
      return;
    }
    if (!this.element.innerHTML.includes("_")) {
      this.on_succeed();
      return;
    }
    if (this.isAlpha(letter) && !this.already_tried.includes(letter)) {
      let indices = [];
      this.already_tried += letter;
      for(let iter = 0; iter < this.word.length; iter++) {
        if (this.word[iter] === letter) indices.push(iter);
      }
      if (indices.length == 0) {
        this.health -= 1;
        this.updateHealth();
        if (this.health == 0) {
          this.on_fail()
        }
      }
      if (indices.length != 0) {
        let split_string = this.element.innerHTML.split("");
        for (let indic of indices) {
          console.log(indic)
          split_string[indic] = letter;
        }
        this.element.innerHTML = split_string.join("");
        if (!this.element.innerHTML.includes("_")) {
          this.on_succeed();
        }
      }
    }
  }
  isAlpha(letter){
    return typeof letter === "string" && letter.length === 1
      && (letter >= "a" && letter <= "z" || letter >= "A" && letter <= "Z");
  }
}

class GameInitializer {
  static newRandomGame(words, word_element, health_element, on_succeed, on_fail) {
    let word = words[Math.floor(Math.random()*words.length)];
    return new Game(word, word_element, health_element, on_succeed, on_fail);
  }
}

document.addEventListener("DOMContentLoaded",
  function () {
    word_element = document.getElementById("word");
    health_element = document.getElementById("health");
    reset_button  = document.getElementById("reset");
    won = () => alert("Game Won!");
    over = () => alert("Game Over!");
    fetch("words.txt")
    .then((res) => res.text())
    .then((text) => {
      // Do something with "text"
      word_list = text.toUpperCase().split("\n");
      word = GameInitializer.newRandomGame(word_list, word_element, health_element, won, over);
    })
    .catch((e) => console.error(e));
    document.addEventListener('keydown', (event) => {
      console.log(`You pressed: ${event.key}`);
      word.tryLetter(event.key.toUpperCase());
    });
    reset_button.addEventListener('click', (event) => {
      word = GameInitializer.newRandomGame(word_list, word_element, health_element, won, over);
    });
})