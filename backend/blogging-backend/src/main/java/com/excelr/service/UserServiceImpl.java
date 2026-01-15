package com.excelr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.entity.User;
import com.excelr.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public User registerUser(User user) {
    return userRepository.save(user);
  }

  public User loginUser(String email, String pwd) {
    return userRepository.findByEmailAndPwd(email, pwd);
  }

  @Override
  public boolean isEmailAlreadyRegistered(String email) {
    return userRepository.findByEmail(email) != null;
  }
}
