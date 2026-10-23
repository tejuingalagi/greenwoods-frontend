import useSiteImages from "../hooks/useSiteImages";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { CATEGORY_ORDER, amenityList } from "../data/amenitiesData";
import "./AmenitiesPage.css";

function AmenitiesPage() {
  const siteImages = useSiteImages();

  const groups = CATEGORY_ORDER
    .map((category) => ({
      category,
      items: amenityList.filter((a) => a.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <section className="amen-hero">
        <div className="container">
          <h1>Amenities</h1>
          <p>
            {amenityList.length} catalogued across {groups.length} categories.
          </p>
        </div>
      </section>

      <section className="amen-body">
        <div className="container">
          {groups.map((group) => (
            <Reveal key={group.category}>
              <div className="amen-group">
                <h2 className="amen-group-title">{group.category}</h2>
                <p className="amen-group-count">
                  {group.items.length} amenities in this category
                </p>

                <div className="amen-grid">
                  {group.items.map((item) => {
                    
let image = siteImages[`AMENITY_${item.id}`] || item.image;

if (item.name.toLowerCase().includes("swimming pool")) {
  image =
    siteImages[`AMENITY_${item.id}`] ||
    siteImages.AMENITIES_POOL ||
    item.image;
}

if (item.name.toLowerCase().includes("clubhouse")) {
  image =
    siteImages[`AMENITY_${item.id}`] ||
    siteImages.AMENITIES_CLUBHOUSE ||
    item.image;
}


                    return (
                      <article className="amen-card" key={item.id}>
                        <div className="amen-media">
                          {image && (
                            <img
                              src={image}
                              alt={item.name}
                              loading="lazy"
                            />
                          )}
                          {item.featured && (
                            <span className="amen-badge">FEATURED</span>
                          )}
                        </div>

                        <div className="amen-info">
                          <p className="amen-cat">{group.category}</p>
                          <h3 className="amen-name">{item.name}</h3>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}

          <div className="amen-note">
            <strong>{amenityList.length} of 60+</strong> amenities catalogued.
            We are progressively documenting the full list — visit our sales
            gallery or <Link to="/#contact">contact us</Link> for the complete
            brochure.
          </div>
        </div>
      </section>
    </>
  );
}

export default AmenitiesPage;
