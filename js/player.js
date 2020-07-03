class Player{
  constructor(name, avatar){
    this.name = name;
    this.avatar = avatar
  }

  generate(){
    return {
      id : 1,
      name: this.name,
      avatar: this.avatar,
      health: 100,
      shield: false,
      weapon: {
        image: '',
        damage: 10 
      }
    }
  }
};

export default Player;