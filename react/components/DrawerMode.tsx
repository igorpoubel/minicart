import React, { FC } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Drawer, BackdropMode } from 'vtex.store-drawer'
import { MaybeResponsiveValue } from 'vtex.responsive-values'

import MinicartIconButton from './MinicartIconButton'

const DRAWER_CLOSE_ICON_HEIGHT = 58
const CSS_HANLDES = ['minicartSideBarContentWrapper']

interface Props {
  maxDrawerWidth: number | string
  drawerSlideDirection: SlideDirectionType
  quantityDisplay: 'always' | 'never' | 'not-empty'
  backdropMode?: MaybeResponsiveValue<BackdropMode>
}

const DrawerMode: FC<Props> = ({
  children,
  maxDrawerWidth,
  quantityDisplay,
  drawerSlideDirection,
  backdropMode = 'visible',
}) => {
  const handles = useCssHandles(CSS_HANLDES)
  return (
    <Drawer
      maxWidth={maxDrawerWidth}
      backdropMode={backdropMode}
      slideDirection={drawerSlideDirection}
      customIcon={<MinicartIconButton quantityDisplay={quantityDisplay} />}
    >
      <div
        className={`${handles.minicartSideBarContentWrapper} flex flex-column w-100 h-100`}
        style={{
          height: window.innerHeight - DRAWER_CLOSE_ICON_HEIGHT,
        }}
      >
        {children}
      </div>
    </Drawer>
  )
}

export default DrawerMode
