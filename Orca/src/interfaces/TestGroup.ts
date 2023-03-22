import EntityBase from './EntityBase';
import TestGroupSection from './TestGroupSection';

export default interface TestGroup extends EntityBase{
  sections: Array<TestGroupSection>;
};