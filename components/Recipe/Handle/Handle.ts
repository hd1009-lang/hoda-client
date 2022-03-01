import { IngredientPost } from '../../../pages/dashboard/recipe/create';

export const HandleIncreaseIngredient = (currentList: { [key: string]: IngredientPost[] }, data: IngredientPost) => {
    let isSame = false;
    const newList = { ...currentList };
    if (!newList.hasOwnProperty(data.nameCate)) {
        return;
    }
    newList[data.nameCate].map((item) => {
        if (item._id === data._id) {
            isSame = true;
            item.quantity!++;
        }
    });
    if (!isSame) {
        newList[data.nameCate].push(data);
    }
    return newList;
};

export const HandleDecreaseIngredient = (currentList: { [key: string]: IngredientPost[] }, data: IngredientPost) => {
    const newList = { ...currentList };
    if (!newList.hasOwnProperty(data.nameCate)) {
        return;
    }
    newList[data.nameCate].map((item, index) => {
        if (item._id === data._id) {
            item.quantity! > 1 ? item.quantity-- : newList[data.nameCate].splice(index, 1);
        }
    });
    return newList;
};

export const calcTotalNutrition = (list: { [key: string]: IngredientPost[] }) => {
    const value: { calo: number; fat: number; protein: number; carb: number } = {
        calo: 0,
        fat: 0,
        protein: 0,
        carb: 0,
    };

    if (Object.keys(list).length > 0) {
        Object.values(list).forEach((items) => {
            items.forEach((item) => {
                value.calo += item.nutrition?.calo! * item.quantity;
                value.fat += item.nutrition?.fat! * item.quantity;
                value.protein += item.nutrition?.protein! * item.quantity;
                value.carb += item.nutrition?.carb! * item.quantity;
            });
        });
        // setTotal(value);
    }
    return value;
};
