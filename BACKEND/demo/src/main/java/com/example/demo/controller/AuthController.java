package com.example.demo.controller;

import com.example.demo.model.Usuario;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    // Lista donde guardamos usuarios temporalmente
    private List<Usuario> usuarios = new ArrayList<>();

    // ------------------ REGISTRO ------------------
    @PostMapping("/register")
    public String register(@RequestBody Usuario usuario) {

        usuarios.add(usuario);  // guardamos el usuario

        return "Usuario registrado: " + usuario.nombre + " (" + usuario.rol + ")";
    }

    // ------------------ LOGIN ---------------------
    @PostMapping("/login")
    public String login(@RequestBody Usuario usuario) {

        // revisar si existe el usuario
        for (Usuario u : usuarios) {
            if (u.email.equals(usuario.email) && u.password.equals(usuario.password)) {
                return "Bienvenido " + u.nombre + " - Rol: " + u.rol;
            }
        }

        return "Credenciales inválidas";
    }   

}