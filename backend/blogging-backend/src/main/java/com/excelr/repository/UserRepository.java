package com.excelr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.excelr.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

  User findByEmailAndPwd(String email, String pwd);

  User findByEmail(String email);
}
