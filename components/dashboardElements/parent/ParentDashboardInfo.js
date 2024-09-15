import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const ParentDashboardInfo = ({ student }) => {
  // Fixed props destructuring
  const [lastLesson, setLastLesson] = useState({});
  const [currentLesson, setCurrentLesson] = useState({});

  function getLastLesson() {
    const lessons = student.lessons; // Fixed property access

    if (lessons.length === 0) {
      return "No lessons assigned yet";
    } else {
      const lastLesson = lessons[lessons.length - 1];
      setLastLesson(lastLesson);
    }
  }

  function getLessonDate() {
    const date = new Date(lastLesson.date.seconds * 1000);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  function redirectStudentInfo() {
    console.log("Redirecting to student info");
    // Implement your redirection logic here
    window.location.href = `/student/${student.id}`; // Fixed student property access
  }

  function getCurrentLesson() {
    setCurrentLesson(student.currentLesson); // Fixed student property access
  }


  useEffect(() => {
    console.log(student);
    getLastLesson();
    getCurrentLesson();
  }, [student]); // Added student to dependencies

  return (
    <Box
      p={2}
      border={1}
      borderColor="grey.300"
      borderRadius={2}
      boxShadow={2}
      gap={2}
      onClick={redirectStudentInfo} // Added onClick handler
      sx={{ cursor: "pointer", 
        ":hover": { backgroundColor: "grey.100", transition: "0.7s" }
      }} // Optional: add cursor pointer to indicate clickable area
    >
      <Typography variant="h6">{student.fullName}</Typography>

      {Object.keys(lastLesson).length > 0 && (
        <div id={`last-lesson-${student.id}`}>
          <Typography variant="body1" color="primary">
            Last Assignment ({getLessonDate()})
          </Typography>
          {Object.keys(lastLesson)
            .filter((key) => (key !== "date" && key !== "completed"))
            .map((key) => (
              <Box px={1} key={`${student.id}-${key}`}>
                <Typography
                  variant="subtitle1"
                  textTransform={"capitalize"}
                  display={"inline"}
                  color="grey"
                >
                  {key}:
                </Typography>
                <Typography variant="subtitle1" display={"inline"} color="grey">
                  {" "}
                  {lastLesson[key]}
                </Typography>
              </Box>
            ))}
            {lastLesson.hasOwnProperty("completed") && (
              <Box px={1} key={`${student.id}-completed`}>
              <Typography
                variant="subtitle1"
                textTransform={"capitalize"}
                display={"inline"}
                color="grey"
              >
                Completed: 
              </Typography>
              {lastLesson.completed ? (
                <Typography variant="subtitle1" display={"inline"} color="green">
                  {" "}Yes
                </Typography>
              ) : (
                <Typography variant="subtitle1" display={"inline"} color="red">
                  {" "}No
                </Typography>
              )}
            </Box>
              )}
        </div>
      )}
    </Box>
  );
};

export default ParentDashboardInfo;
