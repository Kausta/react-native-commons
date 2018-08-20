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
import { View } from 'react-native'
import { autobind } from 'core-decorators'
import { action, computed, observable } from 'mobx'
import { observer } from 'mobx-react/native'
import { Form as NBForm } from 'native-base'
import { IconInput } from './index'

type FormItem = {
  iconName: string,
  placeholder: string,
  type: string,
  keyboardType?: string,
  textContentType?: string,
  secureTextEntry?: boolean
}
type FormEntries = {
  [key]: ?string
}
type FormValidityEntries = {
  [key]: ?boolean
}
type Props = {
  formItems: FormItem[],
  validate: (string, FormEntries) => ?boolean,
  submit: FormEntries => void,
  RenderButton: (onPress: () => void, isEnabled: boolean) => any
}

@autobind
@observer
export default class Form extends React.Component<Props> {
  formItems = observable.map({})
  formItemsValidity = observable.map({})

  constructor (props) {
    super(props)
    this.populateFormItems()

    const { formItems } = this.props
    const len = formItems.length
    this.onSubmitEdittings = formItems.map(
      (item, i) =>
        i === len - 1
          ? null
          : () => {
            this.refs[formItems[i + 1].type].input.focus()
          }
    )
  }

  @action
  populateFormItems = () => {
    const { formItems } = this.props
    for (let i = 0; i < formItems.length; i++) {
      const formItem = formItems[i]
      const { type } = formItem
      this.formItems.set(type, null)
      this.formItemsValidity.set(type, null)
    }
  }

  @computed
  get canSubmit () {
    let submittable = true
    this.formItemsValidity.forEach(value => {
      submittable = submittable && !!value
    })
    return submittable
  }

  @action
  onChangeText = (key, value) => {
    const { validate } = this.props

    this.formItems.set(key, value)
    this.formItemsValidity.set(key, validate(key, this.formItems))
  }

  onSubmit = () => {
    if (!this.canSubmit) {
      return
    }
    const { submit, formItems } = this.props
    let fields = {}
    formItems.forEach(value => {
      const { type } = value
      fields[type] = this.formItems.get(type)
    })
    submit(fields)
  }

  renderFormItems = () => {
    const { formItems } = this.props
    const len = formItems.length
    return formItems.map((item: FormItem, i: number) => {
      const {
        iconName,
        placeholder,
        type,
        keyboardType = null,
        textContentType = null,
        secureTextEntry = null
      } = item
      const isLast = i === len - 1
      return (
        <IconInput
          key={type}
          iconName={iconName}
          placeholder={placeholder}
          type={type}
          ref={type}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitEdittings[i]}
          value={this.formItems.get(type)}
          isSuccessful={this.formItemsValidity.get(type)}
          keyboardType={keyboardType}
          textContentType={textContentType}
          secureTextEntry={secureTextEntry}
          isLast={isLast}
        />
      )
    })
  }

  render () {
    const { RenderButton } = this.props
    return (
      <View>
        <NBForm>{this.renderFormItems()}</NBForm>
        <RenderButton onPress={this.onSubmit} isEnabled={this.canSubmit} />
      </View>
    )
  }
}
