'use strict';

// Classic Magic 8-Ball style answers (public-domain style paraphrases)
const ANSWERS = [
  'It is certain.',
  'It is decidedly so.',
  'Without a doubt.',
  'Yes definitely.',
  'You may rely on it.',
  'As I see it, yes.',
  'Most likely.',
  'Outlook good.',
  'Yes.',
  'Signs point to yes.',
  'Reply hazy, try again.',
  'Ask again later.',
  'Better not tell you now.',
  'Cannot predict now.',
  'Concentrate and ask again.',
  "Don't count on it.",
  'My reply is no.',
  'My sources say no.',
  'Outlook not so good.',
  'Very doubtful.'
];

exports.ask = (_, args) => {
  const answer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
  if (!args.length) {
    return `\uD83D\uDD2E The Magic 8 Ball says: ${answer}`;
  }
  const question = args.join(' ');
  return `\uD83D\uDD2E You asked: "${question}"\r\n\r\nThe Magic 8 Ball says: ${answer}`;
};
