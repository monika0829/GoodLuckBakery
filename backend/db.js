const mongoose = require("mongoose");
const mongoURI =
  "mongodb://ankitnk08:mern123@ac-mubjxc0-shard-00-00.rkgd9la.mongodb.net:27017,ac-mubjxc0-shard-00-01.rkgd9la.mongodb.net:27017,ac-mubjxc0-shard-00-02.rkgd9la.mongodb.net:27017/GOODLUCK_BAKERY?ssl=true&replicaSet=atlas-nrfgzq-shard-0&authSource=admin&retryWrites=true&w=majority";

// const mongoDB = async () => {
//   try {
//     await mongoose.connect(mongoURI, { useNewUrlParser: true });
//     console.log("Connected to MongoDB");
//     const fetched_data = await mongoose.connection.db.collection("food_items");
//     const temp = await fetched_data.find().toArray();
//     console.log(temp);

//     fetched_data.find({}).toArray(async function (err, data) {
//       console.log(data);
//       const food_Category = await mongoose.connection.db.collection(
//         "food_Category"
//       );
//       food_Category.find({}).toArray(function (err, catData) {
//         if (err) console.log(err);
//         else {
//           global.food_items = data;
//           global.food_Category = catData;
//         }
//       });
//       if (err) console.log(err);
//       else {
//         global.food_items = data;
//       }
//     });
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error.message);
//   }
// };

const mongoDB = async () => {
  //console.log(global);
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    const dbInstence = mongoose.connection.db;
    console.log("Connected to MongoDB");
    const fetched_data = await dbInstence
      .collection("food_items")
      .find()
      .toArray();

    //console.log(fetched_data);
    const fetched_Category = await dbInstence
      .collection("food_Category")
      .find()
      .toArray();

    global.food_items = fetched_data;
    global.food_Category = fetched_Category;
    //console.log(fetched_Category);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = mongoDB;
