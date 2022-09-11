const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new Discord.MessageEmbed()
          .setTitle(`🎁 Hadi! Yeni Bir Kazananımız Var`)
          .setColor("#2F3136")
          .setDescription(`Hey merhaba ${member.user}\n Ev sahibinin yeniden kayıt yaptığını ve kazandığınızı duydum **[[Çekiliş]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n **${giveaway.prize}!**\nÖdülünü almak için sunucu sahibiyle iletişime geç!!`)
          .setTimestamp()
          .setFooter(member.user.username, member.user.displayAvatarURL())
        ]
      }).catch(e => {})
    });
  }
}
