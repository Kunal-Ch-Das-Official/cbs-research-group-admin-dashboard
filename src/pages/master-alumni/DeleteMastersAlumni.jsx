import CommonItemDelete from "../../components/reuseable/common-delete-item/CommonItemDelete";
import { useParams } from "react-router-dom";
import envConfig from "../../../envConfig";

const DeleteMastersAlumni = () => {
  const { id } = useParams();
  return (
    <CommonItemDelete
      id={id}
      deleteUrl={envConfig.mastersAlumniUrl}
      navigateUrl={"/admin-panel/manage-masters-alumni"}
    />
  );
};

export default DeleteMastersAlumni;
