package com.arunpandian.portfolio.dto;

import java.util.List;

public class ProjectDto {

    private String slug;
    private String title;
    private String shortDescription;
    private String category;
    private String status;
    private List<String> techStack;
    private String githubUrl;
    private String liveUrl;
    private String problemStatement;
    private String solution;
    private String architecture;
    private String frontendDetails;
    private String backendDetails;
    private String databaseDetails;
    private List<String> keyFeatures;
    private boolean featured;

    public ProjectDto() {
    }

    public ProjectDto(String slug, String title, String shortDescription, String category,
                      String status, List<String> techStack, String githubUrl, String liveUrl,
                      String problemStatement, String solution, String architecture,
                      String frontendDetails, String backendDetails, String databaseDetails,
                      List<String> keyFeatures, boolean featured) {
        this.slug = slug;
        this.title = title;
        this.shortDescription = shortDescription;
        this.category = category;
        this.status = status;
        this.techStack = techStack;
        this.githubUrl = githubUrl;
        this.liveUrl = liveUrl;
        this.problemStatement = problemStatement;
        this.solution = solution;
        this.architecture = architecture;
        this.frontendDetails = frontendDetails;
        this.backendDetails = backendDetails;
        this.databaseDetails = databaseDetails;
        this.keyFeatures = keyFeatures;
        this.featured = featured;
    }

    // Getters and Setters
    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<String> getTechStack() {
        return techStack;
    }

    public void setTechStack(List<String> techStack) {
        this.techStack = techStack;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getLiveUrl() {
        return liveUrl;
    }

    public void setLiveUrl(String liveUrl) {
        this.liveUrl = liveUrl;
    }

    public String getProblemStatement() {
        return problemStatement;
    }

    public void setProblemStatement(String problemStatement) {
        this.problemStatement = problemStatement;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public String getArchitecture() {
        return architecture;
    }

    public void setArchitecture(String architecture) {
        this.architecture = architecture;
    }

    public String getFrontendDetails() {
        return frontendDetails;
    }

    public void setFrontendDetails(String frontendDetails) {
        this.frontendDetails = frontendDetails;
    }

    public String getBackendDetails() {
        return backendDetails;
    }

    public void setBackendDetails(String backendDetails) {
        this.backendDetails = backendDetails;
    }

    public String getDatabaseDetails() {
        return databaseDetails;
    }

    public void setDatabaseDetails(String databaseDetails) {
        this.databaseDetails = databaseDetails;
    }

    public List<String> getKeyFeatures() {
        return keyFeatures;
    }

    public void setKeyFeatures(List<String> keyFeatures) {
        this.keyFeatures = keyFeatures;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }
}

