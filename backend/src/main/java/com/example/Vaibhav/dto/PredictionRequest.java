package com.example.Vaibhav.dto;

public class PredictionRequest {

    private double cgpa;
    private int dsa;
    private int communication;
    private int ml;
    private int webdev;
    private int cloud;
    private int cybersecurity;
    private int projects;
    private int internships;

    public PredictionRequest() {
    }

    public double getCgpa() {
        return cgpa;
    }

    public void setCgpa(double cgpa) {
        this.cgpa = cgpa;
    }

    public int getDsa() {
        return dsa;
    }

    public void setDsa(int dsa) {
        this.dsa = dsa;
    }

    public int getCommunication() {
        return communication;
    }

    public void setCommunication(int communication) {
        this.communication = communication;
    }

    public int getMl() {
        return ml;
    }

    public void setMl(int ml) {
        this.ml = ml;
    }

    public int getWebdev() {
        return webdev;
    }

    public void setWebdev(int webdev) {
        this.webdev = webdev;
    }

    public int getCloud() {
        return cloud;
    }

    public void setCloud(int cloud) {
        this.cloud = cloud;
    }

    public int getCybersecurity() {
        return cybersecurity;
    }

    public void setCybersecurity(int cybersecurity) {
        this.cybersecurity = cybersecurity;
    }

    public int getProjects() {
        return projects;
    }

    public void setProjects(int projects) {
        this.projects = projects;
    }

    public int getInternships() {
        return internships;
    }

    public void setInternships(int internships) {
        this.internships = internships;
    }
}