const whoami = require("../whois.json")
module.exports.run = (client, message, args) => {
    	let mention = message.mentions.users.first()

	message.channel.send(`<@${mention.id}> is ${whoami[mention.id]}`);
}

module.exports.config = {
    name: "whois",
    noaliases: "No aliases",
    aliases: [],
    usage: ".whois",
    description: "Gives you the whoami message for the mentioned user.",
    accessibleby: "Members"
}
