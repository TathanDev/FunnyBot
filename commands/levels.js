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

/** Embeds */
//Level 1


















module.exports = {
	data: new SlashCommandBuilder()
		.setName('level')
		.setDescription('Information about the options provided.')
		.addStringOption(option => 
            option.setName('level')
            .setDescription('Le niveau de votre aventure')
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

        const value = interaction.options.getString('level');



        if (value == "1") {



            if (!bdd["adventure-level"][interaction.member.id] == "1") {

                await interaction.reply({ content:'Vous avez déjà réussi ce niveau ! Vous pouvez commencer le niveau 2', ephemeral: true});
    
    
            } else if (bdd["adventure-level"][interaction.member.id] == "1") { 
    
                const level1row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('level1-forest')
                        .setLabel('Aller dans la fôret')
                        .setEmoji("🌲")
                        .setStyle('PRIMARY'),

                        new MessageButton()
                        .setCustomId('level1-river')
                        .setLabel('Traverser la rivière')
                        .setEmoji("🌊")
                        .setStyle('PRIMARY'),

                        new MessageButton()
                        .setCustomId('level1-success')
                        .setLabel('Rentrer au Vilage')
                        .setEmoji("🏘")
                        .setStyle('PRIMARY'),
                );


            const level1 = new MessageEmbed()
            .setColor("36FF00")
            .setTitle("Niveau 1")
            .setTimestamp()
            .setDescription("Bienvenue jeune Aventurier ! Aujourd'hui, vous aller commncer votre premier niveau sur ce ***MAGNIFIQUE*** (Hum, Hum...) Bot. Considerer ce niveau comme un tuto.\n")
            .addFields(
		        { name: 'Histoire :', value:  "En ce 33 Jefrier 3077, dans un univers complètement différent du nôtre, votre chèvre de compagnie s'échappe. Vous commencer à la poursuivre quand soudain vous la perde de vue et vos arrivée en plein milieu d'une clairière. Vous vous apercevez que la nuit commence à tombée...\n \n"},
		        { name: 'Choix', value: "Trois choix sont possibles.", inline: false },
                { name: '**1**', value: "Chercher votre chêvre dans la forêt. 🌲", inline: true },
		        { name: '**2**', value: "Traverser la rivière pour chercher votre chêvre. 🌊", inline: true },
                { name: '**3**', value: "Rentrer bredouille au village. 🏘", inline: true },


            )




                await interaction.reply({ephemeral: true, embeds: [level1], components: [level1row]});
    
         
                
         
         
         
         }  

            


        }  else if (value == "2") {

            if  (bdd["adventure-level"][interaction.member.id] == "1") {

                await interaction.reply({ content: "Vous devez d'abord faire le niveau 1.", ephemeral: true});

            } else if  (!bdd["adventure-level"][interaction.member.id] == "2") {

                await interaction.reply({ content:'Vous avez déjà réussi ce niveau ! Vous pouvez commencer le niveau 3', ephemeral: true});


            } else {


                const level2row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('level2-forest')
                        .setLabel('Aller dans la fôret')
                        .setEmoji("🌲")
                        .setStyle('PRIMARY'),

                        new MessageButton()
                        .setCustomId('level2-river')
                        .setLabel('Traverser la rivière')
                        .setEmoji("🌊")
                        .setStyle('PRIMARY'),
                );

                const level2 = new MessageEmbed()
                .setColor("36FF00")
                .setTitle("Niveau 2")
                .setTimestamp()
                .setDescription("Le lendemain matin, vous decidez de partir chercher votre chêvre...\nVous prenez un sac avec des gâteaux, une lampe torche et... c'est tout. Vous reprenez alors le même chemin qu'hier et vous avez donc le même dilem que l'autre soir.")
                .addFields(
                    { name: 'Choix', value: "deux choix sont possibles." },
                    { name: '**1**', value: "Chercher votre chêvre dans la forêt. 🌲", inline: true },
                    { name: '**2**', value: "Traverser la rivière pour chercher votre chêvre. 🌊", inline: true },
    
    
                )
    
    
    
    
                    await interaction.reply({ephemeral: true, embeds: [level2], components: [level2row]});
    

            } 
            






    } else {

        await interaction.reply({ephemeral: true, content: "Under Contruct"});

    }

        

}



}
