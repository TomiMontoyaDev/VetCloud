package com.example.demo.model;

public class Mascota {

    private int id;
    private String nombre;
    private String especie;
    private String raza;
    private String dueno;

    public Mascota() {}

    public Mascota(int id, String nombre, String especie, String raza, String dueno) {
        this.id = id;
        this.nombre = nombre;
        this.especie = especie;
        this.raza = raza;
        this.dueno = dueno;
    }

    // Getters
    public int getId() { return id; }
    public String getNombre() { return nombre; }
    public String getEspecie() { return especie; }
    public String getRaza() { return raza; }
    public String getDueno() { return dueno; }

    // Setters
    public void setId(int id) { this.id = id; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public void setEspecie(String especie) { this.especie = especie; }
    public void setRaza(String raza) { this.raza = raza; }
    public void setDueno(String dueno) { this.dueno = dueno; }
}
