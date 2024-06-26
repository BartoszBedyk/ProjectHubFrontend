export interface SearchForm
{
    searchCriteria: SearchCriteria
    page: 1
    size: 1
    searchSort: SearchSort
}

export interface SearchCriteria{
    fieldName: "name"
    value: string,
    operator: "EQUALS"

}

export interface SearchSort{
    by: "name",
    order: "ASC",
}


