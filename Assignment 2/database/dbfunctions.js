const mysql = require("promise-mysql");
const connectionSettings = require("./connection.json");

const connection = mysql.createPool(connectionSettings);

async function addItem(itemTitle){
    const rightnow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql = `INSERT INTO todo_list (todoItem, todoDateAdded, todoStatus) VALUE ('${itemTitle}','${rightnow}','false')`;
    try{
        const result = await connection.query(sql)
        return result;
    }catch(error){
        console.log(error);
    }
}

async function getItems(){
    const sql = `SELECT * FROM todo_list`;
    try{
        const result = await connection.query(sql);
        return result;
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    addItem: addItem,
    getItems: getItems
  };