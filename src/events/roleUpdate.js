const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'roleCreate',
			enabled: true
		});
	}

	async run(oldRole, newRole) {
        if (!oldRole.guild) return;
        //const auditlog = await emoji.guild.fetchAuditLogs({type: "EMOJI_CREATE"}).then(audit => audit.entries.first());
        //console.log(auditlog);
        
        const log = oldRole.guild.channels.get(oldRole.guild.settings.channels.log);
        //console.log(log) 
        if (!log) return;
        if (oldRole.name !== newRole.name) {
			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setTimestamp()
				.setAuthor("Role Updated")
				.addField(`Role ID:`, oldRole.id)
				.addField(`Old Role Name:`, oldRole.name)
				.addField(`New Role Name:`, newRole.name);
			return log.send(embed);
		}
		if (oldRole.hexColor !== newRole.hexColor) {
			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setTimestamp()
				.setAuthor("Role Updated")
				.addField(`Role Name:`, oldRole.name)
				.addField(`Role ID:`, oldRole.id)
				.addField(`Old Role Color:`, oldRole.hexColor)
				.addField(`New Role Color:`, newRole.hexColor);
			return log.send({ embed: embed });
		}
		if (oldRole.rawPosition !== newRole.rawPosition) {
			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setTimestamp()
				.setAuthor("Role Updated")
				.addField(`Role Name:`, oldRole.name)
				.addField(`Role ID:`, oldRole.id)
				.addField(`Old Position`, oldRole.rawPosition)
				.addField(`New Position:`, newRole.rawPosition);
			return log.send(embed);
}
    }
      
        
    //    

        
	

	async init() {
		/*
		 * You can optionally define this method which will be run when the bot starts
		 * (after login, so discord data is available via this.client)
		 */
	}

};