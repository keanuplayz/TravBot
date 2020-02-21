exports.run = async (client, message, args, level) => {
    if (args[0]) {
    message.delete();
    client.user.setStatus(args[0])
  } else {
    message.delete();
    client.user.setStatus('dnd')
  }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
};

exports.help = {
    name: "status",
    category: "Utility",
    description: "Changes user status.",
    usage: "status [online/dnd/idle/invisible]"
};