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
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailIcon from "@mui/icons-material/Email";

// AdminUI component with user data passed in as props
const AdminUsersInfo = ({ users }) => {
  return (
    <div style={{ padding: "4"}}>
      {users.map((user, index) => (
        <Card key={index} variant="outlined" style={{ marginBottom: "20px" }}>
          

          {/* Accordion for Emails */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography>{user.fullName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Email List */}
              <List>
                {user.emails.map((email, idx) => (
                  <ListItem key={idx}>
                    <EmailIcon fontSize="small" style={{ marginRight: "8px" }} />
                    {email}
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Card>
      ))}
    </div>
  );
};

export {AdminUsersInfo};
