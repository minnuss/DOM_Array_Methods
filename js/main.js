const mainContainer = document.getElementById('main')
const btnAddUser = document.getElementById('add-user')
const btnDoubleMoney = document.getElementById('double-money')
const btnShowMillionaires = document.getElementById
    ('show-millionaires')
const btnSort = document.getElementById('sort')
const btnTotal = document.getElementById('total')

const apiUrl = 'https://randomuser.me/api'

// array to put all users in
let data = []
// default number of users to fetch when page loads
let defaultUserCount = 3

// FETCH RANDOM USER AND ADD MONEY
async function getRandomUser() {
    const res = await fetch(apiUrl)
    const data = await res.json()

    // console.log(data.results)
    const user = data.results[0]

    let newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * (1500000 - 50000) + 50000)
    }
    // console.log(newUser)
    addData(newUser)
}
// FETCHING USERS BY DEFAULTUSERCOUNT VARIABLE
for (let i = 0; i < defaultUserCount; i++) {
    getRandomUser()
}

// ADD NEW USER DATA TO DATA ARRAY
function addData(userData) {
    data.push(userData)
    updateDOM()
}

// UPDATE DOM FROM DATA ARRAY
function updateDOM(providedData = data) {
    mainContainer.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`

    providedData.forEach(item => {
        const userEl = document.createElement('div')
        userEl.classList.add('person')
        userEl.innerHTML = `
        <strong>${item.name}</strong> ${formatMoney(item.money)}
        `
        mainContainer.appendChild(userEl)
    })
}

// FORMAT NUMBER AS MONEY
function formatMoney(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '$'
}


// DOUBLE THE MONEY
function doubleTheMoney() {
    // console.log(data)
    data.map(userObj => userObj.money = userObj.money * 2)
    updateDOM()
}

// SORT BY WEALTH
function sortByWealth() {
    // console.log(data)
    data.sort((userA, userB) => userB.money - userA.money)
    updateDOM()
}

// SHOW MILLIONARIES
function showMillionaires() {
    console.log(data)
    data = data.filter(user => user.money > 999999)
    console.log(data)
    updateDOM()
    // calculateTotal()
}

// TOTAL WEALTH
function calculateTotal() {
    // check if total is already clicked
    if (mainContainer.innerHTML.includes('h3')) return

    let totalWealth = data.reduce((acc, user) => acc + user.money, 0)
    let totalEl = document.createElement('div')
    totalEl.innerHTML = `
    <h3>Total: <strong>${formatMoney(totalWealth)}</strong></h3>
    `
    mainContainer.appendChild(totalEl)
}

// EVENT LISTENERS
btnAddUser.addEventListener('click', getRandomUser)
btnDoubleMoney.addEventListener('click', doubleTheMoney)
btnSort.addEventListener('click', sortByWealth)
btnShowMillionaires.addEventListener('click', showMillionaires)
btnTotal.addEventListener('click', calculateTotal)