//repository
const fs = require("fs");
const getAllReunificationCase = () => {
    try {
        const data = fs.readFileSync("./data.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing data.json:', error.message);
        return {reunificationCase: []};
    }
};
const postReunificationCase = (newCase) => {
    const jsonString = JSON.stringify(newCase);
    const file = fs.createWriteStream("./data.json");
    file.write(jsonString);
    file.end();
    return "Done Successfully";
};
module.exports = {getAllReunificationCase, postReunificationCase}