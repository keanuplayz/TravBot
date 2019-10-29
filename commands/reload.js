
const {ownerID} = require("../config.json");

module.exports.run = async (client, message, args) => {
    if(message.author.id != ownerID) return message.channel.send("You are not the bot owner.")
    if(!args[0]) return message.channel.send("Please provide a command to reload.").then(m => m.delete(5000));
    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)] //usage !reload <name>
        client.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        client.commands.set(commandName, pull)
    } catch(e) {
        console.log(e.stack);
        return message.channel.send(`Could not reload \`${args[0].toUpperCase()}\``).then(m => m.delete(5000));
    }

    message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded.`).then(m => m.delete(5000));
}

module.exports.config = {
    name: "reload",
    aliases: ["rl"],
    usage: ".reload <command name>",
    description: "Reloads given command.",
    accessibleby: "Bot Owner"
}