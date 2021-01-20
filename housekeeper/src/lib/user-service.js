import axios from "axios";

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    });
  }

  editProfile(username, image) {
      console.log(username, image)
      const pr = this.user.put('/user/edit', {username, image})
      return pr;
  }

}


const userService = new UserService();

export default userService;

