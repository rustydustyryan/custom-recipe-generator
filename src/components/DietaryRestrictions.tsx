import React, { useState } from 'react';

interface DietaryRestrictionsProps {
  setDietaryRestrictions: (restrictions: string[]) => void;
}

const DietaryRestrictions: React.FC<DietaryRestrictionsProps> = ({ setDietaryRestrictions }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (restriction: string) => {
    const currentIndex = selected.indexOf(restriction);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(restriction);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
    setDietaryRestrictions(newSelected);
  };

  return (
    <div className='dietary-restrictions' style={{ border: '1px solid #ccc', borderRadius: '8px', margin: 'auto', padding: '.5rem 0 2rem 0' }}>
      <h3>Select Dietary Restrictions</h3>
      <label style={{ marginRight: '1rem'}}>
        <input 
          type="checkbox" 
          onChange={() => handleToggle('Vegetarian')}  
          style={{ margin: '0'}} 
        /> Vegetarian
      </label>
      <label style={{ marginRight: '1rem'}}>
        <input 
          type="checkbox" 
          onChange={() => handleToggle('Vegan')} 
          style={{ margin: '0'}} 
        /> Vegan
      </label>
      <label style={{ marginRight: '1rem'}}>
        <input 
          type="checkbox" 
          onChange={() => handleToggle('Gluten-Free')} 
          style={{ margin: '0'}} 
        /> Gluten-Free
      </label>
    </div>
  );
};

export default DietaryRestrictions;
