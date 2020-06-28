/* eslint-disable no-unused-vars */
const moment = require("moment");
exports.run = async (client, message, args, level) => {
    // Test if the command is on cooldown. This isn't the strictest cooldown possible, because in the event that the bot crashes, the cooldown will be reset. But for all intends and purposes, it's a good enough cooldown. It's a per-server cooldown.
    const startTime = Date.now();
    if (!("scanemotesCooldown" in client)) client.scanemotesCooldown = {};
    const cooldown = 86400000; // 24 hours
    const lastUsedTimestamp = client.scanemotesCooldown[message.guild.id] || 0;
    const difference = startTime - lastUsedTimestamp;
    const howLong = moment(startTime).to(lastUsedTimestamp + cooldown);

    // If it's been less than an hour since the command was last used, prevent it from executing.
    if (difference < cooldown) {
        message.channel.send(`This command requires a day to cooldown. You'll be able to activate this command ${howLong}.`);
        return;
    } else {
        client.scanemotesCooldown[message.guild.id] = startTime;
    }

    const stats = {};
    let totalUserEmoteUsage = 0;
    // IMPORTANT: You MUST check if the bot actually has access to the channel in the first place. It will get the list of all channels, but that doesn't mean it has access to every channel. Without this, it'll require admin access and throw an annoying unhelpful DiscordAPIError: Missing Access otherwise.
    // Discord.js v12 has a dedicated property channel.isViewable which makes it possible to turn this into a one-liner if you upgrade. :leaSMUG:
    const allTextChannelsInCurrentGuild = message.guild.channels.filter(channel => {
        const permissions = channel.permissionsFor(client.user);
        const isViewable = permissions && permissions.has("VIEW_CHANNEL", false);
        return channel.type === "text" && isViewable;
    });
    let messagesSearched = 0;
    let channelsSearched = 0;
    let currentChannelName = "";
    let totalChannels = allTextChannelsInCurrentGuild.size;
    let statusMessage = await message.channel.send("Gathering emotes...");
    let warnings = 0;
    message.channel.startTyping();

    // Initialize the emote stats object with every emote in the current guild.
    // The goal here is to cut the need to access guild.emojis.get() which'll make it faster and easier to work with.
    for(let emote of message.guild.emojis.values()) {
        stats[emote.id] = {
            name: emote.name,
            formatted: `<:${emote.name}:${emote.id}>`,
            users: 0,
            bots: 0
        };
    };

    let interval = setInterval(() => {
        statusMessage.edit(`Searching channel \`${currentChannelName}\`... (${messagesSearched} messages scanned, ${channelsSearched}/${totalChannels} channels scanned)`);
    }, 5000);

    try {
        for (let channel of allTextChannelsInCurrentGuild.values()) {
            currentChannelName = channel.name;
            let selected = channel.lastMessageID;
            let continueLoop = true;

            while (continueLoop) {
                const messages = await channel.fetchMessages({
                    limit: 100,
                    before: selected
                });

                if (messages.size > 0) {
                    for(let msg of messages.values()) {
                        const msgEmotes = msg.content.match(/<:.+?:\d+?>/g) || [];

                        for (let emote of msgEmotes) {
                            const emoteID = emote.match(/\d+/g)[0];

                            if (emoteID in stats) {
                                if (msg.author.bot) {
                                    stats[emoteID].bots++;
                                } else {
                                    stats[emoteID].users++;
                                    totalUserEmoteUsage++;
                                }
                            }
                        }

                        for(let reaction of msg.reactions.values()) {
                            const emoteID = reaction.emoji.id;
                            let continueReactionLoop = true;
                            let lastUserID;
                            let userReactions = 0;
                            let botReactions = 0;

                            if (emoteID in stats) {
                                // Unfortunately, just like fetchMessages, fetchUsers is limited to requesting 100 maximum.
                                // There is a simple count property on a reaction, but that doesn't separate users from bots.
                                // So instead, I'll use that property to check for inconsistencies.
                                while (continueReactionLoop) {
                                    // After logging fetchUsers, it seems like the order is strictly numerical. As long as that stays consistent, this should work fine.
                                    const users = await reaction.fetchUsers(100, {
                                        after: lastUserID
                                    });

                                    if (users.size > 0) {
                                        for(let user of users.values()) {
                                            if (user.bot) {
                                                stats[emoteID].bots++;
                                                botReactions++;
                                            } else {
                                                stats[emoteID].users++;
                                                totalUserEmoteUsage++;
                                                userReactions++;
                                            }

                                            lastUserID = user.id;
                                        };
                                    } else {
                                        // Then halt the loop and send warnings of any inconsistencies.
                                        continueReactionLoop = false;

                                        if (reaction.count !== userReactions + botReactions) {
                                            client.logger.warn(`[Channel: ${channel.id}, Message: ${msg.id}] A reaction count of ${reaction.count} was expected but was given ${userReactions} user reactions and ${botReactions} bot reactions.`);
                                            warnings++;
                                        }
                                    }
                                }
                            }
                        };

                        selected = msg.id;
                        messagesSearched++;
                    };
                } else {
                    continueLoop = false;
                    channelsSearched++;
                }
            }
        }
    } catch (error) {
        message.channel.send(`Warning: The stats below may be incomplete because the process terminated unexpectedly.\`\`\`${error}\`\`\``);
    }

    // Mark the operation as ended.
    const finishTime = Date.now();
    clearInterval(interval);
    statusMessage.edit(`Finished operation in ${moment.duration(finishTime - startTime).humanize()} with ${warnings} inconsistencies(s).`);
    message.channel.stopTyping();

    // Display stats on emote usage.
    // This can work outside the loop now that it's synchronous, and now it's clearer what code is meant to execute at the end.
    // Depending on how many emotes you have, you might have to break up the analytics into multiple messages.
    let sortedEmoteIDs = Object.keys(stats).sort((a, b) => stats[b].users - stats[a].users);
    let lines = [];
    let line = "";
    let rank = 1;

    // It's better to send all the lines at once rather than paginate the data because it's quite a memory-intensive task to search all the messages in a server for it, and I wouldn't want to activate the command again just to get to another page.
    for (const emoteID of sortedEmoteIDs) {
        const emote = stats[emoteID];
        let append = `\`#${rank++}\` ${emote.formatted} x ${emote.users} - ${((emote.users / totalUserEmoteUsage * 100) || 0).toFixed(3)}%`;
        if (emote.bots > 0) append += ` (Bots: ${emote.bots})`;
        append += "\n";
        
        if (line.length + append.length > 2000) {
            lines.push(line);
            line = "";
        }
        
        line += append;
    }

    // You can't send empty messages or there'll be an error.
    if (line.length > 0) lines.push(line);
    for (let ln of lines) await message.channel.send(ln);
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
    description: "Scans all text channels in the current guild and returns the number of times each emoji specific to the guild has been used. Has a cooldown of 24 hours per guild.",
    usage: "scanemotes"
};
