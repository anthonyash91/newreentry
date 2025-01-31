import { useState } from "react";
import UpdateCategory from "../forms/UpdateCategory";
import { AnimatePresence, motion } from "motion/react";

export default function CategoryList({
  showModal,
  setShowModal,
  categories,
  getCategories
}) {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [englishTitle, setEnglishTitle] = useState("");
  const [spanishTitle, setSpanishTitle] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [addSpanish, setAddSpanish] = useState(false);

  const getCategory = async (id) => {
    try {
      const res = await fetch(`/api/categories/${id}`);
      const categoryData = await res.json();

      if (res.ok) {
        setCurrentCategory(categoryData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        getCategories();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {categories?.map((i) => (
        <>
          {i.englishTitle}
          <button
            onClick={() => {
              deleteCategory(i._id);
            }}
          >
            Delete
          </button>

          <button
            onClick={() => {
              setShowModal("update category");
              getCategory(i._id);
              setEnglishTitle(i.englishTitle);
              if (i.spanishTitle !== "") {
                setSpanishTitle(i.spanishTitle);
                setAddSpanish(true);
              } else {
                setAddSpanish(false);
              }

              setCategoryImage(i.categoryImage);
            }}
          >
            update
          </button>
          <br />
        </>
      ))}

      <AnimatePresence>
        {showModal === "update category" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <UpdateCategory
              currentCategory={currentCategory}
              getCategory={getCategory}
              englishTitle={englishTitle}
              setEnglishTitle={setEnglishTitle}
              spanishTitle={spanishTitle}
              setSpanishTitle={setSpanishTitle}
              categoryImage={categoryImage}
              setCategoryImage={setCategoryImage}
              getCategories={getCategories}
              setShowModal={setShowModal}
              addSpanish={addSpanish}
              setAddSpanish={setAddSpanish}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
