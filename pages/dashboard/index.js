import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { AccountTypeSelector } from "@/components/dashboardElements/AccountTypeSelector.js";
import { updateUser } from "@/services/updateUser";
import  ParentDashboard  from "@/components/dashboardElements/ParentDashboard.js";

const Dashboard = () => {
  const {isLoading, user, isSignedIn} = useUser();
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);

  async function  handleAccountSelection(type) {
    setUserRole(type);

    // Update the user's roles in the database
    userData.roles[type] = true;
    console.log(userData);
    await updateUser(user.id, userData);
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/firestoreUser");
      if (response.status === 401) {
        return; 
      } else if (response.status === 404) {
        return;
      }

      const data = await response.json();
      setUserData(data);

      if (data.roles.admin) {
        setUserRole('parent');
      } else if (data.roles.teacher) {
        setUserRole('teacher');
      } else if (data.roles.student) {
        setUserRole('student');
      } else if (data.roles.parent) {
        setUserRole('parent');
      } else {  
        setUserRole('unset');
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <Box justifyContent={"center"} alignItems={"center"} display={"flex"} width={'100%'} height={'100%'} flexDirection={'column'}>
      <Typography>Under construction...</Typography>

      {/* If the user is not signed in */}
      {!isLoading && !isSignedIn && (
        <>
          <Typography>Sign in to view your dashboard</Typography>
          <SignInButton>
            <Button variant={"contained"} color={"primary"}>
              Sign in
            </Button>
          </SignInButton>
        </>
      )}

      {/* If the user is loading in */}
      {
        isLoading && (
          <Typography>Loading...</Typography>
        )
      }

      {/* If the user is signed in
      {
        isSignedIn && (
          <>
            <Typography>Welcome back, {user.firstName}!</Typography>
            <Typography>You are signed in as a {userRole}</Typography>
          </>
        )
      } */}

      {/* If the user is unset */}
      {
        userRole === 'unset' && (
          <AccountTypeSelector onSelect={handleAccountSelection} />
        )
      }

      {/* If the user is a parent */}
      {
        userRole === 'parent' && (
          <ParentDashboard user={userData}/>
        )
      }
    </Box>
  );
};

export default Dashboard;
