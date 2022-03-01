import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import React, { useState, memo } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import Image from 'next/image';
import { AiFillFileImage } from 'react-icons/ai';
import ServiceApis from '../../../api/Service';
import { RecipeModel, ResponseRecipeAfter } from '../../../Type/Recipe';
import ImgOfStep from './ImgOfStep';
interface BoxStepLayout {
    onCreate: (data: RecipeModel) => void;
    data?: ResponseRecipeAfter;
}
const BoxStep = ({ onCreate, data }: BoxStepLayout) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
        setValue,
    } = useForm<RecipeModel>({
        defaultValues: data,
        mode: 'onBlur',
    });
    const { fields, append, remove } = useFieldArray({
        name: 'data',
        control,
    });
    const addImgRecipe = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let url = '';
        if (e.target.files) {
            const { data } = await ServiceApis.uploadImg(e.target.files[0]);
            url = data;
        }
        setValue('img', url);
        // setAvartar(url);
    };
    return (
        <Flex justifyContent={'center'} width={'100%'} height="100%" bg="white">
            <form onSubmit={handleSubmit(onCreate)}>
                <FormControl isInvalid={Boolean(errors.title)}>
                    <FormLabel htmlFor="name">Tiêu đề</FormLabel>
                    <Input
                        id="title"
                        placeholder="Tiêu đề bài viết"
                        {...register('title', { required: 'Vui lòng nhập tiêu đề' })}
                    />
                    <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.img)}>
                    <FormLabel htmlFor="img">Hình nền</FormLabel>
                    {getValues('img') && (
                        <Image
                            src={getValues('img') as string}
                            width={'30px'}
                            height={'30px'}
                            alt={getValues('title')}
                        />
                    )}

                    <FormLabel htmlFor="img" cursor={'pointer'}>
                        Click
                    </FormLabel>
                    <Input type={'file'} id="img" placeholder="Ảnh bài viết" onChange={addImgRecipe} hidden />
                    <Input
                        type={'text'}
                        id="img"
                        placeholder="Ảnh bài viết"
                        {...register('img', { required: 'Vui lòng nhập ảnh' })}
                        onChange={addImgRecipe}
                    />
                    <FormErrorMessage>{errors.img && errors.img.message}</FormErrorMessage>
                </FormControl>

                <FormControl>
                    {fields.map((field, index) => {
                        return (
                            <div key={field.id}>
                                <section className={'section'} key={field.id}>
                                    <span>{index + 1}</span>
                                    <input
                                        placeholder="content"
                                        type="text"
                                        {...register(`data.${index}.content` as const, {
                                            required: true,
                                        })}
                                        className={errors?.data?.[index]?.content ? 'error' : ''}
                                        defaultValue={field.content}
                                    />
                                    <ImgOfStep nestIndex={index} {...{ control, register, getValues }} />
                                    <button type="button" onClick={() => remove(index)}>
                                        Xoá
                                    </button>
                                </section>
                            </div>
                        );
                    })}
                </FormControl>
                <button
                    type="button"
                    onClick={() =>
                        append({
                            content: '',
                            img: [],
                        })
                    }
                >
                    Thêm bước
                </button>
                <Button mt={4} bg="lightGray" isLoading={isSubmitting} type="submit">
                    Submit
                </Button>
            </form>
        </Flex>
        // <div>hello</div>
    );
};

export default BoxStep;
