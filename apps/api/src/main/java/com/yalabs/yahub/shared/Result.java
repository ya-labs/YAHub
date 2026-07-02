package com.yalabs.yahub.shared;

public record Result<T>(
    boolean result,
    String message,
    T data
) {
    public static <T> Result<T> success(T data) {
        return new Result<>(true, null, data);
    }

    public static <T> Result<T> failure(String message) {
        return new Result<>(false, message, null);
    }
}