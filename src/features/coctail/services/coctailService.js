import axios from 'axios';
import { COCTAIL_BY_ID_URL, COCTAILS_BY_INGR_URL, INGREDIENT_LIST_URL } from '../../../constants/api';

// Получение коктейля по ID
export const getCoctailById = async (id) => { 
  try {
    const response = await axios.get(`${COCTAIL_BY_ID_URL}${id}`);
    return response.data.drinks[0];
  } catch (error) {
    console.error('Ошибка при получении коктейля по ID:', error);
    throw error;
  }
};

// Получение коктейлей по ингредиентам
export const getCoctails = async (ingredient) => { // ok ========================>
  try {
    const response = await axios.get(`${COCTAILS_BY_INGR_URL}${ingredient}`);
    return response.data.drinks;
  } catch (error) {
    console.error('Ошибка при получении коктейлей по ингредиентам:', error);
    throw error;
  }
};

// Получение списка ингредиентов
export const getIngredients = async () => { // ok ========================>
  try {
    const response = await axios.get(INGREDIENT_LIST_URL);
    return response.data.drinks;
  } catch (error) {
    console.error('Ошибка при загрузке ингредиентов:', error);
    throw error;
  }
};


