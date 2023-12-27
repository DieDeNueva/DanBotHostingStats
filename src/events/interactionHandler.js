const chalk = require('chalk');
const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	/**
	 * 
	 * @param {import('discord.js').Interaction} interaction 
	 * @returns 
	 */
	async execute(interaction) {

		if (interaction.isChatInputCommand()) {

			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(chalk.bgRedBright(`[ERROR-COMMAND] Error executing ${interaction.commandName}`));
				console.error(error);
			}
			return;
		}

		if (interaction.isButton()) {

			let id = interaction.customId.split("_")[0];

			const button = interaction.client.buttons.get(id);

			if (!button) {
				console.error(`No button matching ${id} was found.`);
				return;
			}

			try {
				await button.execute(interaction);
			} catch (error) {
				console.error(chalk.bgRedBright(`[ERROR-BUTTON] Error executing ${interaction.commandName}`));
				console.error(error);
			}
			return;

		}

		if (interaction.isModalSubmit()) {

			let id = interaction.customId.split("_")[0];

			const modal = interaction.client.modals.get(id);

			if (!modal) {
				console.error(`No modal matching ${id} was found.`);
				return;
			}

			try {
				await modal.execute(interaction);
			} catch (error) {
				console.error(chalk.bgRedBright(`[ERROR-MODAL] Error executing ${interaction.commandName}`));
				console.error(error);
			}
			return;

		}

	},
};
