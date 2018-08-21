declare module '@kausta/react-native-commons' {
    import * as React from 'react'
    import * as ReactNative from 'react-native'
    import {NativeBase} from 'native-base'
    import {ObservableMap} from "mobx";

    namespace ReactNativeCommons {
        interface Container extends NativeBase.Container {

        }

        interface Content extends NativeBase.Content {
            style?: ReactNative.ViewStyle | Array<ReactNative.ViewStyle>;
        }

        interface Input extends NativeBase.Input {
            placeholder: string,
            type: string,
            onChangeText: (key: string, value: string) => void,
            style?: ReactNative.TextStyle | Array<ReactNative.TextStyle>
        }

        interface IconInput extends Input {
            iconName: string,
            placeholder: string,
            type: string,
            onChangeText: (key: string, value: string) => void,
            isLast?: boolean,
            inputStyle?: any,
            isSuccessful?: boolean | null
        }

        interface FormItem {
            iconName: string,
            placeholder: string,
            type: string,
            keyboardType?: string,
            textContentType?: string,
            secureTextEntry?: boolean
        }

        interface FormEntries {
            [key: string]: string | null
        }

        type FormEntriesMap = ObservableMap<string, string | null>

        interface Form {
            formItems: FormItem[],
            validate: (field: string, formItems: FormEntriesMap) => (boolean | null),
            submit: (entries: FormEntries) => void,
            RenderButton: (onPress: () => void, isEnabled: boolean) => any
        }

        interface Text extends ReactNative.Text {
            style?: ReactNative.TextStyle | Array<ReactNative.TextStyle>
        }

        interface RegularText extends Text {
        }

        interface LightText extends Text {
        }

        interface BoldText extends Text {
        }
    }

    export class Container extends React.Component<ReactNativeCommons.Container, any> {
    }

    export class Content extends React.Component<ReactNativeCommons.Content, any> {
    }

    export class Input extends React.Component<ReactNativeCommons.Input, any> {
    }

    export class IconInput extends React.Component<ReactNativeCommons.IconInput, any> {
    }

    export class Form extends React.Component<ReactNativeCommons.Form, any> {
    }

    export class RegularText extends React.Component<ReactNativeCommons.RegularText, any> {
    }

    export class LightText extends React.Component<ReactNativeCommons.LightText, any> {
    }

    export class BoldText extends React.Component<ReactNativeCommons.BoldText, any> {
    }

    export interface FontProps {
        light: string,
        medium: string,
        regular: string,
        bold: string
    }

    export interface ThemeManagerSettings {
        fontFamily: FontProps
    }

    class ThemeManager {
        settings: ThemeManagerSettings;
        fontFamily: FontProps;

        init: (settings: ThemeManagerSettings) => void
    }
    export const theme: ThemeManager
}
