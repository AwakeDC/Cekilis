//Bot Coded by AnthonyVTdev Pleas Give Me Credits If Used Thank You

const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'ping',
    description: "🏓Bot'un pingini kontrol eder!",
    run: async (client, interaction) => {
      let pembed = new MessageEmbed()
		  .setColor('#2F3136')	
			.setTitle('Bot Pingi')
			.addField('**Gecikme**', `\`${Date.now() - interaction.createdTimestamp}ms\``)
			.addField('**API Gecikmesi**', `\`${Math.round(client.ws.ping)}ms\``)
			.setTimestamp()
			.setFooter(`${interaction.user.username}`, interaction.user.avatarURL());
        interaction.reply({
          embeds: [pembed]
        });
    },
};
//Bot Coded by AnthonyVTdev Pleas Give Me Credits If Used Thank You
