const app = require("express")();
require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`)
});
