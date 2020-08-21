import { weapon1 } from './assets';
import { weapon4 } from './assets';

class Player {
  constructor(name, avatar, id) {
    this.name = name;
    this.avatar = avatar;
    this.id = id;
  }

  generate() {
    return {
      id: this.id,
      name: this.name,
      avatar: `<img src="${this.avatar}" alt="${this.name}" />`,
      health: 100,
      shield: false,
      weapon: {
        image: `<img src="${weapon1}" alt="" />`,
        damage: 10,
        oldWeapon: ``
      },
      position: {
        col: 0,
        row: 0
      }
    }
  }
};

export default Player;