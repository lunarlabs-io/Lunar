const { Command } = require('klasa');
//const { MessageEmbed } = require('discord.js');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
            description: 'Punch a member',
            runIn: ['text'],
            permissionLevel: 0,
			usage: '<user:member>'
		});
		
	}

	async run(msg, [user]) {
        let datafolder;
        var walkSync = function(dir, filelist) {
            var path = path || require('path');
            var fs = fs || require('fs'),
                files = fs.readdirSync(dir);
            filelist = filelist || [];
            files.forEach(function(file) {
              if (fs.statSync(path.join(dir, file)).isDirectory()) {
                filelist = walkSync(path.join(dir, file), filelist);
              }
              else {
                filelist.push(file);
              }
            });
            datafolder = filelist;
            return filelist;
          };
         walkSync("../images/punch");
         //console.log(datafolder)
         function random_image(datafolder){
             return datafolder[Math.floor(Math.random()*datafolder.length)];
         }
         console.log(user.user);
         msg.channel.send(`${msg.author.tag} Punched ${user.user.username}!`, {files: ["../images/punch/"+random_image(datafolder)]});
        }

};