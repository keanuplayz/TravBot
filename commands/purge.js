const {ownerID} = require("../config.json");

module.exports.run = async (client, message, args) => {
    if (message.author.id != ownerID) return message.channel.send("You are not the bot owner!")
    message.delete();
    console.log('Executing purge.');
    const msgs = await message.channel.fetchMessages({ limit: 100 });
    const travMessages = msgs.filter(m => m.author.id === client.user.id);
    console.log(`Found ${travMessages.size} messages to delete.`);
    if(!args.includes("--silent")) {
        await message.channel.send(`Found ${travMessages.size} messages to delete.`).then(m => m.delete(5000));
    }
    try {
        message.delete();
        await message.channel.bulkDelete(travMessages);
    } catch (e) {
        for (const [id, travMsg] of travMessages) {
            await travMsg.delete(1000)
        }
    }
}

module.exports.config = {
    name: "purge",
    noalias: "No aliases",
    aliases: [],
    usage: ".purge",
    description: "Purges all bot messages.",
    accessibleby: "Bot Owner"
}