import tmi from "tmi.js"
import {BOT_USERNAME , OAUTH_TOKEN, CHANNEL_NAME, API_RIOT_KEY, ID_GA} from "./constants"

const fetch = require('node-fetch');




const options = {
    options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: BOT_USERNAME,
		password: OAUTH_TOKEN
	},
	channels: [ CHANNEL_NAME ]
}
const client = new tmi.Client(options);



client.connect();
// eventos

client.on('disconnected', (reason) => {
	onDisconnectedHandler(reason)
  })
  
  client.on('connected', (address, port) => {
	onConnectedHandler(address, port)
  })
  
  client.on('hosted', (channel, username, viewers, autohost) => {
	onHostedHandler(channel, username, viewers, autohost)
  })
  
  client.on('subscription', (channel, username, method, message, userstate) => {
	onSubscriptionHandler(channel, username, method, message, userstate)
  })
  
  client.on('raided', (channel, username, viewers) => {
	onRaidedHandler(channel, username, viewers)
  })
  
  client.on('cheer', (channel, userstate, message) => {
	onCheerHandler(channel, userstate, message)
  })
  
  client.on('giftpaidupgrade', (channel, username, sender, userstate) => {
	onGiftPaidUpgradeHandler(channel, username, sender, userstate)
  })
  
  client.on('hosting', (channel, target, viewers) => {
	onHostingHandler(channel, target, viewers)
  })
  
  client.on('reconnect', () => {
	reconnectHandler()
  })
  
  client.on('resub', (channel, username, months, message, userstate, methods) => {
	resubHandler(channel, username, months, message, userstate, methods)
  })
  
  client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate) => {
	subGiftHandler(channel, username, streakMonths, recipient, methods, userstate)
  })

// reação de eventos

client.on('message', (channel, userstate, message, self) => {
	if(self) {
	  return
	}
  
	if (userstate.username === BOT_USERNAME) {
	  console.log(`Not checking bot's messages.`)
	  return
	}
  
	onMessageHandler(channel, userstate, message, self)
  })
  
  function onMessageHandler (channel, userstate, message, self) {
	checkTwitchChat(userstate, message, channel)
  }
  
  function onDisconnectedHandler(reason) {
	console.log(`Disconnected: ${reason}`)
  }
  
  function onConnectedHandler(address, port) {
	console.log(`Connected: ${address}:${port}`)
  }
  
  function onHostedHandler (channel, username, viewers, autohost) {
	client.say(channel,
	  `Obrigada @${username}, pelo host com ${viewers} viewers!`
	)
  }
  
  function onRaidedHandler(channel, username, viewers) {
	client.say(channel,
	  `Obrigada @${username}, oela raid de ${viewers} viewers!`
	)
  }
  
  function onSubscriptionHandler(channel, username, method, message, userstate) {
	client.say(channel,
	  `Obrigada @${username} pelo sub. Agora você está concorrendo ao !sorteio!`
	)
  }
  
  function onCheerHandler(channel, userstate, message)  {
	client.say(channel,
	  `Obrigada @${userstate.username} pelos bits ${userstate.bits} !`
	)
  }
  
  //function onGiftPaidUpgradeHandler(channel, username, sender, userstate) {
//	client.say(channel,
//	  `Thank you @${username} for continuing your gifted sub!`
//	)
  //}
  
  function reconnectHandler () {
	console.log('Reconnecting...')
  }
  
  function resubHandler(channel, username, months, message, userstate, methods) {
	const cumulativeMonths = userstate['msg-param-cumulative-months']
	client.say(channel,
	  `Obrigada @${username} pelo resub de ${cumulativeMonths} meses`
	)
  }
  
  function subGiftHandler(channel, username, streakMonths, recipient, methods, userstate) {
	client.say(channel,
	  `Obrigada @${username} por dar sub de presente para ${recipient}}. Agora ele está participando do !sorteio`
	)
  }
//comandos 


client.on('message', (channel, userstate, message, self) => {
	if(self) return;
    if(userstate.username === BOT_USERNAME) return;

	if(message.toLowerCase() === '!timeout') {
		client.say(channel, `/timeout @${userstate.username} 120 pediu no comando`);
	}

	if(message.toLowerCase() ==='!sorteio'){
		client.say(channel, `/me Quando bater a meta de 40 subs, vai ter sorteio de 50 reais de RP `)
	}

	if(message.toLowerCase() === '!social'){
		client.say(channel, `/me ──────────────────────────────── Twitter . . . . . . . . . . . . . . . . . . . @koegabs     Instagram . . . . . . . . . . . . . . . . . @gabsbmartins  ────────────────────────────────`)

	}

	if (message.toLowerCase() === '!loja'){
			client.say(channel, '/me https://streamelements.com/gabsbmartins/store')
	}

	if (message.toLowerCase() ==='!discord'){
		client.say(channel, '/me Entre no meu servidor do Discord > https://discord.gg/kCtXXvcx24')
	}

	if (message.toLowerCase() === '!comandos'){
		client.say(channel, `/me os comandos são loja, social, sorteio, timeout, ad, pedro, tela, salve, tec `)
	}

	if (message.toLowerCase() === "!ad"){
		client.say(channel, '/me Depois de cada partida irei passar 30 segundos de AD apenas para cumprir as exigências da Twitch. Agradeço pela compreensão. Falando nisso, toma AD ai.')		
	}

	if (message.toLowerCase() === "!ad") {
		client.say(channel, '/commercial ')
	}

	if(message.toLowerCase() === '!aviso'){
		client.say(channel, `/me o comando !timeout te dá timeout por 2 minutos :)`)
	}

	if(message.toLowerCase() === "!tela"){
		client.say(channel, `/me N/A Streamer que esquece de trocar a tela`)
	}

	if(message.toLowerCase() === "salve"){
		client.say(channel, `/me` + ` Salve, @${userstate.username}!!`)
	}

	if(message.toLowerCase() === "!tec"){
		client.say(channel, `/me` + ` TEC TEC TEC TEC TEC TEC`)
	}

	if(message.toLowerCase() === "!pedro"){
		pedro();
		client.say(channel, `/me` + ` Gabs matou o Pedro ${c} vezes!!`)
	}

	if(message.toLowerCase() === "!elo"){
		const url = `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${ID_GA}?api_key=${API_RIOT_KEY}`
		fetch(url)
		.then(response => response.json())
		.then(elo =>{
			JSON.stringify(elo);
			let tierRaw = elo[1].tier;
			let rank = elo[1].rank;
			let lp = elo[1].leaguePoints;
			switch (tierRaw){
				case "IRON":
					var	tier = 'FERRO'
					break;
				case "BRONZE":
					var tier = 'BRONZE'
					break;
				case "SILVER":
					tier = 'PRATA'
					break;
				case "GOLD":
					var tier = 'OURO'
					break;
				case "PLATINUM":
					var tier = 'PLATINA'
					break;
				case "DIAMOND":
					var tier = 'DIAMANTE'
					break;
				case "MASTER":
					var tier = 'MESTRE'
					break;
				case "GRANDMASTER":
					var tier = 'GRÃO-MESTRE'
					break;
				default:
					var tier = "CHALLENGER"
					break;
			}
			let tierFinal = tier

			client.say(channel, `/me ` + `——————————————————————— gabsbmBalinhaneles olha proclin.....................${tierFinal} ${rank} (${lp} PDL) ———————————————————————`)

			
		})
	}

		

	
    checkTwitchChat (userstate, message, channel) 
});

//apagar mensagem 
function checkTwitchChat (userstate, message, channel) {
    message = message.toLowerCase()
//    let shouldSendMessage = false
// checar mensagem
//    shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()))
//    if(shouldSendMessage){
        //falar com o usuario
//        client.say(channel, ` /me @ ${userstate.username}, desculpe! Sua mensagem foi deletada. Pare com isso se não vai tomar ban :(` ) 
        //deletar mensagem
//        client.deletemessage(channel, userstate.id)
   }
//}

//!Contador
let c = 30;
const pedro = () =>{
	c++;
}
