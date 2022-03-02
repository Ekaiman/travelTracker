class Destination{
  constructor(destinationData) {
    this.data = destinationData
  }

  getOneDestination(id){
    // console.log(this.data.find(destination => destination.id === id))
    return this.data.find(destination => destination.id === id)
  }

  
}

export default Destination
