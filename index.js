require('dotenv').config()


const { Telegraf, session, Scenes:{BaseScene, Stage}, Markup } = require("telegraf");



// Create a bot that uses 'polling' to fetch new updates
const bot = new Telegraf('5146334838:AAEAsz-osFUSqvD3MRL3M06pJR165xXuRLQ')

const apiID = 18796890
const apiHash = '08e98815de6a777ae3c8d8f48d8a0575'

bot.use(session())

let chat_ids = [1068773145, 1425493640, 5094659585, 1410063527, 1080256020, 1022738179, 2080115736, 1023342371, 1865475939, 1373670744, 1203502547]
let message_count = {1068773145: 0, 1425493640: 0, 5094659585: 0, 1410063527: 0, 1080256020: 0, 1022738179: 0, 2080115736: 0, 1023342371: 0, 1865475939: 0, 1373670744: 0, 1203502547: 0}




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
    \nTheophilus = ${message_count[1410063527]}
    \nDavies Adedam = ${message_count[1080256020]}
    \nJohn Legend = ${message_count[1022738179]}
    \nShmu'el = ${message_count[2080115736]}
    \nScarlX = ${message_count[1023342371]}
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

  bot.command('/tega1', ctx => {
    if(!ctx.session) ctx.session = {}
  
    ctx.session.step = 'tega1'
  
    return ctx.reply('message count?')
  })
  
  bot.command('/abdulmojeed1', ctx => {
    if(!ctx.session) ctx.session = {}
  
    ctx.session.step = 'abdulmojeed1'
  
    return ctx.reply('message count?')
  })
  
  bot.command('/theophilus1', ctx => {
    if(!ctx.session) ctx.session = {}
  
    ctx.session.step = 'theophilus1'
  
    return ctx.reply('message count?')
  })
  
  bot.command('/davies1', ctx => {
    if(!ctx.session) ctx.session = {}
  
    ctx.session.step = 'davies1'
  
    return ctx.reply('message count?')
  })
  
  bot.command('/john1', ctx => {
    if(!ctx.session) ctx.session = {}
  
    ctx.session.step = 'john1'
  
    return ctx.reply('message count?')
  })
  
  bot.command('/shmuel1', ctx => {
    if(!ctx.session) ctx.session = {}
  
    ctx.session.step = 'shmuel1'
  
    return ctx.reply('message count?')
  })
  
  bot.command('/scarlx1', ctx => {
    if(!ctx.session) ctx.session = {}
  
    ctx.session.step = 'scarlx1'
  
    return ctx.reply('message count?')
  })
  
  bot.command('/bobby1', ctx => {
    if(!ctx.session) ctx.session = {}
  
    ctx.session.step = 'bobby1'
  
    return ctx.reply('message count?')
  })
  
  bot.command('/polymorph1', ctx => {
    if(!ctx.session) ctx.session = {}
  
    ctx.session.step = 'polymorph1'
  
    return ctx.reply('message count?')
  })
  
  
  
  bot.on('text', ctx => {
    switch(ctx.session?.step){
      case 'tega1':
        message_count[1425493640] = parseInt(ctx.message.text)
        break
  
      case 'abdulmojeed1':
        message_count[5094659585] = parseInt(ctx.message.text)
        break
      
      case 'theophilus1':
      message_count[1410063527] = parseInt(ctx.message.text)
      break
  
      case 'davies1':
        message_count[1080256020] = parseInt(ctx.message.text)
        break
  
      case 'john1':
        message_count[1022738179] = parseInt(ctx.message.text)
        break
  
      case 'shmuel1':
        message_count[2080115736] = parseInt(ctx.message.text)
        break
  
      case 'scarlx1':
        message_count[1023342371] = parseInt(ctx.message.text)
        break
  
      case 'bobby1':
        message_count[1373670744] = parseInt(ctx.message.text)
        break
  
      case 'polymorph1':
        message_count[1203502547] = parseInt(ctx.message.text)
        break
      
    }
  
    ctx.reply(`new ${ctx.session.step} has been set`)
  
    ctx.session.step = undefined
  }) 

bot.launch()




