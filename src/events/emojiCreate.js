const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'emojiCreate',
			enabled: true
		});
	}

	async run(emoji) {
        if (!emoji.guild) return;
        
        const auditlog = await emoji.guild.fetchAuditLogs({type: "EMOJI_CREATE"}).then(audit => audit.entries.first());
        //console.log(auditlog);
        
        const log = emoji.guild.channels.get(emoji.guild.settings.channels.log);
        //console.log(log) 
        if (!log) return;
        const embed = new MessageEmbed()
        // Set the title of the field
        .setTitle("Emoji Has Been Added")
        // Set the color of the embed
        .setColor(0xFF0000)
        .addField("Added by", auditlog.executor.username +"#"+ auditlog.executor.discriminator, true )
        .setImage(`https://cdn.discordapp.com/emojis/${emoji.id}.png`)
        // Set the main content of the embed
        .setTimestamp()
        .setDescription(`Emoji ${emoji.name} has been Created with the Id of ${emoji.id}`);
      // Send the embed to the same channel as the message
      log.send(embed);

        
	}

	async init() {
		/*
		 * You can optionally define this method which will be run when the bot starts
		 * (after login, so discord data is available via this.client)
		 */
	}

};