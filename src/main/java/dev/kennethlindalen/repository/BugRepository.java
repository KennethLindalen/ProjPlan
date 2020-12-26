package dev.kennethlindalen.repository;

import dev.kennethlindalen.domain.Bug;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Bug entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BugRepository extends JpaRepository<Bug, Long> {
}
