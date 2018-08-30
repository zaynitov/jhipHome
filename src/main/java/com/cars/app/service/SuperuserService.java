package com.cars.app.service;

import com.cars.app.domain.Superuser;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Superuser.
 */
public interface SuperuserService {

    /**
     * Save a superuser.
     *
     * @param superuser the entity to save
     * @return the persisted entity
     */
    Superuser save(Superuser superuser);

    /**
     * Get all the superusers.
     *
     * @return the list of entities
     */
    List<Superuser> findAll();


    /**
     * Get the "id" superuser.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Superuser> findOne(Long id);

    /**
     * Delete the "id" superuser.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
