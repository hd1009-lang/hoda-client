export type BmiModel = {
    weight?: number;
    height?: number;
    gender?: number;
    activity?: number;
    yearOfBirth?: number;
    bmi?: number;
};

const optionActivity = [
    {
        description: 'Ít vận động (Người chỉ ăn, ngủ, làm việc văn phòng)',
        value: 1.2,
    },
    {
        description: ' Vận động nhẹ (Người tập luyện thể dục 1 – 3 lần/tuần)',
        value: 1.375,
    },
    {
        description: ' Vận động vừa (Người vận động hàng ngày, tập luyện 3 – 5 lần/tuần)',
        value: 1.55,
    },
    {
        description:
            'Vận động nặng (Người vận động thường xuyên, chơi thể dục thể thao và tập luyện từ 6 – 7 lần/ tuần)',
        value: 1.725,
    },
    {
        description: 'Vận động rất nặng (Người lao động phổ thông, tập luyện thể dục 2 lần/ngày)',
        value: 1.9,
    },
];

const optionGender = [
    { name: 'nam', value: 1 },
    { name: 'nữ', value: 0 },
];

const data = {
    optionActivity,
    optionGender,
};

export default data;
