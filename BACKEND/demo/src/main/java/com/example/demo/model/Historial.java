package com.example.demo.model;

public class Historial {

    private String id;
    private String servicio;
    private String veterinario;
    private String mascota;
    private String peso;
    private String vacunas;
    private String tratamientos;
    private String observaciones;
    private String fecha;
    private String hora;
    private String estado;
    private String dueno;

    public Historial() {}

    public Historial(String servicio, String veterinario, String mascota,
                     String peso, String vacunas, String tratamientos,
                     String observaciones, String fecha, String hora, String id, String dueno) {

        this.servicio = servicio;
        this.veterinario = veterinario;
        this.mascota = mascota;
        this.peso = peso;
        this.vacunas = vacunas;
        this.tratamientos = tratamientos;
        this.observaciones = observaciones;
        this.fecha = fecha;
        this.hora = hora;
        this.id = id;
        this.dueno = dueno;

        this.estado = "Sin estado";
    }

    public String getId() { return id; }
    public String getServicio() { return servicio; }
    public String getVeterinario() { return veterinario; }
    public String getMascota() { return mascota; }
    public String getPeso() { return peso; }
    public String getVacunas() { return vacunas; }
    public String getTratamientos() { return tratamientos; }
    public String getObservaciones() { return observaciones; }
    public String getFecha() { return fecha; }
    public String getHora() { return hora; }
    public String getEstado() { return estado; }
    public String getDueno() { return dueno; }

    public void setEstado(String estado) { this.estado = estado; }
    public void setServicio(String servicio) { this.servicio = servicio; }
    public void setVeterinario(String veterinario) { this.veterinario = veterinario; }
    public void setMascota(String mascota) { this.mascota = mascota; }
    public void setPeso(String peso) { this.peso = peso; }
    public void setVacunas(String vacunas) { this.vacunas = vacunas; }
    public void setTratamientos(String tratamientos) { this.tratamientos = tratamientos; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
    public void setFecha(String fecha) { this.fecha = fecha; }
    public void setHora(String hora) { this.hora = hora; }
    public void setDueno(String dueno) { this.dueno = dueno; }
}
