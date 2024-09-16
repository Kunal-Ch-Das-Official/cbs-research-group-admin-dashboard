import { useParams } from "react-router-dom";
import CommonItemDelete from "../../components/reuseable/common-delete-item/CommonItemDelete";
import envConfig from "../../../envConfig";

const DeleteProject = () => {
  const { id } = useParams();
  return (
    <CommonItemDelete
      id={id}
      deleteUrl={envConfig.projectsUrl}
      navigateUrl={"/admin-panel/manage-projects"}
    />
  );
};

export default DeleteProject;
