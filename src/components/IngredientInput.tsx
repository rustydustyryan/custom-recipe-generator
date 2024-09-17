import React, { useState } from 'react';
import { HiOutlineX } from "react-icons/hi";
import { HiOutlinePlus } from "react-icons/hi";
import { IoSparklesSharp } from "react-icons/io5";

interface IngredientInputProps {
  ingredients: string[];
  addIngredient: (ingredient: string) => void;
  removeIngredient: (index: number) => void;
  generateRecipe: () => void;  // Function to generate recipe
}

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, addIngredient, removeIngredient, generateRecipe }) => {
  const [ingredient, setIngredient] = useState('');

  const handleAdd = () => {
    if (ingredient.trim()) {
      addIngredient(ingredient);
      setIngredient(''); // Reset input field after adding
    }
  };

  return (
    <>
      <div>
        <input 
          type="text" 
          value={ingredient} 
          onChange={(e) => setIngredient(e.target.value)} 
          placeholder="Enter an ingredient" 
          style={{ marginRight: '1rem', padding: '.93rem', fontSize: '1rem', width: '49%', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={handleAdd}>Add Ingredient <HiOutlinePlus style={{ margin: '0 0 -.14rem 0' }} /></button>
      </div>

      <div className='added-ingredients' style={{ marginTop: '1rem', display: 'flex' }}>
        {ingredients.map((ing, index) => (
          <div key={index} style={{ display: 'flex', height: '5px', padding: '0 1rem', marginTop: '-.7rem' }}>
            <span style={{ marginRight: '0.1rem' }}>{ing}</span>
            <HiOutlineX 
              className='outline-x' 
              onClick={() => removeIngredient(index)} 
              style={{ cursor: 'pointer', marginTop: '-.2rem' }}
            />
          </div>
        ))}
      </div>

      {/* Generate Recipe Button */}
      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <button className='accent-btn' onClick={generateRecipe}>
          Generate Recipes <IoSparklesSharp style={{ margin: '0 0 -.1rem .1rem', fontSize: '1.1rem' }}/>
        </button>
      </div>
    </>
  );
};

export default IngredientInput;
