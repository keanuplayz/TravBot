const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
    if (message.author.id === "465662909645848577") return message.channel.send("ey b0ss, gimmi de pusi pls")
    if (message.author.id === "306499531665833984") return message.channel.send("The degenerate who likes slimes, tentacles, and tea.")
    if (message.author.id === "137323711844974592") return message.channel.send("The purple haired gunner man who makes loud noises.")
    if (message.author.id === "208763015657553921") return message.channel.send("Minzy's master.")
    if (message.author.id === "229636002443034624") return message.channel.send("The ***God*** of being Smug.")
    if (message.author.id === "280876114153308161") return message.channel.send("The best girl.")
    if (message.author.id === "175823837835821067") return message.channel.send("The somehow sentient pear.")


    else{
        return message.channel.send("You haven't been added to the registry yet!")
    }
}

module.exports.config = {
    name: "suicide",
    noaliases: "No aliases",
    aliases: [],
    usage: ".suicide",
    description: "No. Just no.",
    accessibleby: "Members"
}