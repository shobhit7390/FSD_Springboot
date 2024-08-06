package com.shobhit.org.bean;

import java.util.List;

public class CourseDetailsResponse {
	private Course course;
    private double averageRating;
    private List<Review> reviews;
    
    
    public CourseDetailsResponse() {
    	
    }
    
	public CourseDetailsResponse(Course course, double averageRating, List<Review> reviews) {
		super();
		this.course = course;
		this.averageRating = averageRating;
		this.reviews = reviews;
	}


	public Course getCourse() {
		return course;
	}


	public void setCourse(Course course) {
		this.course = course;
	}


	public double getAverageRating() {
		return averageRating;
	}


	public void setAverageRating(double averageRating) {
		this.averageRating = averageRating;
	}


	public List<Review> getReviews() {
		return reviews;
	}


	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}


	@Override
	public String toString() {
		return "CourseDetailsResponse [course=" + course + ", averageRating=" + averageRating + ", reviews=" + reviews
				+ "]";
	}
    

}
