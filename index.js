require('dotenv').config()


const { Telegraf } = require("telegraf");



// Create a bot that uses 'polling' to fetch new updates
const bot = new Telegraf('5077995245:AAGQsZQEahFUSfTajrLT1JnWHNHzd_d61gI')

const apiID = 18796890
const apiHash = '08e98815de6a777ae3c8d8f48d8a0575'

let chat_ids = [2084366462, 1068773145, 2124267259]
let message_count = {2084366462: 0, 1068773145: 0, 2124267259: 0}




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
   
      if (chat_ids.includes(ctx.from.id) && ctx.chat.id == -1001553327875){
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
    ctx.telegram.sendMessage(ctx.chat.id, `1068773145 = ${message_count[1068773145]} \n2084366462 = ${message_count[2084366462]}`,{
      reply_markup: {
        inline_keyboard: [
          [{text: 'messages', callback_data: 'messages'}, {text: 'statistics', callback_data: 'statistics'}]
        ]
      }
    })
  })

 

bot.launch()




