import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  getAllFighters() {
    return fighterRepository.getAll();
  }

  getFighterById(id) {
    return fighterRepository.getOne({ id });
  }

  createFighter(data) {
    const all = fighterRepository.getAll();

    // case insensitive
    const nameExists = all.find(
      fighter => fighter.name?.toLowerCase() === data.name?.toLowerCase()
    );
    if (nameExists) {
      throw new Error("Fighter with this name already exists");
    }

    // if there is no health set the default by 85
    if (!data.health) {
      data.health = 85;
    }

    return fighterRepository.create(data);
  }

  updateFighter(id, updateData) {
    return fighterRepository.update(id, updateData);
  }

  deleteFighter(id) {
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
