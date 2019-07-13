const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['setStatus'],
			cooldown: 5,
			description: 'Change the command prefix the bot uses in your server.',
            permissionLevel: 10,
            guarded: true,
			runIn: ['text'],
            usage: '<status:str>'
           
		});
	}

	async run(message, [status]) {
        if (message.content.size === 0) return message.reply("Your message is empty");
        if (!status) return message.reply("status is empty");
        
        this.client.user.setStatus(`${status}`)
        .then(console.log)
        .catch(console.error);
    }

};