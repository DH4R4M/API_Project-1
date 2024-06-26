document.getElementById("signup").addEventListener("submit", (e) => {
    e.preventDefault();

    let obj = {
        email: document.getElementById("email").value,
        pass: document.getElementById("pass").value
    };


    fetch(`https://mock-server-app-ixch.onrender.com/user?email=${obj.email}`)
        .then((res) => res.json())
        .then((res) => {
            if (res.length > 0) {

                Swal.fire({
                    icon: 'warning',
                    title: 'User already registered',
                    text: 'Please use a different email or proceed to login.'
                });
            } else {

                fetch("https://mock-server-app-ixch.onrender.com/user", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })
                    .then((res) => res.json())
                    .then((res) => {
                        if (res) {

                            Swal.fire({
                                icon: 'success',
                                title: 'Registration successful!',
                                text: 'You can now login.',
                                showConfirmButton: false,
                                timer: 1500
                            }).then(() => {
                                window.location.href = "login.html";
                            });
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);

                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Failed to register user. Please try again later.'
                        });
                    });
            }
        })
        .catch((error) => {
            console.error('Error:', error);

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to check user registration. Please try again later.'
            });
        });
});
