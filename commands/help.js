const { SlashCommandBuilder } = require('@discordjs/builders');


const {
    MessageEmbed
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription("Un peu d'aide ?")
        .addStringOption(option => 
            option.setName('categories')
            .setDescription('La Catégorie des commandes')
            .setRequired(true)
            .addChoices(
            { name: "Fun", value: 'joke' },
            { name: 'Infos', value: 'infos' },
           // { name: 'Blgues sur les Blondes', value: 'blonde' },
            )),

	async execute(interaction) {

        const value = interaction.options.getString('categories');

        if (value == "joke") {

            let helpEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("HELP FUN")
            .setDescription("Les differentes commandes pour la catégorie Fun")
            .setTimestamp()
            .addFields(
                { name:"/blague +  type de blague", value:"Génère une blague random avec le type demandé" },
                { name:"/vdm", value:"Génére un VDM random", inline: false }

            )

            await interaction.reply({ embeds: [helpEmbed], ephemeral: true  })


        } else if (value == "infos") {

            let helpEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Infos")
            .setDescription("Les differentes commandes pour la catégorie Infos")
            .setTimestamp()
            .addFields(
                { name:"/imdb", value:"Permet d'avoir des informations sur un film\n**Example** : `/imdb Titanic`" },
                { name:"/skin", value:"Permet d'avoir le skin d'un joueur minecraft\n**Example** : `/skin TATHAN_06`", inline: false }    
            )
    
            await interaction.reply({ embeds: [helpEmbed], ephemeral: true  })
    

        }


	},
};  