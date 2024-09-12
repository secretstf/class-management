import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Button,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailIcon from "@mui/icons-material/Email";
import { AdminRoleInfo } from "./AdminRoleInfo";
import { AdminDeleteButton } from "./AdminDeleteButton";

// AdminUI component with user data passed in as props
const AdminUsersInfo = ({ users, updateUsers }) => {

  // Function to delete a user
  const deleteUser = (userID) => {
    const changesLog = { [`${userID}`]: "DELETE" };
    const newUsers = { ...users };
    delete newUsers[userID];

    updateUsers(newUsers, changesLog);
  }

  // Function to update roles for a user
  const updateRoles = (user, newRoles) => {
    const userID = user.id;

    const oldRoles = Object.keys(user.roles).filter((role) => user.roles[role]).map((role) => role.charAt(0).toUpperCase() + role.slice(1)).sort().join(", ");
    const newRolesList = Object.keys(newRoles).filter((role) => newRoles[role]).map((role) => role.charAt(0).toUpperCase() + role.slice(1)).sort().join(", ");

    const changesLog = {[`${userID}`]: `Updated roles to ${newRolesList}`};
    const newUsers = {
      ...users,
      [userID]: {
        ...user,
        roles: newRoles,
      },
    }

    updateUsers(newUsers, changesLog);
  }

  return (
    <div style={{ padding: "4" }}>
      {/* Map through users and display user data */}
      {Object.values(users).map((user, index) => (
        <Card key={index} variant="outlined" style={{ marginBottom: "20px" }}>
          {/* Accordion for Emails */}
          <Accordion disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                minHeight: "32px",
              }}
            >
              <Typography>{user.fullName}</Typography>
            </AccordionSummary>
            <AccordionDetails>

              {/* Email List */}
              <List>
                {user.emails.map((email, idx) => (
                  <ListItem key={idx}>
                    <EmailIcon
                      fontSize="small"
                      style={{ marginRight: "8px" }}
                    />
                    {email}
                  </ListItem>
                ))}
              </List>

              {/* AdminRoleInfo component: shows roles and allows adjustments */}
              <AdminRoleInfo
                user={user}
                updateRoles={updateRoles}
              />

              <Divider />

              {/* Delete Button */}
              <Box display="flex" justifyContent="flex-end">
                <AdminDeleteButton userID={user.id} deleteFunction={deleteUser} />
              </Box>

            </AccordionDetails>
          </Accordion>
        </Card>
      ))}
    </div>
  );
};

export { AdminUsersInfo };
