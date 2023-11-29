const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');
const axios = require('axios');
const animals = require('random-animals-api'); 



module.exports = {
	data: new SlashCommandBuilder()
		.setName('animaux')
		.setDescription('Des photos d"animaux.')
		.addStringOption(option => 
            option.setName('animal')
            .setDescription('L"animal voulu')
            .setRequired(true)
            .addChoices(
            { name: 'Chat', value: 'cat' },
            { name: 'Renard', value: 'fox' },
            { name: 'Chiens', value: 'dog' },
            { name: 'Panda', value: 'panda' },
            { name: 'Panda Roux', value: 'red_panda' },
            { name: 'Oiseau', value: 'bird' },
            { name: 'Pikachu', value: 'pikachu' },


        )),


	async execute(interaction) {
		
        const value = interaction.options.getString('animal');

        let animal;
        let animalEmoji;
        let color = "GREEN";


        switch (value) {
            case 'cat':
             animal = "Chat";
             animalEmoji = "😸";
             color = "ORANGE";
              break;
            case 'fox':
              animal = "Renard";
              animalEmoji = "🦊";
              color = "ORANGE";
                break;
            case 'dog':
                animal = "Chien";
                animalEmoji = "🐶";
                color = "BROWN";
                  break; 
            case 'panda':
                    animal = "Panda";
                    animalEmoji = "🐼"
                    color = "WHITE"
                break; 
            case 'red_panda':
                    animal = "Panda Roux";
                    color = "ORANGE";
                    animalEmoji = "🐼";
                break; 
            case 'bird':
                    animal = "Oiseau";
                    animalEmoji = "🐦";
                    color = "RED";
            case 'pikachu':
                    animal = "Pikachuuuuu";
                    animalEmoji = ":zap:";
                    color = "YELLOW";             
          }
          

        const url = "https://some-random-api.ml/img/" + value;
        animals.cat()
        .then(url => console.log(url))
        .catch((error) => console.error(error));

        let image, response;
        try {
            response = await axios.get(url);
            image = response.data;

        } catch (error) {
            return interaction.reply({ content: "Un petit problème c'est passé... Je te conseille de recommencer", ephemeral: true });        
        }

        const embed = new MessageEmbed()
            .setTitle(`Voici un petit ${animal} ${animalEmoji} `)
            .setColor(color)
            .setImage(image.link)
        
      const message = await interaction.reply({ embeds: [embed], ephemeral: true });
            
	},
};