class Destination{
  constructor(destinationData) {
    this.data = destinationData
  }

  getOneDestination(id){
    // console.log(this.data.find(destination => destination.id === id))
    return this.data.find(destination => destination.id === id)
  }

  getDestinationByName(name){
    return this.data.find(destination => destination.destination === name)
  }


}

export default Destination
