interface valueRadio {
    name: StringOrNumber;
    value: StringOrNumber;
}
export interface GroupRadioLayout {
    field: {};
    label: string;
    data: valueRadio[];
}

type StringOrNumber = string | number;

const option = [
    { name: 'nam', value: 1 },
    { name: 'nữ', value: 0 },
];
const name = 'gender';
const defaultValue = 0;
const data = {
    option,
    name,
};
export default data;
