import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function CourseForm({
  setShowModal,
  getCourses,
  sortCategories
}) {
  const [englishTitle, setEnglishTitle] = useState("");
  const [englishLink, setEnglishLink] = useState("");
  const [spanishTitle, setSpanishTitle] = useState("");
  const [spanishLink, setSpanishLink] = useState("");
  const [category, setCategory] = useState("");
  const [contentType, setContentType] = useState("");
  const [active, setActive] = useState(true);

  const [addSpanish, setAddSpanish] = useState(false);

  const [courseFormMsg, setCourseFormMsg] = useState("");

  const clearForm = () => {
    setEnglishTitle("");
    setEnglishLink("");
    setSpanishTitle("");
    setSpanishLink("");
    setCategory("");
    setContentType("");
    setActive(true);
    setAddSpanish(false);
  };

  const cancel = () => {
    setShowModal("");

    setTimeout(() => {
      clearForm();
    }, 2000);
  };

  const hideFormMsg = () => {
    setTimeout(() => {
      setCourseFormMsg("");
    }, 5000);
  };

  const createCourse = async (e) => {
    e.preventDefault();

    const course = {
      englishTitle,
      englishLink,
      spanishTitle,
      spanishLink,
      category,
      contentType,
      active
    };

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(course),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        setCourseFormMsg(
          <div className="form-msg button red">New course not added!</div>
        );
        hideFormMsg();
      } else {
        setCourseFormMsg(
          <div className="form-msg button green">
            New course "{course.englishTitle}" added!
          </div>
        );
        hideFormMsg();
        console.log(course);
        clearForm();
        getCourses();
      }
    } catch (error) {
      setCourseFormMsg(
        <div className="form-msg button red">Course not added.</div>
      );
      hideFormMsg();
      console.log(error);
    }
  };

  return (
    <div className="form-modal">
      <form className="form" onSubmit={createCourse}>
        <h1>Add a New Course</h1>

        <div className="form-section">
          <input
            className={englishTitle && "not-empty"}
            name="englishTitle"
            type="text"
            onChange={(e) => setEnglishTitle(e.target.value)}
            value={englishTitle}
            required
          />
          <label>English Title</label>
        </div>

        <div className="form-section">
          <input
            className={englishLink && "not-empty"}
            name="englishLink"
            type="url"
            onChange={(e) => setEnglishLink(e.target.value)}
            value={englishLink}
            required
          />
          <label>English Link</label>
        </div>

        <AnimatePresence>
          {addSpanish && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="form-section">
                  <input
                    className={spanishTitle && "not-empty"}
                    name="spanishTitle"
                    type="text"
                    onChange={(e) => setSpanishTitle(e.target.value)}
                    value={spanishTitle}
                  />
                  <label>Spanish Title</label>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="form-section">
                  <input
                    className={spanishLink && "not-empty"}
                    name="spanishLink"
                    type="url"
                    onChange={(e) => setSpanishLink(e.target.value)}
                    value={spanishLink}
                  />
                  <label>Spanish Link</label>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

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
          <select
            className={category && "not-empty"}
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option></option>
            {sortCategories?.map((i) => (
              <>
                <option value={i.englishTitle}>{i.englishTitle}</option>
              </>
            ))}
          </select>
          <label>Category</label>
        </div>

        <div className="form-buttons">
          <div
            className={`button ${active ? "selected-green" : "green-outline"}`}
            onClick={() => {
              setActive(true);
            }}
          >
            <span>Active</span>
          </div>

          <div
            className={`button ${!active ? "selected-red" : "red-outline"}`}
            onClick={() => {
              setActive(false);
            }}
          >
            <span>Inactive</span>
          </div>
        </div>

        <div className="form-section">
          <select
            className={contentType && "not-empty"}
            name="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option></option>
            <option value="video">Video</option>
            <option value="PDF">PDF</option>
          </select>
          <label>Content Type</label>
        </div>

        <div className="form-buttons">
          {englishTitle && englishLink && category && contentType ? (
            <button className="button green" type="submit">
              <span>Create Course</span>
            </button>
          ) : (
            <button className="button green" type="submit" disabled>
              <span>Create Course</span>
            </button>
          )}

          <div
            className="button red"
            onClick={() => {
              cancel();
            }}
          >
            <span>Cancel</span>
          </div>
        </div>

        <AnimatePresence>
          {courseFormMsg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {courseFormMsg}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
