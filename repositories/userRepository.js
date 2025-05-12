import { BaseRepository } from "./baseRepository.js";
import { USER } from "../models/user.js";

class UserRepository extends BaseRepository {
  constructor() {
    super("users");
  }
}

const userRepository = new UserRepository();

export { userRepository };
