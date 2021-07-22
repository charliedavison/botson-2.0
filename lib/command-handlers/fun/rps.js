'use strict';

exports.play = ([playerChoice]) => {
  const choices = ['rock', 'paper', 'scissors'];
  const botChoice = choices[Math.floor(Math.random() * choices.length)];

  const outcomes = {
    rock: { scissors: 'You Win!, Rock smashes scissors!', paper: 'You lose!, Paper covers rock!'} ,
    paper: { rock: 'You Win!, Paper covers rock!', scissors: 'You lose!, Scissors cut paper!' },
    scissors: { paper: 'You Win!, Scissors cut paper!', rock: 'You lose!, Rock smashes scissors!' }
  };

  if (!outcomes[playerChoice.toLowerCase()]) {
    return `${playerChoice} is not a valid option, please pick rock, paper or scissors.`;
  }


  if (botChoice === playerChoice) {
    return `I picked ${botChoice} too! It's a draw!`
  }

  return outcomes[playerChoice.toLowerCase()][botChoice];
};