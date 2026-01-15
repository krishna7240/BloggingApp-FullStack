package com.excelr.api;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.excelr.entity.Comment;
import com.excelr.service.CommentService;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentRestController {

  @Autowired
  private CommentService commentService;

  @PostMapping
  public Comment add(@RequestBody Comment comment) {
    return commentService.addComment(comment);
  }

  @GetMapping("/post/{postId}")
  public List<Comment> getByPost(@PathVariable Integer postId) {
    return commentService.getCommentsByPostId(postId);
  }
}
