type SortDirection = number;
const sortAttributes = ['id', 'created_at'] as const;
type SortAttribute = typeof sortAttributes[number]

export interface SortMethod {
    attribute: SortAttribute
    direction: SortDirection
}

export const alphaAscendingSortMethod: SortMethod = {attribute: 'id', direction: 1}
export const alphaDescendingSortMethod: SortMethod = {attribute: 'id', direction: -1}
export const createdAtOldestFirstSortMethod: SortMethod = {attribute: 'created_at', direction: 1}
export const createdAtNewestFirstSortMethod: SortMethod = {attribute: 'created_at', direction: -1}
