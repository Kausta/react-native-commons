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

import React from 'react'
import { StyleSheet } from 'react-native'
import { Input as NBInput } from 'native-base'

import theme from 'style'

type Props = {
  placeholder: string,
  type: string,
  onChangeText: (string, string) => void,
  style?: any
}
export default class Input extends React.Component<Props> {
  static defaultProps = {
    style: {}
  }

  constructor () {
    super()
    this.state = {}
  }

  get input () {
    return this.refs.input._root
  }

  onValueChange = value => {
    const { type, onChangeText } = this.props
    onChangeText(type, value)
  }

  render () {
    // OnChangeText and Type are important here so that they are not passed to NBInput
    const { placeholder, type, onChangeText, style, ...props } = this.props
    return (
      <NBInput
        {...props}
        ref='input'
        autoCapitalize='none'
        autoCorrect={false}
        style={[
          {
            height: 45,
            fontSize: 16,
            fontFamily: theme.fontFamily.light
          },
          style
        ]}
        placeholder={placeholder}
        placeholderTextColor='#a0a0a0'
        underlineColorAndroid='transparent'
        onChangeText={this.onValueChange}
      />
    )
  }
}
