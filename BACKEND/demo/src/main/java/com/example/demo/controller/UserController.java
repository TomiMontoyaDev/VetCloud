package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import com.example.demo.model.Usuario;

// Controlador para manejo de usuarios (registro y login)
@RestController
@CrossOrigin(origins = "*")
public class UserController {
    // Simulación de base de datos en memoria
    private List<Usuario> usuarios = new ArrayList<>();

    // Variable temporal para simular el usuario logueado
    private Usuario usuarioLogueado = null;

    // Endpoints de registro y login
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

                usuarioLogueado = u; // Guardamos el usuario logueado

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

    // Endpoint para obtener el usuario actual
    @GetMapping("/usuarioActual")
    public UsuarioActualResponse getUsuarioActual() {
        if (usuarioLogueado != null) {
            return new UsuarioActualResponse(
                usuarioLogueado.getNombre(),
                usuarioLogueado.getEmail(),
                usuarioLogueado.getRol()
            );
        }
        return new UsuarioActualResponse(null, null, null);
    }

    // Clases internas
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

    // Respuesta para el usuario actual
    class UsuarioActualResponse {
        public String nombre;
        public String email;
        public String rol;

        public UsuarioActualResponse(String nombre, String email, String rol) {
            this.nombre = nombre;
            this.email = email;
            this.rol = rol;
        }
    }
}
