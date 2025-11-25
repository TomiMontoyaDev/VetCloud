package com.example.demo.model;

public abstract class RecomendacionMascota {
    protected String nombre;
    protected String dueno;

    public RecomendacionMascota(String nombre, String dueno) {
        this.nombre = nombre;
        this.dueno = dueno;
    }

    // Método que cada subclase implementa distinto
    public abstract String generarRecomendacion();
}
