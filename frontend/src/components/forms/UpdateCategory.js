import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function UpdateCategory({
  currentCategory,
  getCategory,
  englishTitle,
  setEnglishTitle,
  spanishTitle,
  setSpanishTitle,
  categoryImage,
  setCategoryImage,
  getCategories,
  setShowModal,
  addSpanish,
  setAddSpanish
}) {
  const [updatedMsg, setUpdatedMsg] = useState("");

  const clearForm = () => {
    setEnglishTitle("");
    setSpanishTitle("");
    setCategoryImage("");
    setAddSpanish(false);
  };

  const hideFormMsg = () => {
    setTimeout(() => {
      setUpdatedMsg("");
    }, 5000);
  };

  const updateCategory = async (e) => {
    e.preventDefault();

    const category = {
      englishTitle,
      spanishTitle,
      categoryImage
    };

    try {
      const res = await fetch(`/api/categories/${currentCategory._id}`, {
        method: "PATCH",
        body: JSON.stringify(category),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        setUpdatedMsg(
          <div className="form-msg button red">Category not updated.</div>
        );
      } else {
        getCategories();
        getCategory(currentCategory._id);
        setUpdatedMsg(
          <div className="form-msg button green">Category updated.</div>
        );
        hideFormMsg();
      }
    } catch (error) {}
  };

  return (
    <div className="form-modal">
      <form className="form" onSubmit={updateCategory}>
        <h1>Update Category</h1>

        <div className="form-section">
          <input
            className={englishTitle ? "not-empty" : "empty"}
            name="englishTitle"
            type="text"
            onChange={(e) => setEnglishTitle(e.target.value)}
            value={englishTitle}
            required
          />
          <label>English Title</label>
        </div>

        {currentCategory?.spanishTitle && (
          <div className="form-section">
            <input
              className={spanishTitle ? "not-empty" : "empty"}
              name="spanishTitle"
              type="text"
              onChange={(e) => setSpanishTitle(e.target.value)}
              value={spanishTitle}
            />
            <label>Spanish Title</label>
          </div>
        )}

        {!currentCategory?.spanishTitle && addSpanish && (
          <div className="form-section">
            <input
              className={spanishTitle ? "not-empty" : "empty"}
              name="spanishTitle"
              type="text"
              onChange={(e) => setSpanishTitle(e.target.value)}
              value={spanishTitle}
            />
            <label>Spanish Title</label>
          </div>
        )}

        {!currentCategory?.spanishTitle && !addSpanish && (
          <div
            className="button green"
            onClick={() => {
              setAddSpanish(!addSpanish);
            }}
          >
            <span>Add Spanish</span>
          </div>
        )}

        <div className="form-section">
          <input
            className={categoryImage ? "not-empty" : "empty"}
            name="categoryImage"
            type="URL"
            onChange={(e) => setCategoryImage(e.target.value)}
            value={categoryImage}
            required
          />
          <label>Category Image</label>
        </div>

        <div className="form-buttons">
          {englishTitle && categoryImage ? (
            <button className="button green" type="submit">
              <span>Update Category</span>
            </button>
          ) : (
            <button className="button green" type="submit" disabled>
              <span>Update Category</span>
            </button>
          )}

          <div
            className="button red"
            onClick={() => {
              clearForm();
              setShowModal("");
            }}
          >
            <span>Cancel</span>
          </div>
        </div>

        {updatedMsg}
      </form>
    </div>
  );
}
