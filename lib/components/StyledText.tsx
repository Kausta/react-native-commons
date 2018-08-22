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

import React, {SFC} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import {theme} from '../style';

interface Props extends TextProps {
  style?: TextStyle | TextStyle[];
}

const defaultProps = {
  style: {}
};

const RegularText: SFC<Props> = ({ style, ...rest }: Props) => (
  <Text {...rest} style={[style, { fontFamily: theme.fontFamily.regular }]} />
);
const LightText: SFC<Props> = ({ style, ...rest }: Props) => (
  <Text {...rest} style={[style, { fontFamily: theme.fontFamily.light }]} />
);
const BoldText: SFC<Props> = ({ style, ...rest }: Props) => (
  <Text {...rest} style={[style, { fontFamily: theme.fontFamily.bold }]} />
);
RegularText.defaultProps = defaultProps;
LightText.defaultProps = defaultProps;
BoldText.defaultProps = defaultProps;

export { RegularText, LightText, BoldText };