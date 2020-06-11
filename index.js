/* eslint-disable no-unused-vars */
if (Number(process.version.slice(1)
        .split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");
const Discord = require("discord.js");
const Commando = require("discord.js-commando");
const cron = require("node-cron");
cron.schedule("0 0 * * *", function() {
    console.log("tfw empty cronjob");
});
const {
    promisify
} = require("util");
const readdir = promisify(require("fs")
    .readdir);
const Enmap = require("enmap");
const client = new Commando.Client({
    owner: [
        "465662909645848577", "464733215903580160", "465702500146610176", "630352550125895692"
    ],
    disableEveryone: true,
    commandPrefix: ".",
    unknownCommandResponse: false
});
client.registry.registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: false,
        unknownCommand: false
    });
client.config = require("./config.js");
client.logger = require("./modules/Logger");
require("./modules/functions.js")(client);
client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({
    name: "settings"
});
client.active = new Map();

// Message logger.
client.on("message", function(message) {
    const embedChannel = client.channels.get("719597009195237516");
    if (message.channel.id === "651132674496266250" || message.channel.id === "651132744298135552" || message.channel.id === "646528635276099584") {
        client.logger.log(`Message is created -> "${message}" in channel ${message.channel.name} on guild "${message.channel.guild.name}"`, "log");
        const embed = new Discord.RichEmbed()
            .setAuthor("Message Log", message.guild.iconURL)
            .setTitle(`Message in ${message.channel.guild.name}`)
            .setDescription(`Guild: ${message.channel.guild.name}\nChannel: ${message.channel.name}\nAuthor: <@${message.author.id}>\nMessage: ${message}\n\nMessage link: ${message.url}`)
            .setColor(0x9e3a33)
            .setFooter("TravBot Message Log");
        
        if (message.attachments.size !== 0) {
            const image = message.attachments.first();
            embed.setImage(image.url);
        }
        embedChannel.send("<@465662909645848577> <@717352467280691331>", embed);
    } else {
        return;
    }
});

const init = async () => {
    const cmdFiles = await readdir("./commands/");
    client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
    cmdFiles.forEach(f => {
        if (!f.endsWith(".js")) return;
        const response = client.loadCommand(f);
        if (response) console.log(response);
    });
    const evtFiles = await readdir("./events/");
    client.logger.log(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        client.logger.log(`Loading Event: ${eventName}`);
        const event = require(`./events/${file}`);
        client.on(eventName, event.bind(null, client));
    });
    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }
    client.login(client.config.token || process.env.BOT_TOKEN);
};
init();