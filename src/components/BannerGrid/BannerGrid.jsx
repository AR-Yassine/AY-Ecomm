import "./BannerGrid.css";

function BannerGrid({ widget }) {
  const items = Array.isArray(widget?.banner_images)
    ? widget.banner_images
    : [];

  if (items.length === 0) {
    return (
      <div className="banner-grid-section">
        <h3>{widget.title}</h3>
        <p>No images available.</p>
      </div>
    );
  }

  return (
    <div className="banner-grid-section">
      <h3>{widget.title}</h3>

      <div className="banner-grid">
        {items.map((item, index) => (
          <div key={index} className="banner-card">
            <div className="banner-wrapper">
              <img
                src={item?.image_path || "/placeholder.png"}
                alt=""
                onError={(e) => (e.target.src = "/placeholder.png")}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BannerGrid;
