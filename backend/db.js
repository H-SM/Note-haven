const mongoose= require('mongoose');


const connectToMongo = ()=>{
    mongoose.connect('mongodb+srv://harmanmalht777:qweewq123@cluster0.6ndafqq.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to Mongo'))

    .catch((err) => { console.error(err); });
}

module.exports= connectToMongo;
