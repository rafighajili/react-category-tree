import { CategoryType, NestedCategoryType } from "../types/category-type";

export default function buildCategoriesTree(
  data: CategoryType[],
  parentId: CategoryType["parentId"] = null,
  level: number = 0,
): NestedCategoryType[] {
  const tree: NestedCategoryType[] = [];

  [...data].forEach((item) => {
    const nestedItem: NestedCategoryType = { ...item, level };

    if (item.parentId === parentId) {
      const children = buildCategoriesTree(data, item.id, level + 1);

      if (children.length) {
        nestedItem.children = children;
      }

      tree.push(nestedItem);
    }
  });

  return tree;
}
