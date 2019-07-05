const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'channelDelete',
			enabled: true,
			event: 'channelDelete'
		});
	}

	run(channel) {
        if (!channel.guild) return;
        
        //console.log(channel.guild.id);
        const log = channel.guild.channels.get(channel.guild.settings.channels.log);
        //console.log(log) 
        if (!log) return;
        const embed = new MessageEmbed()
        // Set the title of the field
        .setTitle("Channel Has Been Deleted")
        // Set the color of the embed
        .setColor(0xFF0000)
        // Set the main content of the embed
        .setTimestamp()
        .setDescription(`Channel ${channel.name} has been deleted with the Id of ${channel.id}`);
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