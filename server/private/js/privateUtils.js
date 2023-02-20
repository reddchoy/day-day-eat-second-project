const parser = new DOMParser();

function loadHeader() {

	const header = document.querySelector("#header");
	header.innerHTML +=
		/*html*/
		`
		<div class="company-container">
		<a href="./index.html"><button class="btn btn-primary home-icon">日日食</button></a>
		<div class="logo-container">
		<img src="./icon/company-logo.png" class="company-logo">
		</div> 
		</div> 
	  <div class="functionArea">
		<div class="login-btn">
		  <button class="btn btn-primary login" type="button" data-bs-toggle="modal" data-bs-target="#loginModal"></button>
		</div>
		<div class="welcome-container">
		</div>
		<h4 class = "loggedIn-username" style="color: white;"></h4>
		<button
		  class="btn btn-primary menu-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Menu
		</button>
	  </div>

	  `
}


function loadLoginModel() {
	const div = document.createElement('div');
	let modal = `<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">登入</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form method="post" id="form-login">
            <div class="mb-3">
              <label for="username" class="col-form-label">username:</label>
              <input type="text" class="form-control" name="username" value="user1" required>
            </div>
            <div class="mb-3">
              <label for="password" class="col-form-label">password:</label>
              <input type="password" class="form-control" name="password" value="1234" required>
            </div>
            <div class="d-grid d-md-flex justify-content-end">
              <input type="submit" class="btn btn-primary">
            </div>
           
          </form>
        </div>
        <div class="modal-footer">
          <div class="regBtn col-5 col-sm-5">
            <button type="button" class="btn btn-secondary " data-bs-toggle="modal" data-bs-target="#registerModal" >sign up</button>
          </div>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

        </div>
      </div>
    </div>
  </div>-`
	div.innerHTML = modal;
	document.body.appendChild(div);
}

function loadRegisterModel() {
	const div = document.createElement('div');
	let modal = `<div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog">
	  <div class="modal-content">
		<div class="modal-header">
		  <h1 class="modal-title fs-5" id="exampleModalLabel">註冊</h1>
		  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		</div>
		<div class="modal-body">
		  <form method="post" id="form-register">
			<div class="mb-3">
			  <label for="username" class="col-form-label">username:</label>
			  <input type="text" class="form-control" name="username" required>
			</div>
			<div class="mb-3">
			  <label for="password" class="col-form-label">password:</label>
			  <input type="password" class="form-control" name="password" required>
			</div>
			<div class="mb-3">
			  <label for="email" class="col-form-label">email:</label>
			  <input type="text" class="form-control" name="email" required>
			</div>
			<div class="mb-3">
			  <label for="mobile_number" class="col-form-label">mobile number:</label>
			  <input type="text" class="form-control" name="mobile_number">
			</div>
			<div class="mb-3">
			  <label for="profile_pic" class="col-form-label">profile_pic:</label>
			  <input type="file" class="form-control" name="profile_pic" accept="image/png, image/jpeg">
			</div>
			  <input type="submit" class="btn btn-primary">
		  </form>
		</div>
		<div class="modal-footer">
		  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
		</div>
	  </div>
	</div>
  </div>`
	div.innerHTML = modal;
	document.body.appendChild(div);
}
function logout() {
	document.querySelector(".logout").addEventListener("click", async (e) => {
		try {
			const res = await fetch("/users/logout");
		const { message } = await res.json();
		window.location = "./"
		alert(message);
		} catch (error) {
			console.log(error.message)
		}
	});
}

function login() {
	const url = window.location.href
	document
		.querySelector("#form-login")
		.addEventListener("submit", async (e) => {
			try {
				e.preventDefault();
				const form = e.target;
				const username = form.username.value;
				const password = form.password.value;
				const resp = await fetch("/users/login", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({ username, password }),
				});
				if (resp.status === 200) {
					const { message, username } = await resp.json();
					alert(message);
					document.querySelector(".login").innerHTML = "";
					document.querySelector(".loggedIn-username").innerText = username;
	
					window.location = url;
				} else {
					const { message } = await resp.json();
					alert(message);
				}
			} catch (error) {
				console.log(error.message)
			}

		});
}

async function showUserName() {
	const resp = await fetch("/users/getReqSessionAndUserName")
	const { message, username } = await resp.json();
	if (message) {
		const welcomeContainer = document.querySelector(".welcome-container")
		welcomeContainer.innerHTML += `
		<div class="welcome-text">
			 歡迎光臨 !
			 </div>
			 <div class="welcome-text">
			 いらっしゃいませ~
			 </div>`
		document.querySelector(".login").innerHTML = "";
		document.querySelector(".loggedIn-username").innerText = username.username;
	}
	else {
		document.querySelector(".login-btn").innerHTML = `<button class="btn btn-primary login" type="button" data-bs-toggle="modal" data-bs-target="#loginModal">登入 / 注冊</button>`
	}
}

async function showCanvasContent() {

	const resp2 = await fetch("/users/profile");
	const { data } = await resp2.json();
	const profileImg = document.querySelector(".profilePic");
	if (!data.profile_pic) {
	  profileImg.src = "../userPic/default-profile-pic.png";
	} else {
	  profileImg.src = data.profile_pic;
	}
	
	const resp = await fetch("/users/getReqSessionAndUserName")
	const { message, username } = await resp.json();
	if (message) {
		const canvasUsername = document.querySelector("#canvasContentOne .username")
		canvasUsername.innerText = username.username
		const profileBtn = document.querySelector("#user-profile")
		const likeRecordBtn = document.querySelector("#like-record")
		const reviewRecordBtn = document.querySelector("#review-record")
		document.querySelector("#canvasContentTwo").style.display = "none"
		profileBtn.style.display = "block"
		likeRecordBtn.style.display = "block"
		reviewRecordBtn.style.display = "block"
		profileBtn.addEventListener("click", (e) => {
			window.location = "./profile.html"
		})
		likeRecordBtn.addEventListener("click", (e) => {
			window.location = "./likedRecord.html"
		})
		reviewRecordBtn.addEventListener("click", (e) => {
			window.location = "./reviewRecord.html"
		})

	} else {
		document.querySelector("#user-profile").style.display = "none"
		document.querySelector("#like-record").style.display = "none"
		document.querySelector("#review-record").style.display = "none"
	}
	

}

function register() {
	document
		.querySelector("#form-register")
		.addEventListener("submit", async (e) => {
			e.preventDefault();
			const form = e.target;
			const username = form.username.value;
			const password = form.password.value;
			const email = form.email.value;
			const mobile_number = form.mobile_number.value;
			const profile_pic = form.profile_pic.files[0];

			const formData = new FormData();
			formData.append("username", username);
			formData.append("password", password);
			formData.append("email", email);
			formData.append("mobile_number", mobile_number);
			formData.append("profile_pic", profile_pic);
			const res = await fetch("/users/register", {
				method: "POST",
				body: formData,
			});
			const data = await res.json();
			if (res.status == 400) {
				alert(data.message);
				return;
			}
			alert(data.message);
		});
}



