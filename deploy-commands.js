const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, testToken } = require('./config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');



/** Tycoon Commands */
const commands = [
	new SlashCommandBuilder().setName('start').setDescription('Commence ton aventure!'),
	//new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	//new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());


const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(testToken);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Sucessfully registered applicaticon commands.'))
	.catch(console.error);
