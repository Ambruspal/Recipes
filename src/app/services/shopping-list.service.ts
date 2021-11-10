import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  newIngredients = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.newIngredients.next(this.ingredients.slice());
  }

  addRecipeIngredients(recipeIngredients) {
    this.ingredients.push(...recipeIngredients);
  }

  updateIngredient(index: number, newIngredient) {
    this.ingredients[index] = newIngredient;
    this.newIngredients.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.newIngredients.next(this.ingredients);
  }
}
