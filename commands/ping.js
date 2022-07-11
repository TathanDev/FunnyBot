const { SlashCommandBuilder } = require('@discordjs/builders');
//const BlaguesAPI = require('blagues-api');
const {
    MessageEmbed
} = require('discord.js');

const BlaguesAPI = require('blagues-api');



const blagues = new BlaguesAPI('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI2NDQ5MDEzNDIzNzM0Nzg1IiwibGltaXQiOjEwMCwia2V5IjoiN0pZcWIyTUw1czQwNEhycW92T1d3dGpuS1gzQmNPTk10eFRXTlVDbWk1b3dKcFdRUUQiLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0xMFQxNDoyNzozOSswMDowMCIsImlhdCI6MTY1NzQ2MzI1OX0.lYWNff3gvdAmSks71cNvfkILqYk_piQedRx9iUWlcpw');

 



module.exports = {
	data: new SlashCommandBuilder()
		.setName('blague')
		.setDescription('Information about the options provided.')
		.addStringOption(option => 
            option.setName('categorie')
            .setDescription('La Catégorie de la Blague')
            .setRequired(true)
            .addChoices(
            { name: 'Dark', value: 'dark' },
            { name: 'Meme', value: 'gif_meme' },
            { name: 'Movie', value: 'gif_movie' },
        )),
	async execute(interaction) {
		const value = interaction.options.getString('categorie');
		
        
        
        if (value == "dark") {
            
        

            return interaction.reply(blagues.randomCategorized(blagues.categories.DEV));
            
        } else {
		return interaction.reply('No option was provided!');
        }
	},
};z