//repository
/******************************************************************************
 Importing the (file system) module for file operations.
 *******************************************************************************/

const fs = require("fs");

/******************************************************************************
 Function to retrieve all family reunification cases from the data.json file.
 *******************************************************************************/

const getAllReunificationCase = () => {
    try {
        const data = fs.readFileSync("./data.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing data.json:', error.message);
        return {reunificationCase: []};
    }
};
/******************************************************************************
 Function to save a new set of family reunification cases to the data.json file
 *******************************************************************************/

const postReunificationCase = (newCase) => {
    const jsonString = JSON.stringify(newCase);
    const file = fs.createWriteStream("./data.json");
    file.write(jsonString);
    file.end();
    return "Done Successfully";
};
module.exports = {getAllReunificationCase, postReunificationCase}