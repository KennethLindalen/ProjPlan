package dev.kennethlindalen.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import dev.kennethlindalen.web.rest.TestUtil;

public class KanbanTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Kanban.class);
        Kanban kanban1 = new Kanban();
        kanban1.setId(1L);
        Kanban kanban2 = new Kanban();
        kanban2.setId(kanban1.getId());
        assertThat(kanban1).isEqualTo(kanban2);
        kanban2.setId(2L);
        assertThat(kanban1).isNotEqualTo(kanban2);
        kanban1.setId(null);
        assertThat(kanban1).isNotEqualTo(kanban2);
    }
}
