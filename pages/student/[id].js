import StudentDashboard from "@/components/dashboardElements/StudentDashboard";
import { useRouter } from "next/router";


const StudentPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  return (
    <StudentDashboard id={id}  all={true}/>
  );
};

export default StudentPage;
