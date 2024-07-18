/**
=========================================================
* Creative Tim React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Creative Tim React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Creative Tim React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";

// Overview page components
import Header from "layouts/profile/components/Header";




function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}  className="text-center items-center" >
          <Grid container spacing={-1}>
            <Grid item  sx={{ display: "flex" }} >
              <ProfileInfoCard
                title="profile information"
                description="Harshil Kathiriya is a Traffic Police Administrator in Ahmedabad, Gujarat. He focuses on improving road safety, managing traffic flow, and implementing regulations to address congestion issues. His role involves analyzing traffic patterns, coordinating with agencies, and utilizing technology for better traffic management."
                info={{
                  fullName: "Harshil N. Kathiriya",
                  mobile: "8849651223",
                  email: "harshilk10@mail.com",
                  location: "INDIA",
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                ]}
                action={{ route: "" }}
                shadow={false}
              />
             
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
