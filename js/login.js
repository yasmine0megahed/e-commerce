// for test users is exist only
var nameOfUsers=[]
window.addEventListener("load",function(){
    fetch('https://dummyjson.com/users')
 .then(res => res.json())
 .then(data=>{
for (let i = 0; i < 2; i++) {
    console.log("UserName=====>" +data.users[i].username);
    console.log("passwordFromApi=====>" +data.users[i].password);
   let c=nameOfUsers.push(data.users[i].username)
}

 });
})

// let arrDataUserFromLocal=JSON.parse(localStorage.getItem("data"))   
//       if (localStorage.getItem("data")!=null) {
//         location.assign("login.html")

    
//       }
     


let UserNameInput=document.querySelector("input[type='text']")
let passwordInput=document.querySelector("input[type='password']")
let btnLogin=document.querySelector(".button__login")
let userErr=document.querySelector(".hideuser__error")
let passErr=document.querySelector(".hidepassword__error")


var userName="";
UserNameInput.addEventListener("keyup",function(){
    userName=UserNameInput.value;
    // if username not match with regex
    const userRegx =/^[A-Za-z]{3}[A-Za-z0-9]{3,15}$/;;
if (userName.match(userRegx)==null) {
            UserNameInput.setAttribute("class","erroruser__input")     
            userErr.setAttribute("class","showuser__error")     
             userErr.innerHTML="Sorry,you username not valid !"
}else{
  // if username  match with regex
  UserNameInput.setAttribute("class","uservalid")   
  userErr.setAttribute("class","hideuser__error")     
}
})
var password="";
passwordInput.addEventListener("keyup",function(){
    password=passwordInput.value;
    // if password not match with regex
    let passRegx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,16}$/
    if (password.match(passRegx)==null) {
      passwordInput.setAttribute("class","errorpass__input")     
            passErr.setAttribute("class","showpassword__error")     
             passErr.innerHTML="Sorry,you pasword not valid !"
         passErr.innerHTML="Sorry,you password not valid !"
        console.log("password not match");
    }else{
      // if password  match with regex
      passwordInput.setAttribute("class","passvalid")   
  passErr.setAttribute("class","hidepassword__error")     

    }


})
 // this function for login users
 var arrayUsers=[];
 var thirtyDays=43200
btnLogin.addEventListener("click",function(e){
e.preventDefault()
async function fetchUserLogin(){
 await fetch('https://dummyjson.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: userName,
    password: password,
    expiresInMins:thirtyDays

  })
})
.then(res =>{ 
  // if there is error in data login (username & password)
  if (!res.ok){ 
      // if (username not correct and  empty) and (password not correct and  empty) !
    if(UserNameInput.value==""&& passwordInput.value==""){
    userErr.setAttribute("class","showuser__error")     
    userErr.innerHTML="Sorry,you must write username";
    UserNameInput.setAttribute("class","erroruser__input")     

    passErr.setAttribute("class","showpassword__error")     
    passErr.innerHTML="Sorry,you must write password";
    passwordInput.setAttribute("class","errorpass__input")     

  }
  // if (username not correct and none empty) and password empty !
  else if(UserNameInput.value!==""&& passwordInput.value==""){
    for (let i = 0; i < nameOfUsers.length; i++) {
      if (nameOfUsers.includes(userName)) {
        UserNameInput.setAttribute("class","uservalid")   
  userErr.setAttribute("class","hideuser__error")  
   
      }else{
        userErr.setAttribute("class","showuser__error")   
        UserNameInput.setAttribute("class","erroruser__input")     
              userErr.setAttribute("class","showpassword__error")     
              userErr.innerHTML="Sorry,this user not exist"  ;
      }
      
    }




      passwordInput.setAttribute("class","errorpass__input")     
          passErr.setAttribute("class","showpassword__error")  
          passErr.innerHTML="Sorry,you must write password " ;   
    }
      // if (password not correct and  none empty) and username empty !
    else if(passwordInput.value!=="" && UserNameInput.value==""){
        UserNameInput.setAttribute("class","erroruser__input")     
          userErr.setAttribute("class","showpassword__error")     
          userErr.innerHTML="Sorry,you must write username"  ;

          passErr.setAttribute("class","showpassword__error")     
          passErr.innerHTML="Invalid credentials"  ;   
   
    }
// if username and password not correct
    else{
      userErr.setAttribute("class","showuser__error")     
        userErr.innerHTML="Sorry,you must write username"; 
        UserNameInput.setAttribute("class","erroruser__input")     

         userErr.innerHTML="Invalid credentials."  ; 

          passwordInput.setAttribute("class","erroruser__input")     
          passErr.setAttribute("class","showpassword__error")     
          passErr.innerHTML="Invalid credentials."  ; 
          console.log("username OR password not found");

}

}
    else{
      // if the data is correct 
      return  res.json()
    }


})
.then(data=>{




if (data) {
  UserNameInput.setAttribute("class","uservalid")   
  userErr.setAttribute("class","hideuser__error")   

  passErr.setAttribute("class","hidepassword__error")
  passwordInput.setAttribute("class","passvalid")     
  // collect data from userlogin and save it localstorage
 // let thirtyDays=62208000000;
let dayExpiry= new Date().getTime()+thirtyDays;
let objUser={username:data.username,token:data.token}
             //  arrayUsers.push(obj)
             localStorage.setItem("data",JSON.stringify(objUser))
            //  console.log(` and Your token for next steps is: ${data.token} `)
             location.replace("index.html");

}
    })
.catch((error)=>{
//   console.log(error);

}

);
}
fetchUserLogin()


})


