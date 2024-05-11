document.getElementById("register-form").addEventListener("submit", async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
        name: formData.get('user'),
        email: formData.get('email'),
        password: formData.get('password'),
        password2: formData.get('password2'),
        rol: formData.get('rol')
    };
    console.log(userData);

    const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
});
