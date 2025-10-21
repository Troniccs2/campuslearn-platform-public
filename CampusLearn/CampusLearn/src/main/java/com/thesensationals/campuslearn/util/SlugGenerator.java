package com.thesensationals.campuslearn.util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public class SlugGenerator {

    private static final Pattern NON_LATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public static String generate(String input) {
        if (input == null) {
            return "";
        }

        // 1. Normalize and lowercase the input
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        
        // 2. Remove non-Latin characters and replace with empty string
        String slug = NON_LATIN.matcher(normalized).replaceAll("");
        
        // 3. Convert to lowercase, trim hyphens, and ensure single hyphens
        slug = slug.toLowerCase(Locale.ENGLISH)
                   .replaceAll("--+", "-") // Replace multiple hyphens with single
                   .replaceAll("^-|-$", ""); // Remove leading/trailing hyphens

        return slug.isEmpty() ? String.valueOf(System.currentTimeMillis()) : slug;
    }
}