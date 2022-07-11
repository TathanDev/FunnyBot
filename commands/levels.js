const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');


const bdd = require('./bdd.json');


 
/** Functions */
function Savebdd() {
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue.");
    });
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('level')
		.setDescription('Information about the options provided.')
		.addStringOption(option => 
            option.setName('categorie')
            .setDescription('La Catégorie de la Blague')
            .setRequired(true)
            .addChoices(
            { name: "Niveau 1", value: "1" },
            { name: 'Niveau 2', value: "2" },
            { name: 'Niveau 3', value: "3" },
           // { name: 'Niveau 1', value: 'dev' },
           //{ name: 'Niveau 1', value: 'dev' },
            //{ name: 'Niveau 1', value: 'dev' },


        )),


	async execute(interaction) {

        const value = interaction.options.getString('categorie');



        if (value == "1") {

            if (!bdd["adventure-level"][interaction.member.id] == "1") {

                await interaction.reply({ content:'Vous avez déjà réussi ce niveau ! Vous pouvez commencer le niveau 2', ephemeral: true});
    
    
            } else if (bdd["adventure-level"][interaction.member.id] == "1") { 
    
                const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('death-forest')
                        .setLabel('Alle dans la fôret')
                        .setStyle('PRIMARY'),

                        new MessageButton()
                        .setCustomId('death-river')
                        .setLabel('Traverser la rivière')
                        .setStyle('PRIMARY'),

                        new MessageButton()
                        .setCustomId('success')
                        .setLabel('Rentrer au Vilage')
                        .setStyle('PRIMARY'),
                );




                await interaction.reply({ content: "TESt", ephemeral: true, components: [row]});
    
         
                
         
         
         
         }  else if (!bdd["adventure-level"][interaction.member.id] == "2") {

        
            await interaction.reply({ content: "TESt", ephemeral: true, components: [row]});


            


        } 
        

    }

        

}



}
