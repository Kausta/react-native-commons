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

import {
  NavigationActions,
  StackActions,
  NavigationParams,
  NavigationRoute,
  NavigationProp,
  NavigationState,
} from 'react-navigation'

interface StateType {
  nav: NavigationState | null
}

type NavigatorType = NavigationProp<StateType>

let navigator: NavigatorType | null = null

const setTopLevelNavigator = (navigatorRef: NavigatorType) => {
  navigator = navigatorRef
}

const getTopLevelNavigator = (): NavigatorType | null => {
  return navigator
}

const navigate = (routeName: string, params?: NavigationParams) => {
  if (!navigator) {
    return
  }
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

const navigateDeep = (actions: Array<{ routeName: string; params?: NavigationParams }>) => {
  if (!navigator) {
    return
  }
  navigator.dispatch(
    actions.reduceRight(
      (previousAction, action): any =>
        NavigationActions.navigate({
          routeName: action.routeName,
          params: action.params,
          action: previousAction,
        }),
      undefined
    )
  )
}

const back = () => {
  if (!navigator) {
    return
  }
  navigator.dispatch(NavigationActions.back())
}

const resetToSingle = (routeName: string, params?: NavigationParams) => {
  if (!navigator) {
    return
  }
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params })],
    })
  )
}

const reset = (index: number, actions: Array<{ routeName: string; params?: NavigationParams }>) => {
  if (!navigator) {
    return
  }
  navigator.dispatch(
    StackActions.reset({
      index,
      actions: actions.map((action) => NavigationActions.navigate(action)),
    })
  )
}

const getCurrentRoute = (): NavigationRoute | null => {
  if (!navigator || !navigator.state.nav) {
    return null
  }

  return navigator.state.nav.routes[navigator.state.nav.index] || null
}

export default {
  setTopLevelNavigator,
  getTopLevelNavigator,
  navigate,
  navigateDeep,
  back,
  resetToSingle,
  reset,
  getCurrentRoute,
}
