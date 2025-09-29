import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../../context/EventContext";
import Step1Details from "./Step1Details";
import Step2DateTime from "./Step2DateTime";
import Step3Location from "./Step3Location";
import Step4Media from "./Step4Media";
import Step5Review from "./Step5Review";
import api from "../../api/axios";

export default function EventWizard() {
  const navigate = useNavigate();
  const { fetchEvents } = useEvent();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startAt: "",
    endAt: "",
    location: { address: "", coordinates: [0, 0] },
    media: [],
    type: "public",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleLocationChange = (location) => {
    setFormData({ ...formData, location });
  };

  const handleMediaChange = (mediaFiles) => {
    setFormData({ ...formData, media: mediaFiles });
  };

  // ✅ Validation
  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.startAt || !formData.endAt)
      return "Start and End times are required";
    if (new Date(formData.startAt) >= new Date(formData.endAt))
      return "End time must be after Start time";
    if (!formData.location.address)
      return "Please select a location from the map";
    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);

      // ✅ Ensure UTC ISO format
      data.append("startAt", new Date(formData.startAt).toISOString());
      data.append("endAt", new Date(formData.endAt).toISOString());

      data.append("type", formData.type);
      data.append("location", JSON.stringify(formData.location));
      formData.media.forEach((file) => data.append("media", file));

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) {
        alert("You must be logged in to create an event.");
        return;
      }
      if (user.role !== "organizer") {
        alert("Only organizers can create events.");
        return;
      }

      await api.post("/events", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ Refresh global events
      await fetchEvents();

      // ✅ Redirect to organizer dashboard
      navigate("/dashboard-organizer", { replace: true });
    } catch (err) {
      console.error("❌ Event creation failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error creating event");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-xl shadow-lg text-white">
      {step === 1 && (
        <Step1Details
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <Step2DateTime
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Step3Location
          location={formData.location}
          handleLocationChange={handleLocationChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && (
        <Step4Media
          media={formData.media}
          handleMediaChange={handleMediaChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 5 && (
        <Step5Review
          formData={formData}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
