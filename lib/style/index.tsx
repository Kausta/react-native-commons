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

interface FontProps {
  light: string
  medium: string
  regular: string
  bold: string
}
export interface ThemeManagerSettings {
  fontFamily: FontProps
}

class ThemeManager {
  private _settings: ThemeManagerSettings | null = null

  /**
   * Current settings, require init to be called first
   */
  public get settings(): ThemeManagerSettings {
    return this._settings as ThemeManagerSettings
  }

  /**
   * Initialize theme manager with given settings, must be called before anything else
   * @param settings Theme Manager Settings
   */
  public init(settings: ThemeManagerSettings): void {
    this._settings = settings
  }

  get fontFamily(): FontProps {
    return this.settings.fontFamily
  }
}

const themeManagerInstance = new ThemeManager()
export { themeManagerInstance as theme }
