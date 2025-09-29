// Step4Media.jsx
export default function Step4Media({ media, handleMediaChange, nextStep, prevStep }) {
  const handleFiles = (e) => {
    handleMediaChange([...e.target.files]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upload Media</h2>
      <input type="file" multiple onChange={handleFiles} className="mb-4" />
      {media.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {Array.from(media).map((file, i) => (
            <img
              key={i}
              src={URL.createObjectURL(file)}
              alt={`media-${i}`}
              className="h-24 w-full object-cover rounded"
            />
          ))}
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button onClick={prevStep} className="px-4 py-2 bg-gray-600 rounded">
          Back
        </button>
        <button onClick={nextStep} className="px-4 py-2 bg-blue-600 rounded">
          Next
        </button>
      </div>
    </div>
  );
}
