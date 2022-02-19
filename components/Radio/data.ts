import { StringOrNumber } from "../../Type/Common";

interface valueRadio {
    name: StringOrNumber;
    value: StringOrNumber;
}
export interface GroupRadioLayout {
    field: {};
    label: string;
    data: valueRadio[];
}




