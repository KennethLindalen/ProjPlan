package dev.kennethlindalen.repository;

import dev.kennethlindalen.domain.Kanban;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Kanban entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KanbanRepository extends JpaRepository<Kanban, Long> {
}
