/* eslint-disable no-unused-vars */
const moment = require("moment");
exports.run = async (client, message, args, level) => {
    // Test if the command is on cooldown. This isn't the strictest cooldown possible, because in the event that the bot crashes, the cooldown will be reset. But for all intends and purposes, it's a good enough cooldown. It's a per-server cooldown.
    if (!("scanemotesCooldown" in client)) client.scanemotesCooldown = {};
    const cooldown = 3600000; // 1 hour
    const lastUsedTimestamp = client.scanemotesCooldown[message.guild.id] || 0;
    const difference = Date.now() - lastUsedTimestamp;
    const howLong = moment(Date.now()).to(lastUsedTimestamp + cooldown);

    // If it's been less than an hour since the command was last used, prevent it from executing.
    if (difference < cooldown) {
        message.channel.send(`This command requires an hour to cooldown. You'll be able to activate this command ${howLong}.`);
        return;
    }

    let stats = {};
    let statsWithoutBots = {};
    let allTextChannelsInCurrentGuild = message.guild.channels.filter(channel => {
        // IMPORTANT: You MUST check if the bot actually has access to the channel in the first place. It will get the list of all channels, but that doesn't mean it has access to every channel. Without this, it'll require admin access and throw an annoying unhelpful DiscordAPIError: Missing Access otherwise.
        const permissions = channel.permissionsFor(client.user);
        const isViewable = permissions && permissions.has("VIEW_CHANNEL", false);
        return channel.type === "text" && isViewable;
    });
    let limit = allTextChannelsInCurrentGuild.size;
    let channelsSearched = 0;
    let statusMessage = await message.channel.send("Gathering emotes...");
    let lastChannelID;
    message.channel.startTyping();

    try {
        allTextChannelsInCurrentGuild.forEach(async channel => {
            // This will count all reactions in text and reactions per channel.
            let selected = channel.lastMessageID;
            let continueLoop = true;

            while (continueLoop) {
                let messages = await channel.fetchMessages({
                    limit: 100,
                    before: selected
                });

                // The reason why I place the status update here is because searching through channels is asynchronous, so different channels will be searched randomly.
                // To avoid setting off Discord's rate limits like crazy, it'll only send an edit request if the channel is different.
                // Also, I check if there are 100 or more messages in a given channel to avoid small channels like info channels.
                if (channel.id !== lastChannelID && messages.size >= 100) statusMessage.edit(`Searching channel \`${channel.name}\`...`);
                lastChannelID = channel.id;

                if (messages.size <= 0) {
                    continueLoop = false;
                    channelsSearched++;

                    // Display stats on emote usage.
                    if (channelsSearched >= limit) {
                        // Make sure to activate the cooldown before any return statements.
                        client.scanemotesCooldown[message.guild.id] = Date.now();

                        // If there are no emotes to track, send that instead.
                        if (Object.keys(stats).length === 0) {
                            message.channel.send("There are no emotes to analyze!");
                            message.channel.stopTyping();
                            return;
                        }

                        // Depending on how many emotes you have, you might have to break up the analytics into multiple messages.
                        let total = 0;
                        let validEmotes = [];
                        let lines = [];
                        let line = "";

                        for (let emote in stats) {
                            let emoteObject = message.guild.emojis.get(emote);

                            // Emotes not within the current guild (or deleted ones) will return null. Select only those from the current guild.
                            if (emoteObject != null) {
                                let stat = `<:${emoteObject.name}:${emote}> x ${stats[emote]} (${statsWithoutBots[emote] || 0} w/o bots)\n`;
                                total += statsWithoutBots[emote];
                                validEmotes.push(emote);

                                if (line.length + stat.length > 2000) {
                                    lines.push(line);
                                    line = "";
                                }

                                line += stat;
                            }
                        }

                        // It's better to send all the lines at once rather than paginate the data because it's quite a memory-intensive task to search all the messages in a server for it, and I wouldn't want to activate the command again just to get to another page.
                        if (line.length > 0) lines.push(line); // You can't send empty messages or there'll be an error.
                        
                        // Do the same thing but sorted and with percentages.
                        let sorted = validEmotes.sort((a, b) => statsWithoutBots[b] - statsWithoutBots[a]);
                        let rank = 1;
                        line = "";

                        for (let emote of sorted) {
                            let stat = `#${rank++} <:${message.guild.emojis.get(emote).name}:${emote}> - ${(statsWithoutBots[emote] / total * 100).toFixed(3)}%\n`;

                            if (line.length + stat.length > 1900) {
                                lines.push(line);
                                line = "";
                            }

                            line += stat;
                        }

                        if (line.length > 0) lines.push(line);
                        for (let ln of lines) await message.channel.send(ln);
                        statusMessage.delete();
                        message.channel.stopTyping();
                    }
                } else {
                    messages.forEach(msg => {
                        let msgEmotes = msg.content.match(/<:.+?:\d+?>/g) || [];
                        let reactionEmotes = msg.reactions.keyArray();

                        for (let emote of msgEmotes) {
                            let emoteID = emote.match(/\d+/g)[0];

                            if (!(emoteID in stats)) stats[emoteID] = 0;
                            stats[emoteID]++;

                            if (!msg.author.bot) {
                                if (!(emoteID in statsWithoutBots)) statsWithoutBots[emoteID] = 0;
                                statsWithoutBots[emoteID]++;
                            }
                        }

                        for (let emoteTag of reactionEmotes) {
                            let emoteTagIndex = emoteTag.indexOf(":");
                            let emoteID = emoteTagIndex !== -1 ? emoteTag.substring(emoteTagIndex + 1) : emoteTag; // In Discord.js v11, the keys are "<emote name>:<emote ID>" instead.

                            // Exclude any unicode emote.
                            if (msg.reactions.get(emoteTag).emoji.id != null) {
                                if (!(emoteID in stats)) stats[emoteID] = 0;
                                stats[emoteID] += msg.reactions.get(emoteTag).count;

                                if (!(emoteID in statsWithoutBots)) statsWithoutBots[emoteID] = 0;
                                statsWithoutBots[emoteID] += msg.reactions.get(emoteTag).count;

                                // I don't know why this collection always appears as empty.
                                msg.reactions.get(emoteTag).users.forEach(user => {
                                    if (user.bot) statsWithoutBots[emoteID]--;
                                });
                            }
                        }

                        selected = msg.id;
                    });
                }
            }
        });
    } catch (error) {
        message.channel.send("```" + error + "```");
    }
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "scanemotes",
    category: "Miscellaneous",
    description: "Scans all text channels in the current guild and returns the number of times each emoji specific to the guild has been used.",
    usage: "scanemotes"
};