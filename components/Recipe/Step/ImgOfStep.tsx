import { Flex, Input } from '@chakra-ui/react';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import ServiceApis from '../../../api/Service';
interface ImgOfStep {
    nestIndex: number;
    control: any;
    register: any;
    getValues: any;
}
const ImgOfStep = ({ nestIndex, control, register, getValues }: ImgOfStep) => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `data[${nestIndex}].img`,
    });
    const addImgInStep = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let Url = '';
        if (e.target.files) {
            const { data } = await ServiceApis.uploadImg(e.target.files[0]);
            Url = data;
        }

        append(Url);
        return '';
    };
    return (
        <Flex>
            {fields.map((item, k) => {
                return (
                    <div key={k} style={{ marginLeft: 20 }}>
                        <label>Nested Array:</label>
                        <input
                            placeholder="content"
                            type="text"
                            {...register(`data[${nestIndex}].img[${k}]` as const, {
                                required: true,
                            })}
                            defaultValue={item}
                            hidden
                        />

                        {item && (
                            <img
                                src={getValues(`data[${nestIndex}].img[${k}]` as const)}
                                alt="step"
                                style={{ width: '30px', height: '30px' }}
                            />
                        )}

                        <button type="button" onClick={() => remove(k)}>
                            Delete Nested
                        </button>
                    </div>
                );
            })}
            <input type="file" name="file" placeholder="Image" onChange={addImgInStep} />
            {/* <button type="button" onClick={() => addImgInStep()}>
                Append Nested
            </button> */}

            <hr />
        </Flex>
    );
};

export default ImgOfStep;
