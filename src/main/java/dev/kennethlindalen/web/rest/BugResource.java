package dev.kennethlindalen.web.rest;

import dev.kennethlindalen.domain.Bug;
import dev.kennethlindalen.repository.BugRepository;
import dev.kennethlindalen.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link dev.kennethlindalen.domain.Bug}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BugResource {

    private final Logger log = LoggerFactory.getLogger(BugResource.class);

    private static final String ENTITY_NAME = "bug";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BugRepository bugRepository;

    public BugResource(BugRepository bugRepository) {
        this.bugRepository = bugRepository;
    }

    /**
     * {@code POST  /bugs} : Create a new bug.
     *
     * @param bug the bug to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bug, or with status {@code 400 (Bad Request)} if the bug has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bugs")
    public ResponseEntity<Bug> createBug(@Valid @RequestBody Bug bug) throws URISyntaxException {
        log.debug("REST request to save Bug : {}", bug);
        if (bug.getId() != null) {
            throw new BadRequestAlertException("A new bug cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bug result = bugRepository.save(bug);
        return ResponseEntity.created(new URI("/api/bugs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bugs} : Updates an existing bug.
     *
     * @param bug the bug to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bug,
     * or with status {@code 400 (Bad Request)} if the bug is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bug couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bugs")
    public ResponseEntity<Bug> updateBug(@Valid @RequestBody Bug bug) throws URISyntaxException {
        log.debug("REST request to update Bug : {}", bug);
        if (bug.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Bug result = bugRepository.save(bug);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bug.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bugs} : get all the bugs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bugs in body.
     */
    @GetMapping("/bugs")
    public List<Bug> getAllBugs() {
        log.debug("REST request to get all Bugs");
        return bugRepository.findAll();
    }

    /**
     * {@code GET  /bugs/:id} : get the "id" bug.
     *
     * @param id the id of the bug to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bug, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bugs/{id}")
    public ResponseEntity<Bug> getBug(@PathVariable Long id) {
        log.debug("REST request to get Bug : {}", id);
        Optional<Bug> bug = bugRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bug);
    }

    /**
     * {@code DELETE  /bugs/:id} : delete the "id" bug.
     *
     * @param id the id of the bug to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bugs/{id}")
    public ResponseEntity<Void> deleteBug(@PathVariable Long id) {
        log.debug("REST request to delete Bug : {}", id);
        bugRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
