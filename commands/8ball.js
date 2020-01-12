module.exports.run = (client, message, args) => {
    let sender = message.author
    let mention = message.mentions.users.first()
    const question = args.join(" ");

    if(!args[0]) return message.channel.send("Please ask me a question.")
    let responses= ["Most likely,",
    "It is certain,",
    "It is decidedly so,",
    "Without a doubt,",
    "Definitely,",
    "You may rely on it,",
    "As I see it, yes,",
    "Outlook good,",
    "Yes,",
    "Signs point to yes,",
    "Reply hazy, try again,",
    "Ask again later,",
    "Better not tell you now,",
    "Cannot predict now,",
    "Concentrate and ask again,",
    "Don't count on it,",
    "My reply is no,",
    "My sources say no,",
    "Outlook not so good,",
    "Very doubtful,",
    ]
    message.channel.send(responses[Math.floor(Math.random()*responses.length)] + `<@${sender.id}>`)
}

module.exports.config = {
    name: "8ball",
    noalias: "No aliases",
    aliases: [],
    usage: ".8ball",
    description: "Gives you an 8-ball response.",
    accessibleby: "Members"
}
