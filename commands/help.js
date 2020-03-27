const Discord = require("discord.js");
const colours = require("../colours.json");
exports.run = (client, message, args, level) => {
    if (args[0] == "help") return message.channel.send(`Just do \`${message.settings.prefix}help\` instead.`);
    if (!args[0]) {
        const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level && cmd.conf.guildOnly !== true);
        const commandNames = myCommands.keyArray();
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
        let currentCategory = "";
        let output = `= Command List =\n\n[Use ${
         message.settings.prefix}help <commandname> for details]\n`;
        const sorted = myCommands.array()
            .sort(
                (p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1);
        sorted.forEach(c => {
            const cat = c.help.category.toProperCase();
            if (currentCategory !== cat) {
                output += `\u200b\n== ${cat} ==\n`;
                currentCategory = cat;
            }
            output += `${
            message
               .settings
               .prefix}${
            c
               .help
               .name}${ " "
            .repeat(longest - c.help.name.length)} :: ${
            c.help.description}\n`;
        });
        const embed = new Discord.RichEmbed()
            .setAuthor("Help Command!", message.guild.iconURL)
            .setThumbnail(client.user.displayAvatarURL)
            .setColor(colours.red_light)
            .setDescription(`${message.author.username}, check your DM's.`);
        message.channel.send(embed)
            .then(m => m.delete(10000));
        message.author.send(output, {
            code: "asciidoc",
            split: {
                char: "\u200b"
            }
        });
    } else {
        let command = args[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            if (level < client.levelCache[command.conf.permLevel]) return;
            const embed = new Discord.RichEmbed()
                .setAuthor("Help Command!", message.guild.iconURL)
                .setThumbnail(client.user.displayAvatarURL)
                .setColor(colours.red_light)
                .setDescription(`${message.author.username}, check your DM's.`);
            message.channel.send(embed)
                .then(m => m.delete(10000));
            message.author.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(", ")}\n= ${command.help.name} =`, {
                code: "asciidoc"
            });
        }
    }
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [
        "h", "halp"
    ],
    permLevel: "User"
};
exports.help = {
    name: "help",
    category: "System",
    description: "Displays all the available commands for your permission level.",
    usage: "help [command]"
};