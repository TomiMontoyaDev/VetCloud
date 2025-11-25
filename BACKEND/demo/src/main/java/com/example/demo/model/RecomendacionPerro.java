package com.example.demo.model;

public class RecomendacionPerro extends RecomendacionMascota {

    public RecomendacionPerro(String nombre, String dueno) {
        super(nombre, dueno);
    }

    @Override
    public String generarRecomendacion() {
        return "🐶 Recomendación para " + nombre + ":\n" +
               "- Paseos diarios de 30 minutos\n" +
               "- Vacuna antirrábica anual\n" +
               "- Baño cada 15 días";
    }
}
