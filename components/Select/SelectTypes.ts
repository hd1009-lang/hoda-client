import { StringOrNumber } from '../../Type/Common';

export interface SelectValueType {
    description: StringOrNumber;
    value: StringOrNumber;
}

export interface SelectBoxLayout {
  data: SelectValueType[];
  field: {};
  label: string;
}
