import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  id: number;
  recipeSubscription: Subscription;

  constructor(
    private slService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipeSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = Number(params.id);
        this.recipe = this.recipeService.getRecipeById(this.id);
      },
      (err) => console.error(err)
    );
  }

  addIngredientToShoppingList() {
    this.slService.addRecipeIngredients(this.recipe.ingredients);
  }

  onNavigateEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
