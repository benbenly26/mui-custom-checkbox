import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import "./App.css";

export default function App() {
  const [editAll, setEditAll] = useState(false);
  const initialData = [
    { id: 1, name: "Ben", is_active: 1 },
    { id: 2, name: "Dias", is_active: 0 },
    { id: 3, name: "Bibin", is_active: 1 },
  ];
  const [newVal, setNewVal] = useState({
    is_mandatory: 0,
  });

  // State to track data changes
  const [data, setData] = useState(initialData);

  const handleSave = () => {
    console.log(data); // Logs the current state of data
    setEditAll(false); // Disables editing

    // only is_active and id will be send
    const filterData = data.map((e) => ({
      id: e.id,
      is_active: e.is_active,
    }));
    console.log("filterData", filterData);

    //
    console.log("single", newVal.is_mandatory);
  };

  const handleChange = (id, checked) => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, is_active: checked ? 1 : 0 } : item
    );
    setData(newData); // Update state with new data
  };

  return (
    <>
      <Box>
        {data.map((item, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!editAll}
                  defaultChecked={item.is_active === 1} // Use checked for controlled component
                  onChange={(e) => handleChange(item.id, e.target.checked)}
                />
              }
              label={item.name} // Added label for better UX
            />
          </Box>
        ))}
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={newVal.is_mandatory == 1}
                onChange={() =>
                  setNewVal((prev) => {
                    return {
                      ...prev,
                      is_mandatory: newVal.is_mandatory == 1 ? 0 : 1,
                    };
                  })
                }
              />
            }
          />
          <Typography>Check me</Typography>
        </Box>
        {!editAll && (
          <Button className="custom-btn" onClick={() => setEditAll(true)}>
            Edit
          </Button>
        )}
        {editAll && (
          <Button className="custom-btn-save" onClick={handleSave}>
            Save
          </Button>
        )}
      </Box>
    </>
  );
}
