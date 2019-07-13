const { Command, Duration } = require('klasa');

/*
	To use this correctly, you will also need the unmute task located in
	/tasks/unmute.js
*/

// Add to your schema definition:
// KlasaClient.defaultGuildSchema.add('roles', schema => schema
//   .add('muted', 'role'));

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 6,
			requiredPermissions: ['MANAGE_ROLES'],
			runIn: ['text'],
			description: 'Mutes a mentioned member.',
			usage: '[when:time] <member:member> <reason:...string>',
			usageDelim: ' '
		});
	}

	async run(msg, [when, member, reason]) {
		const log = msg.guild.channels.get(msg.guild.settings.channels.log);
		if (member.id === msg.author.id) throw 'Why would you mute yourself?';
		if (member.id === this.client.user.id) throw 'Have I done something wrong?';

		if (member.roles.highest.position >= msg.member.roles.highest.position) throw 'You cannot mute this user.';

		if (member.roles.has(msg.guild.settings.roles.muted)) throw 'The member is already muted.';
		await member.roles.add(msg.guild.settings.roles.muted);

		if (when) {
			await this.client.schedule.create('unmute', when, {
				data: {
					guild: msg.guild.id,
					user: member.id
				}
			});
			return msg.send(`${member.user.tag} got temporarily muted for ${Duration.toNow(when)}.${reason ? ` With reason of: ${reason}` : ''}`);
		}
		msg.reply(`I've muted ${member.user.tag} for more details check your ${log} channel`)
		return log.send(`${member.user.tag} got muted.${reason ? ` With reason of: ${reason}` : ''}`);
	}

};