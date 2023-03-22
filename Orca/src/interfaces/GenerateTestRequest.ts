export default interface GenerateTestRequest{
    name: string;
    quantity: number;
    testGroupId:number;
    startIndex:number;
    allowDuplicateQuestionInTests: boolean;
};