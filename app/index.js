const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();

const corsOptions = {
  origin: "http://localhost:8000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to livestock marketplace application." });
});

require("./routes/category.routes.js")(app);
require("./routes/order_details.routes.js")(app);
require("./routes/order_status.routes.js")(app);
require("./routes/order_tracking.routes.js")(app);
require("./routes/order.routes.js")(app);
require("./routes/organization_status.routes.js")(app);
require("./routes/organization.routes.js")(app);
require("./routes/product.routes.js")(app);
require("./routes/profile.routes.js")(app);
require("./routes/rejection_reasons.routes.js")(app);
require("./routes/rejection.routes.js")(app);
require("./routes/user_status.routes.js")(app);
require("./routes/user.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
