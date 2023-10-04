export type CategoryType = {
  id: string;
  name: string;
  parentId: string | null;
};

type NestedCategoryType = CategoryType & {
  children?: CategoryType[];
  level?: number;
};
