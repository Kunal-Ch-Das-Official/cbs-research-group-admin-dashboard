import axios from "../../axios/axios";

const getSingleData = async (setLoadingState, getSingleDataUrl, accessId) => {
  let response;
  try {
    // Set loading state to true
    setLoadingState(true);

    const authToken = localStorage.getItem("auth-token") || null;
    const adminToken = localStorage.getItem("admin-token") || null;
    const token = authToken || adminToken;

    const res = await axios.get(`${getSingleDataUrl}/${accessId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    response = res.data;
    return response;
  } catch (error) {
    console.log(error); // Log error before returning
    response = null;
    return response;
  } finally {
    // Set loading state to false
    setLoadingState(false);
  }
};

export { getSingleData };
