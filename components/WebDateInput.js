const WebDateInput = ({ value, onChange, customStyle }) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (!inputValue) {
      onChange("");
    } else {
      const dateObj = new Date(inputValue);
      if (!isNaN(dateObj.getTime())) {
        onChange(dateObj);
      }
    }
  };

  return (
    <input
      type="date"
      value={value || ""}
      onChange={handleChange}
      style={customStyle || {
        fontFamily: "Lexend-Deca-Regular",
        height: 20,
        marginTop: 8,
        marginBottom: 8,
        padding: 15,
        fontSize: 14,
        borderRadius: 5,
        border: '1px solid #DFDFDF',
      }}
    />
  );
};

export default WebDateInput;