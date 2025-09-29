export default function Step2DateTime({ formData, handleChange, nextStep, prevStep }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Event Date & Time</h2>
      <label>Start Date & Time</label>
      <input
        type="datetime-local"
        value={formData.startAt}
        onChange={(e) => handleChange("startAt", e.target.value)}
        className="w-full p-2 mb-4 rounded bg-gray-800"
      />
      <label>End Date & Time</label>
      <input
        type="datetime-local"
        value={formData.endAt}
        onChange={(e) => handleChange("endAt", e.target.value)}
        className="w-full p-2 mb-4 rounded bg-gray-800"
      />
      <div className="flex justify-between">
        <button onClick={prevStep} className="px-4 py-2 bg-gray-600 rounded">Back</button>
        <button onClick={nextStep} className="px-4 py-2 bg-blue-600 rounded">Next</button>
      </div>
    </div>
  );
}
