/*
    ____              ____        __     __  __           __  _
   / __ \____ _____  / __ )____  / /_   / / / /___  _____/ /_(_)___  ____ _
  / / / / __ `/ __ \/ __  / __ \/ __/  / /_/ / __ \/ ___/ __/ / __ \/ __ `/
 / /_/ / /_/ / / / / /_/ / /_/ / /_   / __  / /_/ (__  ) /_/ / / / / /_/ /
/_____/\__,_/_/ /_/_____/\____/\__/  /_/ /_/\____/____/\__/_/_/ /_/\__, /
The home of free hosting since 2016!                              /____/
*/

//Import all modules needed
const fs = require('fs');
const { Client, GatewayIntentBits } = require("discord.js");

//Setup discord client
const client = new Client({
    restTimeOffset: 0,
    disableMentions: "everyone",
    restWsBridgetimeout: 100,
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: [
        GatewayIntentBits.Guilds
    ],
});

//Import main config
client.config = require("./config.json");

//Event handler
fs.readdir("./events/", (err, files) => {
    files = files.filter((f) => f.endsWith(".js"));
    files.forEach((f) => {
        const event = require(`./events/${f}`);
        client.on(f.split(".")[0], event.bind(null, client));
        delete require.cache[require.resolve(`./events/${f}`)];
    });
});

//Bot login
client.login(client.config.DiscordBot.Token);