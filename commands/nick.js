const {ownerID} = require("../config.json");


module.exports.run = async (client, message, args) => {
    if (message.author.id != ownerID) return message.channel.send("You are not the bot owner!")
    try{
        const nickName = args.join(" ");
        const lea = message.guild.members.find('id', client.user.id);
        await lea.setNickname(nickName);
        message.delete(5000);
        message.channel.send(`Nickname set to \`${nickName}\``).then(m => m.delete(5000));
    } catch (e) {
        console.log(e)
    }
}

module.exports.config = {
    name: "nick",
    noalias: "No aliases",
    aliases: [],
    usage: ".nick",
    description: "Changes bot nickname.",
    accessibleby: "Bot Owner"
}