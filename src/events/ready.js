const chalk = require('chalk');
require('dotenv').config();
const { Events, Client } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    /**
     * @param {Client} client 
     */
    async execute(client) {
        console.log(chalk.bgGreen('[CLIENT]'), `Logged in discord as ${client.user.tag}`);

        client.guilds.fetch(process.env.guildId).catch(err => {
            console.log(chalk.bgYellow(`[WARNING]`), `Couldn't find the server with the ID ${process.env.guildId}!`);
            console.log(chalk.bgYellow(`[WARNING]`), `Invite link: https://discord.com/oauth2/authorize?client_id=${process.env.clientId}&scope=bot&permissions=8`);
        });

    },
};
