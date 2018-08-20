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
import { Icon, Item } from 'native-base'
import { Input } from './index'

type Props = {
  iconName: string,
  placeholder: string,
  type: string,
  onChangeText: (string, string) => void,
  isLast?: boolean,
  inputStyle?: any,
  isSuccessful?: ?boolean // true, false or null
}
export default class IconInput extends React.Component<Props> {
  static defaultProps = {
    isLast: false,
    isSuccessful: null,
    inputStyle: {}
  }

  get input () {
    return this.refs.input.input
  }

  render () {
    const {
      iconName,
      isLast,
      isSuccessful,
      placeholder,
      type,
      onChangeText,
      inputStyle,
      ...props
    } = this.props
    const returnKeyType = isLast ? 'done' : 'next'
    const success = isSuccessful != null && isSuccessful
    const error = isSuccessful != null && !isSuccessful
    return (
      <Item style={styles.item} success={success} error={error}>
        <Icon active name={iconName} style={styles.icon} />
        <Input
          {...props}
          ref='input'
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

const styles = StyleSheet.create({
  item: {
    marginLeft: 4,
    marginRight: 4
  },
  icon: {
    width: 30,
    textAlign: 'center'
  }
})
