export interface RecipeModel{
    id: string;
    dishName: string;
    description: string;
    dishType: number;
    preparationTime?: number;
    image: string;
    instructions: string;
    ingredientsQuantities:IngredientRecipeModel[];
}

export interface IngredientModel{
    id: number;
    name: string;
}

export interface DtoRecipeModel{
    id: string;
    dishName: string;
    image: string;
}

export interface IngredientRecipeModel{
    name:string;
    quantity:string;
}