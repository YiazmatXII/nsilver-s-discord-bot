const Discord = require("discord.js");
const botconfig = require("../config.json");
const colors = require("../colors.json");
const fs = require('fs');
const utils = require('../utils/bidfilter.js');

module.exports.run = async (bot, message, args) => {
    fs.readFile('config.json', 'utf-8', function(err, data) {
        if (err) throw err;

        data = JSON.parse(data);
        if (data["bidders_win_number"] == null) return message.channel.send("Sorry, no bidding currently!");
        let nb = data["bidders_win_number"]
        fs.readFile('savefiles/bidders.json', 'utf-8', function(err, data) {
            if (err) throw err;

            data = JSON.parse(data);
            if (utils.isEmpty(data)) return message.channel.send("Sorry, no bids!");

            let result = utils.list_bids(data)
            let i = 0
            let j = 0
            let str = ""
            while (i < nb) {
                if (result[j] == undefined) {
                    break;
                }
                let user = bot.users.get(result[j]["new_id"])
                if (!user) {
                    user = null
                    j++;
                    continue;
                }
                str = str + "``" + result[j]["actual"] + " " + user.username + "``\n"
                i++;
                j++;
            }
            let uEmbed = new Discord.RichEmbed()
                .setColor(colors.green)
                .setTitle("Winners")
                .setThumbnail(bot.user.displayAvatarURL)
                .setTimestamp()
                .setDescription(`These are the currents winners:`)
                .addField(`Currents winners:`, str)
            message.channel.send({embed: uEmbed});
            if (i == nb) {
                str = ""
                k = 0
                while (true) {
                    if (result[j] == undefined) {
                        break;
                    }
                    let user = bot.users.get(result[j]["new_id"])
                    if (!user) {
                        j++;
                        continue;
                    }
                    str = str + "``" + result[j]["actual"] + " " + user.username + "``\n"
                    i++;
                    j++;
                    k++;
                }
                if (k == 0) return;
                let sEmbed = new Discord.RichEmbed()
                    .setColor(colors.red)
                    .setTitle("Not winning")
                    .setThumbnail(bot.user.displayAvatarURL)
                    .setTimestamp()
                    .setDescription(`These are not winning a slot:`)
                    .addField(`Outside the winning poll:`, str)
                message.channel.send({embed: sEmbed});
            }
            return;
        })
    })
}

module.exports.config = {
    name: "listbidders",
    description: "Give a list of all the current bids ranked to the biggest to the lowest",
    usage: "?listbidders",
    accessableby: "Member",
    aliases: ["lb"]
}
