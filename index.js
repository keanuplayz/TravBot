/* eslint-disable no-unused-vars */
if (Number(process.version.slice(1)
        .split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");
const Discord = require("discord.js");
const Commando = require("discord.js-commando");
const cron = require("node-cron");
cron.schedule("0 0 * * *", function() {
    const Discord = require("discord.js");
    console.log("Ichiki has been declared a cutie.");
    client.channels.get("605909799691091980")
        .send("Ichikutie is a cute Ichikutie. Like, really cute. No escaping Ichikutie.");
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
    client.login(client.config.token);
};
init();