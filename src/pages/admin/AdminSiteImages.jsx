
import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import {
  getSiteImages,
  updateSiteImage,
  deleteSiteImage,
} from "../../api/siteImagesApi";

const floorPlanNames = [
  "BLOCK-A-2BHK",
  "BLOCK-A-3BHK",
  "BLOCK-B-2BHK",
  "BLOCK-B-3BHK",
  "BLOCK-C-2BHK",
  "BLOCK-C-3BHK",
  "SKY-VILLA-E1",
  "SKY-VILLA-E2",
  "SKY-VILLA-W1",
  "SKY-VILLA-W2",
  "GARDEN-VILLA-E",
  "GARDEN-VILLA-W",
  "CORNER-VILLA-E",
  "CORNER-VILLA-W",
];

const imageSlots = [
  {
    slot: "HERO_1",
    title: "Hero Slide 1",
    folder: "HERO",
    altText: "Green Woods homepage banner 1",
  },
  {
    slot: "HERO_2",
    title: "Hero Slide 2",
    folder: "HERO",
    altText: "Green Woods homepage banner 2",
  },
  {
    slot: "HERO_3",
    title: "Hero Slide 3",
    folder: "HERO",
    altText: "Green Woods homepage banner 3",
  },
  {
    slot: "MASTER_PLAN",
    title: "Master Plan",
    folder: "SITE",
    altText: "Green Woods master plan",
  },
  {
    slot: "AMENITIES_CLUBHOUSE",
    title: "Clubhouse",
    folder: "AMENITIES",
    altText: "Green Woods clubhouse",
  },
  {
    slot: "AMENITIES_POOL",
    title: "Swimming Pool",
    folder: "AMENITIES",
    altText: "Green Woods swimming pool",
  },
  
...[
  { id: 1, name: "Basketball Court" },
  { id: 2, name: "Multi-purpose Sports Court" },
  { id: 3, name: "Badminton Court" },
  { id: 4, name: "Party Deck Area" },
  { id: 5, name: "Terrace Swimming Pool with Deck" },
  { id: 6, name: "Event Space" },
  { id: 7, name: "A/c Business Lounges" },
  { id: 8, name: "Conference Rooms" },
  { id: 9, name: "Library & Study Spaces" },
  { id: 10, name: "Children Play Area" },
  { id: 11, name: "Kids Pool" },
  { id: 12, name: "Sand Pit" },
  { id: 13, name: "Designer Seating Areas" },
  { id: 14, name: "Podium Landscape" },
  { id: 15, name: "Spacious Outdoors" },
  { id: 16, name: "Two Guest Suites" },
  { id: 17, name: "Super Market" },
  { id: 18, name: "Maintenance Office" },
].map((amenity) => ({
  slot: `AMENITY_${amenity.id}`,
  title: amenity.name,
  folder: "AMENITIES",
  altText: `Green Woods ${amenity.name}`,
})),

  ...floorPlanNames.map((name) => ({
    slot: `FLOOR_PLAN_${name}`,
    title: name.replaceAll("-", " "),
    folder: "FLOOR_PLANS",
    altText: `${name.replaceAll("-", " ")} floor plan`,
  })),
];

export default function AdminSiteImages() {
  const [images, setImages] = useState({});
  const [files, setFiles] = useState({});
  const [altTexts, setAltTexts] = useState({});
  const [loading, setLoading] = useState(true);
  const [busySlot, setBusySlot] = useState("");
  const [message, setMessage] = useState("");

  async function loadImages() {
    try {
      const response = await getSiteImages();

      const imageMap = {};
      const descriptions = {};

      for (const item of response.data || []) {
        imageMap[item.slot] = item.imageUrl;
        descriptions[item.slot] = item.altText || "";
      }

      setImages(imageMap);

      setAltTexts((current) => ({
        ...current,
        ...descriptions,
      }));
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          "Could not load site images. Please check the backend."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadImages();
  }, []);

  async function uploadAndSave(item) {
    const file = files[item.slot];

    if (!file) {
      setMessage(`Please select an image for ${item.title}.`);
      return;
    }

    setBusySlot(item.slot);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", item.folder);

      const uploadResponse = await api.post(
        "/admin/media",
        formData
      );

      const imageKey = uploadResponse.data.key;
      const altText = altTexts[item.slot] || item.altText;

      await updateSiteImage(item.slot, {
        imageKey,
        altText,
      });

      setFiles((current) => ({
        ...current,
        [item.slot]: null,
      }));

      await loadImages();

      setMessage(`${item.title} saved successfully.`);
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          `Could not save ${item.title}. Please try again.`
      );
    } finally {
      setBusySlot("");
    }
  }

  async function removeImage(item) {
    if (
      !window.confirm(
        `Remove the saved image for ${item.title}?`
      )
    ) {
      return;
    }

    setBusySlot(item.slot);
    setMessage("");

    try {
      await deleteSiteImage(item.slot);
      await loadImages();

      setMessage(`${item.title} image removed.`);
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          `Could not remove ${item.title}.`
      );
    } finally {
      setBusySlot("");
    }
  }

  if (loading) {
    return <p>Loading site images...</p>;
  }

  return (
    <section style={{ padding: "24px", maxWidth: "1100px" }}>
      <h1>Site Images</h1>

      <p>
        Manage homepage banners, the master plan, amenities, and
        all 14 floor plans.
      </p>

      {message && (
        <p role="status" style={{ margin: "16px 0" }}>
          {message}
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {imageSlots.map((item) => (
          <article
            key={item.slot}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "16px",
            }}
          >
            <h3>{item.title}</h3>

            {images[item.slot] ? (
              <img
                src={images[item.slot]}
                alt={altTexts[item.slot] || item.altText}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            ) : (
              <div
                style={{
                  height: "180px",
                  background: "#f2f2f2",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "6px",
                }}
              >
                No image saved
              </div>
            )}

            <p>
              <label>
                Choose image
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) =>
                    setFiles((current) => ({
                      ...current,
                      [item.slot]:
                        event.target.files?.[0] || null,
                    }))
                  }
                />
              </label>
            </p>

            <p>
              <label>
                Image description
                <input
                  type="text"
                  maxLength={150}
                  value={altTexts[item.slot] ?? item.altText}
                  onChange={(event) =>
                    setAltTexts((current) => ({
                      ...current,
                      [item.slot]: event.target.value,
                    }))
                  }
                  style={{
                    display: "block",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </label>
            </p>

            <button
              type="button"
              disabled={busySlot === item.slot}
              onClick={() => uploadAndSave(item)}
            >
              {busySlot === item.slot
                ? "Saving..."
                : "Upload / Replace"}
            </button>

            {images[item.slot] && (
              <button
                type="button"
                disabled={busySlot === item.slot}
                onClick={() => removeImage(item)}
                style={{ marginLeft: "8px" }}
              >
                Remove
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
