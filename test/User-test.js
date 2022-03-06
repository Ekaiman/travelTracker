import chai from "chai";
const expect = chai.expect;
import User from "../src/User";

describe("User", () => {
  let user1data;
  let user2data;
  let user3data;
  let user1;
  let user3

  beforeEach(() => {
    user1data = {
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer",
    };

    user2data = {
      id: 2,
      name: "Rachael Vaughten",
      travelerType: "thrill-seeker",
    };

    user3data = {
      id: 3,
      name: "Sibby Dawidowitsch",
      travelerType: "shopper",
    };

    user1 = new User(user1data);
    user3 = new User(user3data);
  });

  it("should be a function", () => {
    expect(User).to.be.a("function");
  });

  it("should be an instance of User", () => {
    expect(user1).to.be.an.instanceOf(User);
  });

  it("should accept a user and take the id", () => {
    expect(user3.id).to.equal(3);
  });

  it("should take in the users name", () => {
    expect(user3.name).to.equal("Sibby Dawidowitsch")
  })

  it("should take in the users travel type", () => {
    expect(user3.travelerType).to.equal("shopper")
    expect(user1.travelerType).to.equal("relaxer")
  })

  it("should return the users first name", () => {
    expect(user1.getFirstName()).to.equal("Ham");
  });

});
