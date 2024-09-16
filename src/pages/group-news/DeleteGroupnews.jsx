import { useParams } from "react-router-dom";
import envConfig from "../../../envConfig";
import CommonItemDelete from "../../components/reuseable/common-delete-item/CommonItemDelete";

const DeleteGroupnews = () => {
  const { id } = useParams();
  return (
    <CommonItemDelete
      id={id}
      deleteUrl={envConfig.groupNewsUrl}
      navigateUrl={"/admin-panel/manage-group-news"}
    />
  );
};

export default DeleteGroupnews;
