
const { SlashCommandBuilder } = require('@discordjs/builders');
const figlet = require('figlet')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ascii')
		.setDescription('Transforme un texte en ASCII')
        .addStringOption(option => option.setName('message').setDescription('Message à transformer en ASCII').setRequired(true)),
                
        
	
    async execute(interaction) {


        const msg = interaction.options.getString('message')


        figlet.text(msg, function (err, data){
            if(err){
                console.log('Aïe. Parfois sa ne marche pas');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Ecrivez un texte plus petit que 200 charactère. ')
       

            interaction.reply({ content:'```' + data + '```'});  

       
        });


		}
        

        

		

	} 