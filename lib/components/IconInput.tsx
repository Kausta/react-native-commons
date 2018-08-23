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
import { Icon, Item } from 'native-base'
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Input, InputProps } from './index'

interface Props extends InputProps {
  iconName: string
  placeholder: string
  type: string
  onEdit: (key: string, value: string) => void
  isLast?: boolean
  inputStyle?: any
  isSuccessful?: boolean | null
}

/**
 * Input with Icon on left, can have green or red overlay with isSuccessful,
 * and automatically manages return key type by isLast
 */
export default class IconInput extends React.Component<Props> {
  public static defaultProps = {
    isLast: false,
    isSuccessful: null,
    inputStyle: {},
  }

  private readonly _input: React.RefObject<Input> = React.createRef()

  /**
   * Ref to internal text input field
   */
  public get input(): TextInput {
    return (this._input.current as Input).input
  }

  public render() {
    const { iconName, isLast, isSuccessful, placeholder, type, onChangeText, inputStyle, ...props } = this.props
    const returnKeyType = isLast ? 'done' : 'next'
    const success = isSuccessful !== null && isSuccessful
    const error = isSuccessful !== null && !isSuccessful
    return (
      <Item style={styles.item} success={success} error={error}>
        <Icon active={true} name={iconName} style={styles.icon} />
        <Input
          {...props}
          ref={this._input}
          returnKeyType={returnKeyType}
          blurOnSubmit={isLast}
          placeholder={placeholder}
          type={type}
          onChangeText={onChangeText}
          style={inputStyle}
        />
      </Item>
    )
  }
}
export { Props as IconInputProps }
const styles = StyleSheet.create({
  item: {
    marginLeft: 4,
    marginRight: 4,
  },
  icon: {
    width: 30,
    textAlign: 'center',
  },
})
