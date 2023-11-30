const { SlashCommandBuilder } = require('@discordjs/builders');
const randomPuppy = require('random-puppy');


const {
    MessageEmbed
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Give you a random meme'),

	async execute(interaction) {
        
        await fetch(`https://www.reddit.com/r/memes/random/.json`).then(async r => {
            let meme = await r.json();
            let title = meme[0].data.children[0].data.title
            let image = meme[0].data.children[0].data.url
            let author = meme[0].data.children[0].data.author

            const memeEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(title)
            .setAuthor({ name: 'TATHAN'})
            .setTimestamp()
            .setImage(image)
            .setFooter("posted by " + author)


            const message =  await interaction.reply({ embeds: [memeEmbed],
                fetchReply: true  
            })
           message.react('🤣');

        })
	},
};  