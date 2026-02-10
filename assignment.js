const userA = [{
  "username": "Kate", "id": 2
},
{
  "username": "John", "id": 3
},
{
  "username": "lovely", "id": 4
},
{
  "username": "Kelv", "id": 5
}]


const userInfo = ((userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      const user = userA.find(u => u.id === userId)

      if (user) {
        resolve(user.username)
      } else {
        reject("user not found")
      }

    }, 3000)
  })

})

// const infoDetails = userInfo(5).then(result => console.log(result)).catch(result => console.log(result))


//in an assync function the try and catch function most be there to check and verify the work
async function getuserDetails() {
  try {
    const user = await userInfo(2)
    console.log(user)
  } catch (error) {
    console.log(error)
  }

}

getuserDetails();