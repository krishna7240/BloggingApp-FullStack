package com.excelr.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.excelr.entity.User;
import com.excelr.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserRestController {

  @Autowired
  private UserService userService;

  @PostMapping("/register")
  public User register(@RequestBody User user) {
    return userService.registerUser(user);
  }

  @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user) {

    User loggedUser = userService.loginUser(user.getEmail(), user.getPwd());

    if (loggedUser == null) {

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid Email or Password");
    }


    return ResponseEntity.ok(loggedUser);
}

}
