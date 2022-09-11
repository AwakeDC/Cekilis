//Bot Coded by AnthonyVTdev Pleas Give Me Credits If Used Thank You

module.exports = {
    name: "resume",
    description: '▶ Çekilişi devam ettirir',

    options: [
        {
            name: 'giveaway',
            description: 'Durdurulan çekilişi devam ettirir (Mesaj ID veya Çekiliş Ödülü)',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        // If the member doesn't have enough permissions
        if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return interaction.reply({
                content: ':x: Gerekli izinlere sahip değilsin.',
                ephemeral: true
            });
        }

        const query = interaction.options.getString('giveaway');

        // try to find the giveaway with prize alternatively with ID
        const giveaway =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        // If no giveaway was found
        if (!giveaway) {
            return interaction.reply({
                content: 'Çekiliş bulunamadı `' + query + '`.',
                ephemeral: true
            });
        }

        if (!giveaway.pauseOptions.isPaused) {
            return interaction.reply({
                content: `**[Çekiliş](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**  zaten durdurulmamış!`,
                ephemeral: true
            });
        }

        // Edit the giveaway
        client.giveawaysManager.unpause(giveaway.messageId)
            // Success message
            .then(() => {
                // Success message
                interaction.reply(`**[Çekiliş](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})** başarıyla devam ettiriliyor!`);
            })
            .catch((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                });
            });

    }
};
//Bot Coded by AnthonyVTdev Pleas Give Me Credits If Used Thank You
