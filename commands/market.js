const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');



const {
    MessageEmbed
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('market')
		.setDescription('[TYCOON] Ouvre le market'),

	async execute(interaction) {


        const MarteauButton = new MessageButton()
        .setCustomId('primary')
        .setLabel('Marteau')
        .setStyle('PRIMARY')
        .setEmoji("🔨")
        .setDisabled(false);

       const PiocheButton = new MessageButton()
        .setCustomId('primary')
        .setLabel('Marteau')
        .setStyle('PRIMARY')
        .setEmoji("🔨");
    

        const market = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Market")
            .setTimestamp()
            .addFields(
		        { name: 'Marteau :', value:  "🔨"},
		        { name: 'Pioche', value: "⛏", inline: false },
	                  )


    await interaction.reply({ephemeral: true, embeds: [market], components: [MarteauButton] });

    


	},
};  