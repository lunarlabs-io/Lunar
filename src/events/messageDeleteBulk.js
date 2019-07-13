const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'messageDeleteBulk',
			enabled: true
		});
	}

	async run(messages) {
        if (!messages.guild) return;
        if (messages.size === 0) return;

		/* eslint guard-for-in: 0 */
		messages.forEach(msg => {
			if (msg.author.bot) return;
			if (msg.channel.type !== 'text') return;

			const log = messages.guild.channels.get(messages.guild.settings.channels.log);
        //console.log(log) 
        if (!log) return;

			const embed = new MessageEmbed()
				.setColor('RED')
				.setTimestamp()
				.setAuthor("Bulk Messages Deleted")
				.addField(`Message Author:`, msg.author.tag)
				.addField(`Message Channel:`, `${msg.channel.name} (${msg.channel.id})`)
				.addField(`Message ID:`, msg.id)
				.addField(`Message Content:`, msg.cleanContent.length >= 1 ? msg.cleanContent.substring(0, 960) : '-');

            log.send(embed);
        });
  

        
	}

	async init() {
		/*
		 * You can optionally define this method which will be run when the bot starts
		 * (after login, so discord data is available via this.client)
		 */
	}

};