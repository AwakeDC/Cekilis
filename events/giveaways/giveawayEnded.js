const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new Discord.MessageEmbed()
          .setTitle(`🎁 Hadi başlayalım!!`)
          .setColor("#2F3136")
          .setDescription(`Hey oradaki ${member.user}\n kazandığını duydum? **[[Çekiliş]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n **${giveaway.prize}!**\nÖdülü alabilmek için sunucu sahibine mesaj gönderin!`)
          .setTimestamp()
          .setFooter(member.user.username, member.user.displayAvatarURL())
        ]
      }).catch(e => {})
    });

  }
}
