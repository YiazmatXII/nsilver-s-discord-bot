const Discord = require("discord.js");
const fs = require('fs');
const utils = require('../utils/utils.js');

module.exports.run = async (bot, message, args) => {
    fs.readFile('config.json', 'utf-8', function(err, data) {
        if (err) throw err;

        data = JSON.parse(data);
        if (data["bidders_win_number"] == null) return message.channel.send("Sorry, no bidding currently!");

        if(!args[0] || !utils.isNumber(args[0]) || (args[0].split(".").length - 1) > 1) return message.channel.send("Sorry you need to enter a valid number as a bid!");
        let number = ""
        if (args[0].includes(".")) {
            number = Number(args[0].split('.')[0] + "." + args[0].split('.')[1][0])
        } else {
            number = Number(args[0])
        }
        let id = message.member.user.id

        fs.readFile('savefiles/bidders.json', 'utf-8', function(err, data) {
            if (err) throw err;

            data = JSON.parse(data);
            if (data[id] == null) {
                data[id] = {}
            }
            if (data[id]["actual"] != null) {
                if (data[id]["actual"] >= number) return message.channel.send("You must enter a bigger bid than the previous one (minimum increase 0.1)");
                data[id]["old"] = data[id]["actual"]
            }
            data[id]["actual"] = number
            if (data[id]["rank"] != null) {
                data[id]["old_rank"] = data[id]["rank"]
            }
            data[id]["rank"] = 0
            data[id]["rank"] = getRank(data, id)

            data = JSON.stringify(data, null, 4);
            fs.writeFile('savefiles/bidders.json', data, function(err) {
                if (err) throw err;
                return message.channel.send(message.author.toString() + " would like to bid x" + number);
            })
        })
    })

}

function getRank(data, id) {
    let rank = 0;
    for (key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === id) continue;
            if (data[key]["actual"] === data[id]["actual"] && rank <= data[key]["rank"]) {
                rank = data[key]["rank"] + 1
            }
        }
    }
    return rank
}

module.exports.config = {
    name: "bid",
    description: "Bid!",
    usage: "?bid [number]",
    accessableby: "Members",
    aliases: ["b"]
}
