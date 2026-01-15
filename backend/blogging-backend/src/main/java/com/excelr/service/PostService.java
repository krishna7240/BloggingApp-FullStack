package com.excelr.service;

import java.util.List;
import com.excelr.entity.Post;

public interface PostService {

  Post savePost(Post post);

  List<Post> getAllPosts();

  List<Post> getPostsByUser(int userId);

  Post getPostById(int id);

  void deletePost(int id);
}
