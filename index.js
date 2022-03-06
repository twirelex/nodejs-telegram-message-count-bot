require('dotenv').config()


const { Telegraf } = require("telegraf");



// Create a bot that uses 'polling' to fetch new updates
const bot = new Telegraf('5146334838:AAEAsz-osFUSqvD3MRL3M06pJR165xXuRLQ')

const apiID = 18796890
const apiHash = '08e98815de6a777ae3c8d8f48d8a0575'

let chat_ids = [1068773145, 1425493640, 5094659585, 1080256020, 1022738179, 5295910014, 1865475939, 1373670744, 1203502547]
let message_count = {1068773145: 0, 1425493640: 0, 5094659585: 4, 1080256020: 4, 1022738179: 0, 5295910014: 0, 1865475939: 0, 1373670744: 0, 1203502547: 0}




  bot.start((ctx) => {
  if (chat_ids.includes(ctx.chat.id)){
    ctx.telegram.sendMessage(ctx.chat.id, 'use the button below to view your message count',{
      reply_markup: {
        inline_keyboard: [
          [{text: 'messages', callback_data: 'messages'}]
        ]
      }
    })
  }  else {return}
  })
  
  bot.on('message', (ctx) => {
   
      if (chat_ids.includes(ctx.from.id) && ctx.chat.id == -1001544419477){
        for (let i = 0; i < chat_ids.length; i++){
          if(chat_ids[i].toString() == ctx.from.id){
            
            message_count[parseInt(ctx.from.id)] = message_count[parseInt(ctx.from.id)] + 1
          }
        } 
      }   
        
  })

  bot.action('messages', (ctx) => {
    if (chat_ids.includes(ctx.chat.id) && ctx.chat.id == 1068773145){
      
      ctx.telegram.sendMessage(ctx.chat.id, `${message_count[ctx.from.id]} messages posted`,{
        reply_markup: {
          inline_keyboard: [
            [{text: 'messages', callback_data: 'messages'}, {text: 'statistics', callback_data: 'statistics'}]
          ]
        }
      })

      for(let index = 0; index < chat_ids.length; index++){
        message_count[chat_ids[index]] = 0
      }
    } else if (chat_ids.includes(ctx.chat.id)){
      ctx.telegram.sendMessage(ctx.chat.id, `${message_count[ctx.from.id]} messages posted`,{
        reply_markup: {
          inline_keyboard: [
            [{text: 'messages', callback_data: 'messages'}]
          ]
        }
      })
    } else {return}

    })

  bot.action('statistics', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, `
    Wirelex = ${message_count[1068773145]} 
    \nTega = ${message_count[1425493640]}
    \nAbdulmojeed = ${message_count[5094659585]}
    \nDavies Adedam = ${message_count[1080256020]}
    \nJohn Legend = ${message_count[1022738179]}
    \nShmu'el = ${message_count[5295910014]}
    \nTechmonk = ${message_count[1865475939]}
    \nBobby = ${message_count[1373670744]}
    \nPolymorph = ${message_count[1203502547]}`,{
      reply_markup: {
        inline_keyboard: [
          [{text: 'messages', callback_data: 'messages'}, {text: 'statistics', callback_data: 'statistics'}]
        ]
      }
    })
  })

 

bot.launch()




