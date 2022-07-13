const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const bdd = require("./commands/bdd.json");
const SQLite = require("better-sqlite3")
const sql = new SQLite('./mainDB.sqlite')



bot.commands = new Collection();
const cooldowns = new Collection();
const talkedRecently = new Map();

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



//Buttons
bot.on('interactionCreate', async interaction => {


	
		
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
				const forestRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('level2-forest-boat')
                        .setLabel("Voir l'échope")
                        .setEmoji("🛶")
                        .setStyle('PRIMARY'),

                        new MessageButton()
                        .setCustomId('level2-forest-back')
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
				await interaction.reply({ embeds: [forest], ephemeral: true, components: [forestRow]});

				
				}

				if (interaction.customId.includes("forest-back")) {

					await interaction.reply({ content: "Tu veux vraiment faire demi-tour ? Pathétique...", ephemeral: true});


				} else if (interaction.customId.includes("forest-boat")) {

					const chopRow = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setCustomId('level2-forest-goat')
							.setLabel("Demander pour la chèvre")
							.setEmoji("🐐")
							.setStyle('PRIMARY'),
	
							new MessageButton()
							.setCustomId('level2-forest-askboat')
							.setLabel('Demander pour un bateau')
							.setEmoji("🛶")
							.setStyle('PRIMARY'),
					);
	
					const chop = new MessageEmbed()
					.setColor("36FF00")
					.setTitle("Vous decidez d'aller acheter un bateau...")
					.setTimestamp()
					.setDescription("Vous approchez du vendeur :")
					.addFields(
						{ name: `** ${interaction.user.name}`, value: "Bonjour !"},
						{ name: `** Vendeur`, value: "Bonjour mon petit. Que veux-tu ?\n \n"},
						{ name: 'Choix', value: "deux choix sont possibles." },
						{ name: '**1**', value: "Je cherche ma chèvre. 🐐", inline: true },
						{ name: '**2**', value: "Je voudrais un bateau pour passer. 🛶", inline: true },
		
					)
					await interaction.reply({ embeds: [chop], ephemeral: true, components: [chopRow]});
					}
					if (interaction.customId.includes("goat")) {

						await interaction.reply({ content: "Tu veux vraiment faire demi-tour ? Pathétique...", ephemeral: true});
	
	
					} else if (interaction.customId.includes("askboat")) {}

					//TODO FIX BUG
			}
		}
		
}
);

		
		

	

/** Functions */
function Savebdd() {
    fs.writeFile("./commands/bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue.");
    });
}


//XP SYSTEM
bot.on("ready", () => {
	// Check if the table "points" exists.
	  const levelTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'levels';").get();
	  if (!levelTable['count(*)']) {
		sql.prepare("CREATE TABLE levels (id TEXT PRIMARY KEY, user TEXT, guild TEXT, xp INTEGER, level INTEGER, totalXP INTEGER);").run();
	  }
  
	  bot.getLevel = sql.prepare("SELECT * FROM levels WHERE user = ? AND guild = ?");
	  bot.setLevel = sql.prepare("INSERT OR REPLACE INTO levels (id, user, guild, xp, level, totalXP) VALUES (@id, @user, @guild, @xp, @level, @totalXP);");
	// Role table for levels
	  const roleTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'roles';").get();
	  if (!roleTable['count(*)']) {
		sql.prepare("CREATE TABLE roles (guildID TEXT, roleID TEXT, level INTEGER);").run();
	  }
  
	// Prefix table
	  const prefixTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'prefix';").get();
	  if (!prefixTable['count(*)']) {
		sql.prepare("CREATE TABLE prefix (serverprefix TEXT, guild TEXT PRIMARY KEY);").run();
	  }
  
	// Blacklist table
	  const blacklistTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'blacklistTable';").get();
	  if (!blacklistTable['count(*)']) {
		sql.prepare("CREATE TABLE blacklistTable (guild TEXT, typeId TEXT, type TEXT, id TEXT PRIMARY KEY);").run();
	  }
  
	// Settings table
	  const settingsTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'settings';").get();
	  if (!settingsTable['count(*)']) {
	  sql.prepare("CREATE TABLE settings (guild TEXT PRIMARY KEY, levelUpMessage TEXT, customXP INTEGER, customCooldown INTEGER);").run();
	  }
	  
	  const channelTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'channel';").get();
	  if (!channelTable['count(*)']) {
	  sql.prepare("CREATE TABLE channel (guild TEXT PRIMARY KEY, channel TEXT);").run();
	  }
  
  
	// RankCard table (WORK IN PROGRESS, STILL IN THE WORKS)
	  const rankCardTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'rankCardTable';").get();
	  if (!rankCardTable['count(*)']) {
	  sql.prepare("CREATE TABLE rankCardTable (id TEXT PRIMARY KEY, user TEXT, guild TEXT, textColor TEXT, barColor TEXT, backgroundColor TEXT);").run();
	  }
  
	  console.log(`Logged in as ${bot.user.username}`)
  });
  
 




//MESSAGES SYTEM
bot.on("message", (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;

    
    let card = sql.prepare("SELECT * FROM rankCardTable WHERE user = ? AND guild = ?");
    if (!card.get(message.author.id, message.guild.id))
    {            
    sql.prepare("INSERT OR REPLACE INTO rankCardTable (id, user, guild, textColor, barColor, backgroundColor) VALUES (?, ?, ?, ?, ?, ?);").run(`${message.author.id}-${message.guild.id}`, message.author.id, message.guild.id, "#beb1b1", "#838383", "#36393f");
    }

    const currentPrefix = sql.prepare("SELECT * FROM prefix WHERE guild = ?").get(message.guild.id);
    const Prefix = config.prefix;
    var getPrefix;
    if(!currentPrefix) {
      sql.prepare("INSERT OR REPLACE INTO prefix (serverprefix, guild) VALUES (?,?);").run(Prefix, message.guild.id)
      getPrefix = Prefix.toString();
    } else {
      getPrefix = currentPrefix.serverprefix.toString();
    }

  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefixRegex = new RegExp(`^(<@!?${not.user.id}>|${escapeRegex(getPrefix)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    bot.commands.get(commandName) ||
    bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.").catch(console.error);
  }
});

//MESSAGES
bot.on("message", message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	let blacklist = sql.prepare(`SELECT id FROM blacklistTable WHERE id = ?`);
	if(blacklist.get(`${message.guild.id}-${message.author.id}`) || blacklist.get(`${message.guild.id}-${message.channel.id}`)) return;
  
		  // get level and set level
		  const level = bot.getLevel.get(message.author.id, message.guild.id) 
		  if(!level) {
			let insertLevel = sql.prepare("INSERT OR REPLACE INTO levels (id, user, guild, xp, level, totalXP) VALUES (?,?,?,?,?,?);");
			insertLevel.run(`${message.author.id}-${message.guild.id}`, message.author.id, message.guild.id, 0, 0, 0)
			return;
		  }
  
		  let customSettings = sql.prepare("SELECT * FROM settings WHERE guild = ?").get(message.guild.id);
		  let channelLevel = sql.prepare("SELECT * FROM channel WHERE guild = ?").get(message.guild.id);
  
		  const lvl = level.level;
  
		  let getXpfromDB;
		  let getCooldownfromDB;
  
		  if(!customSettings)
		  {
			getXpfromDB = 16; // Default
			getCooldownfromDB = 1000;
		  } else {
			getXpfromDB = customSettings.customXP;
			getCooldownfromDB = customSettings.customCooldown;
		  }
  
		// xp system
		  const generatedXp = Math.floor(Math.random() * getXpfromDB);
		  const nextXP = level.level * 2 * 250 + 250
		  // message content or characters length has to be more than 4 characters also cooldown
		if(talkedRecently.get(message.author.id)) {
		  return;
		} else { // cooldown is 10 seconds
			  level.xp += generatedXp;
			  level.totalXP += generatedXp;
			  
  
		// level up!
		  if(level.xp >= nextXP) {
				  level.xp = 0;
				  level.level += 1;
  
		  let levelUpMsg;
		  let embed = new Discord.MessageEmbed()
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
				.setColor("RANDOM")
				.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
				.setTimestamp();
  
				if(!customSettings)
				{
				  embed.setDescription(`**Congratulations** ${message.author}! You have now leveled up to **level ${level.level}**`);
				  levelUpMsg = `**Congratulations** ${message.author}! You have now leveled up to **level ${level.level}**`;
				} else {
				  function antonymsLevelUp(string) {
					return string
					  .replace(/{member}/i, `${message.member}`)
					  .replace(/{xp}/i, `${level.xp}`)
					  .replace(/{level}/i, `${level.level}`)
				  }
				  embed.setDescription(antonymsLevelUp(customSettings.levelUpMessage.toString()));
				  levelUpMsg = antonymsLevelUp(customSettings.levelUpMessage.toString());
				}
		  // using try catch if bot have perms to send EMBED_LINKS      
		  try {
			if(!channelLevel || channelLevel.channel == "Default")
			{
			  message.channel.send(embed);
			} else {
			  let channel = message.guild.channels.cache.get(channelLevel.channel)
			  const permissionFlags = channel.permissionsFor(message.guild.me);
			  if(!permissionFlags.has("SEND_MESSAGES") || !permissionFlags.has("VIEW_CHANNEL")) return;
			  channel.send(embed);
			}
		  } catch (err) {
			if(!channelLevel || channelLevel.channel == "Default")
			{
			  message.channel.send(levelUpMsg);
			} else {
			  let channel = message.guild.channels.cache.get(channelLevel.channel)
			  const permissionFlags = channel.permissionsFor(message.guild.me);
			  if(!permissionFlags.has("SEND_MESSAGES") || !permissionFlags.has("VIEW_CHANNEL")) return;
			  channel.send(levelUpMsg);
			}
		  }
		};
		bot.setLevel.run(level);
		// add cooldown to user
	  talkedRecently.set(message.author.id, Date.now() + getCooldownfromDB);
	  setTimeout(() => talkedRecently.delete(message.author.id, Date.now() + getCooldownfromDB))    
		}
			  // level up, time to add level roles
			  const member = message.member;
			  let Roles = sql.prepare("SELECT * FROM roles WHERE guildID = ? AND level = ?")
			  
			  let roles = Roles.get(message.guild.id, lvl)
			  if(!roles) return;
			  if(lvl >= roles.level) {
			  if(roles) {
			  if (member.roles.cache.get(roles.roleID)) {
				return;
			  }
				 if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
				   return
				 }
			   member.roles.add(roles.roleID);
			  }}
  })




bot.login(token);