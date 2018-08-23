/**
 * @kausta/react-native-commons
 * ----------------------------
 *
 * Copyright 2018 Caner Korkmaz
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @format
 * @flow
 */

import { Input as NBInput, NativeBase as NBTypes } from 'native-base'
import React from 'react'
import { TextStyle, TextInput } from 'react-native'

import { theme } from '../style'

interface Props extends NBTypes.Input {
  placeholder: string
  type: string
  onEdit: (key: string, value: string) => void
  style?: TextStyle | TextStyle[]
}
export default class Input extends React.Component<Props> {
  public static defaultProps = {
    style: {},
  }

  private readonly _input: React.RefObject<NBInput> = React.createRef()

  /**
   * Ref to internal text input field
   */
  public get input(): TextInput {
    // Native Base Input does contain a _root field
    // @ts-ignore
    return (this._input.current as NBInput)._root
  }

  private onValueChange = (value: string) => {
    const { type, onEdit } = this.props
    onEdit(type, value)
  }

  public render() {
    // OnChangeText and Type are important here so that they are not passed to NBInput
    const { placeholder, type, onEdit, style, ...props } = this.props
    return (
      <NBInput
        {...props}
        ref={this._input}
        autoCapitalize="none"
        autoCorrect={false}
        style={[
          {
            height: 45,
            fontSize: 16,
            fontFamily: theme.fontFamily.light,
          },
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#a0a0a0"
        underlineColorAndroid="transparent"
        onChangeText={this.onValueChange}
      />
    )
  }
}
export { Props as InputProps }
