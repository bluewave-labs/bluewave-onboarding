# CustomTextField Component

The `CustomTextField` component is a customized version of the Material UI `TextField` with additional functionalities. It includes Material Ui's `InputLabel` for labelling, adornments for adding icons or other elements at the start or end of the input/textarea, and can also display chips inside the textfield.

## Prop Types

- **labelText** (string): A label that describes the content of the text field.
- **defaultValue** (string): A default value for when the input is still empty.
- **helperText** (string): The text that will be displayed as the helper text for the text field.
- **error** (bool): A boolean value that determines whether the text field should display an error state.
- **multiline** (bool): A boolean value that determines whether the text field should allow multiple lines of text.
- **rows** (number): The number of rows that the text field should display when in multiline mode.
- **startAdornment** (node): The node that will be displayed as the start adornment for the text field.
- **endAdornment** (node): The node that will be displayed as the end adornment for the text field.
- **placeholder** (string): The short hint displayed in the input before the user enters a value.
- **chips** (array): An array of objects that represent chips to be displayed in the text field.
- **labelFontWeight** (number): The font weight of the label text.
- **TextFieldWidth** (string): The width of the text field.
- **inputHeight** (string): The height of the input field.
