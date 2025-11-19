package com.example.demo.controller;

import com.example.demo.model.Usuario;
import com.example.demo.model.Respuesta;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    private List<Usuario> usuarios = new ArrayList<>();

    @PostMapping("/register")
    public Respuesta register(@RequestBody Usuario usuario) {

        usuarios.add(usuario);

        return new Respuesta("Usuario registrado", usuario.nombre, usuario.rol);
    }

    @PostMapping("/login")
    public Respuesta login(@RequestBody Usuario usuario) {  

        for (Usuario u : usuarios) {
            if (u.email.equals(usuario.email) && u.password.equals(usuario.password)) {
            
                return new Respuesta("Login exitoso", u.nombre, u.rol);
            }
        }

        return new Respuesta("Credenciales inválidas", null, null);
    }
}
