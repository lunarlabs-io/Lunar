const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['setActivity'],
			cooldown: 5,
			description: 'Change the command prefix the bot uses in your server.',
            permissionLevel: 10,
            guarded: true,
			runIn: ['text'],
            usage: '[status:str][url:str][types:str]',
            usageDelim: ","
		});
	}

	async run(message, [status, url, types]) {
        if (message.content.size === 0) return message.reply("Your message is empty");
        if (!status) return message.reply("status is empty");
        if (!url){
            url = "http://lunar-labs.io";
        }
        if (!types){
            types = "STREAMING";
        }
        this.client.user.setActivity(`${status}`, { type: `${types}`, url: `${url}` })
        .then(presence => console.log(`Activity set to ${presence.activity.name}`))
        .catch(console.error);
    }

};