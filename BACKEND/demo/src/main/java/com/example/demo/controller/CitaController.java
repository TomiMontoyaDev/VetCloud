package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class CitaController {

    // Listado de las citas en memoria
    private List<Map<String, String>> citas = new ArrayList<>();

    @PostMapping("/agendar")
    public ResponseEntity<String> agendar(@RequestBody Map<String, String> cita) {

        String fecha = cita.get("fecha");
        String hora = cita.get("hora");

        // Validar si ya existe una cita con la misma fecha y hora
        for (Map<String, String> c : citas) {
            if (c.get("fecha").equals(fecha) && c.get("hora").equals(hora)) {
                return ResponseEntity.status(409)
                        .body("Fecha y hora ya ocupadas");
            }
        }

        // Si no está ocupada, la guardamos
        citas.add(cita);

        return ResponseEntity.ok("Cita agendada");
    }
}
