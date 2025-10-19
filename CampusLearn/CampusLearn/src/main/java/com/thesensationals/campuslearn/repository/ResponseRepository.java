package com.thesensationals.campuslearn.repository;

import com.thesensationals.campuslearn.model.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ResponseRepository extends JpaRepository<Response, Long> {

    // THIS METHOD IS CORRECT. It resolves the "cannot find symbol" error in TopicDetailService.
    List<Response> findByForumThreadId(Long topicId);
}