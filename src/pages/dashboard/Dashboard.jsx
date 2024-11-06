import { useEffect, useState } from "react";
import DashBoardBody from "../../components/single-use/dashboard-body/DashBoardBody";
import envConfig from "../../../envConfig";
import { getAllData } from "../../../operations/apis/getAllData";
import ItemCounter from "../../components/single-use/dashboard-body/item-count-card/ItemCounter";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import { FaUsersViewfinder } from "react-icons/fa6";
import { IoIosPersonAdd } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaAward } from "react-icons/fa6";
import { GiMultipleTargets } from "react-icons/gi";
import { MdContactMail } from "react-icons/md";
import { GiNewspaper } from "react-icons/gi";
import { IoLogoElectron } from "react-icons/io5";
import { GrTestDesktop } from "react-icons/gr";
import { PiGraphDuotone } from "react-icons/pi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { SiLibreofficeimpress } from "react-icons/si";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
import ChartsOverviewDemo from "../../utils/chart/Barchart";
import PieChart from "../../utils/chart/PieChart";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const [apiRes, setApiRes] = useState(null);
  const [loading, setLoading] = useState(false);
const superAdmin = localStorage.getItem('super-admin')
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const output = await getAllData(setLoading, envConfig.dashboardInfoUrl);
      output && setApiRes(output);
    };
    fetchData();
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen max-w-[100%]">
         <Helmet>
                <title>Administrative Dashboard | CBS Research Group</title>
                <meta name="keywords" content="Researcher" />
                <meta name="keywords" content="Dr. Chinmoy Bhattacharya" />
                <meta
                    name="keywords"
                    content="Indian Institute of Engineering Science and Technology"
                />
                <meta name="keywords" content="IIEST" />
                <meta name="keywords" content="Shibpur" />
                <meta name="keywords" content="Electrochemistry" />
                <meta name="keywords" content="Materials Chemistry" />
                <meta name="keywords" content="Photoelectrochemical" />
                <meta name="keywords" content="Solar Cells" />

                <meta
                    name="description"
                    content="Joined the Institute as Assistant Professor , Department of Chemistry, Indian Institute of Engineering Science & Technology, Shibpur (formerly, BESUS) Howrah – 711 103, West Bengal on 23rd June 2006. Promoted to Associate Professor, Department of Chemistry, IIESTS on 22nd Feb. 2019."
        />
                        <meta
                    name="location"
                    content="IIEST, Shibpur is located in Howrah— just across the River Hoogly from the city of Kolkata. It is well connected to other parts of the country by road, rail and air. The campus is situated adjacent to the A.J.C. Bose Indian Botanic Garden which boasts of the 250-year-old Great Banyan Tree.
It takes around 20 minutes to reach IIEST, Shibpur from the heart of the city and approximately 90 minutes from the airport. The Howrah Railway Station is about 5 kms away from the institute."
                />
            </Helmet>
      <SectionHeading
        heading={"Interactive Lab Admin Dashboard"}
        subHeading={`
          Monitor Experiments, Manage Equipment, and Oversee Lab Operations in Real-Time.`}
      />

      <section className="text-center py-16">
        {loading === true && <LoadingSpinner />}

        <DashBoardBody />
        <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mx-auto 2xl:mx-28 my-12 py-8">
          <ChartsOverviewDemo
            adminUserLength={apiRes && apiRes[0].auth_admin.length}
            BecomeAdminRequestLength={apiRes && apiRes[1].be_admin_req.length}
            doctoratesAlumniLength={apiRes && apiRes[2].doc_alumni.length}
            mastersAlumniLength={apiRes && apiRes[3].mas_alumni.length}
            personalAwardsLength={apiRes && apiRes[4].personal_awards.length}
            groupAwardsLength={apiRes && apiRes[5].team_awards.length}
            contactApplicationsLength={
              apiRes && apiRes[6].contact_application.length
            }
            groupNewsLength={apiRes && apiRes[7].group_news.length}
            labInstrumentsLength={apiRes && apiRes[8].lab_instruments.length}
            projectStudentsLength={apiRes && apiRes[9].msc_members.length}
            phdStudentsLength={apiRes && apiRes[10].phd_members.length}
            projectsLength={apiRes && apiRes[11].projects.length}
            publicationsLength={apiRes && apiRes[12].publication.length}
          />
          <div className="bg-white w-full shadow-md rounded-md">
            <PieChart />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
          <ItemCounter
            itemName={"Admin Users"}
            totalCount={apiRes && apiRes[0].auth_admin.length}
            lastUpdate={apiRes && apiRes[0].auth_admin.pop()}
            sectionIcon={<FaUsersViewfinder className="text-white text-3xl" />}
            iconBackgroundColor={"bg-green-500"}
            textColor={"text-green-500"}
            manageUrl={"/admin-panel/manage-admin-accounts"}
            manageButtonText={"Manage"}
            uploadUrl={"/admin-panel/register"}
            uploadButtonText={"Register"}
          />
          <div className={superAdmin ? 'visable' : 'hidden'}>
          <ItemCounter
            itemName={"Administrative Access Requests"}
            totalCount={apiRes && apiRes[1].be_admin_req.length}
            lastUpdate={apiRes && apiRes[1].be_admin_req.pop()}
            sectionIcon={<IoIosPersonAdd className="text-white text-3xl" />}
            iconBackgroundColor={"bg-blue-500"}
            textColor={"text-blue-500"}
            manageUrl={"/admin-panel/manage-request"}
            manageButtonText={"View All"}
            uploadButtonText={null}
            uploadUrl={null}
          />
          </div>



          <ItemCounter
            itemName={"Doctorates Alumni"}
            totalCount={apiRes && apiRes[2].doc_alumni.length}
            lastUpdate={apiRes && apiRes[2].doc_alumni.pop()}
            sectionIcon={
              <LiaChalkboardTeacherSolid className="text-white text-3xl" />
            }
            iconBackgroundColor={"bg-yellow-500"}
            textColor={"text-yellow-500"}
            manageUrl={"/admin-panel/manage-doctorate-alumni"}
            manageButtonText={"Manage"}
            uploadUrl={"/admin-panel/upload-doctorate-alumni"}
            uploadButtonText={"Upload"}
          />
          <ItemCounter
            itemName={"Masters Alumni"}
            totalCount={apiRes && apiRes[3].mas_alumni.length}
            lastUpdate={apiRes && apiRes[3].mas_alumni.pop()}
            sectionIcon={<PiStudentFill className="text-white text-3xl" />}
            iconBackgroundColor={"bg-purple-700"}
            textColor={"text-purple-700"}
            manageUrl={"/admin-panel/manage-masters-alumni"}
            manageButtonText={"Manage"}
            uploadUrl={"/admin-panel/upload-masters-alumni"}
            uploadButtonText={"Upload"}
          />

          <ItemCounter
            itemName={"Personal Awards"}
            totalCount={apiRes && apiRes[4].personal_awards.length}
            lastUpdate={apiRes && apiRes[4].personal_awards.pop()}
            sectionIcon={<FaAward className="text-white text-3xl" />}
            iconBackgroundColor={"bg-orange-400"}
            textColor={"text-orange-400"}
            manageUrl={"/admin-panel/manage-personal-awards"}
            manageButtonText={"Manage"}
            uploadUrl={"/admin-panel/upload-personal-award"}
            uploadButtonText={"Upload"}
          />
          <ItemCounter
            itemName={"Group Awards"}
            totalCount={apiRes && apiRes[5].team_awards.length}
            lastUpdate={apiRes && apiRes[5].team_awards.pop()}
            sectionIcon={<GiMultipleTargets className="text-white text-3xl" />}
            iconBackgroundColor={"bg-fuchsia-500"}
            textColor={"text-fuchsia-500"}
            manageUrl={"/admin-panel/manage-team-awards"}
            manageButtonText={"Manage"}
            uploadUrl={"/admin-panel/upload-team-award"}
            uploadButtonText={"Upload"}
          />
          <ItemCounter
            itemName={"Contact Applications"}
            totalCount={apiRes && apiRes[6].contact_application.length}
            lastUpdate={apiRes && apiRes[6].contact_application.pop()}
            sectionIcon={<MdContactMail className="text-white text-3xl" />}
            iconBackgroundColor={"bg-[#669999]"}
            textColor={"text-[#669999]"}
            manageUrl={"/admin-panel/manage-contacts"}
            manageButtonText={"View All"}
            uploadUrl={null}
            uploadButtonText={null}
          />
          <ItemCounter
            itemName={"Group News"}
            totalCount={apiRes && apiRes[7].group_news.length}
            lastUpdate={apiRes && apiRes[7].group_news.pop()}
            sectionIcon={<GiNewspaper className="text-white text-3xl" />}
            iconBackgroundColor={"bg-[#999966]"}
            textColor={"text-[#999966]"}
            manageUrl={"/admin-panel/manage-group-news"}
            manageButtonText={"Handle"}
            uploadUrl={"/admin-panel/upload-group-news"}
            uploadButtonText={"Add New"}
          />
          <ItemCounter
            itemName={"Lab Instruments"}
            totalCount={apiRes && apiRes[8].lab_instruments.length}
            lastUpdate={apiRes && apiRes[8].lab_instruments.pop()}
            sectionIcon={<IoLogoElectron className="text-white text-3xl" />}
            iconBackgroundColor={"bg-[#4d6600]"}
            textColor={"text-[#4d6600]"}
            manageUrl={"/admin-panel/manage-lab-instruments"}
            manageButtonText={"Manage"}
            uploadUrl={"/admin-panel/upload-lab-instrument"}
            uploadButtonText={"Upload"}
          />

          <ItemCounter
            itemName={"Project Students"}
            totalCount={apiRes && apiRes[9].msc_members.length}
            lastUpdate={apiRes && apiRes[9].msc_members.pop()}
            sectionIcon={<GrTestDesktop className="text-white text-3xl" />}
            iconBackgroundColor={"bg-[#663300]"}
            textColor={"text-[#663300]"}
            manageUrl={"/admin-panel/manage-msc-members"}
            manageButtonText={"Manage"}
            uploadUrl={"/admin-panel/upload-msc-member"}
            uploadButtonText={"Upload"}
          />

          <ItemCounter
            itemName={"PHD Students"}
            totalCount={apiRes && apiRes[10].phd_members.length}
            lastUpdate={apiRes && apiRes[10].phd_members.pop()}
            sectionIcon={<PiGraphDuotone className="text-white text-3xl" />}
            iconBackgroundColor={"bg-[#006666]"}
            textColor={"text-[#006666]"}
            manageUrl={"/admin-panel/manage-phd-members"}
            manageButtonText={"Manage"}
            uploadUrl={"/admin-panel/upload-phd-member"}
            uploadButtonText={"Upload"}
          />
          <ItemCounter
            itemName={"Project's"}
            totalCount={apiRes && apiRes[11].projects.length}
            lastUpdate={apiRes && apiRes[11].projects.pop()}
            sectionIcon={
              <AiOutlineFundProjectionScreen className="text-white text-3xl" />
            }
            iconBackgroundColor={"bg-[#000066]"}
            textColor={"text-[#000066]"}
            manageUrl={"/admin-panel/manage-projects"}
            manageButtonText={"Manage"}
            uploadUrl={"/admin-panel/upload-project"}
            uploadButtonText={"Upload"}
          />
          <ItemCounter
            itemName={"Publication's"}
            totalCount={apiRes && apiRes[12].publication.length}
            lastUpdate={apiRes && apiRes[12].publication.pop()}
            sectionIcon={
              <SiLibreofficeimpress className="text-white text-3xl" />
            }
            iconBackgroundColor={"bg-[#330033]"}
            textColor={"text-[#330033]"}
            manageUrl={"/admin-panel/manage-publications"}
            manageButtonText={"Manage"}
            uploadUrl={"/admin-panel/upload-publication"}
            uploadButtonText={"Upload"}
          />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
