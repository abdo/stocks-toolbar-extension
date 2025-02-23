import React from "react";
import Select, {
  components,
  MultiValue,
  StylesConfig,
  CSSObjectWithLabel,
} from "react-select";

// Define the type for original options
type OriginalOptionType = {
  value: string;
  disabled?: boolean;
  [key: string]: any; // Allow additional properties from the original options
};

// Define the type for modified options used in react-select
type ModifiedOptionType = OriginalOptionType & {
  label: string;
  isDisabled: boolean;
};

type Props = {
  style?: React.CSSProperties;
  placeholder: string;
  value: string[];
  searchValue: string;
  onSearch: (searchValue: string) => void;
  onChange: (selectedValues: string[]) => void;
  options: OriginalOptionType[];
  optionRender: (props: {
    value: string;
    data: ModifiedOptionType;
  }) => React.ReactNode;
  notFoundContent: null;
  listHeight: number;
  onBlur: () => void;
  filterOption: boolean;
};

// Custom MultiValue component to render selected values as plain text
const CustomMultiValue = (props: any) => {
  return (
    <components.MultiValue {...props}>
      <span>{props.data.label}</span>{" "}
      {/* Display only the label for selected values */}
    </components.MultiValue>
  );
};

const MultiSelect: React.FC<Props> = (props) => {
  const {
    style,
    placeholder,
    value,
    searchValue,
    onSearch,
    onChange,
    options,
    optionRender,
    notFoundContent,
    listHeight,
    onBlur,
    filterOption,
  } = props;

  // Modify options to include label and isDisabled for React-Select
  const modifiedOptions = options.map((option) => ({
    ...option,
    label: option.value || "", // Default label to value if not provided
    isDisabled: Boolean(option.disabled), // Ensure isDisabled is boolean
  }));

  // Create temporary options from the value array
  const temporarySelectedOptions = value.map((val) => ({
    value: val,
    label: val, // Use the string as the label
    isDisabled: false, // Set isDisabled as needed
  }));

  // Define the formatOptionLabel function for dropdown options
  const formatOptionLabel = (option: ModifiedOptionType) => {
    return optionRender({ value: option.value, data: option }); // Use optionRender for dropdown options
  };

  // Define styles with proper typing
  const selectStyles: StylesConfig<ModifiedOptionType, true> = {
    control: (base: CSSObjectWithLabel) => ({
      ...base,
      ...(style || {
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        margin: "10px 0",
        border: "none",
      }),
    }),
    menu: (base: CSSObjectWithLabel) => ({
      ...base,
    }),
  };

  return (
    <Select
      isMulti
      styles={selectStyles}
      placeholder={placeholder}
      value={temporarySelectedOptions as MultiValue<ModifiedOptionType>} // Use temporary options here
      inputValue={searchValue}
      onInputChange={onSearch}
      options={modifiedOptions}
      formatOptionLabel={formatOptionLabel} // Apply custom rendering for dropdown options
      noOptionsMessage={() => notFoundContent}
      onChange={(selectedOptions: MultiValue<ModifiedOptionType>) => {
        onChange(selectedOptions.map((option) => option.value)); // Update parent with selected values
      }}
      onBlur={onBlur}
      filterOption={filterOption ? undefined : () => true}
      hideSelectedOptions={false}
      components={{ MultiValue: CustomMultiValue }} // Override MultiValue to customize selected value rendering <button class="citation-flag" data-index="3">
    />
  );
};

export default MultiSelect;
