package com.example.demo.model;

public class Mascota {
    private Long id;
    private String nombre;
    private String tipo;
    private String raza;
    private Cliente dueño;


    public String getRaza() {
        return raza;
    }
    public void setRaza(String raza) {
        this.raza = raza;
    }

    public Cliente getDueño() {
        return dueño;
    }
    public void setDueño(Cliente dueño) {
        this.dueño = dueño;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    
}
