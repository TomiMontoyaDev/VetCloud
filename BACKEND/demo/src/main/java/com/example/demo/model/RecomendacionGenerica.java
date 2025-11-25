package com.example.demo.model;

public class RecomendacionGenerica extends RecomendacionMascota {

    public RecomendacionGenerica(String nombre, String dueno) {
        super(nombre, dueno);
    }

    @Override
    public String generarRecomendacion() {
        return "🐾 Recomendación general para " + nombre + ":\n" +
               "- Controles periódicos\n" +
               "- Buena alimentación\n" +
               "- Cuidado del entorno";
    }
}

