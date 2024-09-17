import React, { useState } from 'react';
import IngredientInput from './components/IngredientInput';
import DietaryRestrictions from './components/DietaryRestrictions';
import RecipeGenerator from './components/RecipeGenerator';
import RecipeCategories from './components/RecipeCategories';
import Footer from './components/Footer';
import axios from 'axios';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1); // Track the current page
  const [moreRecipesAvailable, setMoreRecipesAvailable] = useState(true); // To handle 'Load More' button visibility

  const addIngredient = (ingredient: string) => {
    setIngredients([...ingredients, ingredient]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1); // Remove the ingredient at the specified index
    setIngredients(newIngredients);
  };

  const generateRecipe = async () => {
    setLoading(true);
    setError(null);
    const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
    const restrictions = dietaryRestrictions.length > 0 ? dietaryRestrictions.join(',') : '';
    const diet = dietaryRestrictions.includes('Vegan') ? 'vegan' : dietaryRestrictions.includes('Vegetarian') ? 'vegetarian' : ''; // Handle vegan/vegetarian
   
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
        params: {
          ingredients: ingredients.join(','),
          apiKey,
          intolerances: restrictions, // For intolerances like gluten-free, etc.
          diet,  // For vegan/vegetarian
          number: 6,
        }
      });
  
      console.log('API Request with Restrictions:', response.config.params); // Log the API request parameters for debugging
  
      const recipeIds = response.data.map((recipe: any) => recipe.id);
      const detailedRecipes = await Promise.all(recipeIds.map(async (id: number) => {
        const recipeResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
          params: { apiKey }
        });
        return recipeResponse.data;
      }));
  
      setRecipes(detailedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };  

  const fetchRecipes = async (selectedCategory: string, currentPage = 1) => {
    setLoading(true);
    setError(null);
    setCategory(selectedCategory);
    const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
    const restrictions = dietaryRestrictions.length > 0 ? dietaryRestrictions.join(',') : '';
    const diet = dietaryRestrictions.includes('Vegan') ? 'vegan' : dietaryRestrictions.includes('Vegetarian') ? 'vegetarian' : '';
  
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          apiKey,
          includeIngredients: ingredients.join(','),
          intolerances: restrictions,
          diet,  // For vegan/vegetarian
          type: selectedCategory.toLowerCase(),
          imageType: 'jpg',
          number: 6,
          offset: (currentPage - 1) * 8,
          addRecipeInformation: true
        }
      });
  
      console.log('API Request with Restrictions:', response.config.params); // Log the API request parameters for debugging
  
      if (response.data.results.length === 0) {
        setMoreRecipesAvailable(false);
      }
  
      if (currentPage === 1) {
        setRecipes(response.data.results);
      } else {
        setRecipes(prevRecipes => [...prevRecipes, ...response.data.results]);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };  

  // Handle "Load More" button click
  const loadMoreRecipes = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchRecipes(category, nextPage);
  };

  return (
    <div className='app'>
      <div className='header'>
        <div>
          <h1>Custom Recipe Generator</h1>
          <IngredientInput 
            ingredients={ingredients} 
            addIngredient={addIngredient} 
            removeIngredient={removeIngredient}
            generateRecipe={generateRecipe} 
          />
          <DietaryRestrictions setDietaryRestrictions={setDietaryRestrictions} />
        </div>
        <div className='hero-img'>
          <img src='../media/ingredients.jpg' alt='Ingredients' />
          <h2>Find tasty recipes based on ingredients you already have!</h2>
        </div>
      </div>
      
      <div className='favorite-categories'>
        {/* Pass the fetchRecipes function to RecipeCategories */}
        <RecipeCategories fetchRecipes={fetchRecipes} />
      </div>

      {/* Display the fetched recipes */}
      <div className='recipes'>
        <RecipeGenerator 
          recipes={recipes} 
          loading={loading}
          error={error}
        />
      </div>

      {/* "Load More Recipes" button */}
      {moreRecipesAvailable && recipes.length > 0 && (
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <button onClick={loadMoreRecipes} style={{ padding: '1rem', fontSize: '1rem' }}>
            Load More Recipes
          </button>
        </div>
      )}

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;