import User from "./User";

class UserRepository{
  constructor(userData){
    this.data = userData
  }

  createUser(id){
    let oneUser = this.data.find(person => person.id === id)
    return new User(oneUser)
  }
}

export default UserRepository
