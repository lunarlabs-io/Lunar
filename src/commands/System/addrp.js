const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');
const util = require('util')
const fs = require('fs')
const streamPipeline = util.promisify(require('stream').pipeline)

const fetch = require('node-fetch')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			cooldown: 5,
			description: 'Create a new image for RP commands',
            permissionLevel: 8,
            guarded: true,
            runIn: ['text'],
            hidden: true,
            usage: '<hug|kiss|punch|slap|lick|pat>', 
            
		});
	}

	async run(msg, [folder]) {
        const [attachment] = msg.attachments.values();
        
        if (!attachment || !attachment.height) throw 'Please upload an image.';
        if (!attachment.filename === 'gif') return msg.reply("i only accept gifs :P");
        const image = await fetch(attachment.url)
			.then(response => response.buffer())
			.catch(() => {
				throw 'I could not download the file. Can you try again with another image?';
			});
            
        
            let filenewname = Math.floor(Math.random() * Math.floor(50000));
            console.log(attachment.url);
           

async function download () {
  const response = await fetch(attachment.url)
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
  await streamPipeline(response.body, fs.createWriteStream('../images/'+folder+'/'+filenewname+'.gif'))
}
download()
    }

};