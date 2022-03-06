class User {
  constructor(userData){
    this.id = userData.id
    this.name = userData.name
    this.travelerType = userData.travelerType
  }

  getFirstName() {
  const firstName = this.name.split(" ")[0];
  return firstName;
}
}
export default User
