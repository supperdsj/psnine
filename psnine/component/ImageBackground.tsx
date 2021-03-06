import React from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'

import { FlatlistItemProp } from '../interface'

interface ExtendedProp extends FlatlistItemProp {
  style: any
  imageStyle: any
  imageRef: any
  blurRadis: number
  source: any
}

export default class ImageBackground extends React.Component<ExtendedProp> {
  render() {
    const { children, style, imageStyle, imageRef, blurRadis = 10, ...props } = this.props

    return (
      <View style={style}>
        <Image
          {...props}
          resizeMode={'cover'}
          resizeMethod={'resize'}
          blurRadius={blurRadis}
          style={[
            StyleSheet.absoluteFill,
            {
              // Temporary Workaround:
              // Current (imperfect yet) implementation of <Image> overwrites width and height styles
              // (which is not quite correct), and these styles conflict with explicitly set styles
              // of <ImageBackground> and with our internal layout model here.
              // So, we have to proxy/reapply these styles explicitly for actual <Image> component.
              // This workaround should be removed after implementing proper support of
              // intrinsic content size of the <Image>.
              width: style.width,
              height: style.height
            },
            imageStyle
          ]}
          ref={imageRef}
        />
        {children}
      </View>
    )
  }
}