package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.models.ForumPost;
import com.thesensationals.campuslearn.repository.ForumPostRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ForumPostService {

    private final ForumPostRepository forumPostRepository;


    public ForumPostService(ForumPostRepository forumPostRepository) {
        this.forumPostRepository = forumPostRepository;
    }

    public ForumPost savePost(ForumPost post) {
        return forumPostRepository.save(post);
    }

    public Optional<ForumPost> getPostById(Long id) {
        return forumPostRepository.findById(id);
    }

    public List<ForumPost> getAllPosts() {
        return forumPostRepository.findAll();
    }

    public boolean deletePost(Long id) {
        if (forumPostRepository.existsById(id)) {
            forumPostRepository.deleteById(id);
            return true;
        }
        return false;
    }
}