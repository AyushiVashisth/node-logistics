const express = require("express");
const { connection } = require("./config/db");
const app = express();
app.use(express.json());

// Load routes
const itemRoutes = require("./routes/item.routes");
const deliveryRoutes = require("./routes/delivery.routes");
const orderRoutes = require("./routes/orders.routes");

// Use routes
app.use("/api", itemRoutes);
app.use("/api", deliveryRoutes);
app.use("/api", orderRoutes);

app.listen(process.env.PORT, async()=>{
    try{
        await connection;
        console.log("Connect to db");
    }catch(err){
        console.log(err);
    }
    console.log(`Server is running at port ${process.env.PORT}`);
})