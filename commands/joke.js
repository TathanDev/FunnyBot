const { SlashCommandBuilder } = require('@discordjs/builders');
//const BlaguesAPI = require('blagues-api');
const {
    MessageEmbed
} = require('discord.js');


const BlaguesAPI = require('blagues-api');
const blagues = new BlaguesAPI('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI2NDQ5MDEzNDIzNzM0Nzg1IiwibGltaXQiOjEwMCwia2V5IjoiN0pZcWIyTUw1czQwNEhycW92T1d3dGpuS1gzQmNPTk10eFRXTlVDbWk1b3dKcFdRUUQiLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0xMFQxNDoyNzozOSswMDowMCIsImlhdCI6MTY1NzQ2MzI1OX0.lYWNff3gvdAmSks71cNvfkILqYk_piQedRx9iUWlcpw');
const bdd = require('./bdd.json');


 



module.exports = {
	data: new SlashCommandBuilder()
		.setName('blague')
		.setDescription('Information about the options provided.')
		.addStringOption(option => 
            option.setName('categorie')
            .setDescription('La Catégorie de la Blague')
            .setRequired(true)
            .addChoices(
            { name: "Blagues d'Humour Noir", value: 'dark' },
            { name: 'Blagues de Dev', value: 'dev' },
            { name: 'Blgues sur les Blondes', value: 'blonde' },
            { name: 'Blagues Limites', value: 'limit' },
            { name: 'Blagues Beauf', value: 'beauf' },
            { name: 'Blagues Global', value: 'global' },


        )),


	async execute(interaction) {
		
        const value = interaction.options.getString('categorie');

        /** Jokes Types */
        const blagueDark = await blagues.randomCategorized(blagues.categories.DARK);
        const blagueBlonde = await blagues.randomCategorized(blagues.categories.BLONDES);
        const blagueDev = await blagues.randomCategorized(blagues.categories.DEV);
        const blagueBeauf = await blagues.randomCategorized(blagues.categories.BEAUF);
        const blagueLimit = await blagues.randomCategorized(blagues.categories.LIMIT);
        const blagueGlobal = await blagues.randomCategorized(blagues.categories.GLOBAL);






        if (value == "dark") {
            
            const darkEmbed = new MessageEmbed()
	        .setColor("BLACK")
	        .setTitle("Blague d'Humour Noir")
	        .setAuthor({ name: 'Plido'})
	        .addFields(
		        { name: 'Blague :', value:  blagueDark.joke},
		        { name: 'Réponse', value: '||' + blagueDark.answer + '||', inline: false },
	                  )
	        .setTimestamp()

           await interaction.reply({ embeds: [darkEmbed] });


        } else if (value == "dev") {

            const devEmbed = new MessageEmbed()
	        .setColor("BLUE")
	        .setTitle("Blague de Dev")
	        .setAuthor({ name: 'Plido'})
	        .addFields(
		        { name: 'Blague :', value:  blagueDev.joke},
		        { name: 'Réponse', value: '||' + blagueDev.answer + '||', inline: false },
	                  )
	        .setTimestamp()

           await interaction.reply({ embeds: [devEmbed] });


        } else if (value == "blonde") {

            const blondeEmbed = new MessageEmbed()
	        .setColor("YELLOW")
	        .setTitle("Blague sur les Blondes")
	        .setAuthor({ name: 'Plido'})
	        .addFields(
		        { name: 'Blague :', value:  blagueBlonde.joke},
		        { name: 'Réponse', value: '||' + blagueBlonde.answer + '||', inline: false },
	                  )
	        .setTimestamp()

           await interaction.reply({ embeds: [blondeEmbed] });


        } else if (value == "limit") {



            const limitEmbed = new MessageEmbed()
	        .setColor("RED")
	        .setTitle("Blague Limite")
	        .setAuthor({ name: 'Plido'})
	        .addFields(
		        { name: 'Blague :', value:  blagueLimit.joke},
		        { name: 'Réponse', value: '||' + blagueLimit.answer + '||', inline: false },
	                  )
	        .setTimestamp()

           await interaction.reply({ embeds: [limitEmbed] });



        } else if (value == "beauf") {

            const beaufEmbed = new MessageEmbed()
	        .setColor("RED")
	        .setTitle("Blague Limite")
	        .setAuthor({ name: 'Plido'})
	        .addFields(
		        { name: 'Blague :', value:  blagueBeauf.joke},
		        { name: 'Réponse', value: '||' + blagueBeauf.answer + '||', inline: false },
	                  )
	        .setTimestamp()

           await interaction.reply({ embeds: [beaufEmbed] });



        } else if (value == "global")
            {
                const randomGlobal = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Blague Global")
                .setAuthor({ name: 'Plido'})
                .addFields(
                    { name: 'Blague :', value:  blagueGlobal.joke},
                    { name: 'Réponse', value: '||' + blagueGlobal.answer + '||', inline: false },
                          )
                .setTimestamp()
    
               await interaction.reply({ embeds: [randomGlobal] });        
            } else {

                interaction.reply({ content: "Bruh, tu as cassé la matrice", ephemeral: true });        
            }
	},
};