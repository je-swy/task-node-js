import { BaseRepository } from "./baseRepository.js";
import { FIGHTER } from "../models/fighter.js";

class FighterRepository extends BaseRepository {
  constructor() {
    super("fighters");
  }
}

const fighterRepository = new FighterRepository();

export { fighterRepository };
