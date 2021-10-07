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

            users = message.guild.roles.get('791131590049923105', '802304364739821588').members
            special_users = message.guild.roles.get('895715473415634994').members
            result = []

            for (let user of users) {
                for (let elem of user) {
                    let tmp = bot.users.get(elem.id)
                    if (tmp == undefined || data["last_winners"].includes(elem.id) || elem.id == '210937329790091264') continue;
                    result.push(tmp)
                }
            }
            for (let user of special_users) {
                for (let elem of user) {
                    let tmp = bot.users.get(elem.id)
                    if (tmp == undefined || data["last_winners"].includes(elem.id)) continue;
                    result.push(tmp)
                }
            }
            result = [...new Set(result)]
            str = ""
            for (elem of result) {
                str = str + elem.username + "\n"
            }
            if (str == "") return message.channel.send("Sorry I found nothing!");
            let uEmbed = new Discord.RichEmbed()
                .setColor(colors.green)
                .setTitle("Elligible for the raffle")
                .setThumbnail(bot.user.displayAvatarURL)
                .setTimestamp()
                .addField(`\u200b`, str)
            return message.channel.send({embed: uEmbed});
        })
    }
}

module.exports.config = {
    name: "get_raffle",
    description: "Give a list of all eligible people for the raffle",
    usage: "?get_raffle [number]",
    accessableby: "Admin",
    aliases: ["gr"]
}
