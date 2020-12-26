package dev.kennethlindalen.web.rest;

import dev.kennethlindalen.ProjPlannerApp;
import dev.kennethlindalen.domain.Kanban;
import dev.kennethlindalen.repository.KanbanRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link KanbanResource} REST controller.
 */
@SpringBootTest(classes = ProjPlannerApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class KanbanResourceIT {

    private static final String DEFAULT_DATA = "AAAAAAAAAA";
    private static final String UPDATED_DATA = "BBBBBBBBBB";

    @Autowired
    private KanbanRepository kanbanRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKanbanMockMvc;

    private Kanban kanban;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Kanban createEntity(EntityManager em) {
        Kanban kanban = new Kanban()
            .data(DEFAULT_DATA);
        return kanban;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Kanban createUpdatedEntity(EntityManager em) {
        Kanban kanban = new Kanban()
            .data(UPDATED_DATA);
        return kanban;
    }

    @BeforeEach
    public void initTest() {
        kanban = createEntity(em);
    }

    @Test
    @Transactional
    public void createKanban() throws Exception {
        int databaseSizeBeforeCreate = kanbanRepository.findAll().size();
        // Create the Kanban
        restKanbanMockMvc.perform(post("/api/kanbans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(kanban)))
            .andExpect(status().isCreated());

        // Validate the Kanban in the database
        List<Kanban> kanbanList = kanbanRepository.findAll();
        assertThat(kanbanList).hasSize(databaseSizeBeforeCreate + 1);
        Kanban testKanban = kanbanList.get(kanbanList.size() - 1);
        assertThat(testKanban.getData()).isEqualTo(DEFAULT_DATA);
    }

    @Test
    @Transactional
    public void createKanbanWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = kanbanRepository.findAll().size();

        // Create the Kanban with an existing ID
        kanban.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKanbanMockMvc.perform(post("/api/kanbans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(kanban)))
            .andExpect(status().isBadRequest());

        // Validate the Kanban in the database
        List<Kanban> kanbanList = kanbanRepository.findAll();
        assertThat(kanbanList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllKanbans() throws Exception {
        // Initialize the database
        kanbanRepository.saveAndFlush(kanban);

        // Get all the kanbanList
        restKanbanMockMvc.perform(get("/api/kanbans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kanban.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA)));
    }
    
    @Test
    @Transactional
    public void getKanban() throws Exception {
        // Initialize the database
        kanbanRepository.saveAndFlush(kanban);

        // Get the kanban
        restKanbanMockMvc.perform(get("/api/kanbans/{id}", kanban.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(kanban.getId().intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA));
    }
    @Test
    @Transactional
    public void getNonExistingKanban() throws Exception {
        // Get the kanban
        restKanbanMockMvc.perform(get("/api/kanbans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKanban() throws Exception {
        // Initialize the database
        kanbanRepository.saveAndFlush(kanban);

        int databaseSizeBeforeUpdate = kanbanRepository.findAll().size();

        // Update the kanban
        Kanban updatedKanban = kanbanRepository.findById(kanban.getId()).get();
        // Disconnect from session so that the updates on updatedKanban are not directly saved in db
        em.detach(updatedKanban);
        updatedKanban
            .data(UPDATED_DATA);

        restKanbanMockMvc.perform(put("/api/kanbans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedKanban)))
            .andExpect(status().isOk());

        // Validate the Kanban in the database
        List<Kanban> kanbanList = kanbanRepository.findAll();
        assertThat(kanbanList).hasSize(databaseSizeBeforeUpdate);
        Kanban testKanban = kanbanList.get(kanbanList.size() - 1);
        assertThat(testKanban.getData()).isEqualTo(UPDATED_DATA);
    }

    @Test
    @Transactional
    public void updateNonExistingKanban() throws Exception {
        int databaseSizeBeforeUpdate = kanbanRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKanbanMockMvc.perform(put("/api/kanbans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(kanban)))
            .andExpect(status().isBadRequest());

        // Validate the Kanban in the database
        List<Kanban> kanbanList = kanbanRepository.findAll();
        assertThat(kanbanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteKanban() throws Exception {
        // Initialize the database
        kanbanRepository.saveAndFlush(kanban);

        int databaseSizeBeforeDelete = kanbanRepository.findAll().size();

        // Delete the kanban
        restKanbanMockMvc.perform(delete("/api/kanbans/{id}", kanban.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Kanban> kanbanList = kanbanRepository.findAll();
        assertThat(kanbanList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
