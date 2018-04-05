package com.example.microservicesandtesting.models;

import lombok.*;

import javax.persistence.*;


//@lombok.Data
@AllArgsConstructor
@NoArgsConstructor
//@Getter
//@Setter
@Entity
@Table(name = "DATAS")
public class Data {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "FACE")
    private String face;

    @Column(name = "IMAGE")
    private String image;

    @Column(name = "FAVORITE")
    private Boolean favorite;


    public Data(String face, String image, Boolean favorite) {
        this.face = face;
        this.image = image;
        this.favorite = favorite;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFace() {
        return face;
    }

    public void setFace(String face) {
        this.face = face;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }


    public Boolean getFavorite() {
        return favorite;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }
}
