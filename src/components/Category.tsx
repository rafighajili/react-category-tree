import { NestedCategoryType } from "../types/category-type";
import styles from "./Category.module.css";
import Button from "./Button.tsx";
import { useContext, useEffect, useState } from "react";
import CategoryContext from "../context/CategoryProvider.tsx";
import useOutsideClick from "../hooks/useClickOutside.tsx";
import uid from "../utils/uid.ts";

export default function Category(props: NestedCategoryType) {
  const { id, name, parentId, children, level } = props;

  const { data, setData } = useContext(CategoryContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [oldName, setOldName] = useState<string>(name);

  const changeName = (newName: string) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name: newName,
          };
        }
        return item;
      }),
    );
  };

  const handleAdd = () => {
    setData((prev) => [
      ...prev,
      {
        id: uid(),
        name: "",
        parentId: id,
      },
    ]);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const editResult = () => {
    setIsEditing(false);
    if (!name) {
      handleDelete();
    }
  };

  const confirmEdit = () => {
    setOldName(name);
    editResult();
  };

  const cancelEdit = () => {
    editResult();
    changeName(oldName);
  };

  const handleDelete = () => {
    setData((prev) =>
      prev
        .filter((item) => item.id !== id)
        .filter((item) => item.parentId !== id),
    );
  };

  const ref = useOutsideClick(() => {
    confirmEdit();
  });

  useEffect(() => {
    if (!name && !isEditing) {
      setIsEditing(true);
    }
  }, [name, isEditing]);

  return (
    <div className={styles.base}>
      <div
        ref={ref}
        className={`${styles.item} ${parentId === null ? styles.rootItem : ""}`}
      >
        {isEditing ? (
          <input
            className={styles.editing}
            value={data.find((item) => item.id === id)?.name}
            onChange={(e) => changeName(e.target.value)}
            placeholder="Category name"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                confirmEdit();
              } else if (e.key === "Escape") {
                cancelEdit();
              }
            }}
          />
        ) : (
          <div
            className={`${styles.name} ${
              parentId === null ? styles.noArrowBefore : ""
            } ${!children ? styles.noArrowAfter : ""} ${
              level === 1 ? styles.red : level === 2 ? styles.blue : ""
            }`}
          >
            {name}
          </div>
        )}

        {isEditing ? (
          <>
            <Button
              size="small"
              roundedFull={true}
              variant="warning"
              onClick={cancelEdit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>

            <Button
              size="small"
              roundedFull={true}
              variant="success"
              onClick={confirmEdit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </>
        ) : (
          <>
            <Button
              size="small"
              roundedFull={true}
              variant="neutral"
              onClick={handleAdd}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>

            {parentId !== null && (
              <>
                <Button
                  size="small"
                  roundedFull={true}
                  variant="neutral"
                  onClick={handleEdit}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                  </svg>
                </Button>

                <Button
                  size="small"
                  roundedFull={true}
                  variant="error"
                  onClick={handleDelete}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </>
            )}
          </>
        )}
      </div>

      {children && (
        <div className={styles.children}>
          {children.map((child) => (
            <Category key={child.id} {...child} />
          ))}
        </div>
      )}
    </div>
  );
}
