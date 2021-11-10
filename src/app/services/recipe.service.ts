import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeListChanged = new Subject<Recipe[]>();
  recipeSelected: Subject<Recipe> = new Subject<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Rakottkrumpli',
      'Super yummy',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      [new Ingredient('Potatoes', 10), new Ingredient('Wurst', 2)]
    ),
    new Recipe(
      'Kelkáposzta',
      'Hungarian food',
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      [new Ingredient('Káposztafej', 4), new Ingredient('Tejföl', 1)]
    ),
  ];

  constructor() {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeListChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id) {
    return this.recipes[id];
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipeListChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeListChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeListChanged.next(this.recipes.slice());
  }
}
