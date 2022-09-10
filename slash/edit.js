//Bot Coded by AnthonyVTdev Pleas Give Me Credits If Used Thank You

module.exports = {
    name: 'edit',
    description: '🎉 Çekilişi düzenle',

    options: [
        {
            name: 'giveaway',
            description: 'Çekiliş sona erdi (message ID)',
            type: 'STRING',
            required: true
        },
        {
            name: 'duration',
            description: 'Bahsedilen çekilişin ayarlanma zamanı. Örneğin. 1h, mevcut çekilişin bir saat sonra bitmesini sağlar!',
            type: 'STRING',
            required: true
        },
        {
            name: 'winners',
            description: 'çekilişin kaç kazananı olmalı',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'prize',
            description: 'çekilişin ödülü ne olmalı',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        // If the member doesn't have enough permissions
        if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return interaction.reply({
                content: ':x: Eşantiyonları başlatmak için mesajları yönetme izinlerine sahip olmanız gerekir.',
                ephemeral: true
            });
        }
        const gid = interaction.options.getString('giveaway');
        const time = interaction.options.getString('duration');
        const winnersCount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');
        
        await interaction.deferReply({
         ephemeral: true
        })
        // Edit the giveaway
        try {
        await client.giveawaysManager.edit(gid, {
            newWinnersCount: winnersCount,
            newPrize: prize,
            addTime: time
        })
        } catch(e) {
return interaction.editReply({
            content:
                `No giveaway found with the given message ID: \`${gid}\``,
            ephemeral: true
        });
        }
        interaction.editReply({
            content:
                `This giveaway has now been edited!`,
            ephemeral: true
        });
    }

};

//Bot Coded by AnthonyVTdev Pleas Give Me Credits If Used Thank You
