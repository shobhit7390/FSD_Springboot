//package com.shobhit.org.controller;
//
//import java.util.List;
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.shobhit.org.bean.Review;
//import com.shobhit.org.service.ReviewService;
//
//@RestController
//@RequestMapping("/reviews")
//@CrossOrigin("http://127.0.0.1:5500")
//public class ReviewController {
//	
//	@Autowired
//    private ReviewService reviewService;
//
//	@PostMapping
//    public ResponseEntity<Review> addReview(@RequestBody Map<String, Object> reviewData) {
//        Integer courseId = (Integer) reviewData.get("courseId");
//        Integer userId = ((Integer) reviewData.get("userId"));
//        int rating = (Integer) reviewData.get("rating");
//        String comment = (String) reviewData.get("comment");
//
//        Review review = reviewService.addReview(courseId, userId, rating, comment);
//        return ResponseEntity.ok(review);
//    }
//
//    @GetMapping("/courses/{courseId}")
//    public ResponseEntity<List<Review>> getCourseReviews(@PathVariable Integer courseId) {
//        List<Review> reviews = reviewService.getCourseReviews(courseId);
//        return ResponseEntity.ok(reviews);
//    }
//
//}
