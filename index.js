const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async() => {
    await Recipe.create({
      title: "Crepes",
      level: "Easy Peasy",
      ingredients: ["Flour", "milk"],
      cuisine: "Bretonne",
      dishType: "snack",
      duration: 30,
      creator: "Ken Havo",
    }); 
    await Recipe.insertMany(data); 
    await Recipe.updateOne({ title: "Rigatoni alla Genovese"}, {duration: 100}); console.log("New time for rigatoni !");
    await Recipe.deleteOne({title: "Carrot Cake"}); console.log("No more carrot cake! Sorry, but we have regatoni");
    mongoose.connection.close(()=>console.log("Connection close: end of the game!"))
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });


// const recipesModel = mongoose.model("recipes", recipesSchema);
// console.log(recipesModel);

// (async function () {

//   const
// });
