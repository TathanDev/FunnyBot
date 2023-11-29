
const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');
const imdb = require("imdb-api");
const translate = require('@iamtraction/google-translate');
const mysql = require("mysql")
const config = require("../config.json")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('imdb')
		.setDescription('Give you infos about a show')
        .addStringOption(option => option.setName('movie').setDescription('The Film/Movie ').setRequired(true)),

        
	
    async execute(interaction) {
      let db = mysql.createConnection({
        host: config.dbAdress,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbName
    })        
			const film = interaction.options.getString('movie');

            const imob = new imdb.Client({
                apiKey: "a5119fd7"
              });
          
              let movie = await imob.get({
                name: film
              }).catch(err => {
                interaction.reply({content:"The movie **" + film + "** is unvaible", ephemeral: true})
              });

                let movieTitle = movie.title
                let poster = movie.poster
                let plot = movie.plot
                let country = movie.country
                let lang = movie.languages
                let type = movie.type
                let genre = movie.genres
                let score = movie.metascore

                const member = interaction.member.id

              db.query(`SELECT * FROM langue WHERE userId = '${member}'`, async (err, req) => {

                let userLang = "en"
                if(req.length < 1){
                  db.query(`INSERT INTO langue (userId, lang) VALUES ('${member}', 'en')`)
                  userLang = "en"
                } else {
                  userLang = req[0].lang
                }

                translate(plot, {
                  from: 'en',
                  to: userLang
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
  
            })             
	},
};  