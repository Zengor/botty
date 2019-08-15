'use strict';
const Command = require('../structures/Command');

//Evaluates arbitrary javascript
module.exports = function command(requires)
{
  return new Command({
    name: 'Debug',
    inline: true,
    alias: ['ev'],
    blurb: 'Evaluates JS code',
    longDescription: 'testestes',
    usages: ['`!ev {javascript code}` ― '],
    permission: 'private',
    action: function(details)
    {
      let bot = requires.bot;
      
      const echo = function(str)
      {
        bot.sendMessage(details.channelID, {
          content: str
        });
      };
      if(details.input === '') {return;}
      else
      {
        try
        {
          bot.sendMessage(details.channelID, {
            content: eval(details.input)
          });
        }
        catch(err)
        {
          bot.sendMessage(details.channelID, {
            content: err
          });
        }
      }
    }
  }, requires);
};
