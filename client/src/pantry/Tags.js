export default class Tags {
    static fetchIngredient = async (id) => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/ingredient/${id}`);
        if (!response.ok) {
          return {
            name_scientific: '',
            description: ''
          }
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error fetching ingredient #${id}:`, error);
        throw error; 
      }
    }
  
    static ingredientTag = (id) => {
      console.log('tag', id);
      return this.fetchIngredient(id);
    }
  }
  