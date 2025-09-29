export default function Step5Review({ formData, prevStep, handleSubmit }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Review Event</h2>
      <p><strong>Title:</strong> {formData.title}</p>
      <p><strong>Description:</strong> {formData.description}</p>
      <p><strong>Type:</strong> {formData.type}</p>
      <p><strong>Start:</strong> {formData.startAt}</p>
      <p><strong>End:</strong> {formData.endAt}</p>
      <p><strong>Address:</strong> {formData.location.address}</p>
      <p><strong>Coordinates:</strong> {formData.location.coordinates.join(", ")}</p>
      <p><strong>Media Files:</strong> {formData.media.length}</p>
      <div className="flex justify-between mt-4">
        <button onClick={prevStep} className="px-4 py-2 bg-gray-600 rounded">Back</button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 rounded">Submit</button>
      </div>
    </div>
  );
}
