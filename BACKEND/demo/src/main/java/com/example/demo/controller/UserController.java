package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import com.example.demo.model.Usuario;


@RestController
@CrossOrigin(origins = "*")
public class UserController {

    private List<Usuario> usuarios = new ArrayList<>();

    @PostMapping("/register")
    public Response registrar(@RequestBody Usuario nuevo) {

        for (Usuario u : usuarios) {
            if (u.getEmail().equalsIgnoreCase(nuevo.getEmail())) {
                return new Response("El email ya está registrado");
            }
        }

        usuarios.add(nuevo);
        return new Response("Registro exitoso");
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody Usuario body) {

        for (Usuario u : usuarios) {
            if (u.getEmail().equalsIgnoreCase(body.getEmail()) &&
                u.getPassword().equals(body.getPassword())) {

                return new LoginResponse(
                    "Login exitoso",
                    u.getNombre(),
                    u.getEmail(),
                    u.getRol()
                );
            }
        }

        return new LoginResponse("Credenciales inválidas", null, null, null);
    }

    class Response {
        public String mensaje;
        public Response(String mensaje) { this.mensaje = mensaje; }
    }

    class LoginResponse {
        public String message;
        public String nombre;
        public String email;
        public String rol;

        public LoginResponse(String message, String nombre, String email, String rol) {
            this.message = message;
            this.nombre = nombre;
            this.email = email;
            this.rol = rol;
        }
    }
}
