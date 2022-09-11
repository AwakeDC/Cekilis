const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member) {
    return member.send({
      embeds: [new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle('❓ Hey bekle! Bir çekilişten az önce tepkiyi mi kaldırdınız?')
        .setColor("#2F3136")
        .setDescription(
          `Girişin [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) kaydedildi ama tepki vermedin!, ihtiyacın olmadığından **${giveaway.prize}** başka birini seçmem gerekirdi 😭`
        )
        .setFooter("Bir hata olduğunu mu düşünüyorsun? Git ve tekrar tepki ver!")
      ]
    }).catch(e => {})

  }
}
