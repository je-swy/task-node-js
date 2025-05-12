import { fightRepository } from "../repositories/fightRepository.js";
import { fighterRepository } from "../repositories/fighterRepository.js";

class FightersService {
  // OPTIONAL TODO: Implement methods to work with fights
  getAllFights() {
    return fightRepository.getAll();
  }

  getFightById(id) {
    return fightRepository.getOne({ id });
  }

  createFight({ fighter1, fighter2 }) {
    const f1 = fighterRepository.getOne({ id: fighter1 });
    const f2 = fighterRepository.getOne({ id: fighter2 });

    if (!f1 || !f2) {
      throw new Error("Both fighters must exist");
    }

    let f1Health = f1.health ?? 85;
    let f2Health = f2.health ?? 85;
    const log = [];

    while (f1Health > 0 && f2Health > 0) {
      // first fighter
      const f1Shot = Math.max(0, f1.power - f2.defense);
      f2Health = Math.max(0, f2Health - f1Shot);

      // second fighter 
      const f2Shot = Math.max(0, f2.power - f1.defense);
      f1Health = Math.max(0, f1Health - f2Shot);

      log.push({
        fighter1Shot: f1Shot,
        fighter2Shot: f2Shot,
        fighter1Health: f1Health,
        fighter2Health: f2Health
      });
    }

    const winnerId = f1Health > 0 ? f1.id : f2.id;

    const result = {
      fighter1: f1.id,
      fighter2: f2.id,
      winner: winnerId,
      log
    };

    return fightRepository.create(result);
  }
}

const fightService = new FightersService();

export { fightService };