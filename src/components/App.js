import React, { useState, createContext, useEffect } from 'react';
import RecipeList from './RecipeList'
import '../css/app.css'
import { v4 as uuidv4 } from 'uuid';
import RecipeEdit from './RecipeEdit'

export const RecipeContext = createContext()
const LOCAL_STORAGE_KEY = 'cookigWithReact.recipes';

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipes);
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);
  
  useEffect(() =>{
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])


  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeSelect(id){
    setSelectedRecipeId(id);
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: uuidv4(), name: '', amount: '' }
      ]
    }
  
    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  function handleRecipeDelete(id) {
    if(selectedRecipeId != null && selectedRecipeId === id){
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter(recipe=> recipe.id !== id))
  }


  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList 
        recipes={recipes}
      />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
    
  );
}





const sampleRecipes = [
  {
    id: 1,
    name: 'Maggi Noodles',
    servings: 1,
    cookTime: '0:05',
    instructions: "1. Boil water.\n2. Put maggie in boul.\n3. Put maggie masala in it.\n4. Eat maggie.",
    ingredients: [
      {
        id: 1,
        name: 'Maggie',
        amount: '1 Packet'
      },
      {
        id: 2,
        name: 'Maggie Masala',
        amount: '1 Packet'
      }
    ]
  },
  {
    id: 2,
    name: 'Tea',
    servings: 2,
    cookTime: '0:10',
    instructions: "1. Boil water, add ginger and tea.\n2. Add sugar after 5 min.\n3. Add pinch of salt (it increases the flavour).\n4. Add Milk.\n5. Strain the tea.\n6. Drink it with chips.",
    ingredients: [
      {
        id: 1,
        name: 'Tea',
        amount: '1 Tbs'
      },
      {
        id: 2,
        name: 'Ginger',
        amount: '5 gm'
      },
      {
        id: 3,
        name: 'Sugar',
        amount: '2 Tbs'
      },
      {
        id: 4,
        name: 'Salt',
        amount: 'Pinch'
      },
      {
        id: 5,
        name: 'Milk',
        amount: '1.5 Cup'
      },
      {
        id: 6,
        name: 'Chips',
        amount: '1 Packet'
      }
    ]
  }
]


export default App;
