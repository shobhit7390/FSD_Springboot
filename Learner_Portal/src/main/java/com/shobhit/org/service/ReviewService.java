//package com.shobhit.org.service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.shobhit.org.bean.Course;
//import com.shobhit.org.bean.Review;
//import com.shobhit.org.bean.User;
//import com.shobhit.org.repository.CourseRepository;
//import com.shobhit.org.repository.ReviewRepository;
//import com.shobhit.org.repository.UserRepository;
//
//@Service
//public class ReviewService {
//	
//	@Autowired
//    private ReviewRepository reviewRepository;
//   
//    @Autowired
//    private CourseRepository courseRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    public Review addReview(Integer courseId, Integer userId, int rating, String comment) {
//        Course course = courseRepository.findById(courseId).get();
//        User user = userRepository.findById(userId).get();
//            
//        Review review = new Review();
//        review.setCourse(course);
//        review.setUser(user);
//        review.setRating(rating);
//        review.setComment(comment);
//        review.setCreatedAt(LocalDateTime.now());
//
//        review = reviewRepository.save(review);
//
//        // Update course average rating
//        List<Review> reviews = reviewRepository.findByCourseCourseId(courseId);
//        double avgRating = reviews.stream().mapToInt(Review::getRating).average().orElse(0.0);
//        course.setAverageRating(avgRating);
//        courseRepository.save(course);
//
//        return review;
//    }
//
//    public List<Review> getCourseReviews(Integer courseId) {
//        return reviewRepository.findByCourseCourseId(courseId);
//    }
//
//}
