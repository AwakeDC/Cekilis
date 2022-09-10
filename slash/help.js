//Bot Coded by AnthonyVTdev Pleas Give Me Credits If Used Thank You

const { MessageEmbed , MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
    name: 'help',
    description: '📜 Botun kullanabileceği tüm komutları görüntüleyin!',
    run: async (client, interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Commands of ${client.user.username}`)
        .setColor('#2F3136')
        .setDescription('**Lütfen tüm komutlarını görüntülemek için bir kategori seçin**')
        .addField(`Links:`,`- [Youtube Channel](https://www.youtube.com/channel/UC0oS507eiiBAoU4dYLftcIw)\n- [Discord Server](https://discord.gg/ZAzGRFTv59)\n- [GitHub](https://github.com/AnthonyVTdev/GiveawayBot)`,true)
        .setTimestamp()
        .setFooter(`Requested by ${interaction.user.username} | GiveawayBot™ v3 By AnthonyVTdev`, interaction.user.displayAvatarURL());
        
          const giveaway = new MessageEmbed()
          .setTitle("Categories » Giveaway")
          .setColor('#2F3136')
          .setDescription("```yaml\nÇekiliş Komutları:```")
          .addFields(
            { name: 'Create / Start'  , value: `Çekiliş başlatmaya yarayan komut!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'Edit' , value: `Halihazırda olan bir çekilişi düzenlemeye yarar!!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'End' , value: `Halihazırda olan bir çekilişi sona erdirir!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'List' , value: `Mevcut çekilişleri listeler!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'Pause' , value: `Halihazırda olan bir çekilişi durdurur!\n > **Type: __\`slash\`__**`, inline: true },
            { name: 'Reroll' , value: `Biten bir çekilişi yeniden yapar!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'Resume' , value: `Durdurulan çekilişi tekrar başlatır!\n > **Type: __\`slash\`__**`, inline: true },
          )
          .setTimestamp()
          .setFooter(`Requested by ${interaction.user.username} | GiveawayBot™ v3 By AnthonyVTdev`, interaction.user.displayAvatarURL());
        
        
          const general = new MessageEmbed()
          .setTitle("Categories » General")
          .setColor('#2F3136')
          .setDescription("```yaml\nGenel bot komutları:```")
          .addFields(
            { name: 'Help'  , value: `Bu bot için mevcut tüm komutları gösterir!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'Invite' , value: `Botun davet bağlantısını alın!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'Ping' , value: `Botun websocket gecikmesini kontrol edin!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'Stats' , value: `Bot fiziksel istatistiklerini gönderir.\n > **Type: __\`slash\`__**`, inline: true },
          )
          .setTimestamp()
          .setFooter(`Requested by ${interaction.user.username} | GiveawayBot™ v3 By IKARA`, interaction.user.displayAvatarURL());
        
          const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("help-menu")
                .setPlaceholder("Lütfen kategori seçin")
                .setDisabled(state)
                .addOptions([{
                        label: `Çekliş`,
                        value: `Çekiliş`,
                        description: `Çekiliş komutlarını görüntüler!`,
                        emoji: `🎉`
                    },
                    {
                        label: `Genel`,
                        value: `Genel`,
                        description: `Botun genel komutlarını görüntüler!`,
                        emoji: `⚙`
                    }
                ])
            ),
        ];
        
        const initialMessage = await interaction.reply({ embeds: [embed], components: components(false) });
        
        const filter = (interaction) => interaction.user.id === interaction.member.id;
        
                const collector = interaction.channel.createMessageComponentCollector(
                    {
                        filter,
                        componentType: "SELECT_MENU",
                        time: 300000
                    });
        
                collector.on('collect', (interaction) => {
                    if (interaction.values[0] === "giveaway") {
                        interaction.update({ embeds: [giveaway], components: components(false) });
                    } else if (interaction.values[0] === "general") {
                        interaction.update({ embeds: [general], components: components(false) });
                    }
                });
                collector.on('end', () => {
                  initialMessage.update({ components: components(true) });
              }
              )
    },
};

//Bot Coded by AnthonyVTdev Pleas Give Me Credits If Used Thank You
