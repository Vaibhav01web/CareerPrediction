package com.example.Vaibhav.controller;

import com.example.Vaibhav.dto.PredictionRequest;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class PredictionController {

    @PostMapping("/predict")
    public Map<String, String> predict(@RequestBody PredictionRequest req) {

        try {

            System.out.println("===== REQUEST RECEIVED =====");

            ProcessBuilder pb = new ProcessBuilder(
                    "python",
                    "C:/CODING/ML-PROJECTS/Vaibhav/ml_model/predict.py",

                    String.valueOf(req.getCgpa()),
                    String.valueOf(req.getDsa()),
                    String.valueOf(req.getCommunication()),
                    String.valueOf(req.getMl()),
                    String.valueOf(req.getWebdev()),
                    String.valueOf(req.getCloud()),
                    String.valueOf(req.getCybersecurity()),
                    String.valueOf(req.getProjects()),
                    String.valueOf(req.getInternships())
            );

            Process process = pb.start();

            BufferedReader stdOut =
                    new BufferedReader(
                            new InputStreamReader(process.getInputStream()));

            BufferedReader stdErr =
                    new BufferedReader(
                            new InputStreamReader(process.getErrorStream()));

            String output = stdOut.readLine();

            String errorLine;
            while ((errorLine = stdErr.readLine()) != null) {
                System.out.println("PYTHON ERROR: " + errorLine);
            }

            process.waitFor();

            System.out.println("Prediction = " + output);

            return Map.of("career", output);

        } catch (Exception e) {

            e.printStackTrace();

            return Map.of(
                    "career",
                    "ERROR"
            );
        }
    }
}