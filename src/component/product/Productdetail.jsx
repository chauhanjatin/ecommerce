import React, { useState, useEffect } from "react";
import bedImg2 from "../../assets/bedroom/bedroom1(2).jpg";
import bedImg3 from "../../assets/bedroom/bedroom1(3).jpg";
import livingImg2 from "../../assets/livingroom/livingroom1(2).jpg";
import livingImg3 from "../../assets/livingroom/livingroom1(3).jpg";
import diningImg2 from "../../assets/diningroom/diningroom1(2).jpg";
import diningImg3 from "../../assets/diningroom/diningroom1(3).jpg";
import sofaImg2 from "../../assets/sofaset/sofaset1(2).jpg";
import sofaImg3 from "../../assets/sofaset/sofaset1(3).jpg";
import {
  Heart,
  Star,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import { addToCart } from "../../utils/cart";
function Productdetail() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product || {
    name: "Double Bed & Side Tables",
    price: "$200.00",
    originalPrice: "$230.00",
    id: "default-product",
    image:
      "https://media.diy.com/is/image/KingfisherDigital/btm-upholstered-bed-4ft6-double-bed-135x190cm-bedside-reading-light-includes-bedside-table-velvet-plywood-beige~5056416242737_02c_MP?$MOB_PREV$&$width=600&$height=600",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.",
    discount: "-13%",
  };

  const [reviews, setReviews] = useState(() => {
    return JSON.parse(localStorage.getItem(`reviews_${product.id}`)) || [];
  });
  const [newReview, setNewReview] = useState({ name: '', email: '', comment: '', rating: 0 });
  const [reviewErrors, setReviewErrors] = useState({});

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
    if (reviewErrors[e.target.name]) {
      setReviewErrors({ ...reviewErrors, [e.target.name]: '' });
    }
  };

  const handleRatingClick = (rating) => {
    setNewReview({ ...newReview, rating });
    if (reviewErrors.rating) {
      setReviewErrors({ ...reviewErrors, rating: '' });
    }
  };

  const submitReview = () => {
    const errors = {};
    if (!newReview.name.trim()) errors.name = "Name is required";
    if (!newReview.email.trim()) errors.email = "Email is required";
    if (!newReview.comment.trim()) errors.comment = "Comment is required";
    if (newReview.rating === 0) errors.rating = "Rating is required";

    if (Object.keys(errors).length > 0) {
      setReviewErrors(errors);
      return;
    }

    const reviewToSave = { ...newReview, date: new Date().toLocaleDateString() };
    const updatedReviews = [...reviews, reviewToSave];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${product.id}`, JSON.stringify(updatedReviews));
    setNewReview({ name: '', email: '', comment: '', rating: 0 });
  };


  const [mainImage, setMainImage] = useState(product.image);
  const getWishlistKey = () => localStorage.getItem('isLoggedIn') ? 'userWishlistItems' : 'guestWishlistItems';

  const [isWishlisted, setIsWishlisted] = useState(() => {
    const wishlist = JSON.parse(localStorage.getItem(getWishlistKey())) || [];
    return wishlist.some((item) => item.id === product.id);
  });

  const toggleWishlist = () => {
    const wishlistKey = getWishlistKey();
    const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    if (isWishlisted) {
      const newWishlist = wishlist.filter((item) => item.id !== product.id);
      localStorage.setItem(wishlistKey, JSON.stringify(newWishlist));
    } else {
      wishlist.push(product);
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    }
    setIsWishlisted(!isWishlisted);
  };

  useEffect(() => {
    const wishlistKey = getWishlistKey();
    const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    setIsWishlisted(wishlist.some((item) => item.id === product.id));
  }, [product.id]);

  useEffect(() => {
    setMainImage(product.image);
  }, [product.image]);

  let img2 = bedImg2;
  let img3 = bedImg3;

  let bullets = [
    "Premium craftsmanship with elegant modern detailing",
    "Spacious design for comfort and everyday functionality",
    "Sophisticated finish that complements contemporary interiors",
  ];

  if (product.image?.includes("livingroom")) {
    img2 = livingImg2;
    img3 = livingImg3;
    bullets = [
      "Stylish design crafted for modern living spaces",
      "Comfortable seating with premium-quality finishes",
      "Elegant look that creates a warm and inviting atmosphere",
    ];
  } else if (product.image?.includes("diningroom")) {
    img2 = diningImg2;
    img3 = diningImg3;
    bullets = [
      "Spacious seating for comfortable family dining",
      "Durable construction with a refined contemporary finish",
      "Perfect blend of functionality, comfort, and elegance",
    ];
  } else if (product.image?.includes("sofaset")) {
    img2 = sofaImg2;
    img3 = sofaImg3;
    bullets = [
      "Generous L-shaped design for relaxed seating",
      "Premium upholstery with a sophisticated modern look",
      "Ideal for maximizing comfort and space in your living room",
    ];
  }

  const galleryImages = product.galleryImages || [product.image, img2, img3];

  const handleAddToCart = (redirect = false) => {
    const numericPrice = parseFloat(product.price.toString().replace(/[^0-9.]/g, "")) || 0;
    const newItem = {
      id: product.id || Date.now(),
      title: product.name,
      price: numericPrice,
      quantity: quantity,
      total: numericPrice * quantity,
      image: product.image,
    };

    addToCart(newItem);
    if (redirect) {
      navigate("/cart");
    } else {
      alert("Added to cart!");
    }
  };

  return (
    <div className="w-full text-text-heading font-sans">
      <div className="text-sm text-text-secondary mb-6 md:mb-8">
        <Link to="/home">
          <span className="hidden sm:inline">Product Listing</span>
        </Link>
        <span className="hidden sm:inline mx-2">&gt;</span>
        <span className="text-text-h font-medium">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-15 mb-12 md:mb-20">
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4 min-w-0">
          <div className="flex sm:flex-col gap-3 sm:gap-4 sm:w-[140px] shrink-0 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 sm:h-auto items-stretch">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setMainImage(img)}
                className={`w-16 h-16 sm:w-full sm:h-full sm:flex-1 bg-surface-muted rounded-sm cursor-pointer shrink-0 sm:shrink overflow-hidden border-2 ${mainImage === img ? "border-text-h" : "border-transparent"}`}
              >
                <img
                  src={img}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex-1 bg-surface-muted aspect-square rounded-sm min-w-0 overflow-hidden relative">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-surface-dark text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
              {product.discount}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col pt-0 sm:pt-2 min-w-0">
          <div className="flex justify-between items-start gap-3 mb-4">
            <h1 className="font-heading text-2xl sm:text-[26px] font-semibold text-text-h">
              {product.name}
            </h1>
            <button
              onClick={toggleWishlist}
              className={`${isWishlisted ? "text-danger" : "text-text-muted hover:text-danger"} mt-1 transition-colors cursor-pointer`}
            >
              <Heart
                size={22}
                strokeWidth={1.5}
                fill={isWishlisted ? "currentColor" : "none"}
              />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-8">
            <span className="text-[28px] text-text-h">{product.price}</span>
            <span className="text-lg text-text-muted line-through">
              {product.originalPrice}
            </span>
            <div className="flex items-center text-text-subtle">
              <span className="mr-2 text-text-muted">|</span>
              <div className="flex text-surface-muted">
                <Star size={14} fill="yellow" />
                <Star size={14} fill="yellow" />
                <Star size={14} fill="yellow" />
                <Star size={14} fill="yellow" />
                <Star size={14} fill="currentColor" />
              </div>
              <span className="ml-2 text-xs text-text-secondary">
                ( {reviews.length} review{reviews.length !== 1 ? 's' : ''} )
              </span>
            </div>
          </div>

          <div className="h-[1px] w-full bg-border mb-8"></div>

          <p className="text-[15px] text-text mb-6 leading-relaxed">
            {product.description}
          </p>

          <ul className="list-disc list-inside text-[15px] text-text mb-11 space-y-2">
            {bullets.map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="flex items-center border border-border-strong rounded-full h-12 w-full sm:w-32 px-4 justify-between shrink-0">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-text-secondary hover:text-text-h"
              >
                <Minus size={14} />
              </button>
              <span className="font-medium text-[18px]">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-text-secondary hover:text-text-h"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={() => handleAddToCart(false)}
              className="flex-1 bg-btn hover:bg-black text-white h-12 rounded-full text-[18px] font-medium transition-colors flex items-center justify-center cursor-pointer"
            >
              Add to Cart
            </button>
          </div>

          <button
            onClick={() => handleAddToCart(true)}
            className="w-full border border-text-h text-text-h h-12 rounded-full text-[18px] font-medium hover:bg-code-bg transition-colors mb-8 cursor-pointer"
          >
            Buy Now
          </button>

          <div className="space-y-4 text-[14px] text-text">
            <div className="flex items-center gap-3">
              <Truck size={16} className="text-text-muted" />
              <span>Free worldwide shipping on all orders over $100</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw size={16} className="text-text-muted" />
              <span>
                Delivers in: 3-7 Working Days{" "}
                <a href="" className="underline font-medium hover:text-text-h">
                  Shipping & Return
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-alt -mx-page-x px-page-x py-8 md:py-page-y">
        <div className="flex flex-wrap items-center gap-4 sm:gap-8 mb-6 md:mb-8 text-xl sm:text-2xl">
          <button
            className={`font-heading font-semibold transition-colors ${activeTab === "description" ? "text-text-h" : "text-text-muted hover:text-text"} cursor-pointer`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <span className="text-text-subtle">|</span>
          <button
            className={`font-heading font-semibold transition-colors ${activeTab === "reviews" ? "text-text-h" : "text-text-muted hover:text-text"} cursor-pointer`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>

        {activeTab === "description" && (
          <div className="text-[16px] text-text leading-relaxed max-w-full lg:max-w-[85%]">
            <p className="mb-6">
              {product.description ||
                `The ${product.name} is designed with elegance and durability in mind, making it the perfect addition to your home.`}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="w-full flex flex-col gap-6">
            
            {reviews.length === 0 ? (
              <div className="text-text-muted text-center py-6">
                No reviews yet. Be the first to review this product!
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-medium mb-2">Customer Reviews</h3>
                {reviews.map((rev, index) => (
                  <div key={index} className="border-b border-border pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{rev.name}</span>
                      <span className="text-xs text-text-muted">{rev.date}</span>
                    </div>
                    <div className="flex text-text-h gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={14} fill={star <= rev.rating ? "currentColor" : "none"} strokeWidth={1.5} />
                      ))}
                    </div>
                    <p className="text-sm text-text-secondary">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="border border-border rounded-2xl p-4 sm:p-8 mt-2">
              <h3 className="text-lg font-medium mb-4">Add a Review</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-control text-[14px] mb-2">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newReview.name}
                    onChange={handleReviewChange}
                    placeholder="John Doe"
                    className={`w-full h-[46px] rounded-full border bg-transparent px-5 text-[14px] text-text focus:outline-none ${reviewErrors.name ? 'border-red-500' : 'border-border-strong focus:border-border-strong'} placeholder:text-placeholder`}
                  />
                  {reviewErrors.name && <span className="text-red-500 text-xs ml-4">{reviewErrors.name}</span>}
                </div>
                <div>
                  <label className="block text-control text-[14px] mb-2">
                    Your Email:
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={newReview.email}
                    onChange={handleReviewChange}
                    placeholder="person@gmail.com"
                    className={`w-full h-[46px] rounded-full border bg-transparent px-5 text-[14px] text-text focus:outline-none ${reviewErrors.email ? 'border-red-500' : 'border-border-strong focus:border-border-strong'} placeholder:text-placeholder`}
                  />
                  {reviewErrors.email && <span className="text-red-500 text-xs ml-4">{reviewErrors.email}</span>}
                </div>
              </div>
              <div className="mb-6">
                <textarea
                  name="comment"
                  value={newReview.comment}
                  onChange={handleReviewChange}
                  placeholder="Write your review..."
                  className={`w-full h-32 rounded-2xl border bg-transparent p-5 text-[14px] text-text focus:outline-none resize-none ${reviewErrors.comment ? 'border-red-500' : 'border-border-strong focus:border-border-strong'} placeholder:text-placeholder`}
                ></textarea>
                {reviewErrors.comment && <span className="text-red-500 text-xs ml-4">{reviewErrors.comment}</span>}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <span className="text-control text-[14px]">
                    Your Ratings:
                  </span>
                  <div className="flex text-text-secondary gap-1 cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={18} 
                        strokeWidth={1.5} 
                        fill={star <= newReview.rating ? "currentColor" : "none"}
                        className={star <= newReview.rating ? "text-text-h" : ""}
                        onClick={() => handleRatingClick(star)}
                      />
                    ))}
                  </div>
                  {reviewErrors.rating && <span className="text-red-500 text-xs">{reviewErrors.rating}</span>}
                </div>
                <button onClick={submitReview} className="flex items-center justify-center gap-2 bg-btn hover:bg-black text-white px-7 py-2.5 rounded-full text-[14px] font-medium transition-colors w-full sm:w-auto cursor-pointer">
                  Post Review <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Productdetail;
