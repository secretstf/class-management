import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";

const StudentDashboard = () => {
  const router = useRouter();
  const { id } = router.query;
  const [student, setStudent] = useState({});
  const [lastLesson, setLastLesson] = useState({});
  const [lessons, setLessons] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract the most recent lesson
    const getLastLesson = () => {
      if (lessons.length > 0) {
        setLastLesson(lessons[lessons.length - 1]);
      }
      setLessons(lessons);
    };

    getLastLesson();
  }, [lessons]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function loadStudentData() {
    // Fetch student data
    fetch(`/api/firestoreUser?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStudent(data);
        setLessons(data.lessons);
      });
  }

  function formatLastLessonDate() {
    if (!lastLesson.date) {
      return "No lessons assigned yet";
    }

    const date = new Date(lastLesson.date.seconds * 1000);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  useEffect(() => {
    setLoading(false);
  }, [lastLesson]);

  useEffect(() => {
    loadStudentData();
  }, [id]);

  return (
    <div>
      {!loading && (
        <Box
          p={2}
        >
          {/* Current Lesson Section */}
          {lastLesson && (
            <Box
              p={3}
              mb={4}
              borderRadius={2}
              boxShadow={3}
              bgcolor="primary.main"
              color="white"
            >
              <Typography variant="h6" gutterBottom>
                Current Lesson
              </Typography>
              <Typography variant="body1" mb={2}>
                <strong>Sabaq: </strong> {lastLesson.sabaq}
              </Typography>
              <Typography variant="body1" mb={2}>
                <strong>Revision: </strong> {lastLesson.revision}
              </Typography>
              <Typography variant="body1">
                <strong>Date: </strong> {formatLastLessonDate()}
              </Typography>
            </Box>
          )}

          {/* Display Lessons Table */}
          <Box
            p={3}
            borderRadius={2}
            boxShadow={3}
          >
            <Typography variant="h6" mb={2}>
              All Lessons
            </Typography>
            <TableContainer component={Paper} variant='outlined'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Sabaq</TableCell>
                    <TableCell>Revision</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lessons
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((lesson, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {new Date(
                            lesson.date.seconds * 1000
                          ).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{lesson.sabaq}</TableCell>
                        <TableCell>{lesson.revision}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={lessons.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default StudentDashboard;
