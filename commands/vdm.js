
const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');
const fetch = require("node-fetch")
const translate = require('@iamtraction/google-translate');
const mysql = require("mysql")
const config = require("../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vdm')
		.setDescription('Un VDM random'),

    async execute(interaction) {
        let db = mysql.createConnection({
            host: config.dbAdress,
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbName
        })
        const member = interaction.member.id

        db.query(`SELECT * FROM langue WHERE userId = '${member}'`, async (err, req) => {
            
            let userLang = "en"
            if(req.length < 1){
              db.query(`INSERT INTO langue (userId, lang) VALUES ('${member}', 'en')`)
              userLang = "en"
            } else {
              userLang = req[req.length - 1].lang
            }
            fetch('https://blague.xyz/api/vdm/random')
            .then(res => res.json())
            .then(async json => {
                translate(json.vdm.content, {
                    from: 'fr',
                    to: userLang
                  }).then(res => {
                    const embed = new MessageEmbed()
                    .setTitle(`VDM `)
                    .setDescription(res.text)
                    .setColor("RED")
                    interaction.reply({ embeds: [embed], ephemeral: false, fetchReply: true });  
    
                  })
    
            });		
        })
	
	},
};  