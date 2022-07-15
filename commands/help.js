const { SlashCommandBuilder } = require('@discordjs/builders');


const {
    MessageEmbed
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription("Un peu d'aide ?")
        .addStringOption(option => 
            option.setName('categorie')
            .setDescription('La Catégorie des commandes')
            .setRequired(true)
            .addChoices(
            { name: "Fun", value: 'joke' },
            { name: 'Aventure', value: 'aventure' },
           // { name: 'Blgues sur les Blondes', value: 'blonde' },
            )),

	async execute(interaction) {

        const value = interaction.options.getString('categorie');

        if (value == "joke") {

            let helpEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("HELP FUN")
            .setDescription("Les differentes commandes pour la catégorie Fun")
            .setTimestamp()
            .addFields(
                { name:"/blague +  type de blague", value:"Génère une blague random avec le type demandé" },
                { name:"/meme", value:"Génère un meme", inline: false }

            )

            await interaction.reply({ embeds: [helpEmbed], ephemeral: true  })


            } else if (value == "aventure") {

                let helpEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Help AVENTURE")
                .setDescription("Les differentes commandes pour la catégorie Aventure")
                .setTimestamp()
                .addFields(
                    { name:"/start", value:"Permet de commencer votre aventure" },
                    { name:"/level + level", value:"Permet de commencer le level demander", inline: false },
                    { name:"/coins", value:"Permet de voir ton nombre de coins/tathanbucks/T-Bucks/etc...", inline: false }

    
                )
    
                await interaction.reply({ embeds: [helpEmbed], ephemeral: true  })
    

            }


	},
};  