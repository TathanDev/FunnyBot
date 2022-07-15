const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
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
		await interaction.reply({ content: "Bruh, tu as cassé la matrice.\nJe te conseille de MP TATHAN#0007.\n \n```js\n" + `${error}` + "\n```\nNom de la commande : " + `${interaction}` , ephemeral: true });        

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


var buttonsManager = {

	"level1-river": function(interaction){
		interaction.reply({ content: "Vous pensez vraiment qu'il faut traverser une rivière seul ?\nMaintenant tu le sait. Mais tu vient de te noyer donc tu doit recommencer :). Try Again ", ephemeral: true});

   },
   "level1-forest": function(interaction){
	interaction.reply({ content: "Vous pensez vraiment qu'il faut traverser une forêt seul ? Juste avant la nuit !?\nMaintenant tu le sait. Mais tu vient de mourir donc tu doit recommencer :). Try Again ", ephemeral: true});

},

	"level1-success": function(interaction){

		const level1Success = new MessageEmbed()
		.setColor("36FF00")
		.setTitle("Niveau 1 Réussi !")
		.setTimestamp()
		.setDescription("🎉 **Félicitation**!\n Tu as réussi ce niveau! Cela se voit que tu n'es pas un inconscient. Tu peux maintenant continuer ton aventure en quête de ta chêvre !! Pour te récompenser de ton acte, tes parents te donnent **5** tathanbucks :coin: (Ils seront utiles dans la suite de ta quête.).\n")
		

		 interaction.reply({ ephemeral: true, embeds: [level1Success]});
		//Level + 1
		bdd["adventure-level"][interaction.member.id] = "2"
		bdd["coins-user"][interaction.member.id] = 5;
		Savebdd();
	},
	"level2-river": function(interaction){
		interaction.reply({ content: "Vous pensez vraiment qu'il faut traverser une rivière seul ?\nMaintenant tu le sait. Mais tu vient de te noyer donc tu doit recommencer :). Try Again ", ephemeral: true});

   },
	"level2-forest": function(interaction){

		const forestRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('level2-forest-boat')
                        .setLabel("Voir l'échope")
                        .setEmoji("🛶")
                        .setStyle('PRIMARY'),

                        new MessageButton()
                        .setCustomId('level2-river')
                        .setLabel('Traverser la rivière')
                        .setEmoji("🌊")
                        .setStyle('PRIMARY'),
                );

				const forest = new MessageEmbed()
				.setColor("36FF00")
				.setTitle("Vous decidez d'avancer dans la fôret.")
				.setTimestamp()
				.setDescription("Une trentaine de minutes après être entré dans la forêt, vous arrêtez vos recherches et apercevez le chemin de randonnée se finir juste devant... la rivière !\nAprès s'être approché de cette dernière, tu y découvre les restes d'un anciens ponts. Tous les espoirs sont perdus ? Non ! En effet, à quelques mettre de toi, il y a une petite échope se nommant *Au Bon Bateau*.")
				.addFields(
                    { name: 'Choix', value: "deux choix sont possibles." },
                    { name: '**1**', value: "Aller voir l'échope. 🛶", inline: true },
                    { name: '**2**', value: "Retourner au village. 🌊", inline: true },
    
                )
				.setTimestamp("10h30")
				 interaction.reply({ embeds: [forest], ephemeral: true, components: [forestRow]});


	},
	"level2-forest-back": function(interaction){
		 interaction.reply({ content: "Tu veux vraiment faire demi-tour ? Pathétique...", ephemeral: true});

	},
	"level2-forest-boat": function(interaction){
		const chopRow = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setCustomId('level2-forest-askGoat')
							.setLabel("Demander pour la chèvre")
							.setEmoji("🐐")
							.setStyle('PRIMARY'),
	
							new MessageButton()
							.setCustomId('level2-forest-askBoat')
							.setLabel('Demander pour un bateau')
							.setEmoji("🛶")
							.setStyle('PRIMARY'),
					);
	
					const chop = new MessageEmbed()
					.setColor("36FF00")
					.setTitle("Vous decidez d'aller voir le vendeur de bateau...")
					.setTimestamp()
					.setDescription("Vous approchez du vendeur :")
					.addFields(
						{ name: `${interaction.user.name}`, value: "Bonjour !"},
						{ name: `** Vendeur`, value: "Bonjour mon petit. Que veux-tu ?\n \n"},
						{ name: 'Choix', value: "deux choix sont possibles." },
						{ name: '**1**', value: "Je cherche ma chèvre. 🐐", inline: true },
						{ name: '**2**', value: "Je voudrais un bateau pour passer. 🛶", inline: true },
		
					)
					 interaction.reply({ embeds: [chop], ephemeral: true, components: [chopRow]});
	},
	"level2-forest-askGoat": function(interaction){
		const askGoatRow = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setCustomId('level2-forest-back')
							.setLabel("Retourner à la maison")
							.setEmoji("🏡")
							.setStyle('PRIMARY'),
	
							new MessageButton()
							.setCustomId('level2-forest-askBoat')
							.setLabel('Demander pour un bateau')
							.setEmoji("🛶")
							.setStyle('PRIMARY'),
					);
	
					const askGoat = new MessageEmbed()
					.setColor("36FF00")
					.setTitle("Vous decidez de lui demander pour votre chèvre...")
					.setTimestamp()
					.addFields(
						{ name: `${interaction.user.name}`, value: "Avez-vous vu une chèvre passer ? !"},
						{ name: `** Vendeur`, value: "Ho, tu parle d'une petite chèvre tacheté ?\n \n"},
						{ name: `${interaction.user.name}`, value: "Oui, c'est ça ! Vous savez où elle est passée ?\n \n"},
						{ name: `** Vendeur`, value: "Bien sur. Elle est monté dans le bateau d'un voyageur en direction de la Grande Ville \n \n"},
						{ name: `${interaction.user.name}`, value: "Ah...\n \n"},
						{ name: 'Choix', value: "deux choix sont possibles." },
						{ name: '**1**', value: "Bon bah je vais rentrer chez moi... 🏡", inline: true },
						{ name: '**2**', value: "Je voudrais un bateau pour passer. 🛶", inline: true },
		
					)
					 interaction.reply({ embeds: [askGoat], ephemeral: true, components: [askGoatRow]});

	},
	"level2-forest-askBoat": function(interaction){
		const askBoatRow = new MessageActionRow()
					.addComponents(	
							new MessageButton()
							.setCustomId('level2-forest-buyBoat')
							.setLabel('Acheter le bateau')
							.setEmoji("👛")
							.setStyle('PRIMARY'),
					);
	
					const askBoat = new MessageEmbed()
					.setColor("36FF00")
					.setTitle("Vous decider d'acheter un bateau...")
					.setTimestamp()
					.addFields(
						{ name: `${interaction.user.name}`, value: "Je vais alors vous acheter votre bateau le moins chère."},
						{ name: `** Vendeur`, value: "Bien sur. Ce bateau gonflable ne coûte que 4 coins\n \n"},
						{ name: `${interaction.user.name}`, value: "Super !\n \n"},
		
					)
					 interaction.reply({ embeds: [askBoat], ephemeral: true, components: [askBoatRow]});

					 bdd["coins-user"][interaction.member.id] = bdd["coins-user"][interaction.member.id] - 4;
					 Savebdd();
			 
	}, 
	"level2-forest-buyBoat": function(interaction){
		const buyBoatRow = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('level2-forest-back')
				.setLabel("Retourner à la maison")
				.setEmoji("🏡")
				.setStyle('PRIMARY'),

				new MessageButton()
				.setCustomId('level2-forest-success')
				.setLabel('Passer la rivière')
				.setEmoji("🛶")
				.setStyle('PRIMARY'),
		);
	
					const buyBoat = new MessageEmbed()
					.setColor("36FF00")
					.setTitle("Vous vous approchez de la rivière...")
					.setTimestamp()
					.setDescription(`Il ne reste qu'une chose à faire...`)
					.addFields(
						{ name: `Il ne reste qu'une chose à faire. `, value: ""},
						{ name: 'Choix', value: "deux choix sont possibles." },
						{ name: '**1**', value: "Gloups... Je pense que je vais revenir chez moi... 🏡", inline: true },
						{ name: '**2**', value: "Cette rivière n'est qu'un obstacle entre moi et ma chèvre... J'y vais !🛶", inline: true },
		
					)
					 interaction.reply({ embeds: [buyBoat], ephemeral: true, components: [buyBoatRow]});

					 bdd["coins-user"][interaction.member.id] = bdd["coins-user"][interaction.member.id] - 4;
					 Savebdd();
			 
	},
	"level2-success": function(interaction){

		const level2Success = new MessageEmbed()
		.setColor("36FF00")
		.setTitle("Niveau 2 Réussi !")
		.setTimestamp()
		.setDescription("🎉 **Félicitation**!\n Vous avez réussi ce niveau! Après quelques minutes de doutes, vous mettez votre bateau à l'eau et passé cette rivière. Vous voila de l'autre côté ! Après avoir rangé votre bâteau, vous repartez à l'aventure !")
		

		 interaction.reply({ ephemeral: true, embeds: [level2Success]});
		//Level + 1
		bdd["adventure-level"][interaction.member.id] == "3"
		//bdd["coins-user"][interaction.member.id] = 5;
		Savebdd();
	},
}

//Buttons
bot.on('interactionCreate', async function(interaction) {		
	if (interaction.isButton()) {
	
			buttonsManager[interaction.customId](interaction)

		}
	
	}
		
);

		
		

	

/** Functions */
function Savebdd() {
    fs.writeFile("./commands/bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue.");
    });
}





bot.login(token);