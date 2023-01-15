var fname = document.getElementById("name");
var email = document.getElementById("email");
var password = document.getElementById("password");
var contact = document.getElementById("contact");
var getImg = document.getElementById("img");
var imgUrl = "";
var upload = document.getElementById("upload");
var darkmode = document.getElementById("switch");
// refrence database k liye options
var student = document.getElementById("stud");
var teacher = document.getElementById("teach");
// submit button
var submit = document.getElementById("submit");
// console.log(fname, email, password, student, teacher)

// image ko get krny k liye function
getImg.addEventListener("click", function () {
  // onchange callback function => yeh  us waqt run hoga jb image upload hogi or uski value change hogi
  getImg.onchange = (e) => {
    // uploaded file ko target k liye
    fileget = e.target.files;
    reader = new FileReader();
    console.log(reader.result);
    reader.onload = function () {};
    reader.readAsDataURL(fileget[0]);
    console.log(fileget[0]);
    var upload = document.getElementById("upload");
    // upload.removeAttribute('style' , 'display' , 'block');
    if (fileget.name == "") {
      upload.innerText = "Uploading file";
    } else {
      upload.innerText = "Uploaded File Now Click Here To Upload on Server";
      upload.classList.add("btn");
      upload.classList.add("btn-success");
    }
  };
});

// file/image ko upload krny ka function
upload.addEventListener("click", function (e) {
  e.preventDefault();
  var storage = firebase.storage().ref();
  // img ko upload kry ga
  var uploadImg = storage.child(`Images/${fileget[0].name}`).put(fileget[0]);
  // console.log(imgUrl)

  // yeh url mein convert kry ga
  const urlfunc = () => {
    uploadImg.snapshot.ref.getDownloadURL().then((downloadUrl) => {
      getImg = downloadUrl;
      console.log(getImg);
    });
  };
  // yeh url wly function ko variable mein convert kry gas
  qwer = urlfunc();
  console.log(qwer);
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (teacher.checked == true) {
    console.log("teacher created");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      //   console.log(teacher.value)
      .then((teacher) => {
        var obj = {
          name: fname.value,
          email: email.value,
          password: password.value,
          contact: contact.value,
          image: getImg,
        };
        firebase.database().ref("teacher/").push(obj);
        // location.replace("teacher.html");
      })
      .catch(function (error) {
        // console.log(error);
        alert(error.message);
      });
  }
  //   console.log("student created");
  else if (student.checked == true) {
    console.log("student created");

    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      //   console.log(teacher.value)
      .then((stud) => {
        var obj = {
          name: fname.value,
          email: email.value,
          password: password.value,
          contact: contact.value,
          image: getImg,
        };
        firebase.database().ref("stud/").push(obj);
        // location.replace("student.html")
      })
      .catch(function (error) {
        // console.log(error);
        alert(error.message);
      });
  }
  setTimeout(() => {
    document.getElementById("myForm").reset()
  }, 1000);
});

// Dark mode ka function
darkmode.addEventListener("click", () => {
  nav = document.getElementsByClassName("navbar");
  nav[0].classList.toggle("bg-dark");
  nav[0].classList.toggle("navbar-dark");
  labeltext = document.getElementById("label");
  if (darkmode.checked == true) {
    document.body.classList.add("dark-mode");
    labeltext.innerText = "Disable Dark Mode";
  } else {
    document.body.classList.remove("dark-mode");
    labeltext.innerText = "Enable Dark Mode";
  }
});
