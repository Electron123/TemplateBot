// Requiring Discord.js
const Discord = require("discord.js");

// Importing configuration.
const config = require("./config.json");

// Creating a Discord Client
const Client = new Discord.Client();

// Checks if the message is a command.
function isCommand(message, command) {
	if(message.content.split(" ")[0] === config.prefix + command) {
		return true;
	}
	else {
		return false;
	}
}

// "Ready" event, runs when the bot starts.
Client.on("ready", function() {

	console.log("Bot has started.");
	Client.user.setActivity("the server", { Type: "WATCHING" });

});

// "Message" event, runs when a user sends a message
Client.on("message", function(msg) {
	
	const args = msg.content.substr(config.token.length).split(" ");
	if(msg.member === null || msg.author.bot) {
		
		return;
	}

	if(isCommand(msg, "avatar")) {
	
		const Embed = new Discord.RichEmbed();
		let user;
		if(!msg.mentions.users.first()) {
			user = msg.author;
		}
		else {
			user = msg.mentions.users.first();
		}

		if(user.avatarURL === null) {
			msg.reply("no avatar to display.");
		}

		Embed.setTitle(user.username + "'s avatar");
		Embed.setColor(config.color);
		Embed.setImage(user.avatarURL);
		msg.channel.send(Embed);		
		
	}
	else if(isCommand(msg, "info")) {

		const Embed = new Discord.RichEmbed();
		if(!msg.mentions.members.first()) {
			msg.reply("please mention someone.");	
		}
		else {

			const user = msg.mentions.members.first();

			Embed.setTitle(user.user.username + "'s information");
			Embed.setColor(config.color);
			Embed.setThumbnail(user.user.avatarURL);
			Embed.addField("Name#tag", user.user.tag, true);
			Embed.addField("Role", user.highestRole.name, true);
			Embed.addField("Join Date", user.user.createdAt, false);

			msg.channel.send(Embed);

		}

	}

});

// Logging in with the token provided.
Client.login(config.token);

// Exporting
exports.Discord = Discord;
exports.config = config;
