package com.example.demo.model;

import java.util.List;

public class Cliente extends Usuario {

    
    private List<Mascota> mascotas;

    public List<Mascota> getMascotas() {
        return mascotas;
    }

    public void setMascotas(List<Mascota> mascotas) {
        this.mascotas = mascotas;
    }
     
    @Override
    public String obtenerInfo() {
        return super.obtenerInfo() 
        + " - Cantidad de mascotas: " 
        + (getMascotas() != null ? 
        getMascotas().size() : 0);
    }
}
