
const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');
const axios = require('axios');
const gen = require("images-generator");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('canvas')
		.setDescription('Manipule des images :)')
        .addSubcommand(subcommand =>
            subcommand
                .setName('comrade')
                .setDescription('Toi rejoindre grande URSS')
                .addUserOption(option => option.setName('user').setDescription('L"utilisateur à communisé').setRequired(true)))
        .addSubcommand(subcommand =>
                    subcommand
                        .setName('horny')
                        .setDescription('Are you Horny ?')
                        .addUserOption(option => option.setName('user').setDescription('Who is Horny ?').setRequired(true)))
        .addSubcommand(subcommand =>
                            subcommand
                                .setName('simp')
                                .setDescription('Te Créer une Simp Carte')
                                .addUserOption(option => option.setName('user').setDescription('Rejoins le Simp Club').setRequired(true)))
        .addSubcommand(subcommand =>
                            subcommand
                                .setName('iphone_alert')
                                .setDescription('Alerte !!')
                                .addStringOption(option => option.setName('content').setDescription('Quelle est cette alerte ?').setRequired(true)))
        
         .addSubcommand(subcommand =>
                                    subcommand
                                        .setName('pixelate')
                                        .setDescription('Pixelise ton avatar')
                                        .addUserOption(option => option.setName('user').setDescription('La personne à pixelisé').setRequired(true))),
        
        
	
    async execute(interaction) {

        if (interaction.options.getSubcommand() === 'comrade') {
			const user = interaction.options.getUser('user');

            const url = "https://some-random-api.ml/canvas/comrade?avatar=" + user.displayAvatarURL({ format: 'gif' });

            const embed = new MessageEmbed()
            .setTitle(`<:communiste:998162981881921587>`)
            .setImage(url)
            .setColor("RED")
        
                interaction.reply({ embeds: [embed]});  

		}
        
        
        else if (interaction.options.getSubcommand() === 'horny') {
			const user = interaction.options.getUser('user');

            const url = "https://some-random-api.ml/canvas/horny?avatar=" + user.displayAvatarURL({ format: 'gif' });

            const embed = new MessageEmbed()
            .setTitle(`So Hot 🔥`)
            .setImage(url)
            .setColor("RED")

        
                interaction.reply({ embeds: [embed]});  

		} else if (interaction.options.getSubcommand() === 'simp') {

			const user = interaction.options.getUser('user');

            const url = "https://some-random-api.ml/canvas/simpcard?avatar=" + user.displayAvatarURL({ format: 'gif' });

            const embed = new MessageEmbed()
            .setTitle(`Le SIMP club recrute !`)
            .setImage(url)
            .setColor("PURPLE")
            .setFooter(`${user} a rejoins le SIMP Club !`)

            interaction.reply({ embeds: [embed]});  


        }else if (interaction.options.getSubcommand() === 'pixelate') {

			const user = interaction.options.getUser('user');

            const url = "https://some-random-api.ml/canvas/pixelate?avatar=" + user.displayAvatarURL({ format: 'gif' });

            const embed = new MessageEmbed()
            .setTitle(`Pixel `)
            .setImage(url)
            .setColor("PURPLE")

            interaction.reply({ embeds: [embed], ephemeral: true });  

        } else if (interaction.options.getSubcommand() === 'iphone_alert') {

			const msg = interaction.options.getString('content');

            const url = await gen.misc.iphoneAlert({content: msg})


            const embed = new MessageEmbed()
            .setTitle(`Alerte ! `)
            .setImage(url)
            .setColor("WHITE")

            interaction.reply({ embeds: [embed] });  
        }

		

	},
};  