package com.excelr.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.excelr.entity.Comment;
import com.excelr.repository.CommentRepository;

@Service
public class CommentServiceImpl implements CommentService {

  @Autowired
  private CommentRepository commentRepository;

  @Override
  public Comment addComment(Comment comment) {
    return commentRepository.save(comment);
  }

  @Override
  public List<Comment> getCommentsByPostId(Integer postId) {
    return commentRepository.findByPostId(postId);
  }
}
