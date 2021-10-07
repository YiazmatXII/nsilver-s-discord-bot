const Discord = require("discord.js");
const botconfig = require("../config.json");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {
    if(args[0]) {
        let command = args[0];
        if(bot.commands.has(command)) {
            command = bot.commands.get(command);
            var SHembed = new Discord.RichEmbed()
            .setColor(colors.blue)
            .setAuthor(`Bot HELP`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setDescription(`**Command:** ${command.config.name}\n**Description:** ${command.config.description || "No Description"}\n**Usage:** ${command.config.usage || "No Usage"}\n**Accessable by:** ${command.config.accessableby || "Members"}\n**Aliases:** ${command.config.noalias || command.config.aliases}`)
            message.channel.send(SHembed);
    }}
    if(!args[0]) {
        let uEmbed = new Discord.RichEmbed()
                .setColor(colors.blue)
                .setTitle("Help")
                .setThumbnail(bot.user.displayAvatarURL)
                .setTimestamp()
                .setDescription(`These are the avaliable commands:`)
                .addField(`Commands:`, "``add_previous_winners``\n ``bid``\n ``biderror``\n ``endbid``\n ``get_raffle``\n ``help``\n ``listbidders``\n ``ping``\n ``previous_winners``\n ``startbid``\n ``rules``")
                .addField("To get more information about a command, use: ", "`/help [command_name]`")
            message.channel.send({embed: uEmbed});
    }
}

module.exports.config = {
    name: "help",
    description: "Show informations about commands",
    usage: "?help <command>",
    accessableby: "Members",
    aliases: ["h"]
}
