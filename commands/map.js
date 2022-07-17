const { SlashCommandBuilder } = require('@discordjs/builders');
const bdd = require('./bdd.json');
const map1 = './img/map1.png' 
const map2 = './img/map2.png'

const {
    MessageEmbed
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('map')
		.setDescription('La map de votre aventure'),

	async execute(interaction) {

        if (bdd["adventure-level"][interaction.member.id] == "1") {


            const mapAventure1 = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("MAP")
            .setAuthor({ name: 'TATHAN'})
            .setTimestamp()
            .setImage("https://cdn.discordapp.com/attachments/998147235365797910/998147345797623819/map1.png?width=960&height=540");
            


            const message =  await interaction.reply({ embeds: [mapAventure1] })
           
            } else if (bdd["adventure-level"][interaction.member.id] == "2") {


                const mapAventure2 = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("MAP")
                .setAuthor({ name: 'TATHAN'})
                .setTimestamp()
                .setImage("https://cdn.discordapp.com/attachments/998147235365797910/998147346351276042/map2.png?width=960&height=540");
    
    
                const message =  await interaction.reply({ embeds: [mapAventure2] })
               
                }

	},
};  