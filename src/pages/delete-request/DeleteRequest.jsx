import { useParams } from "react-router-dom";
import envConfig from "../../../envConfig";
import CommonItemDelete from "../../components/reuseable/common-delete-item/CommonItemDelete";
const DeleteRequest = () => {
  const { id } = useParams();

  return (
    <CommonItemDelete
      id={id}
      deleteUrl={envConfig.becomeAdminUsersRequestUrl}
      navigateUrl={"/admin-panel/manage-request"}
    />
  );
};

export default DeleteRequest;
