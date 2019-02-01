module.exports = (req, res) =>{
    res.end(site);
}

let date = new Date();

let datestring = `${date.getDate()} of ${date.getMonth()+1} of ${date.getFullYear()}, it is: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

let site = 
`
<html>\n
    <body>\n
        <h1>Watch app:</h1>\n
        <p id="time"> ${datestring} </p>\n
    </body>\n


    <script>\n
        let timer = document.getElementById("time");\n
        setInterval(function(){\n
            let date =  new Date;\n
            timer.innerHTML = date.getDate() + " of " + (date.getMonth()+1) + " of " + date.getFullYear() + ", it is: " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();\n
        }, 1000);\n
    </script>\n
</html>
`

