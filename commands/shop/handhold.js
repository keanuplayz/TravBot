exports.run = async (client, message, cost, amount) => {
    message.channel.send(`Transaction of ${cost} Mons completed successfully. <@394808963356688394>`);
};
exports.settings = {
    order: 2,
    cost: 2,
    title: "**Handholding** (.eco buy handhold)",
    description: "Hold Monika's hand. Costs 2 Mons.",
    usage: "handhold"
}; 