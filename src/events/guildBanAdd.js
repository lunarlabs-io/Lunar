const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'guildBanAdd',
			enabled: true
		});
	}

	async run(guild, user) {
        if (!guild) return;
        
        const auditlog = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());
        console.log(auditlog);
        
        const log = guild.channels.get(guild.settings.channels.log);
        //console.log(log) 
        if (!log) return;
        const embed = new MessageEmbed()
        // Set the title of the field
        .setTitle("User Has Been Banned")
        // Set the color of the embed
        .setColor(0xFF0000)
        .addField("Banned by", auditlog.executor.username +"#"+ auditlog.executor.discriminator, true )
        //.setImage(``)
        // Set the main content of the embed
        .setTimestamp()
        .setDescription(`${user.username} has been Banned`);
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