import axios from "axios";
import bcrypt from "bcryptjs";
const api = "http://localhost:9999/users";

export const login = async (user) => {
    try {
        const response = await axios.get(api);
        const users = response.data;
        
        // Thêm log để debug
        console.log("Searching for user with email:", user.email);
        console.log("Available users:", users);
        
        const foundUser = users.find(u => u.email === user.email);
        
        if (!foundUser) {
            throw new Error("Email not found");
        }

        // Thêm log để debug mật khẩu
        console.log("Input password:", user.password);
        console.log("Stored hash:", foundUser.password);
        
        const isPasswordValid = bcrypt.compareSync(user.password, foundUser.password);
        console.log("Password valid:", isPasswordValid);
        
        if (isPasswordValid) {
            return foundUser;
        } else {
            throw new Error("Incorrect password");
        }
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

//register
export const register = async (user) => {
    try {
      const response = await axios.get(api);
      const users = response.data;
      
      // Kiểm tra email đã tồn tại
      const emailExists = users.some(u => u.email === user.email);
      if (emailExists) {
          throw new Error("Email already exists");
      }

      // Kiểm tra các trường bắt buộc
      if (!user.email || !user.name || !user.password) {
          throw new Error("Please fill in all fields");
      }

      // Mã hóa mật khẩu
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(user.password, salt);
      
      // Tạo ID mới (sử dụng timestamp để tránh trùng lặp)
      const newId = Date.now().toString();
      
      const newUser = {
        ...user,
        id: newId,
        password: hashedPassword,
        role: "guest"
      };

      const res = await axios.post(api, newUser);
      return res.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
}

//getUsers
export const getUsers = async () => {
    try{
        const response = await axios.get(api);
        return response.data;
    }catch(error){
        throw error;
    }
}

//deleteUser
export const deleteUser = async (id) => {
    try{
        const response = await axios.delete(`${api}/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

//updateUser
export const updateUser = async (user) => {
    try{
        const response = await axios.put(`${api}/${user.id}`, user);
        return response.data;
    }catch(error){
        throw error;
    }
}

//getUser
export const getUser = async (id) => {
    try{
        const response = await axios.get(`${api}/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

//createUser
export const createUser = async (user) => {
    try{
        //random
        user.id = (Math.floor(Math.random() * 1000)).toString();
        const response = await axios.post(api, user);
        return response.data;
    }catch(error){
        throw error
    }
}
export const updateBooking = async (id, booking) => {
    try {
        const response = await axios.put(`${api}/${id}`, booking);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};