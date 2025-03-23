export default function FilterDropdown({ options, rootFilter, selectedValue, onChange }) {
    const isActive = selectedValue !== rootFilter;
    
    return (
        <div>
            <select
                className={`${isActive ? "filterActive" : ""}`}
                value={selectedValue}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}