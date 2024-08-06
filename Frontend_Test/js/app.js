const API_URL = 'http://localhost:8090';

document.addEventListener('DOMContentLoaded', () => {
    const courseId = 1; // Assuming you have the course ID
    fetchCourseDetails(courseId);

    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addReview(courseId);
    });
});

function fetchCourseDetails(courseId) {
    fetch(`${API_URL}/courses/courseDetails/${courseId}`)
        .then(response => response.json())
        .then(data => {
            const { course, averageRating, reviews } = data;
            document.getElementById('course-title').innerText = course.courseName;
            document.getElementById('course-description').innerText = course.description;
            document.getElementById('average-rating').innerText = averageRating.toFixed(1);

            const reviewsContainer = document.getElementById('reviews');
            reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.className = 'review';
                reviewElement.innerHTML = `<p><strong>${review.userId}</strong>: ${review.comment} - ${review.rating}/5</p>`;
                reviewsContainer.appendChild(reviewElement);
            });
        })
        .catch(error => console.error('Error fetching course details:', error));
}

function addReview(courseId) {
    const userId = 1; // Assuming you have the user ID
    const comment = document.getElementById('review-comment').value;
    const rating = parseInt(document.getElementById('review-rating').value);

    const reviewData = { userId, courseId, comment, rating };

    fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    })
        .then(response => response.json())
        .then(review => {
            const reviewsContainer = document.getElementById('reviews');
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `<p><strong>${review.userId}</strong>: ${review.comment} - ${review.rating}/5</p>`;
            reviewsContainer.appendChild(reviewElement);

            // Update average rating
            fetchCourseDetails(courseId);
        })
        .catch(error => console.error('Error adding review:', error));
}
