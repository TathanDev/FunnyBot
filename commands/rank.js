const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    MessageEmbed,
    Intents
} = require('discord.js');

const { createCanvas, loadImage } = require("canvas");
const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./mainDB.sqlite')
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS] });
const { join } = require("path")
 




module.exports = {
	data: new SlashCommandBuilder()
	.setName('rank')
	.setDescription('Des informations')
    .addStringOption(option => option.setName('user').setDescription('Ton mot de passe (Aucune infos est stocké').setRequired(true)),


	async execute(interaction) {


        
        client.getScore = sql.prepare("SELECT * FROM levels WHERE user = ? AND guild = ?");
        client.setScore = sql.prepare("INSERT OR REPLACE INTO levels (id, user, guild, xp, level, totalXP) VALUES (@id, @user, @guild, @xp, @level, @totalXP);");
        const top10 = sql.prepare("SELECT * FROM levels WHERE guild = ? ORDER BY totalXP").all(interaction.guild.id);
 let score = client.getScore.get(interaction.user.id, interaction.guild.id);
 if (!score) {
  return interaction.reply(`This user does not have an xp yet!`)
 }

        let card = sql.prepare("SELECT * FROM rankCardTable WHERE user = ? AND guild = ?");
  if (!card.get(interaction.user.id, interaction.guild.id))
  {            
    sql.prepare("INSERT OR REPLACE INTO rankCardTable (id, user, guild, textColor, barColor, backgroundColor) VALUES (?, ?, ?, ?, ?, ?);").run(`${user.id}-${message.guild.id}`, user.id, message.guild.id, "#beb1b1", "#838383", "#36393f");
  }

  let rankCard = card.get(interaction.user.id, interaction.guild.id);

const levelInfo = score.level
const nextXP = levelInfo * 2 * 250 + 250
const xpInfo = score.xp;
const totalXP = score.totalXP
let rank = top10.sort((a, b) => {
  return b.totalXP - a.totalXP
});
let ranking = rank.map(x => x.totalXP).indexOf(totalXP) + 1
if(!interaction.guild.me.hasPermission("ATTACH_FILES")) return interaction.reply(`**Missing Permission**: ATTACH_FILES or MESSAGE ATTACHMENTS`);
 
const canvas = createCanvas(1000, 333)
    const ctx = canvas.getContext("2d");
    const background = await loadImage(join(__dirname, "..", "img", "wallpaper.png"));
    ctx.fillStyle = rankCard.backgroundColor
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#A3A3A3"
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#000000"
    ctx.fillRect(180, 216, 775, 65);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeRect(180, 216, 775, 65);
    ctx.stroke();

    ctx.fillStyle = rankCard.barColor;
    ctx.globalAlpha = 0.6;
    ctx.fillRect(200, 216, ((100 / (score.level * 2 * 250 + 250)) * score.xp) * 7.5, 65);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.font = '30px sans-serif';
    ctx.textAlign = "center";
    ctx.fillStyle = rankCard.textColor;
    ctx.fillText(`${xpInfo} / ${nextXP} XP`, 600, 260);

   ctx.font = '35px sans-serif';
    ctx.textAlign = "left";
    ctx.fillText(user.user.tag, 325, 125);

    ctx.font = '40px sans-serif';
    ctx.fillText("Level: ", 350, 170);
    ctx.fillText(levelInfo, 500, 170);

    ctx.font = '40px sans-serif';
    ctx.fillText("Rank: ", 700, 170);
    ctx.fillText(ranking, 830, 170);

    ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "WHITE"
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    const avatar = await loadImage(user.user.displayAvatarURL({ format: "jpg" }));
    ctx.drawImage(avatar, 40, 40, 250, 250);

    const attachments = new Discord.MessageAttachment(canvas.toBuffer(), "rank.png");
    interaction.reply({files: [attachments]});
    }
}
