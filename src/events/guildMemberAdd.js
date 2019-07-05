const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'guildMemberAdd',
			enabled: true
		});
	}

	async run(member) {
        if (!member) return;
        
        if(member.guild.settings.welcomeEnabled === "true"){
            let servername = member.guild.name;
            let username = member.user.tag;
            let pingname = member;
            let welcomemes = member.guild.settings.welcomeMessage.replace("{{user}}", username).replace("{{servername}}", servername).replace("{{pingname}}", pingname);
            const wecomechannel = member.guild.channels.get(member.guild.settings.welcomeChannel);
            wecomechannel.send(welcomemes);
              

        }
        
        const log = member.guild.channels.get(member.guild.settings.channels.log);
        //console.log(log) 
        if (!log) return
        const embed = new MessageEmbed()
        // Set the title of the field
        .setTitle(`User Has Been Joined ${member.guild.name}`)
        // Set the color of the embed
        .setColor(0xFF0000)
       
        //.setImage(``)
        // Set the main content of the embed
        .setTimestamp()
        .setDescription(`${member.username} has been Joined`);
      // Send the embed to the same channel as the message
      log.send(embed);

        
	}

	async init() {
		/*
		 * You can optionally define this method which will be run when the bot starts
		 * (after login, so discord data is available via this.client)
		 */
	}

};