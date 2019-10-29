
module.exports.run = async (client, message, args) => {
  message.delete();
  if (!args[0]) return message.channel.send("`You have to provide a message for me to say!`");
  message.channel.send(args.join(" "));
}

module.exports.config = {
    name: "say",
    aliases: ["s"],
    usage: ".say <message>",
    description: "Repeats your message.",
    accessibleby: "Members"
}