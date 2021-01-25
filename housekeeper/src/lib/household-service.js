import axios from "axios";
const { REACT_APP_API_URL } = process.env;

class HouseholdService {
  constructor() {
    this.household = axios.create({
      baseURL: REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  getHouse = (id) => {
    const pr = this.household.get(`/household/:${id}`);
    return pr;
  };

  createHouse = (title) => {
    const pr = this.household.post("/household", { title });
    return pr;
  };

  deleteHouse = (id) => {
    const pr = this.household.delete("/household/" + id);
    return pr;
  };
}

const householdService = new HouseholdService();

export default householdService;
