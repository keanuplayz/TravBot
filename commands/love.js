const Discord = require('discord.js');
const config = require("../config.json");


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.run = async (client, message, args) => {
    switch(getRandomInt(1, 6)){
        case 1: message.channel.send("I love Hades!"); break;
        case 2: message.channel.send("I love Ludi!"); break;
        case 3: message.channel.send("I love Lea!"); break;
        case 4: message.channel.send("I love Sera!"); break;
        case 5: message.channel.send("I love Nacho!"); break;
        case 6: message.channel.send("I love Chiko!"); break;
    }
}


module.exports.config = {
    name: "love",
    noalias: "No aliases",
    aliases: [],
    usage: ".love",
    description: "Chooses someone it loves.",
    accessibleby: "Members"
}