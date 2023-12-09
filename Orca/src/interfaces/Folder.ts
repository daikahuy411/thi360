import EntityBase from './EntityBase'

export default interface Folder extends EntityBase {
  ParentId?: number
  Children?: Array<Folder>
  ParentName?: string
}
