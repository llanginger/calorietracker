import { Report } from '../ndbapi/classes';
import { Ingredient, Recipe, ingredientFromJson, ingredientFromReport } from '../classes';

function getKey(keyType: string) {
  // was '::' but Enzyme didn't like that
  return (id: string) => keyType + '_' + id;
}

function isKey(keyType: string) {
  return (key: string) => key.startsWith(keyType);
}

export const getNdbKey = getKey('ndbno');
export const isNdbKey = isKey('ndbno');
export const getIngredientKey = getKey('ingredient');
export const isIngredientKey = isKey('ingredient');
export const getRecipeKey = getKey('recipe');
export const isRecipeKey = isKey('recipe');
export const getMealKey = getKey('meal');
export const isMealKey = isKey('meal');

export function saveReport(report: Report): void {
  window.localStorage.setItem(getNdbKey(report.food.ndbno), JSON.stringify(report));
}

export function loadReport(ndbno: string): Report | null {
  const key = getNdbKey(ndbno);
  return loadReportFromKey(key);
}

function loadReportFromKey(key: string): Report | null {
  const reportStr: string | null = window.localStorage.getItem(key);
  if (reportStr !== null) {
    console.log('Retrieved ' + key + ' from window storage');
    return JSON.parse(reportStr);
  } else {
    return null;
  }
}

export function saveIngredient(ingredient: Ingredient): void {
  // const objKeys = ['uid', 'fat', 'carbs', 'protein', 'calories', 'amount', 'unit'];
  const obj = {
    uid: ingredient.uid,
    fat: ingredient.fat,
    carbs: ingredient.carbs,
    protein: ingredient.protein,
    calories: ingredient.calories,
    amount: ingredient.amount,
    unit: ingredient.unit,
  };
  const ingredStr = JSON.stringify(obj);
  window.localStorage.setItem(ingredient.uid, ingredStr);
  // console.log('Saved ingredient\n' + ingredStr);
}

export function loadIngredient(ingredientId: string): Ingredient {
  const ingredStr = window.localStorage.getItem(ingredientId);
  if (ingredStr !== null) {
    console.log('Retrieved ' + ingredientId + ' from window storage');
    return ingredientFromJson(ingredStr);
  } else {
    throw new Error('Ingredient ' + ingredientId + ' not found.');
  }
}

export function saveRecipe(recipe: Recipe): void {
  const key = recipe.uid;
  const recipeStr = JSON.stringify(recipe);
  window.localStorage.setItem(key, recipeStr);
  // console.log('Saved recipe\n' + recipeStr);
}

export function loadRecipe(recipeId: string): Recipe {
  const recipeStr = window.localStorage.getItem(recipeId);
  if (recipeStr !== null) {
    // console.log('Retrieved ' + recipeId + ' from window storage');
    return Recipe.fromJson(recipeStr);
  } else {
    throw new Error('Recipe ' + recipeId + ' not found.');
  }
}

export function getAllStoredIngredients(): Ingredient[] {
  const ingreds: Ingredient[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key !== null && isNdbKey(key)) {
      const report = loadReportFromKey(key);
      if (report !== null) {
        ingreds.push(ingredientFromReport(report));
      }
    }
  }
  return ingreds;
}

export function getAllCustomIngredients(): Ingredient[] {
  const ingreds: Ingredient[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key !== null && isIngredientKey(key)) {
      ingreds.push(loadIngredient(key));
    }
  }
  return ingreds;
}

export function getAllRecipes(): Recipe[] {
  const recipes: Recipe[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key !== null && isRecipeKey(key)) {
      recipes.push(loadRecipe(key));
    }
  }
  return recipes;
}
