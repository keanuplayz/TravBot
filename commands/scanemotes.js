/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    let stats = {};
    let statsWithoutBots = {};
    let allTextChannelsInCurrentGuild = message.guild.channels.filter(channel => channel.type === "text");
    let limit = allTextChannelsInCurrentGuild.size;
    let channelsSearched = 0;
    
    allTextChannelsInCurrentGuild.forEach(async channel => {
        // IMPORTANT: You MUST check if the bot actually has access to the channel in the first place. It will get the list of all channels, but that doesn't mean it has access to every channel. Without this, it'll require admin access and throw an annoying unhelpful DiscordAPIError: Missing Access otherwise.
        const permissions = channel.permissionsFor(client.user);
        const isViewable = permissions && permissions.has("VIEW_CHANNEL", false);
        
        if (!isViewable) {
            limit--;
            return;
        }
        
        // This will count all reactions in text and reactions per channel.
        let selected = channel.lastMessageID;
        let continueLoop = true;
        
        while (continueLoop) {
            let messages = await channel.fetchMessages({
                limit: 100,
                before: selected
            });
            
            if (messages.size <= 0) {
                continueLoop = false;
                channelsSearched++;
                
                // Display stats on emote usage.
                if (channelsSearched >= limit) {
                    // Depending on how many emotes you have, you might have to break up the analytics into multiple messages.
                    let lines = [];
                    let line = "";
                    
                    for (let emote in stats) {
                        let emoteObject = message.guild.emojis.get(emote);
                        
                        // Emotes not within the current guild (or deleted ones) will return null. Select only those from the current guild.
                        if (emoteObject != null) {
                            let stat = emoteObject.toString() + " x " + stats[emote] + " (" + (statsWithoutBots[emote] || 0) + " without bots)\n";
                            
                            if (line.length + stat.length > 1900) {
                                lines.push(line);
                                line = "";
                            }
                            
                            line += stat;
                        }
                    }
                    
                    if(line.length > 0) lines.push(line); // You can't send empty messages or there'll be an error.
                    for(let ln of lines) await message.channel.send(ln);
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
                        let emoteID = emoteTagIndex !== -1 ? emoteTag.substring(emoteTagIndex+1) : emoteTag; // In Discord.js v11, the keys are "<emote name>:<emote ID>" instead.
                        
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