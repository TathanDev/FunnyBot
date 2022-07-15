const { SlashCommandBuilder } = require('@discordjs/builders');
const randomPuppy = require('random-puppy');


const {
    MessageEmbed
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Juste un Meme'),

	async execute(interaction) {

        let reddit = [
            "meme",
            "memes",
            "animemes",
            "MemesOfAnime",
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


        randomPuppy(subreddit).then(async url => {

            const memeEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("MEME")
            .setAuthor({ name: 'TATHAN'})
            .setTimestamp()
            .setImage(url);


            await interaction.reply({ embeds: [memeEmbed]  })
        }).catch(err => console.error(err));


	},
};  