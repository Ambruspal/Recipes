import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  subscription: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.subscription = this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => (this.selectedRecipe = recipe),
      (err) => console.error(err)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
