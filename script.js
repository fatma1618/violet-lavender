document.addEventListener('DOMContentLoaded', () => {
    let lastScrollTop = 0;
    let timeout;

    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('nav-bar');
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Clear the timeout if the user is scrolling
        clearTimeout(timeout);

        // Show the navbar when scrolling down
        if (currentScroll > lastScrollTop) {
            navbar.style.top = '-110px'; // Hide the navbar
        } else {
            navbar.style.top = '0'; // Show the navbar
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling

        // Set a timeout to hide the navbar after scrolling stops
        timeout = setTimeout(() => {
            navbar.style.top = '-100px'; // Hide the navbar after scrolling stops
        }, 2000); // Adjust the time as needed
    });
    // Smooth scrolling function
    function smoothScrolling() {
        const navAnchors = Array.from(document.querySelectorAll('a[href^="#"]'));
        navAnchors.forEach(anchor => {
            anchor.addEventListener('click', (event) => {
                event.preventDefault();
                const targetElement = document.querySelector(anchor.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.error(`Element with ID ${anchor.getAttribute('href')} not found.`);
                }
            });
        });
    }
    smoothScrolling();

    // Show sidebar function
    function showSideBar() {
        const navBarOnMobile = document.getElementById('page-nav-bar-onMobile');
        navBarOnMobile.style.display = 'flex';
    }

    // Close sidebar function
    function closeSideBar() {
        const navBarOnMobile = document.getElementById('page-nav-bar-onMobile');
        navBarOnMobile.style.display = 'none';
    }

    window.showSideBar = showSideBar;
    window.closeSideBar = closeSideBar;

    // Form validation for login
    const form = document.getElementById('login');
    if (form) {
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        function validateForm() {
            const usernameError = document.getElementById('username-error-message');
            const passwordError = document.getElementById('password-error-message');

            let isValid = true;
            usernameError.textContent = '';
            passwordError.textContent = '';

            const usernameValue = usernameInput.value.trim();
            if (usernameValue === '') {
                usernameError.textContent = 'Please enter a username';
                isValid = false;
            }

            const passwordValue = passwordInput.value.trim();
            if (passwordValue.length < 8 || passwordValue.length > 16) {
                passwordError.textContent = 'Password must be between 8 and 16 characters';
                isValid = false;
            } else if (!/[a-z]/.test(passwordValue)) {
                passwordError.textContent = 'Password must contain at least one lowercase letter';
                isValid = false;
            } else if (!/[A-Z]/.test(passwordValue)) {
                passwordError.textContent = 'Password must contain at least one uppercase letter';
                isValid = false;
            } else if (!/[0-9]/.test(passwordValue)) {
                passwordError.textContent = 'Password must contain at least one number';
                isValid = false;
            } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
                passwordError.textContent = 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)';
                isValid = false;
            }

            return isValid;
        }

        form.addEventListener('submit', function (event) {
            if (!validateForm()) {
                event.preventDefault(); // Prevent form submission if validation fails
            }
        });
    }

    // Feedback form validation and submission
    document.querySelector('.comment-form').addEventListener('submit', function (event) {
        event.preventDefault();
        validateAndSubmitForm();
    });

    function validateAndSubmitForm() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const comment = document.getElementById('comment').value;
        let isValid = true;

        // Name validation
        if (name === "") {
            document.getElementById('error_name').innerText = "Please enter your name";
            isValid = false;
        } else {
            document.getElementById('error_name').innerText = "";
        }

        // Email validation
        if (email === "") {
            document.getElementById('error_email').innerText = "Please enter your email";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            document.getElementById('error_email').innerText = "Please enter a valid email address";
            isValid = false;
        } else {
            document.getElementById('error_email').innerText = "";
        }

        // Comment validation
        if (comment === "") {
            document.getElementById('error_comment').innerText = "Please enter your comment";
            isValid = false;
        } else {
            document.getElementById('error_comment').innerText = "";
        }

        if (isValid) {
            addComment(name, email, comment);
            document.querySelector('.comment-form').reset();
        }
    }

    function addComment(name, email, comment) {
        const commentsSection = document.querySelector('.comments-section');
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('values_div');

        const commenterName = document.createElement('h3');
        commenterName.textContent =`Name : ${name}` ;

        const commenterEmail = document.createElement('h5');
        commenterEmail.textContent = `Email : ${email}`;

        const commenterComment = document.createElement('p');
        commenterComment.textContent = `Comment :${comment}`;

        commentContainer.appendChild(commenterName);
        commentContainer.appendChild(commenterEmail);
        commentContainer.appendChild(commenterComment);

        commentsSection.appendChild(commentContainer);

        // Save the comment to localStorage
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({ name, email, comment });
        localStorage.setItem('comments', JSON.stringify(comments));
    }
});
// Function for popup messages
function popupMessage() {
    const tryNowBtn = document.getElementById('tryNowBtn');
    const popup = document.getElementById('popup');
    const noBtn = document.getElementById('noBtn');
    const goBackBtn = document.getElementById('goBackBtn');

    // Function to open the popup
    function openPopup() {
        popup.classList.add('open-popup');
    }

    // Function to close the popup
    function closePopup() {
        popup.classList.remove('open-popup');
        document.getElementById('error-worship').style.display = 'none'; // Hide the error message if any
    }

    // Function to display error message
    function errorMessage() {
        const errorWorship = document.getElementById('error-worship');
        errorWorship.textContent = 'Sorry, this section is for Muslims only, you can see another section until the next update to our acitivities';
        errorWorship.style.color = '#eee';
        errorWorship.style.display = 'block';

        goBackBtn.style.display = 'block'; // Show the "GO BACK" button
    }

    // Add event listeners
    tryNowBtn.addEventListener('click', openPopup);
    noBtn.addEventListener('click', errorMessage);
    goBackBtn.addEventListener('click', closePopup);
}
popupMessage();