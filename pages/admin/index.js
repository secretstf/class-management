import { AddStudentButton } from "@/components/AddStudentButton.js";
import { AdminUsersInfo } from "@/components/admin_controls/AdminUsersInfo";
import { UpdateBackendButton } from "@/components/admin_controls/UpdateBackendButton";
import { Box, Divider, Typography } from "@mui/material";
import { getUsers } from "@/services/getUsers";
import React, { useState, useEffect } from "react";

/**
 * Represents the admin page component.
 *
 * @returns {JSX.Element} The rendered admin page.
 */
export default function AdminPage() {
  const [users, setUsers] = useState({});
  const [updatedUsers, setUpdatedUsers] = useState({});
  const [changesLogged, setChangesLogged] = useState({});
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(true);

  function printUsers() {
    console.log("Users: ", updatedUsers);
  }

  const handleAddStudent = (newStudent) => {
    console.log("Adding student: ", newStudent);
  };

  const handleUsersUpdate = (newUsers, changeLog) => {
    setChangesLogged({ ...changesLogged, ...changeLog });
    setUpdatedUsers(newUsers);
  };

  function clearChanges() {
    setChangesLogged({});
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("api/verifyAdmin");
        if (response.status !== 200) {
          setAuthorized(false);
          console.error("Unauthorized");
          return;
        }

        await fetch("/api/syncUsers");
        await getUsers().then((res) => {
          setUsers(res);
          setUpdatedUsers(res);
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (changesLogged.length > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [changesLogged]);

  if (!authorized) {
    return (
      <Box
        height={"100vh"}
        width={"100vw"}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2">Unauthorized</Typography>
        <br />
        <Typography variant="subtitle1" color="lightgrey">
          You are not authorized to view this page.
        </Typography>
        <Typography variant="subtitle1" color="lightgrey">
          Please contact an administrator.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      id="Admin Page"
      p={{ xs: 2, md: 4 }}  // Adjust padding for smaller screens
      display="flex"
      flexDirection="column"
    >
      <Typography variant="h2" align="center" sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' } }}>  {/* Smaller font size on mobile */}
        Admin Page
      </Typography>
      <Box py={2}>
        <Divider />
      </Box>
      
      <Box width="100%" height="inherit" display="flex" flexDirection="column">
        <Box
          px={{ xs: 2, md: 4 }}  // Adjust padding for small screens
          display="flex"
          flexDirection="row"  // Keep items in a row for all screens
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          flexWrap="nowrap"  // Prevent wrapping on larger screens
        >
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: '1.2rem', md: '2rem' }, flexGrow: 1 }}  // Allow title to grow and take up space
          >
            User Management
          </Typography>
          <UpdateBackendButton
            originalUsers={users}
            updatedUsers={updatedUsers}
            changeLog={changesLogged}
            clearLogs={clearChanges}
            sx={{ marginLeft: '16px' }}  // Keep some margin between title and button
          />
        </Box>

        <Box px={{ xs: 2, md: 4 }} py={2}>
          {!loading ? (
            <AdminUsersInfo users={updatedUsers} updateUsers={handleUsersUpdate} />
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>

        <Box
          position="fixed"
          bottom={16}
          right={16}
          zIndex="tooltip"
          display={{ xs: "block", md: "none" }}  // Only show on smaller screens
        >
          <AddStudentButton onAddStudent={handleAddStudent} />
        </Box>
      </Box>
    </Box>
  );
}
