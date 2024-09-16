import { useParams } from "react-router-dom";
import envConfig from "../../../envConfig";
import CommonItemDelete from "../../components/reuseable/common-delete-item/CommonItemDelete";

const DeleteLabInstrument = () => {
  const { id } = useParams();
  return (
    <CommonItemDelete
      id={id}
      deleteUrl={envConfig.labInstrumntsUrl}
      navigateUrl={"/admin-panel/manage-lab-instruments"}
    />
  );
};

export default DeleteLabInstrument;
