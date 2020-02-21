// NOTE: Add the images! (/assets/ravi.png)

exports.run = async (client, message, args, level) => {
    if (!args.length || isNaN(args[0]) || args[0]<1 || args[0]>9) return message.channel.send(`Please provide a number between 1 and 9.`);
	let file = new Discord.Attachment(`assets/ravi${args[0]}.png`)
	const embed = {
		title: 'Ravioli ravioli...',
		image: {
			url: `attachment://ravi${args[0]}.png`,
		}
	}
    message.channel.send({ files: [file], embed: embed });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "ravi",
    category: "Fun",
    description: "Ravioli ravioli...",
    usage: "ravi [number]"
};