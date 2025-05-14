export default function MessageModal({ message, onClose }) {
  return (
    <div
      className="flex items-center justify-center fixed inset-0 z-50 bg-[rgba(0, 0, 0, 0.5)]"
      style={{
        backdropFilter: "blur(3px)",
      }}
    >
      <div className="flex flex-col gap-5 items-center bg-white p-8 rounded-lg shadow-xl mx-4 animate-fadeIn max-w-[330px]">
        <p className="text-xl text-center font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="text-xl font-bold bg-yellow-200 px-8 py-2 border-2 border-[#483D61] rounded-full shadow-xl hover:bg-yellow-300 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
}
