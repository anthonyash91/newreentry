import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function CategoryForm({ setShowModal, getCategories }) {
  const [englishTitle, setEnglishTitle] = useState("");
  const [spanishTitle, setSpanishTitle] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const [addSpanish, setAddSpanish] = useState(false);

  const [categoryFormMsg, setCategoryFormMsg] = useState("");

  const clearForm = () => {
    setEnglishTitle("");
    setSpanishTitle("");
    setCategoryImage("");
    setAddSpanish(false);
  };

  const cancel = () => {
    setShowModal("");
    setTimeout(() => {
      clearForm();
    }, 1000);
  };

  const hideFormMsg = () => {
    setTimeout(() => {
      setCategoryFormMsg("");
    }, 5000);
  };

  const createCategory = async (e) => {
    e.preventDefault();

    const category = {
      englishTitle,
      spanishTitle,
      categoryImage
    };

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(category),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const json = await res.json();

      if (!res.ok) {
        setCategoryFormMsg(
          <div className="form-msg button red">
            {json.error} {json.emptyFields}
          </div>
        );
        hideFormMsg();
      } else {
        setCategoryFormMsg(
          <div className="form-msg button green">
            New category "{category.englishTitle}" added!
          </div>
        );
        hideFormMsg();
        console.log(category);
        clearForm();
        getCategories();
      }
    } catch (error) {
      setCategoryFormMsg(<div className="form-msg button red">{error}</div>);
      hideFormMsg();
      console.log(error);
    }
  };

  return (
    <div className="form-modal">
      <form className="form" onSubmit={createCategory}>
        <h1>Add a New Category</h1>

        <div className="form-section">
          <input
            className={englishTitle ? "not-empty" : "empty"}
            name="englishTitle"
            type="text"
            onChange={(e) => setEnglishTitle(e.target.value)}
            value={englishTitle}
          />
          <label>English Title</label>
        </div>

        {addSpanish && (
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

        {!addSpanish && (
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
          />
          <label>Category Image</label>
        </div>

        <div className="form-buttons">
          {englishTitle && categoryImage ? (
            <button className="button green" type="submit">
              <span>Create Category</span>
            </button>
          ) : (
            <button className="button green" type="submit" disabled>
              <span>Create Category</span>
            </button>
          )}

          <div
            className="button red"
            onClick={() => {
              clearForm();
            }}
          >
            <span>Cancel</span>
          </div>
        </div>

        {categoryFormMsg && { categoryFormMsg }}
      </form>
    </div>
  );
}
