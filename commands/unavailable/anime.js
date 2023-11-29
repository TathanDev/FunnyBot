const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');
const neko = require('nekos-fun')



module.exports = {
	data: new SlashCommandBuilder()
		.setName('anime')
		.setDescription('Des images d"anime.')
		.addIntegerOption(option => 
            option.setName('nsfw')
            .setDescription('Catégorie de l"image')
            .setRequired(true)
            .addChoices(
            { name: 'Seins', value: 0 },
            { name: 'Hentai', value: 1 },
            { name: 'Lesbian', value: 2 },
        )),


	async execute(interaction) {
		
        const value = interaction.options.getInteger('nsfw');

        const embed = new MessageEmbed()
                .setColor("RED")
                .setDescription("NSFW")
        if (value == 0){
            embed.setImage(`${await neko.nsfw.boobs()}`)
        } else if (value == 1){
            embed.setImage(`${await neko.nsfw.hentai()}`)
        } else if(value == 2) {
            embed.setImage(`${await neko.nsfw.lesbian()}`)
        }
        interaction.reply({ embeds: [embed], ephemeral: !interaction.channel.nsfw})
            
	},
};