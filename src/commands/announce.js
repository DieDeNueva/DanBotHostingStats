const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, TextInputBuilder, TextInputStyle, ModalBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Sends an embed announcement')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {

        const contentInput = new TextInputBuilder()
            .setCustomId('content')
            .setLabel("CONTENT")
            .setValue("@everyone")
            .setRequired(false)
            .setStyle(TextInputStyle.Short);

        const titleInput = new TextInputBuilder()
            .setCustomId('title')
            .setLabel("TITLE")
            .setValue("Announcement")
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const descriptionInput = new TextInputBuilder()
            .setCustomId('description')
            .setLabel("CONTENT")
            .setMaxLength(4000)
            .setRequired(true)
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
