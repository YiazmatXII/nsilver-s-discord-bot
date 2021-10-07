const Discord = require("discord.js");
const botconfig = require("../config.json");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {
    let uEmbed = new Discord.RichEmbed()
                .setColor(colors.blue)
                .setTitle("Bidding rules")
                .setDescription(`_How to bid:_`)
                .setThumbnail(bot.user.displayAvatarURL)
                .setTimestamp()
                .addField('\u200b', "- You must have the Bidders role, you can obtain it in the <#418806855217840128> channel.\n- You bid by multipliers. Take what your commission would normally cost and multiply it times the number you're going to bid.\n- You cannot downscale unless your last input was an accident, the command biderror is here to allow you to return to your previous bid if needed.\n- If your bid matches that of another person you are right below them")
            message.channel.send({embed: uEmbed});

    let sEmbed = new Discord.RichEmbed()
                .setColor(colors.blue)
                .setTitle("Raffle rules")
                .setDescription(`_How to be elligible for the raffle:_`)
                .setThumbnail(bot.user.displayAvatarURL)
                .setTimestamp()
                .addField('\u200b', "- You must have the Rafflers role, you can obtain it in the <#418806855217840128> channel.\n- You must have at least +20inches.\n- You must not have won the previous raffle.\n- Nsilver handle 100% of the raffling.\n")
            return message.channel.send({embed: sEmbed});
}

module.exports.config = {
    name: "rules",
    description: "Show the rules about bidding and raffling",
    usage: "?rules",
    accessableby: "Members",
    aliases: []
}
