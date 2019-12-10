let express = require("express");
let app = express();
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let reloadMagic = require("./reload-magic.js");
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
reloadMagic(app);
let dbo = undefined;
let url =
  "mongodb+srv://bob:bobsue@clusteramanda-kqoqy.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (error, db) => {
  dbo = db.db("final-project");
});

app.use("/", express.static("build"));
app.use("/", express.static("public"));
app.use("/uploads", express.static("uploads"));

app.post("/signup", upload.none(), (req, res) => {
  console.log("/signup endpoint hit");
  let username = req.body.username;
  let password = req.body.password;
  dbo.collection("users").findOne({ username: username }, (error, user) => {
    if (error) {
      console.log("/signup error", error);
      res.send(JSON.stringify({ success: false, error }));
      return;
    }
    if (user !== null) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user === null) {
      dbo
        .collection("users")
        .insertOne({ username: username, password: password })
        .then(() => res.send({ success: true }))
        .catch(error =>
          res.send(
            JSON.stringify({
              success: false,
              error
            })
          )
        );
    }
  });
});

app.post("/login", upload.none(), (req, res) => {
  console.log("/login endpoint hit");
  let username = req.body.username;
  let password = req.body.password;
  dbo.collection("users").findOne({ username: username }, (error, user) => {
    if (error) {
      console.log("/login error", error);
      res.send(JSON.stringify({ success: false, error }));
      return;
    }
    if (user === null) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user.password === password) {
      res.send(JSON.stringify({ success: true }));
    }
  });
});

app.post("/calculate", upload.none(), (req, res) => {
  console.log("/calculate endpoint hit");
  let materials = JSON.parse(req.body.materials);
  let recipeVolume = req.body.recipeVolume;
  recipeVolume = Number(recipeVolume);
  let amounts = materials.map(material => {
    let concentration = material.concentration;
    let amount = concentration * 0.01 * recipeVolume;
    amount.toFixed(2);
    return {
      name: material.name,
      amount: amount,
      materialValue: material.materialValue
    };
  });
  res.send(JSON.stringify(amounts));
});

app.post("/add-recipe", upload.none(), (req, res) => {
  console.log("/add-recipe endpoint hit");
  console.log("req.body.materials", req.body.materials);
  let username = req.body.username;
  let recipeName = req.body.name;
  let materials = JSON.parse(req.body.materials);
  let colourTags = req.body.colourTags;
  let glazeBase = req.body.glazeBase;
  let ingredients = materials.map(material => {
    let concentration = material.concentration;
    return {
      name: material.name,
      concentration: concentration
    };
  });
  dbo
    .collection("glaze-recipes")
    .insertOne({
      username: username,
      recipeName: recipeName,
      recipeVolume: "100ml",
      glazeBase: glazeBase,
      ingredients: ingredients,
      colourTags: colourTags
    })
    .then(() => res.send(JSON.stringify({ success: true })))
    .catch(error =>
      res.send(
        JSON.stringify({
          success: false,
          error
        })
      )
    );
});

app.post("/get-recipe", upload.none(), (req, res) => {
  console.log("/get-recipe endpoint hit with", req.body.name);
  let recipeName = req.body.name;
  let totalConcentration = req.body.concentration * 0.01;
  dbo
    .collection("glaze-recipes")
    .findOne({ recipeName: recipeName }, (error, recipe) => {
      if (error) {
        console.log("/get-recipe error", error);
        res.send(JSON.stringify({ success: false, error }));
        return;
      }
      if (recipe === null) {
        res.send(JSON.stringify({ success: false }));
        return;
      }
      if (recipe.recipeName === recipeName) {
        recipe.ingredients = recipe.ingredients.map(ingredient => {
          let ingredientInt = parseInt(ingredient.concentration);
          return {
            name: ingredient.name,
            concentration: ingredientInt * totalConcentration
          };
        });
        console.log("recipe", recipe);
        res.send(JSON.stringify(recipe));
      }
    });
});

app.get("/all-recipes", upload.none(), (req, res) => {
  console.log("/get-recipe endpoint hit");
  dbo
    .collection("glaze-recipes")
    .find({})
    .toArray((error, recipes) => {
      if (error) {
        console.log("error", error);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      res.send(JSON.stringify(recipes));
    });
});

app.post("/delete-recipe", upload.none(), (req, res) => {
  console.log("/delete-recipe endpoint hit");
  let name = req.body.name;
  dbo
    .collection("glaze-recipes")
    .deleteOne({ recipeName: name })
    .then(() => res.send(JSON.stringify({ success: true })))
    .catch(error =>
      res.send(
        JSON.stringify({
          success: false,
          error
        })
      )
    );
});

app.post("/add-notes", upload.none(), (req, res) => {
  console.log("/add-notes endpoint hit");
  let notes = JSON.parse(req.body.notes);
  let name = req.body.recipeName;
  console.log("notes", notes);
  dbo
    .collection("glaze-recipes")
    .findOne({ recipeName: name }, (error, recipe) => {
      if (error) {
        console.log("/add-notes error", error);
        res.send(JSON.stringify({ success: false, error }));
        return;
      }
      //if notes property DOES NOT exist in the found object,
      //add new property notes and add notes array
      if (recipe.notes === null) {
        dbo
          .collection("glaze-recipes")
          .updateOne({ recipeName: name }, { $set: { notes: notes } })
          .then(() => res.send(JSON.stringify({ success: true })))
          .catch(error =>
            res.send(
              JSON.stringify({
                success: false,
                error
              })
            )
          );
      }
      //if notes property DOES exist for the found object,
      //push to the notes array
      dbo
        .collection("glaze-recipes")
        .updateOne({ recipeName: name }, { $push: { notes: notes } })
        .then(() => res.send(JSON.stringify(notes)))
        .catch(error =>
          res.send(
            JSON.stringify({
              success: false,
              error
            })
          )
        );
    });
});

app.post("/delete-note", upload.none(), (req, res) => {
  console.log("/delete-note endpoint hit");
  let name = req.body.name;
  dbo
    .collection("glaze-recipes")
    .updateOne({ recipeName: name }, { $pop: { notes: 1 } })
    .then(() => res.send(JSON.stringify({ success: true })))
    .catch(error =>
      res.send(
        JSON.stringify({
          success: false,
          error
        })
      )
    );
});

app.post("/add-photo", upload.single("image"), (req, res) => {
  console.log("/add-photo endpoint hit");
  console.log("req.file", req.file);
  let name = req.body.recipeName;
  let file = req.file;
  let frontendPath = "/uploads/" + file.filename;
  dbo
    .collection("glaze-recipes")
    .findOne({ recipeName: name }, (error, recipe) => {
      if (error) {
        console.log("/add-photo error --- cant find recipeName", error);
        res.send(JSON.stringify({ success: false, error }));
        return;
      }
      // if (recipe.frontendPath === null) {
      //   console.log("no recipe found, create one");
      //   dbo
      //     .collection("glaze-recipes")
      //     .updateOne(
      //       { recipeName: name },
      //       { $set: { frontendPath: [frontendPath] } }
      //     )
      //     .then(() => res.send(JSON.stringify({ success: true })))
      //     .catch(error => {
      //       console.log("failed to create a new FEpath property and populate");
      //       res.send(
      //         JSON.stringify({
      //           success: false,
      //           error
      //         })
      //       );
      //     });
      //   return;
      // }
      dbo
        .collection("glaze-recipes")
        .updateOne(
          { recipeName: name },
          { $push: { frontendPath: frontendPath } }
        )
        .then(() => {
          console.log("path has been pushed to the FEpath array");
          res.send(JSON.stringify({ success: true }));
        })
        .catch(error => {
          console.log("failed to push to the FEpath array");
          res.send(
            JSON.stringify({
              success: false,
              error
            })
          );
        });
    });
});

app.post("/delete-photo", upload.none(), (req, res) => {
  console.log("/delete-photo endpoint hit");
  let name = req.body.name;
  dbo
    .collection("glaze-recipes")
    .updateOne({ recipeName: name }, { $pop: { frontendPath: 1 } })
    .then(() => res.send(JSON.stringify({ success: true })))
    .catch(error =>
      res.send(
        JSON.stringify({
          success: false,
          error
        })
      )
    );
});

app.post("/edit-recipe", upload.none(), (req, res) => {
  console.log("/edit-recipe endpoint hit with", req.body.name);
  let recipeName = req.body.name;
  dbo
    .collection("glaze-recipes")
    .findOne({ recipeName: recipeName }, (error, recipe) => {
      if (error) {
        console.log("/get-recipe error", error);
        res.send(JSON.stringify({ success: false, error }));
        return;
      }
      if (recipe === null) {
        res.send(JSON.stringify({ success: false }));
        return;
      }
      if (recipe.recipeName === recipeName) {
        console.log("recipe", recipe);
        res.send(JSON.stringify(recipe));
      }
    });
});

app.post("/update-recipe", upload.none(), (req, res) => {
  console.log("/update-recipe endpoint hit");
  let name = req.body.recipeName;
  console.log("name", name);
  let base = req.body.glazeBase;
  let ing = JSON.parse(req.body.ingredients);
  let tags = req.body.colourTags;
  dbo
    .collection("glaze-recipes")
    .updateOne(
      { recipeName: name },
      {
        $set: {
          glazeBase: base,
          ingredients: ing,
          colourTags: tags
        }
      }
    )
    .then(() => res.send(JSON.stringify({ success: true })))
    .catch(error =>
      res.send(
        JSON.stringify({
          success: false,
          error
        })
      )
    );
});

app.all("/*", (req, res, next) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
