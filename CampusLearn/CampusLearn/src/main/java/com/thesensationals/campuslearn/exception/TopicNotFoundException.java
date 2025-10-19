package com.thesensationals.campuslearn.exception;

// We use RuntimeException so Spring knows to handle it automatically 
// (it doesn't need to be explicitly declared in method signatures).
public class TopicNotFoundException extends RuntimeException {

    // Standard constructor that takes an error message
    public TopicNotFoundException(String message) {
        super(message);
    }

    // You can also add a default constructor if you need it
    public TopicNotFoundException() {
        super("The requested topic could not be found.");
    }
}