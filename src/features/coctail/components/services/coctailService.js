// import axios from 'axios';
// import { COCTAIL_BY_ID_URL, COCTAILS_BY_INGR_URL, RANDOM_COCTAIL_URL } from '@/constants/api';

// export const getCoctailById = async (id) => {
//   const response = await axios.get(`${COCTAIL_BY_ID_URL}${id}`);
//   return response.data.drinks[0];
// };

// export const getCoctailsByIngredient = async (ingredient) => {
//   const response = await axios.get(`${COCTAILS_BY_INGR_URL}${ingredient}`);
//   return response.data.drinks;
// };

// export const getRandomCoctail = async () => {
//   const response = await axios.get(RANDOM_COCTAIL_URL);
//   return response.data.drinks[0];
// };



// Теперь в компонентах мы можем просто вызывать методы из сервиса:

// javascript
// Копировать код
// import { getRandomCoctail } from '@/features/coctail/services/coctailService';

// const coctail = await getRandomCoctail();