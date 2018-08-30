package com.cars.app.web.rest;

import com.cars.app.JhipApp;

import com.cars.app.domain.Superuser;
import com.cars.app.repository.SuperuserRepository;
import com.cars.app.service.SuperuserService;
import com.cars.app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.cars.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SuperuserResource REST controller.
 *
 * @see SuperuserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipApp.class)
public class SuperuserResourceIntTest {

    private static final String DEFAULT_SUPERUSERNAME = "AAAAAAAAAA";
    private static final String UPDATED_SUPERUSERNAME = "BBBBBBBBBB";

    @Autowired
    private SuperuserRepository superuserRepository;

    

    @Autowired
    private SuperuserService superuserService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSuperuserMockMvc;

    private Superuser superuser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SuperuserResource superuserResource = new SuperuserResource(superuserService);
        this.restSuperuserMockMvc = MockMvcBuilders.standaloneSetup(superuserResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Superuser createEntity(EntityManager em) {
        Superuser superuser = new Superuser()
            .superusername(DEFAULT_SUPERUSERNAME);
        return superuser;
    }

    @Before
    public void initTest() {
        superuser = createEntity(em);
    }

    @Test
    @Transactional
    public void createSuperuser() throws Exception {
        int databaseSizeBeforeCreate = superuserRepository.findAll().size();

        // Create the Superuser
        restSuperuserMockMvc.perform(post("/api/superusers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(superuser)))
            .andExpect(status().isCreated());

        // Validate the Superuser in the database
        List<Superuser> superuserList = superuserRepository.findAll();
        assertThat(superuserList).hasSize(databaseSizeBeforeCreate + 1);
        Superuser testSuperuser = superuserList.get(superuserList.size() - 1);
        assertThat(testSuperuser.getSuperusername()).isEqualTo(DEFAULT_SUPERUSERNAME);
    }

    @Test
    @Transactional
    public void createSuperuserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = superuserRepository.findAll().size();

        // Create the Superuser with an existing ID
        superuser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSuperuserMockMvc.perform(post("/api/superusers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(superuser)))
            .andExpect(status().isBadRequest());

        // Validate the Superuser in the database
        List<Superuser> superuserList = superuserRepository.findAll();
        assertThat(superuserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSuperusers() throws Exception {
        // Initialize the database
        superuserRepository.saveAndFlush(superuser);

        // Get all the superuserList
        restSuperuserMockMvc.perform(get("/api/superusers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(superuser.getId().intValue())))
            .andExpect(jsonPath("$.[*].superusername").value(hasItem(DEFAULT_SUPERUSERNAME.toString())));
    }
    

    @Test
    @Transactional
    public void getSuperuser() throws Exception {
        // Initialize the database
        superuserRepository.saveAndFlush(superuser);

        // Get the superuser
        restSuperuserMockMvc.perform(get("/api/superusers/{id}", superuser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(superuser.getId().intValue()))
            .andExpect(jsonPath("$.superusername").value(DEFAULT_SUPERUSERNAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSuperuser() throws Exception {
        // Get the superuser
        restSuperuserMockMvc.perform(get("/api/superusers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSuperuser() throws Exception {
        // Initialize the database
        superuserService.save(superuser);

        int databaseSizeBeforeUpdate = superuserRepository.findAll().size();

        // Update the superuser
        Superuser updatedSuperuser = superuserRepository.findById(superuser.getId()).get();
        // Disconnect from session so that the updates on updatedSuperuser are not directly saved in db
        em.detach(updatedSuperuser);
        updatedSuperuser
            .superusername(UPDATED_SUPERUSERNAME);

        restSuperuserMockMvc.perform(put("/api/superusers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSuperuser)))
            .andExpect(status().isOk());

        // Validate the Superuser in the database
        List<Superuser> superuserList = superuserRepository.findAll();
        assertThat(superuserList).hasSize(databaseSizeBeforeUpdate);
        Superuser testSuperuser = superuserList.get(superuserList.size() - 1);
        assertThat(testSuperuser.getSuperusername()).isEqualTo(UPDATED_SUPERUSERNAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSuperuser() throws Exception {
        int databaseSizeBeforeUpdate = superuserRepository.findAll().size();

        // Create the Superuser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restSuperuserMockMvc.perform(put("/api/superusers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(superuser)))
            .andExpect(status().isBadRequest());

        // Validate the Superuser in the database
        List<Superuser> superuserList = superuserRepository.findAll();
        assertThat(superuserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSuperuser() throws Exception {
        // Initialize the database
        superuserService.save(superuser);

        int databaseSizeBeforeDelete = superuserRepository.findAll().size();

        // Get the superuser
        restSuperuserMockMvc.perform(delete("/api/superusers/{id}", superuser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Superuser> superuserList = superuserRepository.findAll();
        assertThat(superuserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Superuser.class);
        Superuser superuser1 = new Superuser();
        superuser1.setId(1L);
        Superuser superuser2 = new Superuser();
        superuser2.setId(superuser1.getId());
        assertThat(superuser1).isEqualTo(superuser2);
        superuser2.setId(2L);
        assertThat(superuser1).isNotEqualTo(superuser2);
        superuser1.setId(null);
        assertThat(superuser1).isNotEqualTo(superuser2);
    }
}
