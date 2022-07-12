const { Client, Collection, Intents, MessageEmbed} = require('discord.js');
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



		});



//Buttons
bot.on('interactionCreate', async interaction => {


	try {
		
	if (interaction.isButton()) {

		//Level 1
		if (interaction.customId.includes('level1-')) {
			if (interaction.customId.includes("river")) {

			await interaction.reply({ content: "Vous pensez vraiment qu'il faut traverser une rivière seul ?\nMaintenant tu le sait. Mais tu vient de te noyer donc tu doit recommencer :). Try Again ", ephemeral: true});


			} else if (interaction.customId.includes("forest")) {

				await interaction.reply({ content: "Vous pensez vraiment qu'il faut traverser une forêt seul ? Juste avant la nuit !?\nMaintenant tu le sait. Mais tu vient de mourir donc tu doit recommencer :). Try Again ", ephemeral: true});


			} else if (interaction.customId.includes("success")) {
				
				const level1Success = new MessageEmbed()
				.setColor("36FF00")
				.setTitle("Niveau 1 Réussi !")
				.setTimestamp()
				.setDescription("🎉 **Félicitation**!\n Tu as réussi ce niveau! Cela se voit que tu n'es pas un inconscient. Tu peux maintenant continuer ton aventure en quête de ta chêvre !! Pour te récompenser de ton acte, tes parents te donnent **5** plidux :coin: (Ils seront utiles dans la suite de ta quête.).\n")
				

				await interaction.reply({ ephemeral: true, embeds: [level1Success]});
				//Level + 1
				bdd["adventure-level"][interaction.member.id] = "2"
				bdd["coins-user"][interaction.member.id] = 5;
				Savebdd();


			}


		//Level 2	
		} else if (interaction.customId.includes('level2-')) {
			if (interaction.customId.includes("river")) {

			await interaction.reply({ content: "Vous pensez vraiment qu'il faut traverser une rivière seul ?\nMaintenant tu le sait. Mais tu vient de te noyer donc tu doit recommencer :). Try Again ", ephemeral: true});


			} else if (interaction.customId.includes("forest")) {

				const forest = new MessageEmbed()
				.setColor("36FF00")
				.setTitle("Vous decidez d'avancer dans la fôret.")
				.setTimestamp()
				.setDescription("Une trentaine de minutes après être entré dans la forêt, vous arrêtez vos recherches et apercevez le chemin de randonnée se finir juste devant... la rivière !")
				.addField("Après s'être approché de cette dernière, tu y découvre les restes d'un anciens ponts. Tous les espoirs sont perdus ? Non ! En effet, à quelques mettre de toi, il y a une petite échope se nommant *Au Bon Bateau*.")


				await interaction.reply({ embeds: [forest], ephemeral: true, contents: []});


			}

	



			}
		}


	} catch (error) {
		console.error(error);
	

} });

		
		




	

/** Functions */
function Savebdd() {
    fs.writeFile("./commands/bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue.");
    });
}


bot.login(token);