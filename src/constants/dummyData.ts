import { CategoryType } from "../types/category-type";
import uid from "../utils/uid.ts";

const data: CategoryType[] = [
  {
    id: uid(),
    name: "Categories",
    parentId: null,
  },
];

export default data;
