import { StyleProp, TextInput, TextStyle } from "react-native";
interface InputProps {
    placeholder: string
    value: string
    onChangeText: (e: string) => void
    style?: StyleProp<TextStyle>
    secureTextEntry?: boolean
}
function Input(props: InputProps) {
    return <TextInput
        style={[{
            width: "100%",
            height: 60,
            borderColor: "gray",
            borderWidth: 2,
            borderRadius: 8,
            backgroundColor: "white",
        }
            , props.style]}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
    />
}
export default Input;