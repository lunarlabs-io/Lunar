const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['enableWelcome'],
			cooldown: 5,
			description: 'Change the Welcome channel.',
			permissionLevel: 6,
			runIn: ['text'],
			usage: '[welcome:boolean]'
		});
	}

	async run(message) {
		if (!await message.hasAtLeastPermissionLevel(6)) throw message.language.get('INHIBITOR_PERMISSIONS');
		if (message.guild.settings.welcomeEnabled === "true"){
			await message.guild.settings.update("welcomeEnable", "false", message.guild);
			return message.reply("Welcome Message Has Been Disabled");
		}
		if(message.guild.settings.welcomeEnabled === "false"){
			await message.guild.settings.update('welcomeEnabled', "true", message.guild);
			return message.send(`Welcome Message Has Been Enabled`);
		}
		
		//if (message.guild.settings.welcomeEnabled === welcome) throw message.language.get('CONFIGURATION_EQUALS');
		
	}

	

};