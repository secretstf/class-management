import { AddStudentButton } from "@/components/AddStudentButton.js";
import { AdminUsersInfo } from "@/components/admin_controls/AdminUsersInfo";
import { UpdateBackendButton } from "@/components/admin_controls/UpdateBackendButton";
import { Box, Divider, Typography } from "@mui/material";
import { getUsers } from "@/services/getUsers";
import React from "react";
import { useState, useEffect } from "react";

/**
 * Represents the admin page component.
 *
 * @returns {JSX.Element} The rendered admin page.
 */
export default function Page() {
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

  // load all users in from clerk
  useEffect(() => {
    /**
     * Fetches users from the server and updates the state with the fetched users.
     * 
     * @returns {Promise<void>} A promise that resolves when the users have been fetched and the state has been updated.
     */
    const fetchUsers = async () => {
      try {
        // verify admin
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

  // if not authorized, display unauthorized message
  if (!authorized) {
    return (
      <Box
        height={"100vh"}
        width={"100vw"}
        alignItems={"center"}
        justifyContent={"center"}
        display={"flex"}
        flexDirection={"column"}
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
    <div id="Admin Page">
      <Box width="99vw" height={"95vh"} display="flex" flexDirection="column">
        <Box
          px={2}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="h2">Users</Typography>
          <UpdateBackendButton
            originalUsers={users}
            updatedUsers={updatedUsers}
            changeLog={changesLogged}
            clearLogs={clearChanges}
          />
        </Box>
        <Box p={2}>
          {!loading && (
            <AdminUsersInfo users={updatedUsers} updateUsers={handleUsersUpdate} />
          )}
          {loading && <Typography>Loading...</Typography>}
        </Box>
        <AddStudentButton onAddStudent={handleAddStudent} />
      </Box>
    </div>
  );
}
