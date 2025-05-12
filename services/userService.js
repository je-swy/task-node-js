import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  getAllUsers() {
    return userRepository.getAll();
  }

  getUserById(id) {
    return userRepository.getOne({ id });
  }

  createUser(userData) {
    console.log("Received data to create user:", userData);
    const existingEmail = userRepository.getOne({ email: userData.email });
    const existingPhone = userRepository.getOne({ phoneNumber: userData.phoneNumber });

    if (existingEmail) {
      throw new Error("User with this email already exists");
    }
    if (existingPhone) {
      throw new Error("User with this phone number already exists");
    }

    return userRepository.create(userData);
  }

  updateUser(id, updateData) {
    return userRepository.update(id, updateData);
  }

  deleteUser(id) {
    return userRepository.delete(id);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
