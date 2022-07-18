
const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');
const imdb = require("imdb-api");
const translate = require('@iamtraction/google-translate');
const omdbKey = require("../config.json")



module.exports = {
	data: new SlashCommandBuilder()
		.setName('imdb')
		.setDescription('Te donne des des infos sur le film/serie demandé')
        .addStringOption(option => option.setName('recherche').setDescription('Le Film/Serie à trouvé').setRequired(true)),

        
	
    async execute(interaction) {


			const film = interaction.options.getString('recherche');
             

            const imob = new imdb.Client({
                apiKey: "a5119fd7"
              });
          
              let movie = await imob.get({
                name: film
              });

                let movieTitle = movie.title
                let poster = movie.poster
                let plot = movie.plot
                let country = movie.country
                let lang = movie.languages
                let type = movie.type
                let genre = movie.genres
                let score = movie.metascore


              translate(plot, {
                from: 'en',
                to: 'fr'
              }).then(res => {

                const embed = new MessageEmbed()
                  .setTitle(`${movieTitle}`)
                  .setColor("YELLOW")
                  .setThumbnail(`${poster}`)
                 .setFooter(`Notes en tout: ` + score +"/100 ")
                  .addFields(
                    { name: '__**Description:**__', value:  res.text},
                    { name: '__**Pays:**__ ', value: country, inline: false },
                    { name: '__**Langues:**__ ', value: lang, inline: false },
                    { name: '__**Pays:**__ ', value: country, inline: false },
                    { name: '__**Type:**__ ', value: type, inline: false },
                    { name: '__**Genre:**__ ', value: genre, inline: false },



                          )                
                          interaction.reply({
                  embeds: [embed]
                });
              }).catch(err => {
                interaction.reply(`Une erreur est survenue ${err}`)
              });
          
            
          
		
	},
};  