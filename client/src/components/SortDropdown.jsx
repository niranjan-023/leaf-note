function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        bg-white
        border
        border-gray-200
        rounded-2xl
        px-5
        py-3
        shadow-sm
        hover:shadow-md
        focus:outline-none
        focus:ring-2
        focus:ring-emerald-400
        transition
        font-medium
      "
    >
      <option value="relevant">Most Relevant</option>
      <option value="rating">Highest Rating</option>
      <option value="likes">Most Liked</option>
      <option value="title">Title</option>
      <option value="author">Author</option>
    </select>
  );
}

export default SortDropdown;