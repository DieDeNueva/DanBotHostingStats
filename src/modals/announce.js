const { ModalSubmitInteraction, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {

    name: "announce",
    /**
     * 
     * @param {ModalSubmitInteraction} interaction 
     */
    async execute(interaction) {

        let content = interaction.fields.getTextInputValue("content");
        let title = interaction.fields.getTextInputValue("title");
        let description = interaction.fields.getTextInputValue("description");

        const row = new ActionRowBuilder().addComponents(new ButtonBuilder()
            .setCustomId("announcement-confirm")
            .setLabel("Confirm")
            .setEmoji("👍")
            .setStyle(ButtonStyle.Success),
        )

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(Colors.Blurple)
            .setTimestamp();



        await interaction.reply({ content, embeds: [embed], components: [row], ephemeral: true });
    },
};
