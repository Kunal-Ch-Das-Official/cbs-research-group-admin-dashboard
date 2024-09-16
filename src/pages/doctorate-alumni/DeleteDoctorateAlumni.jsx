import { useParams } from "react-router-dom";
import envConfig from "../../../envConfig";
import CommonItemDelete from "../../components/reuseable/common-delete-item/CommonItemDelete";

const DeleteDoctorateAlumni = () => {
  const { id } = useParams();

  return (
    <CommonItemDelete
      id={id}
      deleteUrl={envConfig.doctorateAlumniUrl}
      navigateUrl={"/admin-panel/manage-doctorate-alumni"}
    />
  );
};

export default DeleteDoctorateAlumni;
