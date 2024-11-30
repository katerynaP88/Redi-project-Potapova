let ingredients = [];
let recipes = [];

const ingredientInput = document.getElementById("ingredient-input");
const addIngredientButton = document.getElementById("add-ingredient");
const findRecipesButton = document.getElementById("find-recipes");
const ingredientList = document.getElementById("ingredient-list");
const recipeList = document.getElementById("recipe-list");
const recipeName = document.getElementById("recipe-name");
const recipeIngredients = document.getElementById("recipe-ingredients");
const recipeInstructions = document.getElementById("recipe-instructions");

fetch("project.json")
    .then((response) => response.json())
    .then((data) => {
        console.log("Loaded recipes:", data); 
        recipes = data;
        useRecipes(data);
    })
    .catch((error) => console.error("Error loading recipes:", error));

    function useRecipes(recipes) {
        recipes.forEach((recipe) => {
            console.log(recipe.name);
            console.log("Ingredients:", recipe.ingredients);
            console.log("Instructions:", recipe.instructions);
        });
    }

addIngredientButton.onclick = function () {
    const ingredient = ingredientInput.value.trim().toLowerCase();
    if (ingredient && !ingredients.includes(ingredient)) {
        ingredients.push(ingredient);
        displayIngredients();
        console.log("Ingredients list:", ingredients);
    }
    ingredientInput.value = "";
};

function displayIngredients() {
    ingredientList.innerHTML = "";
    ingredients.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        ingredientList.appendChild(li);
    });
}

function findRecipes() {
    recipeList.innerHTML = "";
    let found = false;

    recipes.forEach((recipe) => {
        const hasMatchingIngredient = recipe.ingredients.some((ing) =>
            ingredients.includes(ing.name.toLowerCase())
        );

        if (hasMatchingIngredient) {
            const li = document.createElement("li");
            li.textContent = recipe.name;
            li.classList.add("recipe-item");
            li.onclick = () => showRecipeDetails(recipe);
            recipeList.appendChild(li);
            found = true;
        }
    });
    
    if (!found) {
        const li = document.createElement("li");
        li.textContent = "No recipes found";
        recipeList.appendChild(li);
    }

    ingredients = []; // The list of ingredients is cleared
    displayIngredients(); // Обновление интерфейса после очистки
};

findRecipesButton.onclick = findRecipes;

function showRecipeDetails(recipe) {
    recipeName.textContent = recipe.name;
    recipeIngredients.innerHTML = "";
    recipe.ingredients.forEach((ing) => {
        const li = document.createElement("li");
        li.textContent = `${ing.name} - ${ing.amount} ${ing.unit}`;
        recipeIngredients.appendChild(li);
    });
    recipeInstructions.textContent = recipe.instructions;
}