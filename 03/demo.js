const fs = require('fs');


// Reading Data From Json
// fs.readFile('./data.json', 'utf-8', (err,data) => {
//     var jsonData = JSON.parse(data);
//     console.log(jsonData.name);
// })

// Reading Directories
// fs.readdir('c:/', (err,data) => {
//         console.log(data);
// })

var data = {
    name: 'Bill'
}

fs.writeFile('data.json', JSON.stringify(data), (err) => {
    console.log("Finished: ",err);
});
