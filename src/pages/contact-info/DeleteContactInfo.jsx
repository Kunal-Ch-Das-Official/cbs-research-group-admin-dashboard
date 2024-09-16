import { useParams } from "react-router-dom";
import envConfig from "../../../envConfig";
import CommonItemDelete from "../../components/reuseable/common-delete-item/CommonItemDelete";

const DeleteContactInfo = () => {
  const { id } = useParams();

  return (
    <CommonItemDelete
      id={id}
      deleteUrl={envConfig.contactFormDataUrl}
      navigateUrl={"/admin-panel/manage-contacts"}
    />
  );
};

export default DeleteContactInfo;
