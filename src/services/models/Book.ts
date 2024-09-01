import { Category } from "./Category";
import { Tag } from "./Tag";


export interface Book {
    id: number;
    name: string;
    description: string;
    category: Category;
    tags: Tag[];
}
