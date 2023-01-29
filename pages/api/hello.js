// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      unique: true
  },
  description: {
      type: String,
      required: true
  },
  capacity: {
      type: Number,
      required: true
  },
  amenities: [{
      type: String
  }],
  images: [{
      type: String
  }],
  price: {
      type: Number,
      required: true
  },
  isAvailable:{
      type:Boolean,
      default:true
  }
  ,
  availability: [{
      type: Date
  }]
});

let Hall = mongoose.model("Hall", hallSchema);
export default async function handler(req, res) {
  if(req.method=="POST"){
    //conect to db
    mongoose.set('strictQuery', false);
mongoose.connect('mongodb://scopionjs:scopionjs@cluster0-shard-00-00.klfvs.mongodb.net:27017,cluster0-shard-00-01.klfvs.mongodb.net:27017,cluster0-shard-00-02.klfvs.mongodb.net:27017/dmubamusic?ssl=true&replicaSet=atlas-k6x59u-shard-0&authSource=admin&retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error',(e)=>{
  console.log(e.message)
});
db.once('open', function() {
  console.log("Connected to MongoDB");
});
//process
console.log(req.body)
    // Extracting hall details from request body
    const name = req.body.name;
    const capacity = req.body.capacity;
    const price = req.body.price;
    const description = req.body.description;
    const availability = req.body.availability;
    const images = req.body.images;
    const amenities =req.body.amenities
    try {
        // Creating a new hall object
        const hall = new Hall({
            name: name,
            capacity: capacity,
            price: price,
            description: description,
            //availability: availability,
            images: images,
            amenities
        });
        // Saving the hall object
        await hall.save();
        // jsoning a response if hall is created successfully
        res.json({ message: 'Hall created successfully' });
    } catch (err) {
        // jsoning error response if an error occurs while saving the hall
        res.status(500).json({error:err.message});
    }
//res.status(200).json({ name: 'John Doe' })
  }
  
}
