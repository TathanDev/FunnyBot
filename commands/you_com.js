
const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');
const axios = require('axios');
const gen = require("images-generator");



module.exports = {
	data: new SlashCommandBuilder()
		.setName('youtube_comment')
		.setDescription('Faux commentaires youtube')
        .addUserOption(option => option.setName('user').setDescription('L"utilisateur à communisé').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription('Le message du commentaire').setRequired(true)),

        /**.addSubcommand(subcommand =>
                    subcommand
                        .setName('tweet')
                        .setDescription('Are you Horny ?')
                        .addUserOption(option => option.setName('user').setDescription('Who is Horny ?').setRequired(true))),
        
        */
	
    async execute(interaction) {


			const user = interaction.options.getUser('user');
            const test = interaction.options.getUser('user');
            const com = interaction.options.getString('message');
             

           const comment = await gen.misc.youtubeComment({avatar: user.displayAvatarURL({ format: 'gif' }), username: user.username, content: com})

            const embed = new MessageEmbed()
            .setTitle(`Youtube Comment`)
            .setImage(comment)
            .setColor("RED")
        
                interaction.reply({ embeds: [embed], ephemeral: true });  

		
	},
};  