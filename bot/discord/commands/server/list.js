const axios = require('axios')
exports.run = async(client, message, args) => {
    
    //return message.channel.send("This command is disabled temporarily.");    
    
    try {
        const loadingMsg = await message.channel.send('Loading servers...');

        //List servers
        var arr = [];
        let userID = message.author.id;

        if (message.member.roles.cache.find(r => r.id === "898041747597295667")) userID = args[1] || message.author.id; // Allow devs to lookup a users server list;

        axios({
            url: "https://panel.danbot.host" + "/api/application/users/" + userData.get(userID).consoleID + "?include=servers",
            method: 'GET',
            followRedirect: true,
            maxRedirects: 5,
            headers: {
                'Authorization': 'Bearer ' + config.Pterodactyl.apikey,
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json',
            }
        }).then(response => {

            const preoutput = response.data.attributes.relationships.servers.data;
            arr.push(...preoutput)

            setTimeout(async() => {

                setTimeout(() => {
                    var clean = arr.map(e => "Server Name: `" + e.attributes.name + "`, Server ID: `" + e.attributes.identifier + "`\n");

                    if (clean.length == 0) {
                        message.channel.send("You don't have any servers unfortunately.");
                    } else if (clean.length > 75) {
                        message.channel.send("You have way too many servers to display!");
                    } else if (clean.length > 25) {
                        const ServerListEmbed = new Discord.MessageEmbed();
                        ServerListEmbed.setDescription('Your server list is too long so here is a abstracted version!\nYou have a total of ' + arr.length + ' servers!');
                        ServerListEmbed.addField('__**Your Servers:**__', arr.map(e => "`" + e.attributes.identifier + "`"));
                        message.channel.send(embed);
                    } else { 
                        const ServerListEmbed = new Discord.MessageEmbed();
                        ServerListEmbed.setDescription('You have a total of ' + arr.length + ' servers.');
                        ServerListEmbed.addField('__**Your Servers:**__', clean);
                    }; 

                    loadingMsg.delete();
                }, 500);
            }, 5000);
        }).catch(err => {});

    } catch (Error) {
        message.channel.send(Error);
    };
}
