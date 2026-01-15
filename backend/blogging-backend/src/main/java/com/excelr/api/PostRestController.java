package com.excelr.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.excelr.entity.Post;
import com.excelr.service.PostService;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostRestController {

  @Autowired
  private PostService postService;

  @GetMapping
  public List<Post> allPosts() {
    return postService.getAllPosts();
  }

  @GetMapping("/user/{id}")
  public List<Post> userPosts(@PathVariable int id) {
    return postService.getPostsByUser(id);
  }

  @PostMapping
  public Post create(@RequestBody Post post) {
    return postService.savePost(post);
  }

  @PutMapping("/{id}")
  public Post updatePost(@PathVariable int id, @RequestBody Post post) {
    Post existing = postService.getPostById(id);
    existing.setTitle(post.getTitle());
    existing.setContent(post.getContent());
    return postService.savePost(existing);
  }
  

  @DeleteMapping("/{id}")
  public void delete(@PathVariable int id) {
    postService.deletePost(id);
  }
}
