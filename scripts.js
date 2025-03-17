document.addEventListener("DOMContentLoaded", () => {
    // ============================
    // Login Form Functionality
    // ============================
    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");

    if (loginForm && loginMessage) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent page refresh

            // Get input values
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            // Basic validation
            if (username === "" || password === "") {
                loginMessage.textContent = "Please enter both username and password.";
                loginMessage.style.color = "red";
            } else {
                // Display success message
                loginMessage.textContent = `Welcome, ${username}! You have successfully logged in.`;
                loginMessage.style.color = "green";

                // Clear form inputs
                loginForm.reset();
            }
        });
    }

    // ============================
    // Feedback Form Functionality
    // ============================
    const feedbackForm = document.getElementById("contact-form");
    const feedbackContainer = document.getElementById("feedback-list");

    if (feedbackForm) {
        feedbackForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent page reload

            // Get form values
            const feedbackData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                rating: document.getElementById("rating").value,
                message: document.getElementById("message").value,
                date: new Date().toLocaleString()
            };

            // Retrieve existing feedback from LocalStorage
            let feedbackList = JSON.parse(localStorage.getItem("feedbacks")) || [];

            // Add new feedback
            feedbackList.push(feedbackData);

            // Save back to LocalStorage
            localStorage.setItem("feedbacks", JSON.stringify(feedbackList));

            // Create a success message
            let successMsg = document.createElement("p");
            successMsg.textContent = "Feedback submitted successfully!";
            successMsg.style.color = "green";
            successMsg.style.textAlign = "center";
            successMsg.style.fontSize = "18px";
            successMsg.style.fontWeight = "bold";
            successMsg.id = "feedback-success-message";

            let existingMsg = document.getElementById("feedback-success-message");
            if (!existingMsg) {
                feedbackForm.appendChild(successMsg);
            }

           
            feedbackForm.reset();

           
            setTimeout(() => {
                successMsg.remove();
            }, 5000);

           
            displayFeedback();
        });
    }

    
        // Function to Display Feedback
        function displayFeedback() {
            feedbackContainer.innerHTML = ""; 
            let feedbackList = JSON.parse(localStorage.getItem("feedbacks")) || [];
    
            if (feedbackList.length === 0) {
                feedbackContainer.innerHTML = "<p>No feedback available yet.</p>";
                return;
            }
    
            feedbackList.forEach((feedback, index) => {
                const feedbackItem = document.createElement("div");
                feedbackItem.classList.add("feedback-item");
                feedbackItem.innerHTML = `
                <H4>"${feedback.email}"</H4>
                    <p>"${feedback.message}"</p>
                    <h4>${"⭐".repeat(feedback.rating)}</h4>
                    <h4>- ${feedback.name}</h4>
                    <button onclick="deleteFeedback(${index})">Delete</button>
                    <hr>
                `;
                feedbackContainer.appendChild(feedbackItem);
            });
        }
    
        // Function to Delete Feedback
        window.deleteFeedback = function (index) {
            let feedbackList = JSON.parse(localStorage.getItem("feedbacks")) || [];
            feedbackList.splice(index, 1); 
            localStorage.setItem("feedbacks", JSON.stringify(feedbackList));
            displayFeedback(); 
        };
    
        displayFeedback();
    });
    