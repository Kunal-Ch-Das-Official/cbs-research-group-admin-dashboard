import CommonItemDelete from "../../components/reuseable/common-delete-item/CommonItemDelete";
import { useParams } from "react-router-dom";
import envConfig from "../../../envConfig";

const DeletePersonalAward = () => {
  const { id } = useParams();
  return (
    <CommonItemDelete
      id={id}
      deleteUrl={envConfig.personalAwardsUrl}
      navigateUrl={"/admin-panel/manage-personal-awards"}
    />
  );
};

export default DeletePersonalAward;
