//Import modules
const enabled = require("../enabled.json")
require("../utils/nodeStatus");
const serverStatus = require("../utils/serverStatus");
const { QuickDB, MySQLDriver } = require("quick.db");

module.exports = async (client) => {
    //Setup database
    const mysqlDriver = new MySQLDriver({
        host: "192.168.1.26",
        port: "3884",
        user: "dbh",
        password: "VUP5jSacchDAIQxT",
        database: "discord",
    });
    mysqlDriver.connect();
    client.database = new QuickDB({ driver: mysqlDriver });

    //Run NodeStatus checker
    if (enabled.NodeStats) {
        let channel = client.channels.cache.get("898041845878247487");
        setInterval(async () => {
            let embed = await serverStatus.getEmbed();

            let messages = await channel.messages.fetch({
                limit: 10,
            });

            messages = messages.filter((x) => x.author.id === client.user.id).last();
            if (messages == null) channel.send(embed);
            else messages.edit(embed);
        }, 15000);
    }

    let guild = client.guilds.cache.get("639477525927690240");
    let checkNicks = () => {
        guild.members.cache
            .filter((member) => member.displayName.match(/^[a-z0-9]/i) == null)
            .forEach((x) => {
                x.setNickname("I love Dan <3");
            });
    };
    checkNicks();

    console.log("[DISCORD] " + client.user.username + " has logged in!");

    setInterval(() => {
        //Auto Activities List
        const activities = [
            {
                text: "over DBH",
                type: "WATCHING"
            },
            {
                text: "free servers being created",
                type: "WATCHING"
            },
            {
                text: "over 15,000+ happy clients",
                type: "WATCHING"
            },
            {
                text: "with the ban hammer over abusers",
                type: "PLAYING"
            },
            {
                text: "powerful servers doing work",
                type: "WATCHING"
            }
        ];

        const activity = activities[Math.floor(Math.random() * activities.length)];
        client.user.setActivity(activity.text, {
            type: activity.type,
        });
    }, 15000);
};
