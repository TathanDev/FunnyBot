const { SlashCommandBuilder } = require('@discordjs/builders');
const bdd = require('./bdd.json');
const CoCToken = require('../config.json');
const clashApi = require('clash-of-clans-api');
let client = clashApi({
    token: CoCToken 
  });

const {
    MessageEmbed
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clash-of-clans')
		.setDescription('Obtiens des informations sur CoC')
        .addSubcommand(subcommand =>
            subcommand
                .setName('clan ')
                .setDescription('Cherche un clan avec ton tag (#XXXXX)')
                .addStringOption(option => option.setName('tag').setDescription('Le Clan'))),

	
    async execute(interaction) {

        if (interaction.options.getSubcommand() === 'clan') {
			const clan = interaction.options.getString('tag');

			if (clan) {

                //if(clan.include("#")) {

                    client
                    .clanByTag(clan)
                    .then(response => interaction.reply(`Username: ${user.username}\nID: ${user.id}`)
                    )
                    .catch(err => console.log(err));

               // } else {

                //    await interaction.reply(`Tu as besoins de mettre un tag valide`);

              //  }
			} else {
				await interaction.reply(`Tu as besoins de mettre un tag`);
			}
		}
        
        
        else if (interaction.options.getSubcommand() === 'server') {
			await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
		}
/**
            const mapAventure1 = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("MAP")
            .setAuthor({ name: 'TATHAN'})
            .setTimestamp()
            .setImage("https://media.discordapp.net/attachments/714780801698496522/997505948237176932/aventure_map_1.png?width=960&height=540");

               */ 
	},
};  