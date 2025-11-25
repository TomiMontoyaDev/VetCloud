package com.example.demo.model;

public class RecomendacionAve extends RecomendacionMascota {

    public RecomendacionAve(String nombre, String dueno) {
        super(nombre, dueno);
    }

    @Override
    public String generarRecomendacion() {
        return "🐦 Recomendación para " + nombre + ":\n" +
               "- Alimentación con semillas variadas\n" +
               "- Chequeo semestral de plumas y pico\n" +
               "- Ambiente soleado y no estresante";
    }
}
