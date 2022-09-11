//Bot Coded by AnthonyVTdev Pleas Give Me Credits If Used Thank You

const Discord = require("discord.js")
const messages = require("../utils/message");
const ms = require("ms")
module.exports = {
  name: 'start',
  description: '🎉 Çekiliş başlatır',

  options: [
    {
      name: 'duration',
      description: 'Çekiliş ne kadar sürecek? Örnek: 1m, 1h, 1d','\n`1m: 1 Dakika\n1h: 1 Saat\n1d: 1 Gün`',
      type: 'STRING',
      required: true
    },
    {
      name: 'winners',
      description: 'Çekilişin kaç kazananı olmalı?',
      type: 'INTEGER',
      required: true
    },
    {
      name: 'prize',
      description: 'Çekilişin ödülü ne olmalı?',
      type: 'STRING',
      required: true
    },
    {
      name: 'channel',
      description: 'Çekilişin başlatılacağı kanal hangisi?',
      type: 'CHANNEL',
      required: true
    },
    {
      name: 'bonusrole',
      description: 'Bonus rol',
      type: 'ROLE',
      required: false
    },
    {
      name: 'bonusamount',
      description: "Rolün alacağı bonus'un miktarı",
      type: 'INTEGER',
      required: false
    },
    {
      name: 'invite',
      description: 'Hediye katılım şartı olarak eklemek istediğiniz sunucunun daveti',
      type: 'STRING',
      required: false
    },
    {
      name: 'role',
      description: 'Hediye katılım şartı olarak eklemek istediğiniz rol',
      type: 'ROLE',
      required: false
    },
  ],

  run: async (client, interaction) => {

    // If the member doesn't have enough permissions
    if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return interaction.reply({
        content: ':x: Çekiliş başlatmak için gerekli izinlere sahip değilsin.',
        ephemeral: true
      });
    }

    const giveawayChannel = interaction.options.getChannel('channel');
    const giveawayDuration = interaction.options.getString('duration');
    const giveawayWinnerCount = interaction.options.getInteger('winners');
    const giveawayPrize = interaction.options.getString('prize');

    if (!giveawayChannel.isText()) {
      return interaction.reply({
        content: ':x: Lütfen metin kanalı seçin!',
        ephemeral: true
      });
    }
   if(isNaN(ms(giveawayDuration))) {
    return interaction.reply({
      content: ':x: Lütfen geçerli bir süre seçin!',
      ephemeral: true
    });
  }
    if (giveawayWinnerCount < 1) {
      return interaction.reply({
        content: ':x: Lütfen geçerli bir kazanan sayısı seçin! bir veya daha çok.',
      })
    }

    const bonusRole = interaction.options.getRole('bonusrole')
    const bonusEntries = interaction.options.getInteger('bonusamount')
    let rolereq = interaction.options.getRole('role')
    let invite = interaction.options.getString('invite')

    if (bonusRole) {
      if (!bonusEntries) {
        return interaction.reply({
          content: `:x: Kaç tane bonus girişinin olacağını belirtmelisiniz ${bonusRole} almak!`,
          ephemeral: true
        });
      }
    }


    await interaction.deferReply({ ephemeral: true })
    let reqinvite;
    if (invite) {
      let invitex = await client.fetchInvite(invite)
      let client_is_in_server = client.guilds.cache.get(
        invitex.guild.id
      )
      reqinvite = invitex
      if (!client_is_in_server) {
        return interaction.editReply({
          embeds: [{
            color: "#2F3136",
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Sunucu Kontrolü!",
            url: "https://discord.gg/5BWKeQhBzW",
            description:
              "Vay vay vay vay! Yeni bir sunucu görüyorum! içinde olduğumdan emin misin? Bunu bir gereklilik olarak belirlemek için beni oraya davet etmen gerekiyor.! 😳",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "Server Check"
            }
          }]
        })
      }
    }

    if (rolereq && !invite) {
      messages.inviteToParticipate = `**Tepki ver 🎉 to participate!**\n>>> - Sadece bu role sahip olan üyeler çekilişe katılabilir ${rolereq}!`
    }
    if (rolereq && invite) {
      messages.inviteToParticipate = `**Tepki ver 🎉 to participate!**\n>>> - Bu çekilişe yalnızca bu role sahip olan kişiler katılabilir ${rolereq}!\n- Üyelerin katılması zorunludur [Bu sunucuya](${invite}) bu çekilişe katılmak için!`
    }
    if (!rolereq && invite) {
      messages.inviteToParticipate = `**Tepki ver 🎉 to participate!**\n>>> - Üyelerin katılması zorunludur [Bu sunucuya](${invite}) bu çekilişe katılmak için!`
    }


    // start giveaway
    client.giveawaysManager.start(giveawayChannel, {
      // The giveaway duration
      duration: ms(giveawayDuration),
      // The giveaway prize
      prize: giveawayPrize,
      // The giveaway winner count
      winnerCount: parseInt(giveawayWinnerCount),
      // Who hosts this giveaway
      hostedBy: client.config.hostedBy ? interaction.user : null,
      // BonusEntries If Provided
      bonusEntries: [
        {
          // Members who have the role which is assigned to "rolename" get the amount of bonus entries which are assigned to "BonusEntries"
          bonus: new Function('member', `return member.roles.cache.some((r) => r.name === \'${bonusRole ?.name}\') ? ${bonusEntries} : null`),
          cumulative: false
        }
      ],
      // Messages
      messages,
      extraData: {
        server: reqinvite == null ? "null" : reqinvite.guild.id,
        role: rolereq == null ? "null" : rolereq.id,
      }
    });
    interaction.editReply({
      content:
        `Çekiliş başladı ${giveawayChannel}!`,
      ephemeral: true
    })

    if (bonusRole) {
      let giveaway = new Discord.MessageEmbed()
        .setAuthor(`Bonus Entries Alert!`)
        .setDescription(
          `**${bonusRole}** **${bonusEntries}** Bu çekilişte Ekstra Girişler!`
        )
        .setColor("#2F3136")
        .setTimestamp();
      giveawayChannel.send({ embeds: [giveaway] });
    }

  }

};

//Bot Coded by AnthonyVTdev Pleas Give Me Credits If Used Thank You hank You
