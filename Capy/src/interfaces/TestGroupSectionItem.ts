import EntityBase from './EntityBase';

export default interface TestGroupSectionItem extends EntityBase{
  testGroupId: number;
  testGroupSectionId: number;
  numberOfQuestion: number;
  type: number;
  scoreRatio: number;
  value: string;
};