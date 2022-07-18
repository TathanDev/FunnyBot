
const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');
const gen = require("images-generator");

//** Work In Progress */
module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme_maker')
		.setDescription('Créer des Memes ')
        .addSubcommand(subcommand =>
            subcommand
                .setName('drake')
                .setDescription('Créer un Drake meme')
                .addStringOption(option => option.setName('text1').setDescription('Texte 1').setRequired(true))
                .addStringOption(option => option.setName('text2').setDescription('Texte 2').setRequired(true)))
        .addSubcommand(subcommand =>
                    subcommand
                        .setName('winnie')
                        .setDescription('Créer le même de Winnie L"ourson ')
                        .addStringOption(option => option.setName('text1').setDescription('Texte 1').setRequired(true))
                        .addStringOption(option => option.setName('text2').setDescription('Texte 2').setRequired(true))),
                
	
    async execute(interaction) {

        if (interaction.options.getSubcommand() === 'drake') {

            const text1 = interaction.options.getString('text1')
            const text2 = interaction.options.getString('text2')


            const drakememe = `https://api.popcat.xyz/drake?text1=${text1}&text2=${text2}`

            const embed = new MessageEmbed()
            .setTitle(`Drake meme`)
            .setImage(drakememe)
            .setColor("ORANGE")
        
                interaction.reply({ embeds: [embed], ephemeral: false });  

		}
        
        
        else if (interaction.options.getSubcommand() === 'winnie') {

            const text1 = interaction.options.getString('text1')
            const text2 = interaction.options.getString('text2')

            const poohmeme = await gen.misc.pooh({text1: text1, text2: text2})

            const embed = new MessageEmbed()
            .setTitle(`Winnie L'ourson Meme`)
            .setImage(poohmeme)
            .setColor("RED")

        
                interaction.reply({ embeds: [embed], ephemeral: true });  

		} 

		

	},
};  