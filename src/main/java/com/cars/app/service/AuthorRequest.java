package com.cars.app.service;

public class AuthorRequest {
    private String query;

    public AuthorRequest(String query) {
        this.query = query;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }
}
