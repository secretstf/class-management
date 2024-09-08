import React from "react";
import { useState, useEffect } from "react";
import { Typography, Box, Button, ListItem, List, ListItemText } from "@mui/material";
import  {AddStudentButton}  from "@/components/AddStudentButton.js";
import { AdminUsersInfo } from "@/components/adminUsersInfo";

export default function Page() {
  const [users, setUsers] = useState([]);
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
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/getUsers");
        const data = await res.json();
        const usersData = data.data;

        const usersInfo = usersData.map((user) => {
          const emails = user.emailAddresses.map((email) => email.emailAddress);
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: `${user.firstName} ${user.lastName}`,
            emails: emails,
          };
        });

        setUsers(usersInfo);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div id='Admin Page'>
      <Typography variant="h2">Users</Typography>
      <Box p={2}>
      {!loading &&
        <AdminUsersInfo users={users} />
      }
      </Box>
      <Button onClick={printUsers}>Print Users</Button>
      <AddStudentButton onAddStudent={handleAddStudent} />
    </div>
  );
}
