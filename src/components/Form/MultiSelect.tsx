import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// eslint-disable-next-line import/named
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

type Props = {
    label: string;
    name: string;
    options: string[];
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const MultiSelect: React.FC<Props> = ({ label = "Options", options = [], name = label }) => {
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
        const {
            target: { value },
        } = event;
        setSelectedOptions(typeof value === "string" ? value.split(",") : value);
    };

    return (
        <FormControl sx={{ width: 300 }}>
            <InputLabel id={label + "-multi-chip-label"}>{label}</InputLabel>
            <Select
                labelId={label + "-multi-chip-label"}
                id={label + "-multi-chip"}
                name={name}
                multiple
                value={selectedOptions}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {options.map((name) => (
                    <MenuItem key={name} value={name}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MultiSelect;
