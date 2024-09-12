import { AddStudentButton } from "@/components/AddStudentButton.js";
import { AdminUsersInfo } from "@/components/admin_controls/AdminUsersInfo";
import { UpdateBackendButton } from "@/components/admin_controls/UpdateBackendButton";
import { Box, Typography } from "@mui/material";
import { getCollectionData } from "@/services/fetchCollection.js";
import React from "react";
import { useState, useEffect } from "react";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [updatedUsers, setUpdatedUsers] = useState([]);
  const [changesLogged, setChangesLogged] = useState([]);
  const [loading, setLoading] = useState(true);

  function printUsers() {
    users.map((user) => {
      console.log(user.firstName + " " + user.lastName);
      user.emails.map((email) => {
        console.log(email);
      });
    });
  }

  const handleAddStudent = (newStudent) => {
    console.log("Adding student: ", newStudent);
  };

  const handleUsersUpdate = (newUsers, changeLog) => {
    setChangesLogged([...changesLogged, ...changeLog]);
    setUpdatedUsers(newUsers);
    setUsers(newUsers);
  };

  // load all users in from clerk
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        fetch("api/syncUsers");

        getCollectionData("users").then((res) => {
          setUsers(res);
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
  }, [updatedUsers]);

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
            updatedUsers={updatedUsers}
            changeLog={changesLogged}
            onClick={printUsers}
          />
        </Box>
        <Box p={2}>
          {!loading && (
            <AdminUsersInfo users={users} updateUsers={handleUsersUpdate} />
          )}
        </Box>
        <AddStudentButton onAddStudent={handleAddStudent} />
      </Box>
    </div>
  );
}
