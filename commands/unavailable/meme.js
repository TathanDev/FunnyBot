const { SlashCommandBuilder } = require('@discordjs/builders');
const randomPuppy = require('random-puppy');


const {
    MessageEmbed
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Juste un xMeme'),

	async execute(interaction) {

        let reddit = [
            "meme",
            "memes",
            "animemes",
           // "MemesOfAnime",
           // "animememes",
           // "AnimeFunny",
            "dankmemes",
            "dankmeme",
           // "wholesomememes",
           // "MemeEconomy",
           // "techsupportanimals",
            //"meirl",
            //"me_irl",
           // "2meirl4meirl",
          //  "AdviceAnimals",
            "ProgrammerHumor"
        ]

        let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
        console.log(subreddit)

        randomPuppy(subreddit).then(async url => {
            console.log(url)
            const memeEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("MEME")
            .setAuthor({ name: 'TATHAN'})
            .setTimestamp()
            .setImage(url)
            .setFooter("Meme de " + subreddit)


            const message =  await interaction.reply({ embeds: [memeEmbed],
                // fetchReply: true  
             })
           // message.react('🤣');
        }).catch(err => console.error(err));


	},
};  