
const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');




module.exports = {
	data: new SlashCommandBuilder()
		.setName('skin')
		.setDescription('Search the skin of the player')
        .addStringOption(option => option.setName('player').setDescription('Skin of the player').setRequired(true)),

    async execute(interaction) {

			const player = interaction.options.getString('player');
             
            const embed = new MessageEmbed()
            .setTitle(`Skin of ` + player)
            .setImage("https://minotar.net/armor/body/" + player + "/100.png")
            .setThumbnail("https://minotar.net/helm/" + player + "/100.png")
            .setColor("GREEN")
        
            const message = await interaction.reply({ embeds: [embed], ephemeral: false, fetchReply: true });  
            //message.react("✈️")
		
	},
};  