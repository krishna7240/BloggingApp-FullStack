package com.excelr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.entity.Post;
import com.excelr.repository.PostRepository;

@Service
public class PostServiceImpl implements PostService {

  @Autowired
  private PostRepository postRepository;

  @Override
  public Post savePost(Post post) {
    return postRepository.save(post);
  }

  @Override
  public List<Post> getAllPosts() {
    return postRepository.findAllByOrderByIdDesc();
  }

  @Override
  public List<Post> getPostsByUser(int userId) {
    return postRepository.findByUserIdOrderByIdDesc(userId);
  }

  @Override
  public Post getPostById(int id) {
    return postRepository.findById(id).get();
  }

  @Override
  public void deletePost(int id) {
    postRepository.deleteById(id);
  }
}
