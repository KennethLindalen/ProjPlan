package dev.kennethlindalen.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Bug.
 */
@Entity
@Table(name = "bug")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Bug implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "bug_title", nullable = false)
    private String bugTitle;

    @NotNull
    @Column(name = "bug_info", nullable = false)
    private String bugInfo;

    @NotNull
    @Column(name = "priority", nullable = false)
    private String priority;

    @ManyToOne
    @JsonIgnoreProperties(value = "bugs", allowSetters = true)
    private Project project;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBugTitle() {
        return bugTitle;
    }

    public Bug bugTitle(String bugTitle) {
        this.bugTitle = bugTitle;
        return this;
    }

    public void setBugTitle(String bugTitle) {
        this.bugTitle = bugTitle;
    }

    public String getBugInfo() {
        return bugInfo;
    }

    public Bug bugInfo(String bugInfo) {
        this.bugInfo = bugInfo;
        return this;
    }

    public void setBugInfo(String bugInfo) {
        this.bugInfo = bugInfo;
    }

    public String getPriority() {
        return priority;
    }

    public Bug priority(String priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Project getProject() {
        return project;
    }

    public Bug project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bug)) {
            return false;
        }
        return id != null && id.equals(((Bug) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bug{" +
            "id=" + getId() +
            ", bugTitle='" + getBugTitle() + "'" +
            ", bugInfo='" + getBugInfo() + "'" +
            ", priority='" + getPriority() + "'" +
            "}";
    }
}
