let word;
let word_list;
let chosen_word;

class Game {
  constructor(word, word_element, on_succeed, on_fail) {
    this.word = word;
    this.element = word_element;
    this.health = 7;
    this.on_succeed = on_succeed;
    this.on_fail = on_fail;
    this.element.innerHTML = "_" * this.word.length;
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