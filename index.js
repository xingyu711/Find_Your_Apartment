const express = require("express");

const app = express();
const PORT = 3000;

console.log(`Listenning for connections on ${PORT}`); // it's the `` not the single quote ''


app.use(express.static("public"));

app.get("/records", (req, res) => {
    res.json({records: [1, 2, 3, 4, 5]});
});

app.listen(PORT, () => {
    console.log(`Listenning for connections on ${PORT}`);
});
