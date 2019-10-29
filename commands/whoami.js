module.exports.run = async (client, message, args) => {
    let obj = {
        "465662909645848577": "ey b0ss, gimmi de pusi pls",
        "306499531665833984": "The degenerate who likes slimes, tentacles, and tea.",
        "137323711844974592": "The purple haired gunner man who makes loud noises.",
        "208763015657553921": "Minzy's master.",
        "229636002443034624": "The ***God*** of being Smug.",
        "280876114153308161": "The best girl.",
        "175823837835821067": "The somehow sentient pear."
    }
    let response = obj[`${message.author.id}`]
    if (!response) return message.channel.send("You haven't been added to the registry yet!")
    message.channel.send(response)
}

module.exports.config = {
    name: "whoami",
    noaliases: "No aliases",
    aliases: [],
    usage: ".whoami",
    description: "No. Just no.",
    accessibleby: "Members"
}