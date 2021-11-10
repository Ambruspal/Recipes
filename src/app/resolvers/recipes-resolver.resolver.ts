// Resolver: Csak akkor példányosodik be, jön létre,
// amikor már minden szükséges adatot megkaptunk a backendről.
// Az angular mindig a app-routing modulban
// a mellette lévő komponensek indítása előtt fogja futtatni a resolvereket.
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Recipe } from '../models/recipe';
import { DataStorageService } from '../services/data-storage.service';
import { RecipeService } from '../services/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverResolver implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
    // Itt nem kell feliratkozni az observable-re,
    // mert a resolve metódussal az angular automatikusan feliratkozik.
    // (Tehát mikor megvannak az adatok, indítja a komponens(eke)t)
  }
}
