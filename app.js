let game;


class Utils {
  static isAlpha(letter) {
    return typeof letter === "string" && letter.length === 1
      && (letter >= "a" && letter <= "z" || letter >= "A" && letter <= "Z");
  }
}

class UI {
  constructor(word_element, health_element, reset_button) {
    this.word_element = word_element;
    this.health_element = health_element;
    this.reset_button = reset_button;
  }

  empty(number) {
    this.word_element.innerHTML = "_".repeat(number);
  }

  introduceLetter(letter, indexes) {
    let split_string = this.word_element.innerHTML.split("");
    for (let index of indexes) {
      console.log(index)
      split_string[index] = letter;
    }
    this.word_element.innerHTML = split_string.join("");
  }

  updateHealth(number) {
    this.health_element.innerHTML = number.toString()
  }

  assignReset(resetFunction) {
    this.reset_button.addEventListener('click', resetFunction);
  }
}

class GamePlay {
  constructor(word, _UI) {
    this._UI = _UI;
    this.word = word;
    this.word_map = {};
    for (let index = 0; index < this.word_length; index += 1) {
      if (!this.word_map.hasOwnProperty(word[index])) {
        this.word_map[index] = [];
      }
      this.word_map[word[index]].push(index);
    }
    this.already_tried = [];
    this.correct_letters = [];
    this.updateHealth();
  }

  updateHealth() {
    this._UI.updateHealth(this.health);
  }

  isVictory() {
    return this.correct_letters.length == this.word.length;
  }

  wrongLetter() {
    this.health -= 1;
    this.updateHealth();
    if (this.health == 0) {
      this.onFail()
    }
  }

  correctLetter(letter, indexes) {
    this._UI.introduceLetter
  }

  onFail() {
    alert()
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
    if (Utils.isAlpha(letter) && !this.already_tried.includes(letter)) {
      let indices = [];
      this.already_tried.push(letter);
      for (let iter = 0; iter < this.word_map.length; iter++) {
        if (this.word_map[iter] === letter) indices.push(iter);
      }
      if (indices.length == 0) {
        this.wrongLetter();
      }
      if (indices.length != 0) {
        this.correctLetter(letter, indices);
      }
    }
  }

}


class Game {
  constructor(words, _UI) {
    this.words = words;
    this._UI = _UI;
    this._UI.assignReset(this.newGame);
    this.newGame();
  }

  newGame() {
    let word = words[Math.floor(Math.random() * words.length)];
    this.game_play = new GamePlay(word, this._UI);
  }
}

document.addEventListener("DOMContentLoaded",
  function () {
    word_element = document.getElementById("word");
    health_element = document.getElementById("health");
    reset_button = document.getElementById("reset");
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
  })