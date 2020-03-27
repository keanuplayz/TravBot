/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    const obj = {
        "465662909645848577": "You're an idiot, that's what.",
        "306499531665833984": "Kuma, you eldritch fuck, I demand you to release me from this Discord bot and let me see my Chromebook!",
        "137323711844974592": "The purple haired gunner man who makes loud noises.",
        "208763015657553921": "Minzy's master.",
        "229636002443034624": "The ***God*** of being Smug.",
        "280876114153308161": "The best girl.",
        "175823837835821067": "The somehow sentient pear.",
        "173917366504259585": "The blueberry with horns.",
        "216112465321263105": "The red strawberry cat.",
        "394808963356688394": "The baka girl we don't deserve.",
        "142200534781132800": "The masters of chaos.",
        "186496078273708033": "The cute blue cat.",
        "241293368267767808": "The cute catgirl.",
        "540419616803913738": "The generically Generic hologram man.",
        "157598993298227211": "The somehow sentient bowl of nachos.",
        "225214401228177408": "The CMD user.",
        "224619540263337984": "The guy that did 50% of the work.",
        "374298111255773184": "The cutest fox around.",
        "150400803503472640": "The big huggy turtle boye.",
        "620777734427115523": "The small huggy turtle boye.",
        "310801870048198667": "The extremely talented artist and modder."
    };
    const response = obj[`${message.author.id}`];
    if (!response) return message.channel.send("You haven't been added to the registry yet!");
    message.channel.send(response);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "whoami",
    category: "Fun",
    description: "Tells you who you are.",
    usage: "whoami"
};