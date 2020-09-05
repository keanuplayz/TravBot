/* eslint-disable no-unused-vars */
const letters = {
    a: "aáàảãạâấầẩẫậăắằẳẵặ".split(""),
    e: "eéèẻẽẹêếềểễệ".split(""),
    i: "iíìỉĩị".split(""),
    o: "oóòỏõọôốồổỗộơớờởỡợ".split(""),
    u: "uúùủũụưứừửữự".split(""),
    y: "yýỳỷỹỵ".split(""),
    d: "dđ".split("")
};

function transform(str) {
    let out = "";

    for (const c of str) {
        const token = c.toLowerCase();
        const isUpperCase = token !== c;

        if (token in letters) {
            const set = letters[token];
            const add = set[Math.floor(Math.random() * set.length)];
            out += isUpperCase ? add.toUpperCase() : add;
        } else {
            out += c;
        }
    }

    return out;
}

let phrase = "I have no currently set phrase!";

exports.run = async (client, message, args, level) => {
    if (args.length > 0) phrase = args.join(" ");
    message.channel.send(transform(phrase));
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "thonk",
    category: "Fun",
    description: "Transforms your text into ｖｉｅｔｎａｍｅｓｅ.",
    usage: "thonk ([text])"
};