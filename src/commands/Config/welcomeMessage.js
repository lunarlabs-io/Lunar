const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['setWelcome'],
			cooldown: 5,
			description: 'Change The Welcome Message.',
			permissionLevel: 0,
			runIn: ['text'],
			usage: '[welcomeMessage:str{1,200}]'
		});
	}

	async run(message, [welcomeMessage]) {
		if (!welcomeMessage) return message.send(`The welcome Message for this guild is \`${message.guild.settings.welcomeMessage}\``);
		if (!await message.hasAtLeastPermissionLevel(6)) throw message.language.get('INHIBITOR_PERMISSIONS');
		
		if (message.guild.settings.welcomeMessage === welcomeMessage) throw message.language.get('CONFIGURATION_EQUALS');
		await message.guild.settings.update('welcomeMessage', welcomeMessage);
		return message.send(`The Welcome Message for this guild has been set to \`${welcomeMessage}\``);
	}

	

};