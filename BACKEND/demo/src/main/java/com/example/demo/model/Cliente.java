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
}
