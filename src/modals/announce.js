const { ModalSubmitInteraction, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {

    name: "announce",
    /**
     * 
     * @param {ModalSubmitInteraction} interaction 
     */
    async execute(interaction) {
        
        let content = interaction.fields.getField("content").value.trim();
        let title = interaction.fields.getField("title").value.trim();
        let description = interaction.fields.getField("description").value.trim();

        if (content.length == 0 && title.length == 0 && description.length == 0) {
            const embed = new EmbedBuilder()
                .setDescription(`You must fill at least one of the fields!`)
                .setColor(Colors.Red)
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true });

            return;
        }

        const row = new ActionRowBuilder().addComponents(new ButtonBuilder()
            .setCustomId("announcement-confirm")
            .setLabel("Confirm")
            .setEmoji("👍")
            .setStyle(ButtonStyle.Success),
        )

        // could remove repetitivity but at the cost of readability.
        const embed = new EmbedBuilder()
            .setTitle(title.length > 0 ? title : null)
            .setDescription(description.length > 0 ? description : null)
            .setColor(Colors.Blurple)
            .setTimestamp();

        await interaction.reply({
            content,
            embeds: (title.length > 0 || description.length > 0) ? [embed] : [],
            components: [row],
            ephemeral: true
        });
    },
};
