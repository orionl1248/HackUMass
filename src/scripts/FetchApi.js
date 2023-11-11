let testList = [
  {
    FirstName: "John",
    LastName: "Smith",
    Rating: 100
  },
  {
    FirstName: "Steve",
    LastName: "Carrington",
    Rating: 10
  },
  {
    FirstName: "Zach",
    LastName: "Alfano",
    Rating: 50
  },
  {
    FirstName: "Zachory",
    LastName: "King",
    Rating: 200
  },
  {
    FirstName: "Name",
    LastName: "Last",
    Rating: 300
  }
];


export async function apiFetch() {
  await new Promise(resolve => setTimeout(resolve, 0));
  return testList[Math.floor(Math.random()*testList.length)];
}
