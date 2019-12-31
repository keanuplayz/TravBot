const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix
var weather = require('weather-js');

module.exports.run = async (client, message, args) => {
    if(args.length == 0) return message.channel.send('You need to provide a city.');

    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
        if(err) message.channel.send(err);

        var current = result[0].current;
        var location = result[0].location;

        const embed = new Discord.RichEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(0x00AE86)
            .addField('Timezone', `UTC${location.timezone}`, true)
            .addField('Degree Type',`C`, true)
            .addField('Temperature',`${current.temperature} Degrees`, true)
            .addField('Feels like', `${current.feelslike} Degrees`, true)
            .addField('Winds',current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true)
        message.channel.send({embed});

    });

}

module.exports.config = {
    name: "weather",
    noaliases: "No aliases",
    aliases: [],
    usage: ".weather",
    description: "Tells you the weather of the selected town/city.",
    accessibleby: "Members"
}
