import "./BannerSlider.css";

function BannerSlider({ widget }) {
  const items = Array.isArray(widget?.banner_images)
    ? widget.banner_images
    : [];

  if (items.length === 0) {
    return (
      <div className="banner-slider-section">
        <h3>{widget.title}</h3>
        <p>No images available.</p>
      </div>
    );
  }

  return (
    <div className="banner-slider-section">
      <h3>{widget.title}</h3>

      <div className="banner-slider">
        {items.map((item, index) => (
          <div key={index} className="banner-wrapper">
            <img
              src={item?.image_path || "/placeholder.png"}
              alt=""
              onError={(e) => (e.target.src = "/placeholder.png")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BannerSlider;
