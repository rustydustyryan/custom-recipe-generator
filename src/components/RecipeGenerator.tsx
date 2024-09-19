import React from 'react';

interface RecipeGeneratorProps {
  recipes: any[];
  loading: boolean;
  error: string | null;
  loadingMore: boolean;
}

const RecipeGenerator: React.FC<RecipeGeneratorProps> = ({ recipes, loading, error, loadingMore }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (recipes.length === 0) {
    return <p>No recipes found. Try adding ingredients or choosing a category.</p>;
  }

  return (
    <div>
      <h2>Recipes:</h2>
      <div className='recipes-container' style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem', background: '#e9e8e8', padding: '1rem 2rem', borderRadius: '8px', marginBottom: '2rem' }}>
        {recipes.map(recipe => (
          <div key={recipe.id}>
            <h3><b>{recipe.title}</b></h3>
            {recipe.image && 
              <img 
                src={recipe.image.replace('90x90', '480x360')}
                alt={recipe.title} 
                style={{ width: '66.3%', height: 'auto', aspectRatio: '3 / 2' }} 
              />
            }
            
            {/* Ensure the summary exists before trying to replace HTML tags */}
            <p>{recipe.summary ? recipe.summary.replace(/(<([^>]+)>)/gi, "") : "No summary available."}</p>

            <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
              View Full Recipe
            </a>
          </div>
        ))}
      </div>

      {loadingMore && <p>Loading more recipes...</p>} {/* Show a loading message while loading more */}
    </div>
  );
};

export default RecipeGenerator;
