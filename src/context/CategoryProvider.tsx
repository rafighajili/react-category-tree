import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { CategoryType } from "../types/category-type";
import dummyData from "../constants/dummyData.ts";

const CategoryContext = createContext<{
  data: CategoryType[];
  setData: Dispatch<SetStateAction<CategoryType[]>>;
}>({ data: [], setData: () => {} });

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CategoryType[]>(dummyData);

  return (
    <CategoryContext.Provider value={{ data, setData }}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryContext;
