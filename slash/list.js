//Bot Coded by AnthonyVTdev Pleas Give Me Credits If Used Thank You

const Discord = require("discord.js")

module.exports = {
    name: 'list',
    description: '🎉 Aktif çekilişleri listeler.',
    run: async (client, interaction) => {
        const select = new Discord.MessageSelectMenu().setCustomId("select").setPlaceholder("Choose a type of giveaway to view!").addOptions([
            {
              label: '🎉 Normal Çekiliş',
              description: 'Sunucunuzda şu anda çalışan normal çekilişleri kontrol edin!',
              value: 'normal',
            },
          ])
          const row = new Discord.MessageActionRow().addComponents([select])
          let giveaways = client.giveawaysManager.giveaways.filter(g => g.guildId === `${interaction.guild.id}` && !g.ended);
          if (!giveaways.some(e => e.messageId)) {
            return interaction.reply('💥 No Giveaways To Be Displayed')
          }
  const msg = await interaction.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("Başlamak için seçim menüsünde bir seçenek belirleyin!").setColor("#2F3136").setTimestamp()], components: [row] })
          let embed = new Discord.MessageEmbed()
            .setTitle("Aktif çekilişler!")
            .setColor("#2F3136")
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
          let embedGuild = new Discord.MessageEmbed()
            .setTitle("Currently Active Join Requirement Giveaways")
            .setColor("#2F3136")
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
          const filter = x => x.customId == "select" && x.user.id == interaction.member.id
          const collector = await interaction.channel.createMessageComponentCollector({ filter, time: 60000, max: 1 })
          await interaction.deferReply()
          collector.on("collect", async (i) => {
            const val = i.values[0]
            if (val == "normal") {
              await Promise.all(giveaways.map(async (x) => {
                embed.addField(`Normal Giveaway:`, `**Prize:** **[${x.prize}](https://discord.com/channels/${x.guildId}/${x.channelId}/${x.messageId})\nStarted:** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**Ends:** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)`)
              }));
              msg.delete()
              interaction.editReply({ embeds: [embed], components: [] })
            }
            if (val == "guildReq") {
               if (val == "guildReq") {
              if (!giveaways.some(e => e.extraData)){  interaction.editReply({ content: '💥 No Giveaways To Be Displayed', embeds: [], components: [] })
               msg.delete()
               return
            }
               }
              await Promise.all(giveaways.map(async (x) => {
                if (x.extraData) {
                  const guild = client.guilds.cache.get(x.extraData.server)
                  const channel = guild.channels.cache
                    .filter((channel) => channel.type === 'text')
                    .first()
                  const inv = await channel.createInvite()
                  embedGuild.addField(`Çekilişe katılmak için:`, `**Ödül:** **[${x.prize}](https://discord.com/channels/${x.guildId}/${x.channelId}/${x.messageId})**\n**Gerekli: [This Server](${inv})**\n**Başlangıç:** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**Bitiş:** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)`)
                }
              }));
              msg.delete()
              interaction.editReply({ embeds: [embedGuild], components: [] })
              
            }
          })
          collector.on("end",(collected, reason) => {
            if(reason == "time"){
         interaction.editReply({ content: "👀 Collector Destroyed, Try Again!", components: [] })
            }
        })  
    },
};

//Bot Coded by AnthonyVTdev Pleas Give Me Credits If Used Thank You
