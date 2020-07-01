/* eslint-disable no-unused-vars */
const cookies = [
    `has given %%% a chocolate chip cookie!`,
    `has given %%% a soft homemade oatmeal cookie!`,
    `has given %%% a plain, dry, old cookie. It was the last one in the bag. Gross.`,
    `gives %%% a sugar cookie. What, no frosting and sprinkles? 0/10 would not touch.`,
    `gives %%% a chocolate chip cookie. Oh wait, those are raisins. Bleck!`,
    `gives %%% an enormous cookie. Poking it gives you more cookies. Weird.`,
    `gives %%% a fortune cookie. It reads "Why aren't you working on any projects?"`,
    `gives %%% a fortune cookie. It reads "Give that special someone a compliment"`,
    `gives %%% a fortune cookie. It reads "Take a risk!"`,
    `gives %%% a fortune cookie. It reads "Go outside."`,
    `gives %%% a fortune cookie. It reads "Don't forget to eat your veggies!"`,
    `gives %%% a fortune cookie. It reads "Do you even lift?"`,
    `gives %%% a fortune cookie. It reads "m808 pls"`,
    `gives %%% a fortune cookie. It reads "If you move your hips, you'll get all the ladies."`,
    `gives %%% a fortune cookie. It reads "I love you."`,
    `gives %%% a Golden Cookie. You can't eat it because it is made of gold. Dammit.`,
    `gives %%% an Oreo cookie with a glass of milk!`,
    `gives %%% a rainbow cookie made with love :heart:`,
    `gives %%% an old cookie that was left out in the rain, it's moldy.`,
    `bakes %%% fresh cookies, it smells amazing.`
];
exports.run = async (client, message, args, level) => {
    const sender = message.author;
    const mention = message.mentions.users.first();
    if (!mention) return message.channel.send("You have to mention a user first!");
    if (args[0] == "all") return message.channel.send(`<@${sender.id}> gave everybody a cookie!`);
    if (!mention) return message.channel.send(":cookie: Here's a cookie!");
    if (mention.id == sender.id) return message.channel.send("You can't give yourself cookies!");
    message.channel.send(`:cookie: <@${sender.id}> ${cookies.random().replace(/%%%/g, `<@${mention.id}>`)}`);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "cookie",
    category: "Fun",
    description: "Gives specified user a module.",
    usage: "cookie [@user]"
};