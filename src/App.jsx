import { RiDeleteBin2Fill } from "react-icons/ri";
import CustomModel from "./utils/custom-models/CustomModel";

function App() {
  return (
    <>
      <CustomModel
        buttonText={"Got It"}
        showOrHide={"Hide"}
        closeButton={"close"}
        statusIcon={<RiDeleteBin2Fill className="text-red-500 text-5xl" />}
        alertHead={"Are You Really Want To Delete"}
        message1={"If You Delete You Will Never Get It Back"}
        message2={""}
        buttonColor={"bg-red-500 text-white"}
      />
    </>
  );
}

export default App;
