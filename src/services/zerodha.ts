import axios from "axios";


const fetchAccessToken = async (requestToken: string) => axios.post("/api/zerodha/access", { requestToken });

const zerodhaOperations = {
fetchAccessToken
}


export default zerodhaOperations