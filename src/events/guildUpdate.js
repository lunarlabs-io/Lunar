const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'guildUpdate',
			enabled: true
		});
	}

	async run(oldGuild, newGuild) {
        if (!oldGuild.guild) return;
        const log = oldGuild.guild.channels.get(oldGuild.guild.settings.channels.log);
        //console.log(log) 
        if (!log) return;

		if (oldGuild.name !== newGuild.name) {
			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setTimestamp()
				.setAuthor("Guild Name Changed")
				.addField(`Old Name`, oldGuild.name)
				.addField(`New Name`, newGuild.name);
			log.send(embed);
		}

		if (oldGuild.afkChannelID !== newGuild.afkChannelID) {
			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setTimestamp()
				.setAuthor("Afk Voice Room Changed")
				.addField(`Old AFK Room`, oldGuild.afkChannel === null ? "No Afk room" : oldGuild.afkChannel.name)
				.addField(`New AFK Room`, newGuild.afkChannel === null ? "No Afk Room Set" : newGuild.afkChannel.name);
			log.send(embed);
		}

		if (oldGuild.afkTimeout !== newGuild.afkTimeout) {
			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setTimestamp()
				.setAuthor("AFK Timeout Changed")
				.addField(`"Old AFK Timeout"`, `${oldGuild.afkTimeout} Seconds`)
				.addField(`New AFK Timeout`, `${newGuild.afkTimeout}Seconfs`);
			log.send(embed);
		}

		if (oldGuild.iconURL() !== newGuild.iconURL()) {
			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setTimestamp()
				.setAuthor("New Server Ion")
				.addField(`Old Server Icon`, oldGuild.iconURL() === null ? "No Server Icon" : oldGuild.iconURL())
				.addField(`New Server Icon`, newGuild.iconURL() === null ? "No Server Icon Now" : newGuild.iconURL());
			log.send(embed);
		}

		if (oldGuild.owner.id !== newGuild.owner.id) {
			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setTimestamp()
				.setAuthor("New Owner")
				.addField(`Old Owner`, oldGuild.owner.user.tag)
				.addField(`New Owner`, newGuild.owner.user.tag);
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