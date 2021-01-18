/*

        📌 Clown Zerrown

        Seja bem-vindo(a), ao codigo fonte do Clown Zerrown
        caso modifique ou utilize algo a baixo mantenha os creditos
        dos criadores. Obrigado(a)

        📌 Comandos
        
        **.limpar** (Limpar mensagens)
        **.clown** (Ver sobre o nosso bot clown)

        📌 ***Comandos*** SAMP
        **.skin** (Ver skins do samp)
        **.veh** (Ver veiculos do samp)
        **.obj** (Caçar objetos do samp)
        **.ip** (Mudar o ip do status)
        **.server** (Ver status de servidores)


        [🤡] Clown Zerrown © copyright
*/

//Main
const config = require("./config.json");
const Discord = require("discord.js");
const bot = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"] // Partials
});

//random mensagen's
const { random } = require('lodash')

//Banco de dados
//...

//Status de servidores samp
var query = require('samp-query')
var dgram = require('dgram')
var hostname = require('string')

var options =
{
    host: "5.9.8.124", //Los Hermanos
    port: "18120"
}

query(options, function (error, response) {
    if(error)
        console.log(error)
    else 
        console.log(response)
})

bot.on("message", message => {
    
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();  

    if (command === "ip" || command === "server") {
        var self = this
        if (!args[0]) return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Indique o **IP** que será utilizado.`)
        .setColor("RED"))

        if (!args[1]) return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Indique o **Port** que será utilizado.`)
        .setColor("RED"))

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            return message.reply("Eu não tenho permissão para deletar essa mensagem.").then(m => m.delete(5000));
        }
        
        query(args[0], function(error, response)
        {
            var result = require('string')
            options.host = args[0]
            options.port = args[1]

            if(error) console.log(error)
            else console.log(response), console.log('atualizado')  //n aparece mais funfa :)     

            result = `${options.host}:${options.port}`
            message.channel.send(new Discord.MessageEmbed()
            .setDescription(`**IP** Foi mudado para **${result}**\n\
            Para mais informações: use o comando **.status**\
            `)
            .setColor("#0099ff")) 

            /*const sqlite = db.run(
                `UPDATE Server SET IP = ${args[0]} WHERE Post = ${args[1]}`
            )*/

        });
    }
    if (command === "") {
        message.reply('Comando invalido USE: **.cmds**. Está mensagem será apagada apos 20 segundos.')
        .then(msg => {
                      msg.delete({timeout: 20000});
                  })
        .catch();
    }
    if (command === "limpar") {
        //if (!args[0]) return message.channel.send(new Discord.MessageEmbed()
        //.setDescription(`Indique a quantidade de **Mensagens** que será apagada's.`)
        //.setColor("RED"))

        if (isNaN(args[0]) || (args[0]) <= 0) {
            return message.reply("Você precisa falar um número de 1 a 100").then(m => m.delete(5000));
        }

        if (!args[1]) return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Indique o motivo de **Mensagens** serem apagadas.`)
        .setColor("RED"))
        
        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            return message.reply("Eu não tenho permissão para deletar essa mensagem.").then(m => m.delete(5000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
        //.then(deleted => message.channel.send(`Clown deletou \`${deleted.size}\` mensagens.`))
        .catch(err => message.reply(`Algo deu errado... ${err}`));

        const embed = new Discord.MessageEmbed()        
        .setTitle(`📊 Excluição de Mensagens por um **ADMIN**`)
        .setDescription(`\
        
        \n📌 ***Status***\n
        📚 **Mensagens Apagadas:** ${deleteAmount}
        📚 **Motivo das Mensagens serem Apagadas:** ${args[1]}
        \
        `)
        .setFooter('🤡 Clown Zerrown © copyright.')
        .setColor('#0099ff')
        message.channel.send(embed)        
    }   

    if (command === "teste") {
        const Discord = require('discord.js');

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Clown Zerrown')
            .setDescription(`\
            📌 ***Comandos***\n\
            **.limpar** (Limpar mensagens)
            **.ip** (Mudar o ip do status)
            **.server** (Ver status de servidores)
            **.clown** (Ver sobre o nosso bot clown`)
            .setFooter(`Equipe Clown's`, 'https://i.imgur.com/HuolKEE.jpg');

        message.user.send(exampleEmbed)  
    }

    if (command === "cmds") {
        const Discord = require('discord.js');

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Clown Zerrown')
            .setDescription(`\
            📌 ***Comandos*** Gerais\n\
            **.limpar** (Limpar mensagens)
            **.clown** (Ver sobre o nosso bot clown)\n\n\

            📌 ***Comandos*** SAMP\            
            **.skin** (Ver skins do samp)
            **.veh** (Ver veiculos do samp)
            **.obj** (Caçar objetos do samp)
            **.ip** (Mudar o ip do status)
            **.server** (Ver status de servidores)\
            `)
            .setFooter(`Equipe Clown's`, 'https://i.imgur.com/HuolKEE.jpg');

        message.channel.send(exampleEmbed)       
    }   

    if (command === "skin" || command === "s") {
        const Discord = require('discord.js');
        //if(!args[0]) return message.channel.send(new Discord.MessageEmbed() 
        //.setDescription('Indique o nome da **Skin** que será amostrado.')

        //if(!string)return callback.apply(options, [ 'Busca invalida' ])
        
        if(args[0] >= 0 && args[0] <= 311)
        {
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Resultado da busca:')
            .setURL('https://assets.open.mp/assets/images/skins')
            .setAuthor('Leonsx', 'https://avatars1.githubusercontent.com/u/71391688?s=460&u=fad0c61eadd9439f4407d5b36a48ede507d43c20&v=4', 'https://github.com/leon-sx')
            .setDescription(`Skin ${args[0]}`)
            .setThumbnail(`https://assets.open.mp/assets/images/skins/${args[0]}.png`)
            .addFields(                
                { name: `📌 ***Resultado da busca retirado do Open.mp***`, value: 'Para mais informações, USE: .clown.'}
            )
            //.setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter(`Equipe Clown's`, 'https://i.imgur.com/HuolKEE.jpg');

            message.channel.send(exampleEmbed)
        }else message.channel.send('USE: **.skin [0 - 311]**')
    }
    if (command === "veiculo" || command === "veh") {
        const Discord = require('discord.js');

        if(args[0] >= 400 && args[0] <= 611)
        {
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Resultado da busca:')
            .setURL('https://open.mp/docs/scripting/resources/vehicleid')
            .setAuthor('Leonsx', 'https://avatars1.githubusercontent.com/u/71391688?s=460&u=fad0c61eadd9439f4407d5b36a48ede507d43c20&v=4', 'https://github.com/leon-sx')
            .setDescription(`Veiculo ${args[0]}`)
            .setThumbnail(`https://assets.open.mp/assets/images/vehiclePictures/Vehicle_${args[0]}.jpg`)
            .addFields(                
                { name: `📌 ***Resultado da busca retirado do Open.mp***`, value: 'Para mais informações, USE: .clown.'}
            )
            //.setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter(`Equipe Clown's`, 'https://i.imgur.com/HuolKEE.jpg');

            message.channel.send(exampleEmbed)
        }else message.channel.send('USE: **.veh(veiculo) [400 - 611]**')
    }
    if (command === "object" || command === "obj") {
        const Discord = require('discord.js');

        if(args[0])
        {
            var comandos = require('string')
            comandos = 
                "\
                **.obj** [wall/paredes]\n\
                **.obj** [eggs/ovos]\n\
                **.obj** [door/porta]\n\
                **.obj** [Graffiti/Grafite]\n\
                **.obj** [Gate/Portao]\n\
                **Lembre-se que letras minusculas são diferentes de letras maiusculas.**\n\
                ";
            
            if(!args[0])message.channel.send(`USE:\n${comandos}`)   

            if(args[0] == 'wall' || args[0] == 'walls' || args[0] == 'paredes')
            {
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Resultado da busca:')
                .setURL(`https://dev.prineside.com/en/gtasa_samp_model_id/tag/97-wall/`)
                .setAuthor('Leonsx', 'https://avatars1.githubusercontent.com/u/71391688?s=460&u=fad0c61eadd9439f4407d5b36a48ede507d43c20&v=4', 'https://github.com/leon-sx')
                .setDescription(
                    `Temos objetos pre-definidos\n\
                    ${comandos}
                    `)
                .setThumbnail(`https://files.prineside.com/gtasa_samp_model_id/white/19366_w_s.jpg`)
                .addFields(                
                    { name: `📌 ***Resultado da busca retirado do DEV.PRINESIDE***`, value: 'Para mais informações, USE: .clown.'}
                )
                //.setImage('https://i.imgur.com/wSTFkRM.png')
                .setTimestamp()
                .setFooter(`Equipe Clown's`, 'https://i.imgur.com/HuolKEE.jpg');

                message.channel.send(exampleEmbed)
            }
            else if(args[0] == 'eggs' || args[0] == 'ovos')
            {
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Resultado da busca:')
                .setURL(`https://dev.prineside.com/en/gtasa_samp_model_id/tag/230-eggs/`)
                .setAuthor('Leonsx', 'https://avatars1.githubusercontent.com/u/71391688?s=460&u=fad0c61eadd9439f4407d5b36a48ede507d43c20&v=4', 'https://github.com/leon-sx')
                .setDescription(
                    `Temos objetos pre-definidos\n\
                    ${comandos}
                    `)
                .setThumbnail(`https://files.prineside.com/gtasa_samp_model_id/white/19343_w_s.jpg`)
                .addFields(                
                    { name: `📌 ***Resultado da busca retirado do DEV.PRINESIDE***`, value: 'Para mais informações, USE: .clown.'}
                )
                //.setImage('https://i.imgur.com/wSTFkRM.png')
                .setTimestamp()
                .setFooter(`Equipe Clown's`, 'https://i.imgur.com/HuolKEE.jpg');

                message.channel.send(exampleEmbed)
            }
            else if(args[0] == 'door' || args[0] == 'porta' || args[0] == 'portas')
            {
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Resultado da busca:')
                .setURL(`https://dev.prineside.com/en/gtasa_samp_model_id/tag/72-door/`)
                .setAuthor('Leonsx', 'https://avatars1.githubusercontent.com/u/71391688?s=460&u=fad0c61eadd9439f4407d5b36a48ede507d43c20&v=4', 'https://github.com/leon-sx')
                .setDescription(
                    `Temos objetos pre-definidos\n\
                    ${comandos}
                    `)
                .setThumbnail(`https://files.prineside.com/gtasa_samp_model_id/white/1492_w.jpg`)
                .addFields(                
                    { name: `📌 ***Resultado da busca retirado do DEV.PRINESIDE***`, value: 'Para mais informações, USE: .clown.'}
                )
                //.setImage('https://i.imgur.com/wSTFkRM.png')
                .setTimestamp()
                .setFooter(`Equipe Clown's`, 'https://i.imgur.com/HuolKEE.jpg');

                message.channel.send(exampleEmbed)
            }
            else if(args[0] == 'Graffiti' || args[0] == 'Grafite' || args[0] == 'Pixação')
            {
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Resultado da busca:')
                .setURL(`https://dev.prineside.com/en/gtasa_samp_model_id/tag/18-graffiti/`)
                .setAuthor('Leonsx', 'https://avatars1.githubusercontent.com/u/71391688?s=460&u=fad0c61eadd9439f4407d5b36a48ede507d43c20&v=4', 'https://github.com/leon-sx')
                .setDescription(
                    `Temos objetos pre-definidos\n\
                    ${comandos}
                    `)
                .setThumbnail(`https://files.prineside.com/gtasa_samp_model_id/white/18664_w_s.jpg`)
                .addFields(                
                    { name: `📌 ***Resultado da busca retirado do DEV.PRINESIDE***`, value: 'Para mais informações, USE: .clown.'}
                )
                //.setImage('https://i.imgur.com/wSTFkRM.png')
                .setTimestamp()
                .setFooter(`Equipe Clown's`, 'https://i.imgur.com/HuolKEE.jpg');

                message.channel.send(exampleEmbed)
            }   
            else if(args[0] == 'Gate' || args[0] == 'Portao' || args[0] == 'gate')
            {
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Resultado da busca:')
                .setURL(`https://dev.prineside.com/en/gtasa_samp_model_id/tag/54-gate/`)
                .setAuthor('Leonsx', 'https://avatars1.githubusercontent.com/u/71391688?s=460&u=fad0c61eadd9439f4407d5b36a48ede507d43c20&v=4', 'https://github.com/leon-sx')
                .setDescription(
                    `Temos objetos pre-definidos\n\
                    ${comandos}
                    `)
                .setThumbnail(`https://files.prineside.com/gtasa_samp_model_id/white/11313_w_s.jpg`)
                .addFields(                
                    { name: `📌 ***Resultado da busca retirado do DEV.PRINESIDE***`, value: 'Para mais informações, USE: .clown.'}
                )
                //.setImage('https://i.imgur.com/wSTFkRM.png')
                .setTimestamp()
                .setFooter(`Equipe Clown's`, 'https://i.imgur.com/HuolKEE.jpg');

                message.channel.send(exampleEmbed)
            }                      
            else message.channel.send(`USE:\n${comandos}`)
        }
    }    
    if (command === "creditos" || command === "clown") {
        const Discord = require('discord.js');

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Clown Zerrown')
            .setURL('https://discord.gg/YnKF7XSCR9')
            .setAuthor('Leonsx', 'https://avatars1.githubusercontent.com/u/71391688?s=460&u=fad0c61eadd9439f4407d5b36a48ede507d43c20&v=4', 'https://github.com/leon-sx')
            .setDescription('**Clown Zerrown** o bot perfeito para seu servidor.')
            .setThumbnail('https://i.imgur.com/Tr9kou2.png')
            .addFields(
                { name: '\u200B', value: '\u200B' },
                
                { name: '📌 ***Sobre o clown***', value: 
                '*Clown Zerrown foi feito especialmente para seu servidor\
                \u200B\
                Tem Varias Funções para sua diversão entre outros.*'
                },               
                
                { name: '\u200B', value: '\u200B' },

                { name: '📌 ***Sobre o Open.mp***', value: 
                'Open Multiplayer\u200B\
                Uma modificação em desenvolvimento para Grand Theft Auto: San Andreas que será totalmente compatível com a modificação multiplayer existente San Andreas Multiplayer.\u200B\
                Isto significa que clientes existentes do SA:MP e todos scripts SA:MP existentes irão funcionar com o open.mp e, adicionalmente, vários bugs com o sistema do servidor serão consertados sem a necessidade de trabalhos manuais por parte do usuário.\u200B\
                Se você está curioso para saber quando será o lançamento ou como você pode contribuir para o projeto.'},
                
                { name: '\u200B', value: '\u200B' },
                
                { name: '📚 ***Creditos***', value: '\u200B'},
                { name: 'Leonsx', value: 'Programador do bot', inline: true },
                { name: 'Yran_Olv', value: 'Dono', inline: true },
                { name: 'Você', value: 'Por está nos apoiando em nossa jornada!', inline: true },
                { name: 'Open.MP', value: '...', inline: true },
                { name: 'dev.prineside', value: 'objetos', inline: true },                
                { name: '\u200B', value: '\u200B' },
            )
            //.setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter(`Equipe Clown's`, 'https://i.imgur.com/HuolKEE.jpg');

        message.channel.send(exampleEmbed)
    }
    if (command === "status" || command === "stats") {
        const server = require("./node_modules/samp-query/server/server.json");

        query(options, function(error, response)
        {
            if(error) console.log(error)
            else console.log(response), console.log('atualizado')

            request.call(self, options, 'i', function(error, information) {
                var fs = require('fs');

                /*response.address = options.host
                response.host = information.hostname
                response.gamemode = information.gamemode
                response.mapname = information.mapname
                response.passworded = information.passworded === 1
                response.maxplayers = information.maxplayers
                response.online = information.players*/
                
                fs.readFile('./server/sobre.txt', 'utf-8', function (err, data) {
                    if(err) throw err;
    
                    const embed = new Discord.MessageEmbed()        
                    .setTitle(`📊 **Host:** ${response.hostname}`)
                    .setDescription(`\
                    
                    \n📌 ***Status***\n
                    📚 **IP:** ${options.host}
                    
                    📌 ***Outros***\n        
                    💻 **Gamemode: ** ${response.gamemode}
                    🖼 **Mapname: ** ${response.mapname}
                    🔑 **Senha:** ${response.passworded}
                    
                    📌 ***Servidor***\n
                    ⚔ **MAX PLAYERS:** ${response.maxplayers}
                    📈 **Players Online:** ${response.online}
                    \
                    `)
                    .setFooter('🤡 Clown Zerrown © copyright.')
                    .setColor('#0099ff')
                    message.channel.send(embed)

                    //////

                });            
            });
        });
    }
});

bot.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
});

// -----------------------------------------------------------------------

var request = function(options, opcode, callback) {

    var socket = dgram.createSocket("udp4")
    var packet = new Buffer(10 + opcode.length)

    packet.write('SAMP')

    //for(var i = 0; i < 4; ++i) packet[i + 4] = options.host.split('.')[i]

    packet[8] = options.port & 0xFF
    packet[9] = options.port >> 8 & 0xFF
    packet[10] = opcode.charCodeAt(0)

    try {
        socket.send(packet, 0, packet.length, options.port, options.host, function(error, bytes) {
            if(error) return callback.apply(options, [ error ])
        })
    } catch(error) {
        return callback.apply(options, [ error ])
    }

    var controller = undefined

    var onTimeOut = function() {
        socket.close()
        return callback.apply(options, [ 'Host Invalida' ])
    }

    controller = setTimeout(onTimeOut, options.timeout)

    socket.on('message', function (message) {

        if(controller)
            clearTimeout(controller)

        if(message.length < 11) return callback.apply(options, [ true ])
        else {
            socket.close()

            message = message.slice(11)

            var object = {}
            var array = []
            var strlen = 0
            var offset = 0

            try {

                if(opcode == 'i') {               

                    object.passworded = message.readUInt8(offset)
                    offset += 1

                    object.players = message.readUInt16LE(offset)
                    offset += 2

                    object.maxplayers = message.readUInt16LE(offset)
                    offset += 2

                    strlen = message.readUInt16LE(offset)
                    offset += 4

                    object.hostname = decode(message.slice(offset, offset += strlen))

                    strlen = message.readUInt16LE(offset)
                    offset += 4

                    object.gamemode = decode(message.slice(offset, offset += strlen))

                    strlen = message.readUInt16LE(offset)
                    offset += 4

                    object.mapname = decode(message.slice(offset, offset += strlen))

                    return callback.apply(options, [ false, object ])

                }

                if(opcode == 'r') {

                    var rulecount  = message.readUInt16LE(offset)
                    offset += 2

                    var property, value = undefined

                    while(rulecount) {

                        strlen = message.readUInt8(offset)
                        ++offset

                        property = decode(message.slice(offset, offset += strlen))

                        strlen = message.readUInt8(offset)
                        ++offset

                        value = decode(message.slice(offset, offset += strlen))

                        object[property] = value

                        --rulecount
                    }

                    return callback.apply(options, [ false, object ])
                }

                if(opcode == 'd') {

                    var playercount = message.readUInt16LE(offset)
                    offset += 2

                    var player = undefined;

                    while(playercount) {

                        player = {}

                        player.id = message.readUInt8(offset)
                        ++offset

                        strlen = message.readUInt8(offset)
                        ++offset

                        player.name = decode(message.slice(offset, offset += strlen))

                        player.score = message.readUInt16LE(offset)
                        offset += 4

                        player.ping = message.readUInt16LE(offset)
                        offset += 4

                        array.push(player)

                        --playercount
                    }

                    return callback.apply(options, [ false, array ])
                }

            } catch (exception) {
                return callback.apply(options, [ exception ])
            }
        }
    })
}

bot.on("ready", () => {
    console.log(`\n${bot.guilds.cache.size} servidor(es) conectado(s) com um total de ${bot.users.cache.size} usuario(s)!`);
    console.log('[⚠] Bot Iniciado com sucesso!');
    botStats();
    setInterval(() => botStats(), 2000)
});

function botStats(){
    const status = [
      {name: `[💬]: Olá está com dificuldades? USE: ".cmds" !`, type:'PLAYING'},
      {name: `[💬]: Podemos amostrar os status do seu servidor! USE: ".ip [ip] [port]" depois ".status" ! "`, type:'PLAYING'},
    ]
    const randomStatus = status[Math.floor(Math.random() * status.length)]
    bot.user.setActivity(randomStatus);
}

// -----------------------------------------------------------------------

bot.login(config.token);