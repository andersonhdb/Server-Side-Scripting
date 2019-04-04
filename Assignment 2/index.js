const express = require('express');
const twill = require('twilio');
const db = require('./database/dbfunctions');
const bodyParser = require('body-parser');
const winston = require('winston');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const messageResponse = twill.twiml.MessagingResponse;

const logger = winston.createLogger({
   transports: [
       new winston.transports.Console(),
       new winston.transports.File({"filename": "debuging.log"})
   ]
})



app.post('/incommingMessage', (req, res)=>{
    logger.log({
        level: "info",
        message: `${new Date()}: command received`
    })
    const incommingMessage = req.body.Body;
    const twiml = new messageResponse();
    
    let command = '';

    if(typeof incommingMessage === 'string' || incommingMessage instanceof String){
        command = incommingMessage.substring(0,3);
    }

    if(command.match('(a|A)(dd|DD)')){
        
        logger.log({
            level: "info",
            message:`${new Date()}: add command selected`
        });
        if(incommingMessage.length<5){
            logger.log({
                level: "error",
                message:`${new Date()}: no item to add`
            })
            twiml.message(`no item to add was typed. Please use the command 'ADD todoItem' to correctly use this functionality`);
            res.writeHead(500, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        }
        const todoItem = incommingMessage.substring(4);
        db.addItem(todoItem).then((result)=>{

            logger.log({
                level: "info",
                message:`${new Date()}: item added`
            });

            twiml.message(`${todoItem} was successfully added to your to do list`);
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        }).catch((error)=>{
            
            logger.log({
                level: "error",
                message:`${new Date()}: item could not be added. There was an error with the database`
            });

            twiml.message(`${todoItem} wasn't added to your to do list, because of the following error:\n ${error.toString()}`);
            res.writeHead(500, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        });  
    }
    else if(command.match('(G|g)(et|ET)')){
        
        logger.log({
            level: "info",
            message:`${new Date()}: get command selected`
        });

        db.getItems().then((todoList)=>{
            logger.log({
                level: "info",
                message:`${new Date()}: items retrieved`
            });

            let todoListString = '';
            todoList.forEach((todoItem)=>{
                todoListString = todoListString + `${todoItem.todoItem} created at: ${todoItem.todoDateAdded}\n`;
            });
            
            twiml.message(todoListString);
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        }).catch((error)=>{

            logger.log({
                level: "error",
                message:`${new Date()}: could not retrieve todo items due to database access error`
            });

            //console.log(`${todoItem} not added`);
            twiml.message(`${todoItem} wasn't added to your to do list, because of the following error:\n ${error.toString()}`);
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        })
    }
    else{
        logger.log({
            level: "error",
            message:`${new Date()}: could not retrieve todo items due to database access error`
        });
        twiml.message(`${incommingMessage} was received by the server`);
        res.writeHead(500, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }
});

module.exports = app;
// app.listen(3000, ()=>{
//    console.log(`the app is up and running on port ${3000}`)
// });
