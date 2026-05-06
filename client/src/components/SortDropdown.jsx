function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border bg-white px-4 py-2 rounded-xl shadow-sm"
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