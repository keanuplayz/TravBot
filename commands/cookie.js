module.exports.run = async (client, message, args) => {
    let sender = message.author
    let mention = message.mentions.users.first()
    let cookies = [
        `has given <@${mention.id}> a chocolate chip cookie!`,
        `has given <@${mention.id}> a soft homemade oatmeal cookie!`,
        `has given <@${mention.id}> a plain, dry, old cookie. It was the last one in the bag. Gross.`,
        `gives <@${mention.id}> a sugar cookie. What, no frosting and sprinkles? 0\/10 would not touch.`,
        `gives <@${mention.id}> a chocolate chip cookie. Oh wait, those are raisins. Bleck!`,
        `gives <@${mention.id}> an enormous cookie. Poking it gives you more cookies. Weird.`,
        `gives <@${mention.id}> a fortune cookie. It reads \"Why aren't you working on any projects?\"`,
        `gives <@${mention.id}> a fortune cookie. It reads \"Give that special someone a compliment\"`,
        `gives <@${mention.id}> a fortune cookie. It reads \"Take a risk!\"`,
        `gives <@${mention.id}> a fortune cookie. It reads \"Go outside.\"`,
        `gives <@${mention.id}> a fortune cookie. It reads \"Don't forget to eat your veggies!\"`,
        `gives <@${mention.id}> a fortune cookie. It reads \"Do you even lift?\"`,
        `gives <@${mention.id}> a fortune cookie. It reads \"m808 pls\"`,
        `gives <@${mention.id}> a fortune cookie. It reads \"If you move your hips, you'll get all the ladies.\"`,
        `gives <@${mention.id}> a fortune cookie. It reads \"I love you.\"`,
        `gives <@${mention.id}> a Golden Cookie. You can't eat it because it is made of gold. Dammit.`,
        `gives <@${mention.id}> an Oreo cookie with a glass of milk!`,
        `gives <@${mention.id}> a rainbow cookie made with love :heart:`,
        `gives <@${mention.id}> an old cookie that was left out in the rain, it's moldy.`,
        `bakes <@${mention.id}> fresh cookies, it smells amazing.`
    ]


    if (args[0] == "all") return message.channel.send(`<@${sender.id}> gave everybody a cookie!`)
    if (!mention) return message.channel.send(":cookie: Here's a cookie!")
    if (mention.id == sender.id) return message.channel.send("You can't give yourself cookies!")
    message.channel.send(`:cookie: <@${sender.id}> ` + cookies[Math.floor(Math.random() * cookies.length)])
}

module.exports.config = {
    name: "cookie",
    noalias: "No aliases",
    aliases: [],
    usage: ".cookie",
    description: "Gives random user a cookie.",
    accessibleby: "Members"
}