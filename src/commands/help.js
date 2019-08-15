'use strict';
const Command = require('../structures/Command');

//Help command
module.exports = function command(requires)
{
  return new Command({
    name: 'Help',
    inline: true,
    alias: ['?', 'h'],
    blurb: 'See usage details for commands with `!help <command>` or bring up this list',
    longDescription: 'Testestesteste \n test',
    usages: ['`!help` ― Shows list of commands with short descriptions', '`!help {command}` ― Shows full help message for a specific command'],
    permission: 'public',
    action: function(details)
    {
      let bot = requires.bot;
      let info = requires.info;
      let emb = {};
      emb.fields = [];
      console.log('help called');
      const listCommands = function()
      {
        emb.title = 'Help';
        emb.blurb = "You can DM the bot :heart:";
        Object.keys(info.commands).forEach((command,index) =>
        {
          let field = {};
          console.log('loop iter');
          //Looks to see if it's an admin comand. If it is, don't display the info.
          if(info.commands[command].getPerm() === 'private' && !details.isAdministrator)
          {
            return;
          }
          //create the entry in the embed
          let prefix = info.config.prefix;
          let aliases = prefix + info.commands[command].getAlias().join(', ' + prefix);      
          field.name = `${prefix}${command}, ${aliases}`;
          field.value = info.commands[command].blurb;
          field.inline = false; //info.commands[command].inline;
          emb.fields.push(field);
        });
        //seeeeend it once all of the commands are iterated through
        bot.sendMessage(details.channelID, {
          embed: emb
        });     
      };

      const sendDetails = function(commandName)
      {        
        let command = info.utility.getCommand(commandName);
        if(command == null)
        {
          bot.sendMessage(details.channelID, {
            embed: {
              title: 'No Such Command',
              description: 'Command could not be found'
            }            
          });
          
        } else {
          emb.title = 'Info: ' + command.name;
          emb.description = command.blurb;
          emb.fields[0] = {
            name: 'Description:',
            value: command.longDescription
          };
          emb.fields[1] = {
            name: 'Usages:',
            value: command.usages.join('\n')
          };
          console.log(emb);
          bot.sendMessage(details.channelID, {
            embed: emb
          });
        }
      };

      if(details.input === '')
      {
        listCommands();
      } else {
        sendDetails(details.input);
      }      
      
    }
  }, requires);
};
