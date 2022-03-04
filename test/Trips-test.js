import chai from "chai";
const expect = chai.expect;
import User from "../src/User";
import UserRepository from "../src/UserRepository";
import Destinations from "../src/Destinations";
import Trips from "../src/Trips";
import tripData from "../src/tripData";
import destinationData from "../src/destinationData";

describe("Trips", () => {
  let tripData1;
  let trip1;
  let trip2;
  let trip3;

  beforeEach(() => {
    tripData1 = [
      {
        id: 1,
        userID: 44,
        destinationID: 49,
        travelers: 1,
        date: "2022/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 2,
        userID: 35,
        destinationID: 25,
        travelers: 5,
        date: "2022/10/04",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 3,
        userID: 35,
        destinationID: 22,
        travelers: 4,
        date: "2022/05/22",
        duration: 17,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 4,
        userID: 3,
        destinationID: 14,
        travelers: 2,
        date: "2021/02/25",
        duration: 10,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 5,
        userID: 3,
        destinationID: 29,
        travelers: 3,
        date: "2022/04/30",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 6,
        userID: 3,
        destinationID: 35,
        travelers: 3,
        date: "2022/06/29",
        duration: 9,
        status: "pending",
        suggestedActivities: [],
      },
      {
        id: 7,
        userID: 35,
        destinationID: 17,
        travelers: 5,
        date: "2022/5/28",
        duration: 20,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 8,
        userID: 36,
        destinationID: 39,
        travelers: 6,
        date: "2022/02/07",
        duration: 4,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 9,
        userID: 3,
        destinationID: 19,
        travelers: 5,
        date: "2022/12/19",
        duration: 19,
        status: "pending",
        suggestedActivities: [],
      },
    ];

    trip1 = new Trips(44, tripData);
    trip2 = new Trips(35, tripData1);
    trip3 = new Trips(3, tripData1);
  });

  it("should be a function", () => {
    expect(Trips).to.be.a("function");
  });

  it("should be an instance of Trip", () => {
    expect(trip1).to.be.an.instanceOf(Trips);
  });

  it("should accept destination data and hold it", () => {
    expect(trip1.tripData).to.eql(tripData);
  });

  it("should find and store all trips for one user", () => {
    expect(trip1.tripDataOneUser.length).to.equal(4);
  });

  it("should return a singlue users destinationID for all trips theyve taken", () => {
    expect(trip1.returnDestinationId()).to.eql([49, 33, 14, 41]);
  });

  it("should caluculate cost of a single trip picked by trip ID", () => {
    expect(trip1.getCostOfOneTrip(68, 500, 100)).to.equal(7600);
  });

  it("should calculate all trips taken this year", () => {
    expect(trip1.getCostOfTripsThisYear(destinationData)).to.equal(5819);
    expect(trip2.getCostOfTripsThisYear(destinationData)).to.equal(16368);
  });

  it("should reformat all the dates into numbers", () => {
    expect(trip3.turnDatesToNumber()[0].date).to.be.a("number");
    expect(trip3.tripDataNumberDates[1].date).to.be.a("number");
  });

  it("should sort one users trips into past, present and pending", () => {
    let result = trip3.sortedTrips();
    expect(result).to.be.an("object");
    expect(result.past.length).to.equal(1);
    expect(result.pending.length).to.equal(2);
    trip3.getTodaysDate()
  });

  it('should calculate a single trips cost given duration, # of travelers and destinationId', () => {
    expect(trip1.getCostOfPendingTrip(5, 2, 1, destinationData).total).to.equal(1150)
    expect(trip1.getCostOfPendingTrip(5, 2, 1, destinationData).agentFee).to.equal(115)
  })
});
