const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

const file1 = new Discord.Attachment('assets/ravi1.png');
const exampleEmbed = {
	title: 'Ravioli ravioli...',
	image: {
		url: 'attachment://ravi1.png',
	},
};

const file2 = new Discord.Attachment('assets/ravi2.png');
const exampleEmbed2 = {
	title: 'Ravioli ravioli...',
	image: {
		url: 'attachment://ravi2.png',
	},
};

const file3 = new Discord.Attachment('assets/ravi3.png');
const exampleEmbed3 = {
	title: 'Ravioli ravioli...',
	image: {
		url: 'attachment://ravi3.png',
	},
};

const file4 = new Discord.Attachment('assets/ravi4.png');
const exampleEmbed4 = {
	title: 'Ravioli ravioli...',
	image: {
		url: 'attachment://ravi4.png',
	},
};

const file5 = new Discord.Attachment('assets/ravi5.png');
const exampleEmbed5 = {
	title: 'Ravioli ravioli...',
	image: {
		url: 'attachment://ravi5.png',
	},
};

const file6 = new Discord.Attachment('assets/ravi6.png');
const exampleEmbed6 = {
	title: 'Ravioli ravioli...',
	image: {
		url: 'attachment://ravi6.png',
	},
};

const file7 = new Discord.Attachment('assets/ravi7.png');
const exampleEmbed7 = {
	title: 'Ravioli ravioli...',
	image: {
		url: 'attachment://ravi7.png',
	},
};

const file8 = new Discord.Attachment('assets/ravi8.png');
const exampleEmbed8 = {
	title: 'Ravioli ravioli...',
	image: {
		url: 'attachment://ravi8.png',
	},
};

const file9 = new Discord.Attachment('assets/ravi9.png');
const exampleEmbed9 = {
	title: 'Ravioli ravioli...',
	image: {
		url: 'attachment://ravi9.png',
	},
};

module.exports.run = async (client, message, args) => {
    if (!args.length) {
        return message.channel.send(`Please provide a number between 1 and 9.`);
    } else if (args[0] === '1') {
        return message.channel.send({ files: [file1], embed: exampleEmbed });
    } else if (args[0] === '2') {
        return message.channel.send({ files: [file2], embed: exampleEmbed2 });
    } else if (args[0] === '3') {
        return message.channel.send({ files: [file3], embed: exampleEmbed3 });
    } else if (args[0] === '4') {
        return message.channel.send({ files: [file4], embed: exampleEmbed4 });
    } else if (args[0] === '5') {
        return message.channel.send({ files: [file5], embed: exampleEmbed5 });
    } else if (args[0] === '6') {
        return message.channel.send({ files: [file6], embed: exampleEmbed6 });
    } else if (args[0] === '7') {
        return message.channel.send({ files: [file7], embed: exampleEmbed7 });
    } else if (args[0] === '8') {
        return message.channel.send({ files: [file8], embed: exampleEmbed8 });
    } else if (args[0] === '9') {
        return message.channel.send({ files: [file9], embed: exampleEmbed9 });
    }
};

module.exports.config = {
    name: "ravi",
    noaliases: "No aliases",
    aliases: [],
    usage: ".ravi <number>",
    description: "Ravioli ravioli...",
    accessibleby: "Members"
}