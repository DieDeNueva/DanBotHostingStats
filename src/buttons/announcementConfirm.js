const { ButtonInteraction } = require("discord.js");

module.exports = {

    name: "announcement-confirm",
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {

        await interaction.channel.send({ content: interaction.message.content, embeds: interaction.message.embeds })

        await interaction.reply({ content: `Successfully posted your announcement!`, ephemeral: true })
    }

}
