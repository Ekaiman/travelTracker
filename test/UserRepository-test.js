import chai from "chai";
const expect = chai.expect;
import User from "../src/User";
import UserRepository from "../src/UserRepository";

describe("UserRepository", () => {
  let userData;
  let userRepository1

  beforeEach(() => {
    userData = [
      {
        id: 1,
        name: "Ham Leadbeater",
        travelerType: "relaxer",
      },
      {
        id: 2,
        name: "Rachael Vaughten",
        travelerType: "thrill-seeker",
      },
      {
        id: 3,
        name: "Sibby Dawidowitsch",
        travelerType: "shopper",
      },
      {
        id: 4,
        name: "Leila Thebeaud",
        travelerType: "photographer",
      },
      {
        id: 5,
        name: "Tiffy Grout",
        travelerType: "thrill-seeker",
      },
      {
        id: 6,
        name: "Laverna Flawith",
        travelerType: "shopper",
      },
      {
        id: 7,
        name: "Emmet Sandham",
        travelerType: "relaxer",
      },
      {
        id: 8,
        name: "Carlin O'Reilly",
        travelerType: "history buff",
      },
      {
        id: 9,
        name: "Natalee Deegin",
        travelerType: "relaxer",
      }
    ];

    userRepository1 = new UserRepository(userData)
  });

  it("should be a function", () => {
    expect(UserRepository).to.be.a("function");
  });

  it("should be an instance of UserRepository", () => {
    expect(userRepository1).to.be.an.instanceOf(UserRepository);
  });

  it('should accept user data and hold it', () => {
    expect(userRepository1.data).to.equal(userData)
  })

  it("should return user data based on ID input", () => {
    let user1 = new User(userData[0]);
    expect(userRepository1.createUser(1)).to.eql(user1);
  });
});
