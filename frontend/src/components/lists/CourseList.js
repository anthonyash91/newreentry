export default function CourseList({ courses, getCourses }) {
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

  return (
    <>
      {courses?.map((i) => (
        <>
          {i.englishTitle}
          <button
            onClick={() => {
              deleteCourse(i._id);
            }}
          >
            Delete
          </button>
          <br />
        </>
      ))}
    </>
  );
}
