import { IngredientPost } from '../../../pages/recipe/create';

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
