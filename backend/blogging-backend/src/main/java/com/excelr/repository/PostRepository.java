package com.excelr.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.excelr.entity.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {

  // Latest posts first
  List<Post> findAllByOrderByIdDesc();

  // Logged-in user's posts, latest first
  List<Post> findByUserIdOrderByIdDesc(Integer userId);
}
