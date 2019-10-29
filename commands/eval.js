const Discord = require('discord.js');
const config = require("../config.json");


module.exports.run = async (client, message, args) => {
    let allowed=["208763015657553921","374298111255773184", "465662909645848577", "234666977765883904"]
    if(!allowed.includes(message.author.id)) return message.channel.send("You're not allowed to use this!")
    try {
        const value = eval(args.join(" "));
        let stuff;
        if (args !== undefined || args !== "") {
            stuff = value;
        } else {
            stuff = "Done!";
        }
        await message.channel.send(stuff);
    } catch (e) {
        console.log(e);
    }
}


module.exports.config = {
    name: "eval",
    noalias: "No aliases",
    aliases: [],
    usage: ".eval",
    description: "Evaluates and executes given JS code.",
    accessibleby: "Bot Owner"
}
