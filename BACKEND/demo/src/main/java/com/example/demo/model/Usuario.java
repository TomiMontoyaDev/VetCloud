package com.example.demo.model;

public  class Usuario {

    private String nombre;
    private String email;
    private String password;
    private String rol; // CLIENTE o VETERINARIO

    public Usuario() {}

    public Usuario(String nombre, String email, String password, String rol) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public String obtenerInfo(){
        return "Nombre: " + this.getNombre() 
        + " - Email: " 
        + this.getEmail() 
        + " - Rol: " 
        + this.getRol();
    }
    

}
