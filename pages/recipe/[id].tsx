import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import RecipeApis from '../../api/Recipe';
import { ResponseRecipeAfter } from '../../Type/Recipe';
interface DetailRecipeLayout {
    data: ResponseRecipeAfter;
}
const DetailRecipe: NextPage<DetailRecipeLayout> = ({ data }) => {
    console.log(data);

    return <div>DetailRecipe</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
    const result = await RecipeApis.getAllRecipe(0);
    const paths = result.data.map((item) => ({
        params: {
            id: item._id as string,
        },
    }));
    return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const id = params?.id;
        const result = await RecipeApis.getDetailRecipe(id as string);
        return {
            props: {
                data: result,
            },
            revalidate: 60*60*12
        };
    } catch (err: any) {
        return { props: { err: err.message } };
    }
};
export default DetailRecipe;
