const Discord = require("discord.js");
const botconfig = require("../config.json");
const colors = require("../colors.json");
const fs = require('fs');
const utils = require('../utils/bidfilter.js');

module.exports.run = async (bot, message, args) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
        fs.readFile('config.json', 'utf-8', function(err, data) {
            if (err) throw err;

            data = JSON.parse(data);
            if (data["bidders_win_number"] == null) return message.channel.send("Sorry, no bidding currently!");
            call_winners(bot, message, data["bidders_win_number"])
            data["bidders_win_number"] = null

            data = JSON.stringify(data, null, 4);

            fs.unlink('savefiles/bidders.json', (err) => {
                if (err) throw err;
                console.log('Old bidders file deleted.');
            });
            fs.writeFile('savefiles/bidders.json', '{}', function (err) {
                if (err) throw err;
                console.log('New bidders file created succesfully.');
            });

            fs.writeFile('config.json', data, function(err) {
                if (err) throw err
                return message.channel.send("Bidding Ended! <@&"+ botconfig.bidderid + ">");
            })
        })
    }
}

function call_winners(bot, message, nb) {
    fs.readFile('savefiles/bidders.json', 'utf-8', function(err, data) {
            if (err) throw err;

            data = JSON.parse(data);
            if (utils.isEmpty(data)) {
                return message.channel.send("Sorry, no bids!");
            }
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
                str = str + result[j]["actual"] + " " + user.toString() + "\n"
                i++;
                j++;
            }
            let uEmbed = new Discord.RichEmbed()
                .setColor(colors.green)
                .setTitle("Winners")
                .setThumbnail(bot.user.displayAvatarURL)
                .setTimestamp()
                .setDescription(`These are the winners:`)
                .addField(`Currents winners:`, str)
            return message.channel.send({embed: uEmbed});
        })
}

module.exports.config = {
    name: "endbid",
    description: "End a bidding for Nsilver's commissions",
    usage: "?endbid",
    accessableby: "Admin",
    aliases: ["eb"]
}
