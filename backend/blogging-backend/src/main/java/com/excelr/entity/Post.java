package com.excelr.entity;

import java.time.LocalDate;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "posts")
@Getter
@Setter
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String title;

  @Lob
  private String content;

  private String mediaUrl;

  @CreationTimestamp
  private LocalDate createdOn;

  @UpdateTimestamp
  private LocalDate updatedOn;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
  @JsonIgnore
  private List<Comment> comments;
}
