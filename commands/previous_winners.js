const Discord = require("discord.js");
const botconfig = require("../config.json");
const colors = require("../colors.json");
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
        fs.readFile('savefiles/rafflers.json', 'utf-8', function(err, data) {
            if (err) throw err;

            data = JSON.parse(data);
            if (data === {}) return message.channel.send("Internal error, no data");

            str = ""
            for (id of data["last_winners"]) {
                let user = bot.users.get(id)
                str = str + user.username + "\n"
            }
            if (str == "") return message.channel.send("Sorry I found nothing!");
            let uEmbed = new Discord.RichEmbed()
                .setColor(colors.red)
                .setTitle("Win the raffle last time")
                .setThumbnail(bot.user.displayAvatarURL)
                .setTimestamp()
                .addField(`\u200b`, str)
            return message.channel.send({embed: uEmbed});
        })
    }
}

module.exports.config = {
    name: "previous_winner",
    description: "Give a list of last raffle winners",
    usage: "?previous_winner [number]",
    accessableby: "Admin",
    aliases: ["pw"]
}
