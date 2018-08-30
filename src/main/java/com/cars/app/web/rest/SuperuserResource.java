package com.cars.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cars.app.domain.Superuser;
import com.cars.app.service.SuperuserService;
import com.cars.app.web.rest.errors.BadRequestAlertException;
import com.cars.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Superuser.
 */
@RestController
@RequestMapping("/api")
public class SuperuserResource {

    private final Logger log = LoggerFactory.getLogger(SuperuserResource.class);

    private static final String ENTITY_NAME = "superuser";

    private final SuperuserService superuserService;

    public SuperuserResource(SuperuserService superuserService) {
        this.superuserService = superuserService;
    }

    /**
     * POST  /superusers : Create a new superuser.
     *
     * @param superuser the superuser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new superuser, or with status 400 (Bad Request) if the superuser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/superusers")
    @Timed
    public ResponseEntity<Superuser> createSuperuser(@RequestBody Superuser superuser) throws URISyntaxException {
        log.debug("REST request to save Superuser : {}", superuser);
        if (superuser.getId() != null) {
            throw new BadRequestAlertException("A new superuser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Superuser result = superuserService.save(superuser);
        return ResponseEntity.created(new URI("/api/superusers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /superusers : Updates an existing superuser.
     *
     * @param superuser the superuser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated superuser,
     * or with status 400 (Bad Request) if the superuser is not valid,
     * or with status 500 (Internal Server Error) if the superuser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/superusers")
    @Timed
    public ResponseEntity<Superuser> updateSuperuser(@RequestBody Superuser superuser) throws URISyntaxException {
        log.debug("REST request to update Superuser : {}", superuser);
        if (superuser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Superuser result = superuserService.save(superuser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, superuser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /superusers : get all the superusers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of superusers in body
     */
    @GetMapping("/superusers")
    @Timed
    public List<Superuser> getAllSuperusers() {
        log.debug("REST request to get all Superusers");
        return superuserService.findAll();
    }

    /**
     * GET  /superusers/:id : get the "id" superuser.
     *
     * @param id the id of the superuser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the superuser, or with status 404 (Not Found)
     */
    @GetMapping("/superusers/{id}")
    @Timed
    public ResponseEntity<Superuser> getSuperuser(@PathVariable Long id) {
        log.debug("REST request to get Superuser : {}", id);
        Optional<Superuser> superuser = superuserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(superuser);
    }

    /**
     * DELETE  /superusers/:id : delete the "id" superuser.
     *
     * @param id the id of the superuser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/superusers/{id}")
    @Timed
    public ResponseEntity<Void> deleteSuperuser(@PathVariable Long id) {
        log.debug("REST request to delete Superuser : {}", id);
        superuserService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
