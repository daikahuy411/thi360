import EntityBase from './EntityBase';

export default interface Catalog extends EntityBase{
    ParentId? :number;
    Children?: Array<Catalog>;
    ParentName?: string;
};