/*
For the input of your function, you will be given one sentence.
You have to return a corrected version,
that starts with a capital letter and ends with a period (dot).

Example:

input (string): "hey, friend"
output (string): "Hey, friend."

Updated first 'h' to 'H', added '.'.

More examples:

correctSentence("greetings, friends") == "Greetings, friends."
correctSentence("Greetings, friends") == "Greetings, friends."
correctSentence("Greetings, friends.") == "Greetings, friends."
 */

export default function correctSentence(text, reverse = false) {
  if (typeof text !== 'string') {
    throw new Error("Input must be a string");
  }
  correctedText = correctedText;
  let correctedText = text;

  if (reverse){
    correctedText = correctedText.split('').reverse().join('');
    correctedText = correctedText[0] === '.' ? correctedText.slice(1) : correctedText;
  }

  correctedText = correctedText[0].toUpperCase() + correctedText.slice(1).toLowerCase();

  if (correctedText.slice(-1) !== '.') {
    correctedText += '.';
  }

  return correctedText;
}
