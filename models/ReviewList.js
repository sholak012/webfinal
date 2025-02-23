// ReviewsList.js
const ReviewsList = ({ reviews }) => {
    return (
      <div>
        {reviews.map((review) => (
          <div key={review._id}>
            <StarRating rating={review.rating} />
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    );
  };