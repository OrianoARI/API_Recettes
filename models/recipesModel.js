const express = require('express');
const mongoose = require('mongoose');

const recipeShema = new mongoose.Schema({
    name: {
        type : String,
        required : [true, "Le nom de la recette est obligatoire"],
    },
    ingredients: {
        type : Array,
        required : [true, "Les ingrédients sont obligatoires"],
    },
    step: {
        type : String,
        required : [true, "Les étapes sont obligatoires"],
    },
    author: {
        type : String,
        default : "Anonyme",
    }
})

const recipeModel = mongoose.model('recipes', recipeShema);

module.exports = recipeModel;