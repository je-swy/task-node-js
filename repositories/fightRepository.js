import { BaseRepository } from "./baseRepository.js";
import { FIGHT } from "../models/fight.js";

class FightRepository extends BaseRepository {
  constructor() {
    super("fights");
    this.model = FIGHT;
  }
}

const fightRepository = new FightRepository();

export { fightRepository };