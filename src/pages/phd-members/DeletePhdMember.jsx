import CommonItemDelete from "../../components/reuseable/common-delete-item/CommonItemDelete";
import { useParams } from "react-router-dom";
import envConfig from "../../../envConfig";

const DeletePhdMember = () => {
  const { id } = useParams();
  return (
    <CommonItemDelete
      id={id}
      deleteUrl={envConfig.phdMembersUrl}
      navigateUrl={"/admin-panel/manage-phd-members"}
    />
  );
};

export default DeletePhdMember;
