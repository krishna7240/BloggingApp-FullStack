package com.excelr.api;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/media")
@CrossOrigin(origins = "http://localhost:3000")
public class MediaRestController {

  @PostMapping("/upload")
  public String upload(@RequestParam("file") MultipartFile file) throws Exception {

    String folder = "uploads/";
    File dir = new File(folder);
    if (!dir.exists())
      dir.mkdir();

    String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
    Path path = Paths.get(folder + fileName);
    Files.write(path, file.getBytes());

    return "uploads/" + fileName;
  }
}
