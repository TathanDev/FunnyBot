const { SlashCommandBuilder } = require('@discordjs/builders');
//const BlaguesAPI = require('blagues-api');
const {
    MessageEmbed
} = require('discord.js');
const mysql = require("mysql")
const config = require("../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lang')
		.setDescription('Choose your language.')
		.addStringOption(option => 
            option.setName('lang')
            .setDescription('Choose your language')
            .setRequired(true)
            .addChoices(
            { name: "English", value: 'en' },
            { name: 'French', value: 'fr' },
        )),


	async execute(interaction) {
        let db = mysql.createConnection({
            host: config.dbAdress,
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbName
        })        
        
        const value = interaction.options.getString("lang")
        const member = interaction.member.id

        db.query(`SELECT * FROM langue WHERE userId = '${member}'`, async (err, req) => {
            
            console.log(req)
            if(req.length < 1){
                db.query(`INSERT INTO langue (userId, lang) VALUES ('${interaction.member.id}', '${value}')`)
            } else {
                db.query(`UPDATE langue SET lang = '${value}'`)
            }

        })

        if (value == "english") {
            interaction.reply({ content: "Your language has been change to **English**", ephemeral: true})
        } else {
            interaction.reply({ content: "Votre langue a été changé en **Français**", ephemeral: true})
        }
    }
}

