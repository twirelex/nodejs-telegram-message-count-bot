require('dotenv').config()
const { Telegraf } = require("telegraf");

// Create a bot that uses 'polling' to fetch new updates
const bot = new Telegraf(process.env.bot_token)

// An array of ids of all the  users that you want to monitor their message counts 
// The array would look like this [1121334,323343243,43233222]
let chat_ids = JSON.parse(process.env.users_chat_ids)

// An object with the usernames/ids assigned an initial value of 0 message count
// The object will look like this {"user1": 0, "user2":0, "user3": 0}
let message_count = JSON.parse(process.env.users_message_count_obj)

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
      if (chat_ids.includes(ctx.from.id) && ctx.chat.id == process.env.groupChat_id){
        for (let i = 0; i < chat_ids.length; i++){
          if(chat_ids[i].toString() == ctx.from.id){
            
            message_count[parseInt(ctx.from.id)] = message_count[parseInt(ctx.from.id)] + 1
          }
        } 
      }   
        
  })

  bot.action('messages', (ctx) => {
    // If the user currently interacting with the bot is an admin in the group he/she would be shown an inline keyboard 
    // "message" and "statistics" button (the messages button can be used to reset all users messages count back to zero,
    // while the statistics button will show the current message count of every user)
    if (chat_ids.includes(ctx.chat.id) && ctx.chat.id == process.env.groupChat_admin_id){
      
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

    // If the person interacting with the bot is not an admin in the group but is part of the users whose message count
    // is being monitored, the user will be shown an inline keyboard "statistics" button which would display his/her 
    // current message count when clicked
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
    ctx.telegram.sendMessage(ctx.chat.id, message_count,{
      reply_markup: {
        inline_keyboard: [
          [{text: 'messages', callback_data: 'messages'}, {text: 'statistics', callback_data: 'statistics'}]
        ]
      }
    })
  })



bot.launch()




