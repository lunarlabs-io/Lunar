const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'guildMemberUpdate',
			enabled: true
		});
	}

	async run(oldMember, newMember) {
        if (!oldMember.guild) return;
        const log = oldMember.guild.channels.get(oldMember.guild.settings.channels.log);
        //console.log(log) 
        if (!log) return;
      

	
		if (oldMember.nickname !== newMember.nickname) {
			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setTimestamp()
				.setAuthor("User Guild Nickname Changed")
				.addField(`Username`, `${oldMember.user.tag} (${oldMember.id})`)
				.addField(`Old NickName`, oldMember.nickname === null ? "No Nickname" : oldMember.nickname)
				.addField(`New Nickname`, newMember.nickname === null ? "Nickname Reset:" : newMember.nickname);
			log.send(embed);
		}


		if (oldMember.roles.size < newMember.roles.size) {
			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setTimestamp()
				.setAuthor("Role Added To User")
				.addField(`User`, `${oldMember.user.tag} (${oldMember.id})`);
			for (const role of newMember.roles.map(x => x.id)) {
				if (!oldMember.roles.has(role)) {
					embed.addField(`Role Added`, `${oldMember.guild.roles.get(role).name}`);
				}
			}
			log.send(embed);
		}

		if (oldMember.roles.size > newMember.roles.size) {
			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setTimestamp()
				.setAuthor("Role Removed From User")
				.addField(`User:`, `${oldMember.user.tag} (${oldMember.id})`);
			for (const role of oldMember.roles.map(x => x.id)) {
				if (!newMember.roles.has(role)) {
					embed.addField(`Roles Removed`, `${oldMember.guild.roles.get(role).name}`);
				}
			}
			log.send(embed);
		}
}
	

	async init() {
		/*
		 * You can optionally define this method which will be run when the bot starts
		 * (after login, so discord data is available via this.client)
		 */
	}

};