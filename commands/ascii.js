
const { SlashCommandBuilder } = require('@discordjs/builders');
const figlet = require('figlet')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ascii')
		.setDescription('Transform a text into ASCII')
        .addStringOption(option => option.setName('message').setDescription('Message to transform').setRequired(true)),
                
        
	
    async execute(interaction) {

        const msg = interaction.options.getString('message')


        figlet.text(msg, function (err, data){
            if(err){
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Write a message shorter. ')
       

            interaction.reply({ content:'```' + data + '```'});  

       
        });
		}

	} 