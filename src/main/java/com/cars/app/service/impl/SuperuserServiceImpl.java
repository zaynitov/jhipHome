package com.cars.app.service.impl;

import com.cars.app.service.SuperuserService;
import com.cars.app.domain.Superuser;
import com.cars.app.repository.SuperuserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Superuser.
 */
@Service
@Transactional
public class SuperuserServiceImpl implements SuperuserService {

    private final Logger log = LoggerFactory.getLogger(SuperuserServiceImpl.class);

    private final SuperuserRepository superuserRepository;

    public SuperuserServiceImpl(SuperuserRepository superuserRepository) {
        this.superuserRepository = superuserRepository;
    }

    /**
     * Save a superuser.
     *
     * @param superuser the entity to save
     * @return the persisted entity
     */
    @Override
    public Superuser save(Superuser superuser) {
        log.debug("Request to save Superuser : {}", superuser);        return superuserRepository.save(superuser);
    }

    /**
     * Get all the superusers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Superuser> findAll() {
        log.debug("Request to get all Superusers");
        return superuserRepository.findAll();
    }


    /**
     * Get one superuser by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Superuser> findOne(Long id) {
        log.debug("Request to get Superuser : {}", id);
        return superuserRepository.findById(id);
    }

    /**
     * Delete the superuser by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Superuser : {}", id);
        superuserRepository.deleteById(id);
    }
}
