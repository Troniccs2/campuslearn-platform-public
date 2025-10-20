package com.thesensationals.campuslearn.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.thesensationals.campuslearn.model.Conversation;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    // Find conversations that include a user by id
    @Query("select c from Conversation c join c.participants p where p.id = :userId")
    List<Conversation> findByParticipantId(@Param("userId") Long userId);

}
