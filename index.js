const Discord = require('discord.js');
const config = require('./config.json');
const colors = require('./colors.json');
const fs = require("fs");

const bot = new Discord.Client( {fetchAllMembers : true} );

bot.on('ready', function () {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
});

bot.on('ready', function () {
    bot.user.setAvatar('./ressources/echo.jpg').catch(console.error);
    bot.user.setActivity('Managing Inspection data').catch(console.error);
});

bot.on("guildCreate", guild => {
    console.log(`Added to: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

bot.on("guildDelete", guild => {
    console.log(`Removed from: ${guild.name} (id: ${guild.id})`);
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = config.prefix_user;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    console.log(commandfile)
    if(commandfile) commandfile.run(bot,message,args)
});

bot.login(config.token);
