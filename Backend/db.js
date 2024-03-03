const Pool=require('pg').Pool;
const pool=new Pool({
user:"postgres",
host:"localhost",
database:"Zithara",
password:"admin",
port:5432,
})

pool.connect((error) => {
    if (error) {
        console.error("Error connecting to the database:", error);
    } else {
        console.log("Database connected successfully!");
    }
});
module.exports=pool
