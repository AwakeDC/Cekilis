const config = require('../config.json');
module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **ÇEKİLİŞ** 🎉",
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **ÇEKİLİŞ BİTTİ** 🎉",
  drawing:  `Ends: **{timestamp}**`,
  inviteToParticipate: `React with 🎉 to participate!`,
  winMessage: "Tebrikler, {winners}! **{this.prize}** Kazandınız!",
  embedFooter: "https://discord.gg/5BWKeQhBzW (Çekiliş Sunucusu)",
  noWinner: "Çekiliş iptal edildi, Geçersiz katılımcı.",
  hostedBy: "Çekilişi Yapan : {this.hostedBy}",
  winners: "Kazanan(lar)",
  endedAt: "Sona erdi"
}
