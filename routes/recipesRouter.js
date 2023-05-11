let recipesRouter = require('express').Router();
let recipeModel = require('../models/recipesModel');


//route d'ajout d'une recette
recipesRouter.post('/recipe', async (req, res) => {
    try {
        let recipe = new recipeModel(req.body);
        let error = recipe.validateSync();
        if (error) {
            throw error;
        }
        await recipe.save();
        res.json(recipe);
    } catch (error) {
        res.send(error);
    }
});


//route de rendu des recettes
recipesRouter.get('/recipes', async (req, res) => {
    try {
        const ingredient = req.query.ingredient;
        //vérifier si l'ingrédient est fourni
        if (ingredient) {
            let recipes = await recipeModel.find({ ingredients: { $regex: ingredient, $options: 'i' } });
            res.json(recipes);
        } else {
            let recipes = await recipeModel.find();//utilisation de la méthode find() de notre modèle
            res.json(recipes);
        }

    } catch (error) {
        res.json(error);
    }
});


//route de rendu d'une recette par Id
recipesRouter.get('/recipes/:id', async (req, res) => {
    try {
        let recipe = await recipeModel.findById(req.params.id);
        if (!recipe) {
            res.status(404);
            throw { 'error': "Aucune recette trouvée" }
        }
        res.json(recipe);
    } catch (error) {
        console.log(error);
    }
});

//route de rendu d'une recette par nom (si deux paramètres de recherche, ne pas oublier de créer un chemin d'accès spécifique (ex: /name/:name))
recipesRouter.get('/recipes/name/:name', async (req, res) => {
    try {
        let recipe = await recipeModel.findOne({ name: req.params.name });
        res.json(recipe);
    } catch (error) {
        console.log(error);
    }
});

//route de modification d'une recette par Id
recipesRouter.put('/recipes/id/:id', async (req, res) => {
    try {
        let recipe = await recipeModel.updateOne({ _id: req.params.id }, req.body);
        res.json(recipe);
    } catch (error) {
        console.log(error);
    }
});

//route de suppression d'une recette par Id
recipesRouter.delete('/recipes/:id', async (req, res) => {
    try {
        let recipe = await recipeModel.deleteOne({ _id: req.params.id });
        res.json(recipe);
    } catch (error) {
        console.log(error);
    }
});





module.exports = recipesRouter;


