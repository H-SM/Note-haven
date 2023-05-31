const mongoose= require('mongoose');


const connectToMongo = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to Mongo'))

    .catch((err) => { console.error(err); });
}

module.exports= connectToMongo;


// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));