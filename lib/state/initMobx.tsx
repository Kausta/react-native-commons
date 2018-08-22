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

import { configure, spy } from 'mobx'
export interface StoresType {
  [key: string]: new () => {}
}
export interface StoreInstancesType {
  [key: string]: {}
}

/**
 * Initializes MobX with enforced actions, action (or everything) listeners, and initialized stores
 * @param stores Constructor of each class
 * @param logEverything Whether to log everything or just actions
 * @returns Initialized stores
 */
const initMobx = (stores: StoresType, logEverything: boolean = false): StoreInstancesType => {
  // Enforce actions for better manageability
  configure({
    enforceActions: true,
  })

  // Register development logger
  spy((event) => {
    if (event.type === 'action') {
      if (event.name !== 'onChangeText') {
        // No logging on change text
        console.log(`${event.name} with args: ${event.arguments}`)
      }
    } else if (logEverything) {
      console.log(event.toString())
    }
  })

  // Create store objects from classes
  // We want to leave access to stores for typing purposes
  const storeInstances: StoreInstancesType = {}
  for (const key of Object.keys(stores)) {
    const Store = stores[key]
    storeInstances[key] = new Store()
  }
  return storeInstances
}
export default initMobx
