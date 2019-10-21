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
    switch(getRandomInt(1, 50)){
        case 1: message.channel.send("ok boomer"); break;
        case 2: message.channel.send("ok zoomer"); break;
        case 3: message.channel.send("ok the last generationer"); break;
        case 4: message.channel.send("ok the last airbender"); break;
        case 5: message.channel.send("ok fire nation"); break;
        case 6: message.channel.send("ok fire lord"); break;
        case 7: message.channel.send("ok guy fieri"); break;
        case 8: message.channel.send("ok guy from final fight"); break;
        case 9: message.channel.send("ok haggar"); break;
        case 10: message.channel.send("ok Max Thunder from Streets of Rage 2"); break;
        case 11: message.channel.send("ok police guy who fires bazookas"); break;
        case 12: message.channel.send("ok Mr. X"); break;
        case 13: message.channel.send("ok Leon Its Wrong If Its Not Ada Wong S. Kennedy."); break;
        case 14: message.channel.send("ok Jill"); break;
        case 15: message.channel.send("ok JFK"); break;
        case 16: message.channel.send("ok george bush"); break;
        case 17: message.channel.send("ok obama"); break;
        case 18: message.channel.send("ok the world"); break;
        case 19: message.channel.send("ok  copy of scott pilgrim vs the world"); break;
        case 20: message.channel.send("ok ok"); break;
        case 21: message.channel.send("ok ko"); break;
        case 22: message.channel.send("ok Hot Daddy Venomous"); break;
        case 23: message.channel.send("ok big daddy"); break;
        case 24: message.channel.send("ok John Cena"); break;
        case 25: message.channel.send("ok BubbleSpurJarJarBinks"); break;
        case 26: message.channel.send("ok T-Series"); break;
        case 27: message.channel.send("ok pewdiepie"); break;
        case 28: message.channel.send("ok markiplier"); break;
        case 29: message.channel.send("ok jacksepticeye"); break;
        case 30: message.channel.send("ok vanossgaming"); break;
        case 31: message.channel.send("ok miniladd"); break;
        case 32: message.channel.send("ok Traves"); break;
        case 33: message.channel.send("ok Wilbur Soot"); break;
        case 34: message.channel.send("ok sootrhianna"); break;
        case 35: message.channel.send("ok person with tiny ears"); break;
        case 36: message.channel.send("ok anti-rabbit"); break;
        case 37: message.channel.send("ok homo sapiens"); break;
        case 38: message.channel.send("ok homo"); break;
        case 39: message.channel.send("ok cute kitty"); break;
        case 40: message.channel.send("ok ugly kitty"); break;
        case 41: message.channel.send("ok sadness"); break;
        case 42: message.channel.send("ok doomer"); break;
        case 43: message.channel.send("ok gloomer"); break;
        case 44: message.channel.send("ok bloomer"); break;
        case 45: message.channel.send("ok edgelord"); break;
        case 46: message.channel.send("ok weeb"); break;
        case 47: message.channel.send("ok m'lady"); break;
        case 48: message.channel.send("ok Mr. Crabs"); break;
        case 49: message.channel.send("ok hand"); break;
        case 50: message.channel.send("ok lahoma"); break;
        default: message.channel.send("TEST"); break;
    }
}


module.exports.config = {
    name: "ok",
    noalias: "No aliases",
    aliases: [],
    usage: ".ok",
    description: "Sends random ok message. (broken)",
    accessibleby: "Members"
}