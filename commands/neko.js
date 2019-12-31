const config = require("../config.json");
const prefix = config.prefix
const client = require('nekos.life');
const neko = new client();

module.exports.run = async (client, message, args) => {
    if (!args.length) {
        return message.channel.send("Please provide an argument. For available arguments, please use `.help neko`");
    } else if (args[0] === 'smug') {
        async function smug() {
            const smug = await neko.sfw.smug();
            message.channel.send(smug.url);
        }

        smug();
    } else if (args[0] === 'baka') {
        async function baka() {
            const baka = await neko.sfw.baka();
            message.channel.send(baka.url);
        }

        baka();
    } else if (args[0] === 'tickle') {
        async function tickle() {
            const tickle = await neko.sfw.tickle();
            message.channel.send(tickle.url);
        }

        tickle();
    } else if (args[0] === 'slap') {
        async function slap() {
            const slap = await neko.sfw.slap();
            message.channel.send(slap.url);
        }

        slap();
    } else if (args[0] === 'poke') {
        async function poke() {
                const poke = await neko.sfw.poke();
            message.channel.send(poke.url);
        }

        poke();
    } else if (args[0] === 'pat') {
        async function pat() {
            const pat = await neko.sfw.pat();
            message.channel.send(pat.url);
        }

        pat();
    } else if (args[0] === 'neko') {
        async function neko() {
            const neko = await neko.sfw.neko();
            message.channel.send(neko.url);
        }

        neko();
    } else if (args[0] === 'nekoGif') {
        async function nekoGif() {
            const nekoGif = await neko.sfw.nekoGif();
            message.channel.send(nekoGif.url);
        }

        nekoGif();
    } else if (args[0] === 'meow') {
        async function meow() {
            const meow = await neko.sfw.meow();
            message.channel.send(meow.url);
        }

        meow();
    }else if (args[0] === 'lizard') {
        async function lizard() {
            const lizard = await neko.sfw.lizard();
            message.channel.send(lizard.url);
        }

        lizard();
    }else if (args[0] === 'kiss') {
        async function kiss() {
            const kiss = await neko.sfw.kiss();
            message.channel.send(kiss.url);
        }

        kiss();
    }else if (args[0] === 'hug') {
        async function hug() {
            const hug = await neko.sfw.hug();
            message.channel.send(hug.url);
        }

        hug();
    }else if (args[0] === 'foxGirl') {
        async function foxGirl() {
            const foxGirl = await neko.sfw.foxGirl();
            message.channel.send(foxGirl.url);
        }

        foxGirl();
    }else if (args[0] === 'feed') {
        async function feed() {
            const feed = await neko.sfw.feed();
            message.channel.send(feed.url);
        }

        feed();
    }else if (args[0] === 'cuddle') {
        async function cuddle() {
            const cuddle = await neko.sfw.cuddle();
            message.channel.send(cuddle.url);
        }

        cuddle();
    }else if (args[0] === 'kemonomimi') {
        async function kemonomimi() {
            const kemonomimi = await neko.sfw.kemonomimi();
            message.channel.send(kemonomimi.url);
        }

        kemonomimi();
    }else if (args[0] === 'holo') {
        async function holo() {
            const holo = await neko.sfw.holo();
            message.channel.send(holo.url);
        }

        holo();
    }else if (args[0] === 'woof') {
        async function woof() {
            const woof = await neko.sfw.woof();
            message.channel.send(woof.url);
        }

        woof();
    }
};

module.exports.config = {
    name: "nekos",
    noaliases: "No aliases",
    aliases: [],
    usage: ".nekos <argument>",
    description: "Provides you with a random image with the selected argument.\n**Arguments**:\n``smug``\n``baka``\n``tickle``\n``slap``\n``poke``\n``pat``\n``neko``\n``nekoGif``\n``meow``\n``lizard``\n``kiss``\n``hug``\n``foxGirl``\n``feed``\n``cuddle``\n``kemonomimi``\n``holo``\n``woof``",
    accessibleby: "Members"
}
