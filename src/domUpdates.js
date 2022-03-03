const domUpdates = {
  updateTotalSpent(total){
    let totalSpent = document.getElementById('totalSpent')
    totalSpent.innerText += ` $${total}`
    console.log(total)
    console.log('dom update')
  }
}

export default domUpdates
