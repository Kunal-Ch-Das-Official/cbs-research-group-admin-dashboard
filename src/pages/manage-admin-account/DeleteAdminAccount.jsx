import { useParams } from "react-router-dom";
import CommonItemDelete from "../../components/reuseable/common-delete-item/CommonItemDelete";
import envConfig from "../../../envConfig";
import { Helmet } from "react-helmet";

const DeleteAdminAccount = () => {
  const { id } = useParams();
  return (
    <>
       <Helmet>
                <title>
                    Deactivate Account | CBS Research Group
                </title>
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
    
    
    <CommonItemDelete
      id={id}
      deleteUrl={envConfig.allAdminUsers}
      navigateUrl={"/admin-panel/manage-admin-accounts"}
      explicitText={"Sure Want To Deactivate?"}
      />
      </>
  );
};

export default DeleteAdminAccount;
