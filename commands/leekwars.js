const LeekApi = require('leek-api')('123456789');
const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');

 




module.exports = {
	data: new SlashCommandBuilder()
	.setName('leekwars')
	.setDescription('Des informations')
	.addStringOption(option => option.setName("login").setDescription("Nom d'éleveur ou email"))
    .addStringOption(option => option.setName('mdp').setDescription('Ton mot de passe (Aucune infos est stocké')),


	async execute(interaction) {

        const login = interaction.options.getString('login');
        const mdp = interaction.options.getString('mdp');


LeekApi.Farmer.login(login, mdp, function(error, response){
    if (err) throw new Error(err);
    console.log(response);
});


        const darkEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Informations du compte leek wars de " + login)
        .setAuthor({ name: 'Plido'})
        .addFields(
            { name: 'Blague :', value:  "Yes"},
            //{ name: 'Réponse', value: '||' + blagueDark.answer + '||', inline: false },
                )
        .setTimestamp()

        await interaction.reply({ embeds: [darkEmbed] });



    }
}