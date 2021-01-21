import axios from "axios";
const { REACT_APP_API_URL } = process.env;
class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  editProfile(username, image) {
    const pr = this.user.put("/user/edit", { username, image });
    return pr;
  }
}

const userService = new UserService();

export default userService;
