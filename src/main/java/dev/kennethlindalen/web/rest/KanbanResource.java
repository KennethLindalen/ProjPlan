package dev.kennethlindalen.web.rest;

import dev.kennethlindalen.domain.Kanban;
import dev.kennethlindalen.repository.KanbanRepository;
import dev.kennethlindalen.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link dev.kennethlindalen.domain.Kanban}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class KanbanResource {

    private final Logger log = LoggerFactory.getLogger(KanbanResource.class);

    private static final String ENTITY_NAME = "kanban";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KanbanRepository kanbanRepository;

    public KanbanResource(KanbanRepository kanbanRepository) {
        this.kanbanRepository = kanbanRepository;
    }

    /**
     * {@code POST  /kanbans} : Create a new kanban.
     *
     * @param kanban the kanban to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kanban, or with status {@code 400 (Bad Request)} if the kanban has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/kanbans")
    public ResponseEntity<Kanban> createKanban(@RequestBody Kanban kanban) throws URISyntaxException {
        log.debug("REST request to save Kanban : {}", kanban);
        if (kanban.getId() != null) {
            throw new BadRequestAlertException("A new kanban cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Kanban result = kanbanRepository.save(kanban);
        return ResponseEntity.created(new URI("/api/kanbans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /kanbans} : Updates an existing kanban.
     *
     * @param kanban the kanban to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kanban,
     * or with status {@code 400 (Bad Request)} if the kanban is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kanban couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/kanbans")
    public ResponseEntity<Kanban> updateKanban(@RequestBody Kanban kanban) throws URISyntaxException {
        log.debug("REST request to update Kanban : {}", kanban);
        if (kanban.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Kanban result = kanbanRepository.save(kanban);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, kanban.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /kanbans} : get all the kanbans.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kanbans in body.
     */
    @GetMapping("/kanbans")
    public List<Kanban> getAllKanbans(@RequestParam(required = false) String filter) {
        if ("project-is-null".equals(filter)) {
            log.debug("REST request to get all Kanbans where project is null");
            return StreamSupport
                .stream(kanbanRepository.findAll().spliterator(), false)
                .filter(kanban -> kanban.getProject() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Kanbans");
        return kanbanRepository.findAll();
    }

    /**
     * {@code GET  /kanbans/:id} : get the "id" kanban.
     *
     * @param id the id of the kanban to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kanban, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/kanbans/{id}")
    public ResponseEntity<Kanban> getKanban(@PathVariable Long id) {
        log.debug("REST request to get Kanban : {}", id);
        Optional<Kanban> kanban = kanbanRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(kanban);
    }

    /**
     * {@code DELETE  /kanbans/:id} : delete the "id" kanban.
     *
     * @param id the id of the kanban to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/kanbans/{id}")
    public ResponseEntity<Void> deleteKanban(@PathVariable Long id) {
        log.debug("REST request to delete Kanban : {}", id);
        kanbanRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
