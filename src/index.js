const { Client } = require('klasa');
const { config, token } = require('./config');



class KlasaClient extends Client {
   
    constructor(...args) {
        super(...args);
        
        // Add any properties to your Klasa Client
    }
    
    
    // Add any methods to your Klasa Client

}
KlasaClient.defaultClientSchema.add('restart', folder => folder
   .add('message', 'messagepromise')
   .add('timestamp', 'bigint', { min: 0 }));
KlasaClient.defaultGuildSchema
.add('channels', folder => folder
    .add('log', 'TextChannel')
    .add('announcement', 'TextChannel'))
.add('roles', folder => folder
    .add('administrator', 'Role')
    .add('moderator', 'Role')
    .add('everyone', 'Role')
    .add('muted', 'Role'))
.add('welcomeEnabled', "String", {default: "false"})
.add('welcomeChannel', "TextChannel")
.add('welcomeMessage', "String", {default: "Welcome to {{servername}} {{user}}, We hope that you enjoy your stay here!"})   
.add('disabledChannels', 'TextChannel', { array: true })
.add('antiinvite', 'boolean', {default: false})
.add('minAccAge', 'integer', {default: 1800000});

KlasaClient.defaultUserSchema
    .add('TODO', 'any', {array: true});

new KlasaClient(config).login(token);
