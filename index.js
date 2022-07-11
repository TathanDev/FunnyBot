const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const bdd = require("./commands/bdd.json");


bot.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

bot.once('ready', () => {
	console.log('Ready !');
	bot.user.setActivity('des Memes', { type: 'WATCHING' });

});


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	bot.commands.set(command.data.name, command);
}


bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = bot.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: "Bruh, tu as cassé la matrice.\nJe te conseille de MP TATHAN#0007", ephemeral: true });        
	
	}
});


bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;


	
	if (commandName === 'start') {

		if (bdd["adventure-level"][interaction.member.id] == null) {

			await interaction.reply({ content: "Votre aventure commence ! Vous pouvez commencer le niveau 1", ephemeral: true});
			bdd["adventure-level"][interaction.member.id] = "1"
			Savebdd();

		} else {

			await interaction.reply({ content: "Votre aventure a déjà commencer !", ephemeral: true});

		}
	}
	


	 else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}


});

/** Functions */
function Savebdd() {
    fs.writeFile("./commands/bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue.");
    });
}


bot.login(token);