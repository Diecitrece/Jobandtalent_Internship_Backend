export interface CRUD<type, type2> 
{
    create: (item: type2) => Promise<type| undefined>;
    getAll: () => Promise<type[]>;
    getOne: (id: string) => Promise<type | undefined>;
}
