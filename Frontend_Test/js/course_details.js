document.addEventListener("DOMContentLoaded", function () {
	// Get course ID from URL parameters
	const urlParams = new URLSearchParams(window.location.search);
	const courseId = urlParams.get("courseId");

	const applyCouponBtn = document.getElementById("applyCouponBtn");
	const couponCodeInput = document.getElementById("couponCode");
	const originalPriceSpan = document.getElementById("coursePrice");
	const finalPriceSpan = document.getElementById("finalPrice");
	const discountMessageP = document.getElementById("discountMessage");


	if (!courseId) {
		// Handle missing course ID
		document.querySelector(".course_details").innerHTML =
			"<p>No course ID provided.</p>";
		return;
	}
	let selectedCourse;
	async function loadCourseDetails() {
		// Fetch course details from API
		fetch(`http://localhost:8090/courses/${courseId}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((course) => {
				// Update page with course details
				document.getElementById("courseImage").src = course.coursePic;
				document.getElementById("courseName").textContent =
					course.courseName;
				document.getElementById("courseInstructor").textContent =
					course.instructorName;
				document.getElementById("courseDescription").textContent =
					course.description;
				document.getElementById("courseCategory").textContent =
					course.category;
				document.getElementById("coursePrice").textContent =
					course.price;
				document.getElementById("courseRating").textContent =
					course.rating;
				document.getElementById("difficultyLevel").textContent =
					course.difficultyLevel;
				document.getElementById("courseDuration").textContent =
					course.duration;
				document.getElementById("finalPrice").textContent =
					course.price;
				localStorage.setItem("videoLink", course.videoUrl);
				localStorage.setItem("finalPrice", course.price);
				selectedCourse=course.price;
				if (course.couponCode != null) {
					document.getElementById(
						"displayDiscountMessage"
					).textContent = `Hurry up...Avail discount on this Course using coupan code:'${course.couponCode}' Offer valid till ${course.couponExpirationDate} only`;
				}
			})
			.catch((error) => {
				// Handle errors
				console.error(
					"There has been a problem with your fetch operation:",
					error
				);
				document.querySelector(".course-details").innerHTML =
					"<p>Course not found.</p>";
			});
	}
	loadCourseDetails();
	
	// localStorage.setItem("finalPrice", data.price);
	async function applyCoupon() {
		const couponCode = couponCodeInput.value;
		try {
			const response = await fetch(
				`http://localhost:8090/courses/${courseId}/price?couponCode=${couponCode}`
			);

			if (response.ok) {
				const data = await response.json();
				originalPriceSpan.textContent = data.originalPrice.toFixed(2);
				finalPriceSpan.textContent = data.discountedPrice.toFixed(2);
				localStorage.setItem("finalPrice", data.discountedPrice);

				if (data.originalPrice > data.discountedPrice) {
					const savingsPercentage = (
						((data.originalPrice - data.discountedPrice) /
							data.originalPrice) *
						100
					).toFixed(2);
					discountMessageP.textContent = `You save ${savingsPercentage}%!`;
					discountMessageP.style.color = "green";
				} else {
					discountMessageP.textContent =
						"Invalid or expired coupon code.";
					discountMessageP.style.color = "red";
					localStorage.setItem("finalPrice", selectedCourse);
				}
			} else {
				discountMessageP.textContent =
					"Error applying coupon. Please try again.";
				discountMessageP.style.color = "red";
				localStorage.setItem("finalPrice", selectedCourse);
			}
		} catch (error) {
			console.error("Error:", error);
			discountMessageP.textContent =
				"An error occurred. Please try again later.";
			discountMessageP.style.color = "red";
		}
	}

	applyCouponBtn.addEventListener("click", applyCoupon);
	loadCourseDetails();
});

// #################################

// Function to update navbar
function updateNavbar() {
	const userJson = localStorage.getItem("currentUser");
	const navbarActions = document.querySelector(".navbar-actions");

	if (userJson) {
		// User is logged in
		navbarActions.innerHTML = `
        <span id="welcomeUser"></span>
        <button class="btn" onclick="logout()">Logout</button>
      `;
		const user = JSON.parse(userJson);
		document.getElementById("welcomeUser").textContent = `Welcome, ${
			user.firstName || "User"
		}!`;
	} else {
		// User is not logged in
		navbarActions.innerHTML = `
        <input type="text" placeholder="Search..." class="search-bar">
        <a href="login.html"><button class="btn sign-in">Sign In</button></a>
        <a href="register2.html"><button class="btn sign-up">Sign Up</button></a>
      `;
	}
}

// Logout function
function logout() {
	updateNavbar();
	localStorage.clear();
	window.location.href = "login.html";
}
// Call updateNavbar when the page loads
document.addEventListener("DOMContentLoaded", updateNavbar);

// ###################################################

const enrollButton = document.getElementById("enrollButton");
const startButton = document.getElementById("startButton");

const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get("courseId");
const payment_status = urlParams.get("complete");

function isUserLoggedIn() {
	return localStorage.getItem("currentUser") !== null;
}

function updateLocalStorage(newCourse) {
	let currentUser = JSON.parse(localStorage.getItem("currentUser"));
	if (!currentUser.courses) {
		currentUser.courses = [];
	}
	currentUser.courses.push(newCourse);
	localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

enrollButton.addEventListener("click", async () => {
	if (!isUserLoggedIn()) {
		alert("Please log in to enroll in this course.");
		return;
	} else {
		window.location.href = `payment.html?courseId=${courseId}`;
	}
});

function sendRefundEmail() {
	const data = JSON.parse(localStorage.getItem("currentUser"));
	const templateParams = {
		to_name: data.firstName,
		to_email: data.email, // Replace with the recipient's email address
		message: "Your refund has been processed successfully.",
		amount: localStorage.getItem("finalPrice"),
		from_name: "Shobhit Yadav",
	};

	emailjs
		.send("service_9xvxqwv", "template_u9v5mwn", templateParams)
		.then((response) => {
			console.log(
				"Email sent successfully",
				response.status,
				response.text
			);
		})
		.catch((error) => {
			console.error("Failed to send email", error);
		});
}

const data = JSON.parse(localStorage.getItem("currentUser"));

function sendEnrollmentEmail() {
	
	const templateParams = {
		to_name: data.firstName,
		to_email: data.email,
		message: "Congratulations!! You succesfully enrolled to our Course.",
		amount: localStorage.getItem("finalPrice"),
		from_name: "Shobhit Yadav",
	};

	emailjs
		.send("service_9xvxqwv", "template_rnzaqgg", templateParams)
		.then((response) => {
			console.log(
				"Email sent successfully",
				response.status,
				response.text
			);
		})
		.catch((error) => {
			console.error("Failed to send email", error);
		});
}

const courseData = JSON.parse(localStorage.getItem("currentCourse"));
const refund_status = urlParams.get("refund");
if (refund_status == "true") {
	const finalPrice=0-parseInt(localStorage.getItem('finalPrice'));
	sendRefundEmail();
	updateWalletBalance(finalPrice);
}


// const courseData = JSON.parse(localStorage.getItem("currentCourse"));

const finalPrice=parseInt(localStorage.getItem('finalPrice'));
	async function  updateWalletBalance(finalPrice){
		// UPDATING INSTRUCTOR BALANCE
	try {
		

	let response=await fetch(`http://localhost:8090/users/${courseData.instructorId}/${finalPrice}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		
	});
	if(response.ok){
		console.log(' Data sent sucessfully ');
		// document.getElementById('responseMessage').innerHTML="  Data sent sucessfully :)";
		// window.location.href='login.html';
	}
	} catch (error) {
		// document.getElementById('errorMssg').innerHTML="  Couldn't send data :(";
		console.log(error);
	}
	
	}

if (payment_status == "true") {
	enrollButton.textContent = "Enrolled";
	enrollButton.disabled = true;

	// Show Start Course button
	startButton.classList.remove("hidden");

	

	updateWalletBalance(finalPrice);


	// DOWNLOAD FUNCTIONALITY
	function downloadFile(url, filename) {
		fetch(url)
			.then(response => response.blob())
			.then(blob => {
				const link = document.createElement('a');
				link.href = URL.createObjectURL(blob);
				link.download = filename;
				document.body.appendChild(link);
				link.click();
				link.remove();
			})
			.catch(error => console.error('Error downloading file:', error));
	}

	// Add button to trigger download
	document.getElementById('resources').innerHTML = `
		<button onclick="downloadFile('${courseData.resourceUrl}', 'resource.pdf')">Download PDF</button>
	`;


	displayButtonAfterDelay();

	document.getElementById('certificateButton').addEventListener('click', async () => {
		const { jsPDF } = window.jspdf;

		// Retrieve dynamic values from localStorage
		const userName = userData.firstName || 'John Doe';
		const courseName = courseData.courseName || 'JavaScript Fundamentals';
		const completionDate = new Date().toLocaleDateString();

		// Create a new PDF document
		const doc = new jsPDF();

		// Add content to the PDF
		doc.setFontSize(22);
		doc.text('Certificate of Completion', 105, 50, { align: 'center' });

		doc.setFontSize(16);
		doc.text(`This is to certify that ${userName}`, 105, 80, { align: 'center' });
		doc.text(`Has successfully completed the course ${courseName}`, 105, 100, { align: 'center' });
		doc.text(`On ${completionDate}`, 105, 120, { align: 'center' });

		// Convert the document to a Blob
		const blob = doc.output('blob');

		// Create a temporary link element to trigger the download
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = 'certificate.pdf'; // Set the filename for the download
		document.body.appendChild(link);
		link.click(); // Trigger the download
		document.body.removeChild(link); // Clean up
	});





	// Set the initial countdown time in seconds
	const initialCountdownTime = 15;

	// Retrieve the remaining time from local storage or set to initialCountdownTime if not available
	let countdownTime =
		parseInt(localStorage.getItem("countdownTime")) || initialCountdownTime;
	let endTime = localStorage.getItem("endTime")
		? new Date(localStorage.getItem("endTime"))
		: new Date(Date.now() + countdownTime * 1000);

	function updateContent() {
		var messageElement = document.getElementById("message");
		var buttonElement = document.getElementById("refundButton");

		// Change the message
		messageElement.innerHTML = "Refund request period has expired.";

		// Hide the button
		buttonElement.style.display = "none";

	}

	function updateTimer() {
		// Get the timer element
		var messageElement = document.getElementById("message");
		var timerElement = document.getElementById("timer");

		// Remove the 'hidden' class
		messageElement.classList.remove("hidden");
		timerElement.classList.remove("hidden");

		var timerElement = document.getElementById("timeRemaining");
		let now = new Date();

		// Calculate remaining time
		let remainingTime = Math.ceil((endTime - now) / 1000);

		if (remainingTime < 0) {
			// When time is up, update content and clear the interval
			updateContent();
			clearInterval(timerInterval);
			localStorage.removeItem("countdownTime");
			localStorage.removeItem("endTime");
		} else {
			// Update the timer display
			timerElement.textContent = remainingTime;
			localStorage.setItem("countdownTime", remainingTime);
		}

	}

	// Set endTime in local storage
	localStorage.setItem("endTime", endTime);

	// Update the timer every second
	var timerInterval = setInterval(updateTimer, 1000);
	sendEnrollmentEmail();
}

function handleRefundButtonClick() {
	window.location.href = `refund.html?courseId=${courseId}`;
}

// Add event listener to the button
document
	.getElementById("refundButton")
	.addEventListener("click", handleRefundButtonClick);

startButton.addEventListener("click", () => {
	if (!isUserLoggedIn()) {
		alert("Please log in to start this course.");
		return;
	}
	// Add functionality for starting the course
	startCourse();
});

// Listen for changes in login state
window.addEventListener("storage", (event) => {
	if (event.key === "currentUser") {
		updateButtonState();
	}
});

const modal = document.getElementById("videoModal");
const btn = document.getElementById("startButton");
const span = document.getElementsByClassName("close")[0];
const videoPlayer = document.getElementById("videoPlayer");
const videoLink = localStorage.getItem("videoLink");

btn.onclick = function () {
	modal.style.display = "block";
	videoPlayer.innerHTML = `<iframe width="560" height="315" src="${videoLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
};

span.onclick = function () {
	modal.style.display = "none";
	videoPlayer.innerHTML = ""; // Clear the video when closing the modal
};

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
		videoPlayer.innerHTML = ""; // Clear the video when closing the modal
	}
};



// Download functionality

// Function to display the button after a specific delay

const userData = JSON.parse(localStorage.getItem("currentUser"));
function displayButtonAfterDelay() {
    const delayTime = 10000; // 5 seconds delay

    setTimeout(() => {
        document.getElementById('certificateButton').style.display = 'block';
        // Populate certificate with localStorage values
        document.getElementById('certName').textContent = userData.firstName + " " + userData.lastName || 'John Doe';
        document.getElementById('certCourse').textContent = courseData.courseName || 'JavaScript Basics';
        document.getElementById('certDate').textContent = new Date().toLocaleDateString();
    }, delayTime);
}





