const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['setmute'],
			cooldown: 5,
			description: 'Set the mute role',
			permissionLevel: 6,
			runIn: ['text'],
			usage: '[role:role]'
		});
	}

	async run(message, [role]) {
		if (!role) return message.send(`the muted rule is <@&${message.guild.settings.roles.muted}>`);
		if (!await message.hasAtLeastPermissionLevel(6)) throw message.language.get('INHIBITOR_PERMISSIONS');
		if (message.guild.settings.roles.muted === role) throw message.language.get('CONFIGURATION_EQUALS');
		await message.guild.settings.update('roles.muted', role, message.guild);
		return message.send(`Mute role set to ${role}`);
	}

};