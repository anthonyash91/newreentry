import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Course() {
  const params = useParams();
  const [course, setCourse] = useState(null);
  const currLang = JSON.parse(localStorage.getItem("language"));

  const getCourse = async (id) => {
    try {
      const res = await fetch(`/api/courses/${id}`);
      const courseData = await res.json();

      if (res.ok) {
        setCourse(courseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse(params.courseId);
  }, []);

  return (
    <>
      {currLang === "english"
        ? course?.englishTitle
        : currLang === "spanish"
        ? course?.spanishTitle
        : ""}
    </>
  );
}
