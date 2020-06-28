const Canvas = require("canvas");
const Discord = require("discord.js");

const applyText = (canvas, text) => {
   const ctx = canvas.getContext("2d");
   let fontSize = 70;
   
   do {
      ctx.font = `${fontSize -= 10}px sans-serif`;
   } while (ctx.measureText(text).width > canvas.width - 300);
};

module.exports = async (client, member) => {
   const settings = client.getSettings(member.guild);
   if (settings.welcomeEnabled == "true" && settings.graphicalWelcome == "false") {
      const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);
      member.guild.channels.find(c => c.name === settings.welcomeChannel)
         .send(welcomeMessage)
         .catch(console.error);
   }
   if (settings.welcomeEnabled == "true" && settings.graphicalWelcome == "true") {
      const channel = member.guild.channels.find(c => c.name === settings.welcomeChannel);
      if (!channel) return;

      const canvas = Canvas.createCanvas(700, 250);
      const ctx = canvas.getContext("2d");

      const background = await Canvas.loadImage("assets/wallpaper.png");
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#74037b";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      ctx.font = "28px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("Welcome to the server,", canvas.width / 2.5, canvas.height / 3.5);

      ctx.font = applyText(canvas, member.displayName);
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.5);

      ctx.beginPath();
      ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      const avatar = await Canvas.loadImage(member.user.avatarURL);
      ctx.drawImage(avatar, 25, 25, 200, 200);

      const attachment = new Discord.Attachment(canvas.toBuffer(), "welcome-image.png");
      channel.send(`Welcome ${member.user.tag}`, attachment);
   }
   if (settings.welcomeEnabled == "false" && settings.graphicalWelcome == "true") {
      client.logger.log("You can't do a graphical welcome while the welcome function is disabled.", "error");
   }
   if (settings.welcomeEnabled == "false" && settings.graphicalWelcome == "false") {
      return;
   }
};