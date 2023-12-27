const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, TextInputBuilder, TextInputStyle, ModalBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Sends an embed announcement')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {

        const contentInput = new TextInputBuilder()
            .setCustomId('content')
            .setLabel("CONTENT")
            .setPlaceholder("@everyone")
            .setRequired(false)
            .setStyle(TextInputStyle.Short);

        const titleInput = new TextInputBuilder()
            .setCustomId('title')
            .setLabel("TITLE")
            .setPlaceholder("Announcement")
            .setRequired(false)
            .setStyle(TextInputStyle.Short);

        const descriptionInput = new TextInputBuilder()
            .setCustomId('description')
            .setLabel("CONTENT")
            .setPlaceholder("Your embed description.")
            .setMaxLength(4000)
            .setRequired(false)
            .setStyle(TextInputStyle.Paragraph);

        const content = new ActionRowBuilder().addComponents(contentInput);
        const title = new ActionRowBuilder().addComponents(titleInput);
        const description = new ActionRowBuilder().addComponents(descriptionInput);


        const modal = new ModalBuilder()
            .setCustomId('announce')
            .setTitle('Creating an announcement')
            .addComponents(content, title, description);

        interaction.showModal(modal)

    },
};
