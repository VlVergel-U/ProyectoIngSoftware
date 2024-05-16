document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener los valores de los campos del formulario
    const user = e.target.querySelector('input[name="user"]').value;
    const password = e.target.querySelector('input[name="password"]').value;

    // Restablecer los mensajes de error
    document.getElementById("user-error").style.display = "none";
    document.getElementById("password-error").style.display = "none";

    try {
        const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user, password }),
        });

        if (res.ok) {
            // Redireccionar a la página admin
            window.location.href = "/admin";
        } else {
            const resJson = await res.json();

            // Mostrar mensaje de error según la respuesta del servidor
            if (resJson.message === "Usuario incorrecto") {
                document.getElementById("user-error").style.display = "inline";
            } else if (resJson.message === "Contraseña incorrecta") {
                document.getElementById("password-error").style.display = "inline";
            } else {
                alert("Error al iniciar sesión: " + resJson.message);
            }
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }
});