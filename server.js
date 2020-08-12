const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
})
const app = require('./app');

// dotenv.config({
//     path: './config.env'
// })
console.log(process.env.NODE_ENV);
const port = process.env.PORT || 3000;

// console.log(app.get('env'));

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})