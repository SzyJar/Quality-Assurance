const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  
  constructor() {
    this.britishToAmericanSpelling = {};
    for (const key in americanToBritishSpelling) {
      const value = americanToBritishSpelling[key];
      this.britishToAmericanSpelling[value] = key;
    };
    this.britishToAmericanTitles = {};
    for (const key in americanToBritishTitles) {
      const value = americanToBritishTitles[key];
      this.britishToAmericanTitles[value] = key;
    };
    this.americanOnlyReversed = {};
    for (const key in americanOnly) {
      const value = americanOnly[key];
      this.americanOnlyReversed[value] = key;
    };

    this.spanBefore = '';
    this.spanAfter = '';
  };
  
  britishToAmerican(input) {
    let text = input.split(' ');
    let lastChar = '';
    if (text[text.length - 1][text[text.length - 1].length - 1] !== /[^a-zA-Z]/) {
      lastChar = text[text.length - 1].slice(-1);
      text[text.length - 1] = text[text.length - 1].slice(0, -1);
    };
    let output = [];
    
    for (let i = 0; i < text.length; i++) {
      if (this.americanOnlyReversed[(text[i] + ' ' + text[i + 1]).toLowerCase()]) {
        output.push(this.americanOnlyReversed[(text[i] + ' ' + text[i + 1]).toLowerCase()]);
        i++;
      } else if (this.americanOnlyReversed[(text[i] + ' ' + text[i + 1] + ' ' + text[i + 2]).toLowerCase()]) {
        output.push(this.americanOnlyReversed[(text[i] + ' ' + text[i + 1] + ' ' + text[i + 2]).toLowerCase()]);
        i = i + 2; 
      } else if (britishOnly[(text[i] + ' ' + text[i + 1]).toLowerCase()]) {
        output.push(britishOnly[(text[i] + ' ' + text[i + 1]).toLowerCase()]);
        i++;
      } else if (britishOnly[(text[i] + ' ' + text[i + 1] + ' ' + text[i + 2]).toLowerCase()]) {
        output.push(britishOnly[(text[i] + ' ' + text[i + 1] + ' ' + text[i + 2]).toLowerCase()]);
        i = i + 2;
      } else if (britishOnly[text[i].toLowerCase()]) {
        output.push(britishOnly[text[i].toLowerCase()]);
      } else if (this.americanOnlyReversed[text[i].toLowerCase()]) {
        output.push(this.americanOnlyReversed[text[i].toLowerCase()]);
      } else if (this.britishToAmericanSpelling[text[i].toLowerCase()]) {
        output.push(this.britishToAmericanSpelling[text[i].toLowerCase()]);
      } else if (this.britishToAmericanTitles[text[i].toLowerCase()]) {
        output.push(this.britishToAmericanTitles[text[i].toLowerCase()]);
      } else if (/^(0?[0-9]|1[0-9]|2[0-3]).[0-5][0-9]$/.test(text[i])) {
        output.push(text[i].slice(0, -3) + ':' + text[i].slice(-2))
      } else {
        output.push(text[i]);
      };
    };
    
    return output.join(' ') + lastChar;
  };
  
  americanToBritish(input) {
    let text = input.split(' ');
    let lastChar = '';
    if (text[text.length - 1][text[text.length - 1].length - 1] !== /[^a-zA-Z]/) {
      lastChar = text[text.length - 1].slice(-1);
      text[text.length - 1] = text[text.length - 1].slice(0, -1);
    };
    let output = [];
    
    for (let i = 0; i < text.length; i++) {
      if (americanToBritishSpelling[text[i]]) {
        output.push(americanToBritishSpelling[text[i]]);
      } else if (americanToBritishTitles[text[i].toLowerCase()]) {
        output.push(americanToBritishTitles[text[i].toLowerCase()]);
      } else if (americanOnly[(text[i] + ' ' + text[i + 1]).toLowerCase()]) {
        output.push(americanOnly[(text[i] + ' ' + text[i + 1]).toLowerCase()]);
        i++;
      } else if (americanOnly[(text[i] + ' ' + text[i + 1] + ' ' + text[i + 2]).toLowerCase()]) {
        output.push(americanOnly[(text[i] + ' ' + text[i + 1] + ' ' + text[i + 2]).toLowerCase()]);
        i = i + 2;
      } else if (americanOnly[text[i].toLowerCase()]) {
        output.push(americanOnly[text[i].toLowerCase()]);
      } else if (/^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(text[i])) {
        output.push(text[i].slice(0, -3) + '.' + text[i].slice(-2))
      } else {
        output.push(text[i]);
      };
    };
    
    return output.join(' ') + lastChar;
  };

  
  addSpanElement(text, translation) {
    let textSplit = text.split(' ');
    let translationSplit = translation.split(' ');
    let output = []
    for (let i = 0; i < textSplit.length; i++) {
      if (textSplit[i] !== translationSplit[i]) {
        output.push('<span class="highlight">' + translationSplit[i] + '</span>')
      } else {
         output.push(translationSplit[i])
      };
    };
    
    return output.join(' ');
  };
  
};

module.exports = Translator;