const colours = require("../colours.json");

exports.run = async (client, message, args, level) => {
    let sEmbed = new Discord.RichEmbed()
        .setColor(colours.cyan)
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconUrl)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Guild Name:**", `${message.guild.name}`, true)
        .addField("**Guild Owner:**", `${message.guild.owner}`, true)
        .addField("**Member Count:**", `${message.guild.memberCount}`, true)
        .addField("**Role Count:**", `${message.guild.roles.size}`, true)
        .setFooter(`Travbot Services`, bot.user.displayAvatarURL);
    message.channel.send({sEmbed})
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["si"],
    permLevel: "User"
};

exports.help = {
    name: "serverinfo",
    category: "Utility",
    description: "Displays info about current guild.",
    usage: "serverinfo"
};