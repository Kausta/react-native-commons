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

import { autobind } from 'core-decorators'
import { action, computed, observable, ObservableMap } from 'mobx'
import { observer } from 'mobx-react/native'
import { Form as NBForm } from 'native-base'
import React from 'react'
import { KeyboardTypeOptions, View } from 'react-native'
import { IconInput } from './index'

interface FormItem {
  iconName: string
  placeholder: string
  type: string
  keyboardType?: KeyboardTypeOptions
  textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
  secureTextEntry?: boolean
}

interface FormEntries {
  [key: string]: string | null
}

type FormEntriesMap = ObservableMap<string, string | null>

interface Props {
  formItems: FormItem[]
  validate: (field: string, formItems: FormEntriesMap) => boolean | null
  submit: (entries: FormEntries) => void
  RenderButton: (onPress: () => void, isEnabled: boolean) => any
}

/**
 * Form class for creating small forms easily, can have a custom button,
 * inputs consist of {@link IconInput} classes
 */
@autobind
@observer
export default class Form extends React.Component<Props> {
  public readonly formItems = observable.map({})
  public readonly formItemsValidity = observable.map({})

  private readonly formItemRefs: {
    [key: string]: React.RefObject<IconInput>
  } = {}
  private readonly onSubmitEditing: Array<(() => void) | undefined>

  /**
   * Default constructor for Form
   * @param props React Props
   */
  constructor(props: Props) {
    super(props)
    this.populateFormItems()

    const { formItems } = this.props
    const len = formItems.length
    this.onSubmitEditing = formItems.map(
      (item, i) =>
        i === len - 1
          ? undefined
          : () => {
              const field = this.formItemRefs[formItems[i + 1].type].current
              if (!field) {
                return
              }
              field.input.focus()
            }
    )
  }

  /**
   * Populates form items from props
   */
  @action
  private populateFormItems = () => {
    const { formItems } = this.props
    for (const formItem of formItems) {
      const { type } = formItem
      this.formItems.set(type, null)
      this.formItemsValidity.set(type, null)
      this.formItemRefs[type] = React.createRef()
    }
  }

  /**
   * Text change handler for key, value format of IconInput
   * Automatically validates the input
   * @param key Key of the field
   * @param value New value
   */
  @action
  private onChangeText = (key: string, value: string) => {
    const { validate } = this.props

    this.formItems.set(key, value)
    this.formItemsValidity.set(key, validate(key, this.formItems))
  }

  /**
   * Renders each form item
   * @returns Form Item React Elements array for each item
   */
  private renderFormItems = () => {
    const { formItems } = this.props
    const len = formItems.length
    return formItems.map((item: FormItem, i: number) => {
      const { iconName, placeholder, type, keyboardType, textContentType, secureTextEntry } = item
      const isLast = i === len - 1
      return (
        <IconInput
          key={type}
          iconName={iconName}
          placeholder={placeholder}
          type={type}
          ref={this.formItemRefs[type]}
          onEdit={this.onChangeText}
          onSubmitEditing={this.onSubmitEditing[i]}
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

  /**
   * Returns whether the form can be submitted
   *
   * @remarks
   * This is a mobx computable, so automatically updates
   */
  @computed
  public get canSubmit() {
    let submittable = true
    this.formItemsValidity.forEach((value) => {
      submittable = submittable && !!value
    })
    return submittable
  }

  /**
   * The function that is called on form submit, requires {@link this.canSubmit}
   * Calls submit props
   */
  public onSubmit = () => {
    if (!this.canSubmit) {
      return
    }
    const { submit, formItems } = this.props
    const fields: FormEntries = {}
    formItems.forEach((value) => {
      const { type } = value
      fields[type] = this.formItems.get(type)
    })
    submit(fields)
  }

  public render() {
    const { RenderButton } = this.props
    return (
      <View>
        <NBForm>{this.renderFormItems()}</NBForm>
        <RenderButton onPress={this.onSubmit} isEnabled={this.canSubmit} />
      </View>
    )
  }
}

export { Props as FormProps, FormItem }
