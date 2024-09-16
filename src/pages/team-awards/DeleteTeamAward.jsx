import CommonItemDelete from "../../components/reuseable/common-delete-item/CommonItemDelete";
import { useParams } from "react-router-dom";
import envConfig from "../../../envConfig";

const DeleteTeamAward = () => {
  const { id } = useParams();
  return (
    <CommonItemDelete
      id={id}
      deleteUrl={envConfig.teamAwardsUrl}
      navigateUrl={"/admin-panel/manage-team-awards"}
    />
  );
};

export default DeleteTeamAward;
