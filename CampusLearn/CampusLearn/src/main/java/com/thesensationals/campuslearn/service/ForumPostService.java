package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.models.ForumPost;
import com.thesensationals.campuslearn.repository.ForumPostRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ForumPostService {

    private ForumPostRepository forumPostRepository;

    public ForumPost createPost(ForumPost post) {
        return null;
    }

    public Optional<ForumPost> findPostById(Long id) {
        return Optional.empty();
    }

    public List<ForumPost> findAllPosts() {
        return null;
    }

    public void deletePost(Long id) {
    }
}