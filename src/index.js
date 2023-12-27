
require('dotenv').config();

const { Collection, Client, Partials } = require("discord.js");

const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent', 'DirectMessages'],
    partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.User]
});


client.commands = new Collection();
client.modals = new Collection();
client.buttons = new Collection();

// Command Handler
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// Button Handler
const buttonsPath = path.join(__dirname, 'buttons');
const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

for (const file of buttonFiles) {
    const filePath = path.join(buttonsPath, file);
    const button = require(filePath);

    if ('name' in button && 'execute' in button) {
        client.buttons.set(button.name, button);
    } else {
        console.log(`[WARNING] The buttom at ${filePath} is missing a required "name" or "execute" property.`);
    }
}

// Modals Handler
const modalsPath = path.join(__dirname, 'modals');
const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'));

for (const file of modalFiles) {
    const filePath = path.join(modalsPath, file);
    const modal = require(filePath);

    if ('name' in modal && 'execute' in modal) {
        client.modals.set(modal.name, modal);
    } else {
        console.log(`[WARNING] The modal at ${filePath} is missing a required "name" or "execute" property.`);
    }
}

//Event Handler
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.token)