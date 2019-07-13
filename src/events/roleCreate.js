const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'roleCreate',
			enabled: true
		});
	}

	async run(role) {
        if (!role.guild) return;
        //const auditlog = await emoji.guild.fetchAuditLogs({type: "EMOJI_CREATE"}).then(audit => audit.entries.first());
        //console.log(auditlog);
        
        const log = role.guild.channels.get(role.guild.settings.channels.log);
        //console.log(log) 
        if (!log) return;
        const embed = new MessageEmbed()
			.setColor('GREEN')
			.setTimestamp()
			.setAuthor("New Role Created")
			.addField(`Role ID:`, role.id)
			.addField(`Role Color:`, role.hexColor)
			.addField(`Role Name:`, role.name);
		log.send(embed);
	}

      
        
    //    

        
	

	async init() {
		/*
		 * You can optionally define this method which will be run when the bot starts
		 * (after login, so discord data is available via this.client)
		 */
	}

};