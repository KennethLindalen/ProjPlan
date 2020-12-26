package dev.kennethlindalen.web.rest;

import dev.kennethlindalen.ProjPlannerApp;
import dev.kennethlindalen.domain.Bug;
import dev.kennethlindalen.repository.BugRepository;

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
 * Integration tests for the {@link BugResource} REST controller.
 */
@SpringBootTest(classes = ProjPlannerApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BugResourceIT {

    private static final String DEFAULT_BUG_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_BUG_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_BUG_INFO = "AAAAAAAAAA";
    private static final String UPDATED_BUG_INFO = "BBBBBBBBBB";

    private static final String DEFAULT_PRIORITY = "AAAAAAAAAA";
    private static final String UPDATED_PRIORITY = "BBBBBBBBBB";

    @Autowired
    private BugRepository bugRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBugMockMvc;

    private Bug bug;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bug createEntity(EntityManager em) {
        Bug bug = new Bug()
            .bugTitle(DEFAULT_BUG_TITLE)
            .bugInfo(DEFAULT_BUG_INFO)
            .priority(DEFAULT_PRIORITY);
        return bug;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bug createUpdatedEntity(EntityManager em) {
        Bug bug = new Bug()
            .bugTitle(UPDATED_BUG_TITLE)
            .bugInfo(UPDATED_BUG_INFO)
            .priority(UPDATED_PRIORITY);
        return bug;
    }

    @BeforeEach
    public void initTest() {
        bug = createEntity(em);
    }

    @Test
    @Transactional
    public void createBug() throws Exception {
        int databaseSizeBeforeCreate = bugRepository.findAll().size();
        // Create the Bug
        restBugMockMvc.perform(post("/api/bugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bug)))
            .andExpect(status().isCreated());

        // Validate the Bug in the database
        List<Bug> bugList = bugRepository.findAll();
        assertThat(bugList).hasSize(databaseSizeBeforeCreate + 1);
        Bug testBug = bugList.get(bugList.size() - 1);
        assertThat(testBug.getBugTitle()).isEqualTo(DEFAULT_BUG_TITLE);
        assertThat(testBug.getBugInfo()).isEqualTo(DEFAULT_BUG_INFO);
        assertThat(testBug.getPriority()).isEqualTo(DEFAULT_PRIORITY);
    }

    @Test
    @Transactional
    public void createBugWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bugRepository.findAll().size();

        // Create the Bug with an existing ID
        bug.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBugMockMvc.perform(post("/api/bugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bug)))
            .andExpect(status().isBadRequest());

        // Validate the Bug in the database
        List<Bug> bugList = bugRepository.findAll();
        assertThat(bugList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkBugTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = bugRepository.findAll().size();
        // set the field null
        bug.setBugTitle(null);

        // Create the Bug, which fails.


        restBugMockMvc.perform(post("/api/bugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bug)))
            .andExpect(status().isBadRequest());

        List<Bug> bugList = bugRepository.findAll();
        assertThat(bugList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBugInfoIsRequired() throws Exception {
        int databaseSizeBeforeTest = bugRepository.findAll().size();
        // set the field null
        bug.setBugInfo(null);

        // Create the Bug, which fails.


        restBugMockMvc.perform(post("/api/bugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bug)))
            .andExpect(status().isBadRequest());

        List<Bug> bugList = bugRepository.findAll();
        assertThat(bugList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriorityIsRequired() throws Exception {
        int databaseSizeBeforeTest = bugRepository.findAll().size();
        // set the field null
        bug.setPriority(null);

        // Create the Bug, which fails.


        restBugMockMvc.perform(post("/api/bugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bug)))
            .andExpect(status().isBadRequest());

        List<Bug> bugList = bugRepository.findAll();
        assertThat(bugList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBugs() throws Exception {
        // Initialize the database
        bugRepository.saveAndFlush(bug);

        // Get all the bugList
        restBugMockMvc.perform(get("/api/bugs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bug.getId().intValue())))
            .andExpect(jsonPath("$.[*].bugTitle").value(hasItem(DEFAULT_BUG_TITLE)))
            .andExpect(jsonPath("$.[*].bugInfo").value(hasItem(DEFAULT_BUG_INFO)))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY)));
    }
    
    @Test
    @Transactional
    public void getBug() throws Exception {
        // Initialize the database
        bugRepository.saveAndFlush(bug);

        // Get the bug
        restBugMockMvc.perform(get("/api/bugs/{id}", bug.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bug.getId().intValue()))
            .andExpect(jsonPath("$.bugTitle").value(DEFAULT_BUG_TITLE))
            .andExpect(jsonPath("$.bugInfo").value(DEFAULT_BUG_INFO))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY));
    }
    @Test
    @Transactional
    public void getNonExistingBug() throws Exception {
        // Get the bug
        restBugMockMvc.perform(get("/api/bugs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBug() throws Exception {
        // Initialize the database
        bugRepository.saveAndFlush(bug);

        int databaseSizeBeforeUpdate = bugRepository.findAll().size();

        // Update the bug
        Bug updatedBug = bugRepository.findById(bug.getId()).get();
        // Disconnect from session so that the updates on updatedBug are not directly saved in db
        em.detach(updatedBug);
        updatedBug
            .bugTitle(UPDATED_BUG_TITLE)
            .bugInfo(UPDATED_BUG_INFO)
            .priority(UPDATED_PRIORITY);

        restBugMockMvc.perform(put("/api/bugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBug)))
            .andExpect(status().isOk());

        // Validate the Bug in the database
        List<Bug> bugList = bugRepository.findAll();
        assertThat(bugList).hasSize(databaseSizeBeforeUpdate);
        Bug testBug = bugList.get(bugList.size() - 1);
        assertThat(testBug.getBugTitle()).isEqualTo(UPDATED_BUG_TITLE);
        assertThat(testBug.getBugInfo()).isEqualTo(UPDATED_BUG_INFO);
        assertThat(testBug.getPriority()).isEqualTo(UPDATED_PRIORITY);
    }

    @Test
    @Transactional
    public void updateNonExistingBug() throws Exception {
        int databaseSizeBeforeUpdate = bugRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBugMockMvc.perform(put("/api/bugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bug)))
            .andExpect(status().isBadRequest());

        // Validate the Bug in the database
        List<Bug> bugList = bugRepository.findAll();
        assertThat(bugList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBug() throws Exception {
        // Initialize the database
        bugRepository.saveAndFlush(bug);

        int databaseSizeBeforeDelete = bugRepository.findAll().size();

        // Delete the bug
        restBugMockMvc.perform(delete("/api/bugs/{id}", bug.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Bug> bugList = bugRepository.findAll();
        assertThat(bugList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
