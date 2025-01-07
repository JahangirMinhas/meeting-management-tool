const sequelize = require("../config/database");

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection established successfully.");

        const [result] = await sequelize.query("SELECT NOW()");
        console.log("Current time from DB:", result);

        process.exit(0);
    } catch (err) {
        console.error("Error connecting to the database:", err.message);
        process.exit(1);
    }
})();