const data = require("./data.json")
const fs = require("fs");

//GET
const getAllActiveReunificationCase = () => {
    try {
        const data = fs.readFileSync("./data.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing data.json:', error.message);
        return { reunificationCase: [] };
    }
};
const getActiveReunificationCase = () =>{
    return data;
};
const postReunificationCase = (newCase) => {
    const jsonString = JSON.stringify(newCase);
    const file = fs.createWriteStream("./data.json");

    file.write(jsonString);
    file.end();

    return "Successfully entered a new case";
};

// const putReunificationCase = (id,updatedCase) =>{
//     const index = data.findIndex((reunificationCase) => reunificationCase.id === id );
//     if (index !== -1) {
//         data[index] = {...data[index], ...updatedCase};
//         return data[index];
//     }
// }
module.exports = { getActiveReunificationCase,getAllActiveReunificationCase,postReunificationCase }