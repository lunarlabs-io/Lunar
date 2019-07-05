const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['setlog'],
			cooldown: 5,
			description: 'Change the log channel.',
			permissionLevel: 0,
			runIn: ['text'],
			usage: '[logs:channel]'
		});
	}

	async run(message, [logs]) {
		if (!logs) return message.send(`The Mod Log Channel is  <#${message.guild.settings.channels.log}>`);
		if (!await message.hasAtLeastPermissionLevel(6)) throw message.language.get('INHIBITOR_PERMISSIONS');
		if (message.guild.settings.channels.log === logs) throw message.language.get('CONFIGURATION_EQUALS');
		await message.guild.settings.update('channels.log', `${logs}`, message.guild);
		return message.send(`The Modlog has been set to ${logs}`);
	}

	

};