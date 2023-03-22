import EntityBase from './EntityBase';
import TestGroupSectionItem from './TestGroupSectionItem';

export default interface TestGroupSection extends EntityBase{
  testGroupId: number;
  order: number;
  tType: number;
  items: Array<TestGroupSectionItem>;
};