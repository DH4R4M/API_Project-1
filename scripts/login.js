

document.getElementById("login").addEventListener("submit", async (e) => {
    e.preventDefault();


    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;

    try {

        let response = await fetch("https://mock-server-app-ixch.onrender.com/user");

        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }

        let data = await response.json();


        let user = data.find((el) => el.email === email);

        if (!user) {

            Swal.fire({
                icon: 'error',
                title: 'User not found',
                text: 'Please register first.'
            }).then(() => {
                window.location.href = "signup.html";
            });
        } else {

            if (user.pass === pass) {

                Swal.fire({
                    icon: 'success',
                    title: 'Login successful!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = "index.html";
                });
            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Incorrect password',
                    text: 'Please try again.'
                });
            }
        }
    } catch (error) {
        console.error("Error:", error);

        Swal.fire({
            icon: 'error',
            title: 'Failed to fetch user data',
            text: 'Please try again later.'
        });
    }
});
