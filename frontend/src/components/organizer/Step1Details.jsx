export default function Step1Details({ formData, handleChange, nextStep }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Event Details</h2>
      <input
        type="text"
        placeholder="Event Title"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        className="w-full p-2 mb-4 rounded bg-gray-800"
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        className="w-full p-2 mb-4 rounded bg-gray-800"
      />
      <select
        value={formData.type}
        onChange={(e) => handleChange("type", e.target.value)}
        className="w-full p-2 mb-4 rounded bg-gray-800"
      >
        <option value="public">Public</option>
        <option value="private">Private</option>
        <option value="rsvp-only">RSVP Only</option>
      </select>
      <button onClick={nextStep} className="px-4 py-2 bg-blue-600 rounded">Next</button>
    </div>
  );
}
