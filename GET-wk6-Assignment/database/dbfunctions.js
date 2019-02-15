const mysql = require("promise-mysql");
const connectionSettings = require("./connection.json");

const connection = mysql.createPool(connectionSettings);

async function selectMovie(movieTitle){
    const sql = `SELECT * FROM movieList WHERE movieTitle = '${movieTitle}'`;
    try{
        let result = await connection.query(sql)
        result = result[0];
        data = {
            title: result.movieTitle,
            year: result.year
        }
        return data;
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    selectMovie: selectMovie,
  };