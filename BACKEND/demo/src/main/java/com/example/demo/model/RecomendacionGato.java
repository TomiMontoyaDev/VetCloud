package com.example.demo.model;

public class RecomendacionGato extends RecomendacionMascota {

    public RecomendacionGato(String nombre, String dueno) {
        super(nombre, dueno);
    }

    @Override
    public String generarRecomendacion() {
        return "🐱 Recomendación para " + nombre + ":\n" +
               "- Caja de arena siempre limpia\n" +
               "- Vacunas triple felina y antirrábica\n" +
               "- Juguetes para reducir estrés";
    }
}
