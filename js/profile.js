// localStorage.setItem(
//   "data",
//   JSON.stringify({
//     id: 15,
//     username: "kminchelle",
//     email: "kminchelle@qq.com",
//     firstName: "Jeanne",
//     lastName: "Halvorson",
//     gender: "female",
//     image: "https://robohash.org/Jeanne.png?set=set4",
//     token:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvSmVhbm5lLnBuZz9zZXQ9c2V0NCIsImlhdCI6MTcwODExNjM1MSwiZXhwIjoxNzA4MTE5OTUxfQ.nuikJCxXzxw6esUIC4dl2LxDBIwuP_CcBOzCPCgFfxM"  })
// );

const userFetchedData = async (token) => {
  try {
    if (token) {
      const data = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.json();
    } else {
      // If token doesn't exist, redirect to login page or display message
      window.location.href = "login.html"; // Redirect to login page
    }
  } catch (err) {
    console.error(err);
  }
};

document.addEventListener("DOMContentLoaded", async function () {
  const data = localStorage.getItem("data");
  if (data) {
    let parsedData = JSON.parse(data);
    let userData = await userFetchedData(parsedData.token);
    console.log(userData);

    if (userData.name !== "TokenExpiredError") {
      document.getElementById(
        "name"
      ).textContent = `${userData.firstName} ${userData.lastName}`;
      document.getElementById("user-image").src = userData.image;
      document.getElementById("age").textContent = userData.age;
      document.getElementById("gender").textContent = userData.gender;
      document.getElementById("email").textContent = userData.email;
      document.getElementById("phone").textContent = userData.phone;
      document.getElementById("username").textContent = userData.username;
      document.getElementById("height").textContent = userData.height;
      document.getElementById("weight").textContent = userData.weight;
      // document.getElementById("password").textContent = userData.password;
      document.getElementById("birthdate").textContent = userData.birthDate;
    } else {
      // alert("Please Login First");
      window.location.href = "login.html";
    }
  } else {
    // If token doesn't exist in local storage, redirect to login page or display message
    // alert("Please Login First");
    window.location.href = "login.html"; // Redirect to login page
  }
});

let btnLogout = document.querySelector(".logout");
btnLogout.addEventListener("click", function () {
  console.log("working");

  localStorage.removeItem("data");
  location.replace("login.html");
});
