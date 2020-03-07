/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
   const sender = message.author;
   const mention = message.mentions.users.first();
   const question = args.join(" ");
   if (!args[0]) return message.channel.send("Please ask me a question.");
   const responses = [
      "Most likely,",
      "It is certain,",
      "It is decidedly so,",
      "Without a doubt,",
      "Definitely,",
      "You may rely on it,",
      "As I see it, yes,",
      "Outlook good,",
      "Yes,",
      "Signs point to yes,",
      "Reply hazy, try again,",
      "Ask again later,",
      "Better not tell you now,",
      "Cannot predict now,",
      "Concentrate and ask again,",
      "Don't count on it,",
      "My reply is no,",
      "My sources say no,",
      "Outlook not so good,",
      "Very doubtful,"
   ];
   message.channel.send(responses[Math.floor(Math.random() * responses.length)] + `<@${sender.id}>`);
};
exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: [],
   permLevel: "User"
};
exports.help = {
   name: "8ball",
   category: "Fun",
   description: "Gives you an 8-ball response.",
   usage: "8ball [question]"
};
