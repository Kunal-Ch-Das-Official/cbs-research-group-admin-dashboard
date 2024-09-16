import CommonItemDelete from "../../components/reuseable/common-delete-item/CommonItemDelete";
import { useParams } from "react-router-dom";
import envConfig from "../../../envConfig";

const DeleteMscMember = () => {
  const { id } = useParams();
  return (
    <CommonItemDelete
      id={id}
      deleteUrl={envConfig.mscMembersUrl}
      navigateUrl={"/admin-panel/manage-msc-members"}
    />
  );
};

export default DeleteMscMember;
