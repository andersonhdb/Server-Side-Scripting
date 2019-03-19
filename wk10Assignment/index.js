const { struct } = require('superstruct');
const yup = require('yup');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const dndCharacterInfo = struct({
  name: 'string',
  race: 'string',
  class: "string",
  strength: "number",
  dexterity: "number",
  constitution: "number",
  intelligence: "number",
  wisdom: "number",
  charisma: "number"
});

const WoDCharacterInfo = yup.object().shape({
    name: yup.string().required(),
    virtue: yup.string(),
    vice: yup.string(),
    Intelligence: yup.number().positive(),
    wits: yup.number().positive(),
    resolve: yup.number().positive(),
    strength: yup.number().positive(),
    dexterity: yup.number().positive(),
    stamina: yup.number().positive(),
    presence: yup.number().positive(),
    manipulation: yup.number().positive(),
    composture: yup.number().positive()
})

app.post('/superstruct', async (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);
    dndCharacterInfo(data);
    res.send(data);
    console.log("Success");
  } catch(err) {
    //console.log(err.message);
    //const {message, data, type, value} = err
    res.status(400);
    res.send(err.message);
    console.log("fail");
  }
});

app.post('/yup',async (req, res)=>{
    WoDCharacterInfo.isValid(req.body).then((valid)=>{
        if(valid){
            console.log("success!");
            res.send(req.body);
        }
        else{
            console.log("failure!")
            res.status(400);
            res.send("one of the values in the input is not in the correct format");
        }
    }).catch((error)=>{
        console.log("correct error");
        res.status(400);
        console.log(error);
        res.send("one of the values in the input is not in the correct format");
    });
})

module.exports = app;
//  app.listen(port,()=>{
//      console.log("successful! app listenning to port ", port);
//  })