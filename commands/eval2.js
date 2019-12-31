const {allowed} = require("../config.json");

module.exports.run = async (client, message, args) => {
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
    name: "eval2",
    noalias: "No aliases",
    aliases: [],
    usage: ".eval2",
    description: "Evaluates and executes given JS code.",
    accessibleby: "Bot Owner"
}
