exports.run = async (client, message, cost, amount) => {
    message.channel.send(`Transaction of ${cost} Mon completed successfully. <@394808963356688394>`);
};
exports.settings = {
    order: 1,
    cost: 1,
    title: "**Hug** (.eco buy hug)",
    description: "Hug Monika. Costs 1 Mon.",
    usage: "hug"
}; 