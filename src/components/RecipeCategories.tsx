import React, { useState } from 'react';

interface RecipeCategoriesProps {
  fetchRecipes: (category: string) => void;
}

const RecipeCategories: React.FC<RecipeCategoriesProps> = ({ fetchRecipes }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const activeFavorite = (category: string) => {
    setSelectedCategory(category);  // Update selected category state
    fetchRecipes(category);         // Fetch recipes when category is clicked
    console.log(`Selected category: ${category}`); // Debugging
  };

  const getOpacity = (category: string) => {
    return selectedCategory === category ? 0.65 : 1; // If selected, reduce opacity
  };

  return (
    <>
      <h2 style={{ textAlign: 'center', margin: '0' }}>Favorites</h2>
      <div className='favorites-container'>
        <div>
          <h3>Main Courses</h3>
          <img 
            src='../media/pasta.jpg' 
            alt='Main Course' 
            onClick={() => activeFavorite('main course')} 
            style={{ opacity: getOpacity('main course') }}
          />
        </div>
        <div>
          <h3>Salads</h3>
          <img 
            src='../media/salad.jpg' 
            alt='Salad' 
            onClick={() => activeFavorite('salad')} 
            style={{ opacity: getOpacity('salad') }}
          />
        </div>
        <div>
          <h3>Appetizers</h3>
          <img 
            src='../media/appetizer.jpg' 
            alt='Appetizer' 
            onClick={() => activeFavorite('appetizer')} 
            style={{ opacity: getOpacity('appetizer') }}
          />
        </div>
        <div>
          <h3>Soups</h3>
          <img 
            src='../media/soup.jpg' 
            alt='Soup' 
            onClick={() => activeFavorite('soup')} 
            style={{ opacity: getOpacity('soup') }}
          />
        </div>
        <div>
          <h3>Desserts</h3>
          <img 
            src='../media/dessert.jpg' 
            alt='Dessert' 
            onClick={() => activeFavorite('dessert')} 
            style={{ opacity: getOpacity('dessert') }}
          />
        </div>
      </div>
    </>
  );
};

export default RecipeCategories;