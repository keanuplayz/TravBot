exports.run = async (client, message, cost, amount) => {
    message.channel.send(`Transaction of ${cost} Mons completed successfully. <@394808963356688394>`);
};
exports.settings = {
    order: 2,
    cost: 2,
    title: "Handholding",
    description: "Hold Monika's hand.",
    usage: "handhold"
}; 