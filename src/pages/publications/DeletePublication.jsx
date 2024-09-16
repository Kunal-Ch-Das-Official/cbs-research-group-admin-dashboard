import { useParams } from "react-router-dom";
import CommonItemDelete from "../../components/reuseable/common-delete-item/CommonItemDelete";
import envConfig from "../../../envConfig";

const DeletePublication = () => {
  const { id } = useParams();
  return (
    <CommonItemDelete
      id={id}
      deleteUrl={envConfig.publicationsUrl}
      navigateUrl={"/admin-panel/manage-publications"}
    />
  );
};

export default DeletePublication;
