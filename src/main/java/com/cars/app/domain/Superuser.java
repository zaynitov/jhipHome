package com.cars.app.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Superuser.
 */
@Entity
@Table(name = "superuser")
public class Superuser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "superusername")
    private String superusername;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSuperusername() {
        return superusername;
    }

    public Superuser superusername(String superusername) {
        this.superusername = superusername;
        return this;
    }

    public void setSuperusername(String superusername) {
        this.superusername = superusername;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Superuser superuser = (Superuser) o;
        if (superuser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), superuser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Superuser{" +
            "id=" + getId() +
            ", superusername='" + getSuperusername() + "'" +
            "}";
    }
}
