package com.shobhit.org.bean;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class Course {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer courseId;
	
	private String courseName;
	@Column(length = 500)
	private String description;
	private String category;
	private BigDecimal price;
	private Float rating;
	private String instructorName;
	private String difficultyLevel;

	private String instructorId;
	
	private String duration;
	@Column(length = 500)
	private String coursePic;
	@Column(length = 500)
	private String videoUrl;
	@Column(length = 500)
	private String resourceUrl;
	
	private String couponCode;
    private BigDecimal discountPercentage;
    private LocalDate couponExpirationDate;
    
//    private Double averageRating;
//
//    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
//    private List<Review> reviews;
	
	@ManyToMany(mappedBy = "courses")
	@JsonIgnore
	private Set<User> users;
	
	// No-arg constructor
	Course(){
		
	}



	public Course(Integer courseId, String courseName, String description, String category, BigDecimal price,
			Float rating, String instructorName, String difficultyLevel, String instructorId, String duration,
			String coursePic, String videoUrl, String resourceUrl, String couponCode, BigDecimal discountPercentage,
			LocalDate couponExpirationDate, Set<User> users) {
		super();
		this.courseId = courseId;
		this.courseName = courseName;
		this.description = description;
		this.category = category;
		this.price = price;
		this.rating = rating;
		this.instructorName = instructorName;
		this.difficultyLevel = difficultyLevel;
		this.instructorId = instructorId;
		this.duration = duration;
		this.coursePic = coursePic;
		this.videoUrl = videoUrl;
		this.resourceUrl = resourceUrl;
		this.couponCode = couponCode;
		this.discountPercentage = discountPercentage;
		this.couponExpirationDate = couponExpirationDate;
		this.users = users;
	}





	// Getters and Setters

	public Integer getCourseId() {
		return courseId;
	}

	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Float getRating() {
		return rating;
	}

	public void setRating(Float rating) {
		this.rating = rating;
	}

	public String getInstructorName() {
		return instructorName;
	}

	public void setInstructorName(String instructorName) {
		this.instructorName = instructorName;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getCoursePic() {
		return coursePic;
	}

	public void setCoursePic(String coursePic) {
		this.coursePic = coursePic;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	public String getCategory() {
		return category;
	}
	
	public String getInstructorId() {
		return instructorId;
	}

	public void setInstructorId(String instructorId) {
		this.instructorId = instructorId;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	
	public String getVideoUrl() {
		return videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}

	public String getCouponCode() {
		return couponCode;
	}

	public void setCouponCode(String couponCode) {
		this.couponCode = couponCode;
	}

	public BigDecimal getDiscountPercentage() {
		return discountPercentage;
	}

	public void setDiscountPercentage(BigDecimal discountPercentage) {
		this.discountPercentage = discountPercentage;
	}

	public LocalDate getCouponExpirationDate() {
		return couponExpirationDate;
	}

	public void setCouponExpirationDate(LocalDate couponExpirationDate) {
		this.couponExpirationDate = couponExpirationDate;
	}


	public String getResourceUrl() {
		return resourceUrl;
	}

	public void setResourceUrl(String resourceUrl) {
		this.resourceUrl = resourceUrl;
	}


	public String getDifficultyLevel() {
		return difficultyLevel;
	}

	public void setDifficultyLevel(String difficultyLevel) {
		this.difficultyLevel = difficultyLevel;
	}
	
//	public Double getAverageRating() {
//		return averageRating;
//	}
//
//	public void setAverageRating(Double averageRating) {
//		this.averageRating = averageRating;
//	}
//
//	public List<Review> getReviews() {
//		return reviews;
//	}
//
//	public void setReviews(List<Review> reviews) {
//		this.reviews = reviews;
//	}



	@Override
	public String toString() {
		return "Course [courseId=" + courseId + ", courseName=" + courseName + ", description=" + description
				+ ", category=" + category + ", price=" + price + ", rating=" + rating + ", instructorName="
				+ instructorName + ", difficultyLevel=" + difficultyLevel + ", instructorId=" + instructorId
				+ ", duration=" + duration + ", coursePic=" + coursePic + ", videoUrl=" + videoUrl + ", resourceUrl="
				+ resourceUrl + ", couponCode=" + couponCode + ", discountPercentage=" + discountPercentage
				+ ", couponExpirationDate=" + couponExpirationDate + ", averageRating=" + "]";
	}
	
	
}
