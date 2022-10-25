require("dotenv").config();
require("./database");
const app = require("./server");

// App running
app.listen(app.get("port"), () => {
    console.log("App listenin on port http://localhost:" + app.get("port"));
});
