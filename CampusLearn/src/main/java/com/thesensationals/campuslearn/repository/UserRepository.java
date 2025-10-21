package com.thesensationals.campuslearn.repository;

import com.thesensationals.campuslearn.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    // Additional query methods if needed
}
