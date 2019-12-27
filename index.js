const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const moment = require('moment');
const {
	prefix,
	token,
} = require('./config.json');
const ytdl = require('ytdl-core');
const RC = require('reaction-core');
const path = require('path');

const cron = require('node-cron');

cron.schedule("0 0 * * *", function(){
	const Discord = require('discord.js');
	console.log("h has officially been declared greater then H");
	client.channels.get("638454695748304907").send("`daily reminder that h > H` :blue_heart:");
	client.channels.get("550328947242434610").send("`daily reminder that h > H` :blue_heart:");
	client.channels.get("605909799691091980").send("Ichiki is a damn cutie. Like, really cute. No escaping that.");
});

const client = new Discord.Client({
	disableEveryone: true
});

const command = new Commando.Client({
	owner: '465662909645848577'
});

const queue = new Map();

const fs = require("fs");

const search = require("yt-search");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const handler = new RC.Handler();

fs.readdir("./commands/", (err, files) => {

	if (err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if (jsfile.length <= 0) {
		return console.log("[LOGS] Couldn't find commands!");
	}

	jsfile.forEach((f, i) => {
		let pull = require(`./commands/${f}`);
		client.commands.set(pull.config.name, pull);
		pull.config.aliases.forEach(alias => {
			client.aliases.set(alias, pull.config.name);
		});
	});
});

client.on('messageReactionAdd', (messageReaction, user) => handler.handle(messageReaction, user));
const example = require('./exButtons.js');

let changeColour = new RC.Menu(example.embed, example.buttons);
handler.addMenus(changeColour);

client.on('message', async message => {
	if (message.author.bot) return;
});

client.on('guildCreate', guild => {
	client.channels.get("631163133997744129").send(`TravBot joined: ${guild.name}`);
});

client.once('ready', () => {
	console.log(`Ready! Currently in ${client.guilds.size} guilds.`);
	client.user.setStatus('dnd');
	client.user.setActivity('.help', {
		type: 'LISTENING'
	});
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});


client.on('message', async message => {
	let prefix = ".";
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const serverQueue = queue.get(message.guild.id);
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];

	if (!message.content.startsWith(prefix)) return;
	let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
	if (commandfile) commandfile.run(client, message, args);

	if (message.content === `:ohno:`) {
		message.react(":ohno:");
	}

	if (message.content === `${prefix}rctest`) {
		message.channel.sendMenu(changeColour);
	}

	if (message.content.startsWith(`${prefix}play`)) {
		execute(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}skip`)) {
		skip(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}stop`)) {
		stop(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}volume`)) {
		if (!voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (message.author.id != "465662909645848577") return message.channel.send("You are not the bot owner!");

		if (!serverQueue) return message.channel.send('There is nothing playing.');
		if (!args[1]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic([1] / 5);
		return message.channel.send(`I set the volume to: **${args[1]}**`);
	} else if (message.content.startsWith(`${prefix}np`)) {
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`Now playing: **${serverQueue.songs[0].title}**`);
	} else if (message.content.startsWith(`${prefix}queue`)) {
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

Now playing: **${serverQueue.songs[0].title}**
		`);
	} else if (message.content.startsWith(`${prefix}pause`)) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('Paused the music for you.');
		}
		return message.channel.send('There is nothing playing.');
	} else if (message.content.startsWith(`${prefix}resume`)) {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('Resumed the music for you.');
		}
		return message.channel.send('There is nothing playing.');
	} else if (message.content.startsWith(`${prefix}args-info`)) {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		} else if (args[0] === 'rar') {
			return message.channel.send('Hey, this worked!');
		}

		message.channel.send(`First argument: ${args[0]}`);
	} else if (message.content.startsWith(`${prefix}listemoji`)) {
		const emojiList = message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' + e.name).join('\n');
		message.channel.send(emojiList);
		return;
	} else if (message.content.startsWith(`${prefix}search`)) {
		search(args.join(' '), function (err, res) {
			if (err) return message.channel.send('Something went wrong.');

			let videos = res.videos.slice(0, 10);

			let resp = '';
			for (var i in videos) {
				resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
			}

			resp += `\n**Choose a number between \`1-${videos.length}\``;

			message.channel.send(resp);

			const filter = m => !isNaN(m.content) && m.content < videos.length + 1 && m.content > 0;
			const collector = message.channel.createMessageCollector(filter);

			collector.videos = videos;

			collector.once('collect', function (m) {
				execute(message, serverQueue);
				return;
			});
		});
	}
});

async function execute(message, serverQueue) {
	const args = message.content.split(' ');

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
		length: songInfo.length_seconds,
	};

	if (song.length >= 7*60) {
		return message.channel.send("This song is too long!");
	}

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return message.channel.send(`${song.title} has been added to the queue!`);
	}

}

function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('Music ended!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`Started playing: **${song.title}**`);
}

client.login(token).then().catch(`Error logging in: ${console.error}`);
