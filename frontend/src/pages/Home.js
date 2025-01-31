import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import CourseForm from "../components/forms/CourseForm";
import CategoryForm from "../components/forms/CategoryForm";
import CategoryList from "../components/lists/CategoryList";
import CourseList from "../components/lists/CourseList";

export default function Home() {
  const [courses, setCourses] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [categories, setCategories] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  const [showModal, setShowModal] = useState("");

  const [englishTitle, setEnglishTitle] = useState("");
  const [spanishTitle, setSpanishTitle] = useState("");
  const [addSpanish, setAddSpanish] = useState(false);
  const [formMsg, setFormMsg] = useState("");

  // new course form
  const [englishLink, setEnglishLink] = useState("");
  const [spanishLink, setSpanishLink] = useState("");
  const [category, setCategory] = useState("");
  const [contentType, setContentType] = useState("");
  const [active, setActive] = useState(true);
  // end new course form

  // new category form
  const [categoryImage, setCategoryImage] = useState("");
  // end new category form

  const params = useParams();

  const clearForm = () => {
    setEnglishTitle("");
    setEnglishLink("");
    setSpanishTitle("");
    setSpanishLink("");
    setCategory("");
    setContentType("");
    setActive(true);
    setAddSpanish(false);
    setCategoryImage("");
    setFormMsg("");
  };

  const cancel = () => {
    setShowModal("");
  };

  const hideFormMsg = () => {
    setTimeout(() => {
      setFormMsg("");
    }, 5000);
  };

  // get all courses
  const getCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const coursesData = await res.json();

      if (res.ok) {
        setCourses(coursesData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // end get all courses

  // get singular course
  const getCourse = async (id) => {
    try {
      const res = await fetch(`/api/courses/${id}`);
      const courseData = await res.json();

      if (res.ok) {
        setCurrentCourse(courseData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // end get singluar course

  // create a course
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
        setFormMsg(
          <div className="form-msg button red">New course not added!</div>
        );
        hideFormMsg();
      } else {
        setFormMsg(
          <div className="form-msg button green">
            New course "{course.englishTitle}" added!
          </div>
        );
        hideFormMsg();
        clearForm();
        getCourses();
      }
    } catch (error) {
      setFormMsg(<div className="form-msg button red">Course not added.</div>);
      hideFormMsg();
      console.log(error);
    }
  };
  // end create a course

  // delete a course
  const deleteCourse = async (id) => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        getCourses();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // end delete a course

  // update course
  const updateCourse = async (e) => {
    e.preventDefault();

    const course = {
      englishTitle,
      spanishTitle,
      englishLink,
      spanishLink,
      category,
      contentType,
      active
    };

    try {
      const res = await fetch(`/api/courses/${currentCourse._id}`, {
        method: "PATCH",
        body: JSON.stringify(course),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        setFormMsg(
          <div className="form-msg button red">Course not updated.</div>
        );
      } else {
        getCourses();
        getCourse(currentCourse._id);
        setFormMsg(
          <div className="form-msg button green">Course updated.</div>
        );
        hideFormMsg();
      }
    } catch (error) {}
  };
  // end update course

  // get all categories
  const getCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const categoriesData = await res.json();

      if (res.ok) {
        setCategories(categoriesData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // end get all categories

  // get singular category
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
  // end get singluar category

  // create a category
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

      if (!res.ok) {
        setFormMsg(
          <div className="form-msg button red">New category not added!</div>
        );
        hideFormMsg();
      } else {
        setFormMsg(
          <div className="form-msg button green">
            New category "{category.englishTitle}" added!
          </div>
        );
        clearForm();
        getCategories();
        hideFormMsg();
      }
    } catch (error) {
      setFormMsg(
        <div className="form-msg button red">Category not added.</div>
      );
      hideFormMsg();
      console.log(error);
    }
  };
  // end create a category

  // delete category
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
  // end delete category

  // update category
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
        setFormMsg(
          <div className="form-msg button red">Category not updated.</div>
        );
      } else {
        getCategories();
        getCategory(currentCategory._id);
        setFormMsg(
          <div className="form-msg button green">Category updated.</div>
        );
        hideFormMsg();
      }
    } catch (error) {}
  };
  // end update category

  const sortCategories = categories?.sort(function (a, b) {
    if (a.englishTitle < b.englishTitle) {
      return -1;
    }
    if (a.englishTitle > b.englishTitle) {
      return 1;
    }
    return 0;
  });

  const currLang = JSON.parse(localStorage.getItem("language"));

  useEffect(() => {
    getCourses();
    getCategories();

    if (params.useLanguage === "spanish") {
      localStorage.setItem("language", JSON.stringify("spanish"));
    } else if (params.useLanguage === "english") {
      localStorage.setItem("language", JSON.stringify("english"));
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        )}
      </AnimatePresence>

      <div className="form-buttons">
        {/* {language === "english" && (
          <button
            onClick={() => {
              setLanguage("spanish");
              localStorage.removeItem(language);
              localStorage.setItem("language", JSON.stringify("spanish"));
            }}
          >
            Spanish
          </button>
        )}

        {language === "spanish" && (
          <button
            onClick={() => {
              setLanguage("english");
              localStorage.removeItem(language);
              localStorage.setItem("language", JSON.stringify("english"));
            }}
          >
            English
          </button>
        )} */}

        <button
          className="button green"
          onClick={() => {
            setShowModal("new course");
            clearForm();
          }}
        >
          <span>New Course</span>
        </button>
        <button
          className="button green"
          onClick={() => {
            setShowModal("new category");
            clearForm();
          }}
        >
          <span>New Category</span>
        </button>
      </div>

      {/* create a course  */}
      <AnimatePresence>
        {showModal === "new course" && (
          <motion.div
            className="form-modal"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <form className="form" onSubmit={createCourse}>
              <h1>Add a New Course</h1>

              <div className="form-section">
                <input
                  className={`required ${englishTitle ? "not-empty" : "empty"}`}
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
                  className={`required ${englishLink ? "not-empty" : "empty"}`}
                  name="englishLink"
                  type="url"
                  onChange={(e) => setEnglishLink(e.target.value)}
                  value={englishLink}
                  required
                />
                <label>English Link</label>
              </div>

              {addSpanish && (
                <>
                  <div className="form-section">
                    <input
                      className={`${spanishTitle ? "not-empty" : "empty"} ${
                        spanishLink && "required"
                      }`}
                      name="spanishTitle"
                      type="text"
                      onChange={(e) => setSpanishTitle(e.target.value)}
                      value={spanishTitle}
                    />
                    <label>Spanish Title</label>
                  </div>

                  <div className="form-section">
                    <input
                      className={`${spanishLink ? "not-empty" : "empty"} ${
                        spanishTitle && "required"
                      } ${!spanishTitle && "no-spanish-title"}`}
                      name="spanishLink"
                      type="url"
                      onChange={(e) => setSpanishLink(e.target.value)}
                      value={spanishLink}
                    />
                    <label>Spanish Link</label>
                  </div>
                </>
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
                  className={`button ${
                    active ? "selected-green" : "green-outline"
                  }`}
                  onClick={() => {
                    setActive(true);
                  }}
                >
                  <span>Active</span>
                </div>

                <div
                  className={`button ${
                    !active ? "selected-red" : "red-outline"
                  }`}
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
                    clearForm();
                    cancel();
                  }}
                >
                  <span>Cancel</span>
                </div>
              </div>

              {formMsg && formMsg}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      {/* end create a course  */}

      {/* create a category  */}
      <AnimatePresence>
        {showModal === "new category" && (
          <motion.div
            className="form-modal"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <form className="form" onSubmit={createCategory}>
              <h1>Add a New Category</h1>

              <div className="form-section">
                <input
                  className={`required ${englishTitle ? "not-empty" : "empty"}`}
                  name="englishTitle"
                  type="text"
                  onChange={(e) => setEnglishTitle(e.target.value)}
                  value={englishTitle}
                  required
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
                  className={`required ${
                    categoryImage ? "not-empty" : "empty"
                  }`}
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
                    <span>Create Category</span>
                  </button>
                ) : (
                  <button className="button green" type="submit" disabled>
                    <span>Create Category</span>
                  </button>
                )}

                <div
                  className="button red-outline"
                  onClick={() => {
                    clearForm();
                    cancel();
                  }}
                >
                  <span>Cancel</span>
                </div>
              </div>

              {formMsg && formMsg}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      {/* end create a category  */}

      {categories?.map((i) => (
        <>
          {currLang === "english"
            ? i.englishTitle
            : currLang === "spanish" && i.spanishTitle !== ""
            ? i.spanishTitle
            : i.englishTitle}
          <button
            onClick={() => {
              getCategory(i._id);
              setShowModal(`delete-category ${i._id}`);
              <button>Delete</button>;
            }}
          >
            Delete
          </button>

          {/* delete category modal  */}
          <AnimatePresence>
            {showModal === `delete-category ${i._id}` && (
              <motion.div
                className="form-modal delete-content"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                Are you sure you want to delete the "{i.englishTitle}" category?
                This action cannot be undone.
                <div className="form-buttons">
                  <button
                    className="button red"
                    onClick={() => {
                      deleteCategory(i._id);
                      setShowModal("");
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="button green-outline"
                    onClick={() => {
                      setShowModal("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* end delete category modal */}

          <button
            onClick={() => {
              setShowModal(`update-category ${i._id}`);
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

          {/* update a category modal */}
          <AnimatePresence>
            {showModal === `update-category ${i._id}` && (
              <motion.div
                className="form-modal"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <form className="form" onSubmit={updateCategory}>
                  <h1>Update Category</h1>

                  <div className="form-section">
                    <input
                      className={`required ${
                        englishTitle ? "not-empty" : "empty"
                      }`}
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
                      className={`required ${
                        categoryImage ? "not-empty" : "empty"
                      }`}
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
                      className="button red-outline"
                      onClick={() => {
                        clearForm();
                        setShowModal("");
                      }}
                    >
                      <span>Cancel</span>
                    </div>
                  </div>

                  {formMsg && formMsg}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          {/* end update a category  */}
          <br />
        </>
      ))}

      {courses?.map((i) => (
        <>
          {currLang === "english"
            ? i.englishTitle
            : currLang === "spanish" && i.spanishTitle !== ""
            ? i.spanishTitle
            : i.englishTitle}

          {/* delete course modal  */}
          <AnimatePresence>
            {showModal === `delete-course ${i._id}` && (
              <motion.div
                className="form-modal delete-content"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                Are you sure you want to delete the "{i.englishTitle}" course?
                This action cannot be undone.
                <div className="form-buttons">
                  <button
                    className="button red"
                    onClick={() => {
                      deleteCourse(i._id);
                      setShowModal("");
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="button green-outline"
                    onClick={() => {
                      setShowModal("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* end delete course modal */}

          {/* update a course modal */}
          <AnimatePresence>
            {showModal === `update-course ${i._id}` && (
              <motion.div
                className="form-modal"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <form className="form" onSubmit={updateCourse}>
                  <h1>Update Course</h1>

                  <div className="form-section">
                    <input
                      className={`required ${
                        englishTitle ? "not-empty" : "empty"
                      }`}
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
                      className={`required ${
                        englishLink ? "not-empty" : "empty"
                      }`}
                      name="englishLink"
                      type="text"
                      onChange={(e) => setEnglishLink(e.target.value)}
                      value={englishLink}
                      required
                    />
                    <label>English Link</label>
                  </div>

                  {currentCourse?.spanishTitle && (
                    <>
                      <div className="form-section">
                        <input
                          className={`${spanishTitle ? "not-empty" : "empty"} ${
                            spanishLink && "required"
                          }`}
                          name="spanishTitle"
                          type="text"
                          onChange={(e) => setSpanishTitle(e.target.value)}
                          value={spanishTitle}
                        />
                        <label>Spanish Title</label>
                      </div>

                      <div className="form-section">
                        <input
                          className={`${spanishLink ? "not-empty" : "empty"} ${
                            spanishTitle && "required"
                          } ${!spanishTitle && "no-spanish-title"}`}
                          name="spanishLink"
                          type="url"
                          onChange={(e) => setSpanishLink(e.target.value)}
                          value={spanishLink}
                        />
                        <label>Spanish Link</label>
                      </div>
                    </>
                  )}

                  {!currentCourse?.spanishTitle && addSpanish && (
                    <>
                      <div className="form-section">
                        <input
                          className={`${spanishTitle ? "not-empty" : "empty"} ${
                            spanishLink && "required"
                          }`}
                          name="spanishTitle"
                          type="text"
                          onChange={(e) => setSpanishTitle(e.target.value)}
                          value={spanishTitle}
                        />
                        <label>Spanish Title</label>
                      </div>

                      <div className="form-section">
                        <input
                          className={`${spanishLink ? "not-empty" : "empty"} ${
                            spanishTitle && "required"
                          } ${!spanishTitle && "no-spanish-title"}`}
                          name="spanishLink"
                          type="url"
                          onChange={(e) => setSpanishLink(e.target.value)}
                          value={spanishLink}
                        />
                        <label>Spanish Link</label>
                      </div>
                    </>
                  )}

                  {!currentCourse?.spanishTitle && !addSpanish && (
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
                          <option value={i.englishTitle}>
                            {i.englishTitle}
                          </option>
                        </>
                      ))}
                    </select>
                    <label>Category</label>
                  </div>

                  <div className="form-buttons">
                    <div
                      className={`button ${
                        active ? "selected-green" : "green-outline"
                      }`}
                      onClick={() => {
                        setActive(true);
                      }}
                    >
                      <span>Active</span>
                    </div>

                    <div
                      className={`button ${
                        !active ? "selected-red" : "red-outline"
                      }`}
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
                    {englishTitle && englishLink ? (
                      <button className="button green" type="submit">
                        <span>Update Course</span>
                      </button>
                    ) : (
                      <button className="button green" type="submit" disabled>
                        <span>Update Course</span>
                      </button>
                    )}

                    <div
                      className="button red-outline"
                      onClick={() => {
                        clearForm();
                        setShowModal("");
                      }}
                    >
                      <span>Cancel</span>
                    </div>
                  </div>

                  {formMsg && formMsg}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          {/* end update a course  */}

          <button
            onClick={() => {
              getCourse(i._id);
              setShowModal(`delete-course ${i._id}`);
            }}
          >
            Delete
          </button>

          <button
            onClick={() => {
              setShowModal(`update-course ${i._id}`);
              getCourse(i._id);
              setEnglishTitle(i.englishTitle);
              setEnglishLink(i.englishLink);
              setSpanishTitle(i.spanishTitle);
              setSpanishLink(i.spanishLink);
              if (i.spanishTitle !== "") {
                setAddSpanish(true);
              } else {
                setAddSpanish(false);
              }
              setCategory(i.category);
              setActive(i.active);
              setContentType(i.contentType);
            }}
          >
            update
          </button>
          <br />
        </>
      ))}
    </>
  );
}
