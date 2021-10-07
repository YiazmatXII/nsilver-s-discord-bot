const Discord = require("discord.js")
const botconfig = require("../config.json");

module.exports.run = async (bot, message, args) => {
    const m = await message.channel.send("Pong!");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
}

module.exports.config = {
    name: "ping",
    noalias: "No Aliases",
    description: "Display the ping user and API",
    usage: "?ping",
    accessableby: "Members",
    aliases: []
}
