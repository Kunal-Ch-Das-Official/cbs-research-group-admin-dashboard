import { useParams } from "react-router-dom";
import CommonItemDelete from "../../components/reuseable/common-delete-item/CommonItemDelete";
import envConfig from "../../../envConfig";

const DeleteAdminAccount = () => {
  const { id } = useParams();
  return (
    <CommonItemDelete
      id={id}
      deleteUrl={envConfig.allAdminUsers}
      navigateUrl={"/admin-panel/manage-admin-accounts"}
      explicitText={"Sure Want To Deactivate?"}
    />
  );
};

export default DeleteAdminAccount;
