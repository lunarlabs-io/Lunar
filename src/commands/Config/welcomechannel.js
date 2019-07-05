const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['setWelcome'],
			cooldown: 5,
			description: 'Change the Welcome channel.',
			permissionLevel: 0,
			runIn: ['text'],
			usage: '[welcome:channel]'
		});
	}

	async run(message, [welcome]) {
		if (!welcome) return message.send(`The Mod Log Channel is  <#${message.guild.settings.welcomeChannel}>`);
		if (!await message.hasAtLeastPermissionLevel(6)) throw message.language.get('INHIBITOR_PERMISSIONS');
		if (message.guild.settings.welcomeChannel === welcome) throw message.language.get('CONFIGURATION_EQUALS');
		await message.guild.settings.update('welcomeChannel', `${welcome}`, message.guild);
		return message.send(`The welcome Channel has been set to ${welcome}`);
	}

	

};