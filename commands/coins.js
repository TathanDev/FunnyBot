const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const bdd = require('./bdd.json');




const {
    MessageEmbed
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coins')
		.setDescription('Ton nombre de coins'),

	async execute(interaction) {


        

        const coins = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Coins")
            .setTimestamp()
            .addFields(
		        { name: 'Tu as ', value:  `**${bdd["coins-user"][interaction.member.id]}**`},
            )

    await interaction.reply({ephemeral: true, embeds: [coins]});

    


	},
};  