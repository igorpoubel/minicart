import React, { FC } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { BackdropMode } from 'vtex.store-drawer'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { MaybeResponsiveValue } from 'vtex.responsive-values'
import { useCheckoutURL } from 'vtex.checkout-resources/Utils'

import MinicartIconButton from './components/MinicartIconButton'
import DrawerMode from './components/DrawerMode'
import { MinicartContextProvider, useMinicartState } from './MinicartContext'
import PopupMode from './components/Popup'
import useCartIdPixel from './modules/useCartIdPixel'

const CSS_HANDLES = ['minicartWrapperContainer', 'minicartContainer'] as const

interface MinicartProps {
  variation: MinicartVariationType
  openOnHover: boolean
  linkVariationUrl: string
  maxDrawerWidth: number | string
  drawerSlideDirection: SlideDirectionType
  quantityDisplay: MinicartIconButtonType
  showTotalizer: boolean
  iconProps?: MinicartIconProps
  backdropMode?: MaybeResponsiveValue<BackdropMode>
}

const Minicart: FC<MinicartProps> = ({
  children,
  backdropMode,
  linkVariationUrl,
  maxDrawerWidth = 400,
  quantityDisplay = 'not-empty',
  showTotalizer = false,
  iconProps,
  drawerSlideDirection = 'rightToLeft',
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { variation } = useMinicartState()
  const { url: checkoutUrl } = useCheckoutURL()

  if (variation === 'link') {
    return (
      <aside
        className={`${handles.minicartWrapperContainer} relative fr flex items-center`}
      >
        <div className={`${handles.minicartContainer} flex flex-column`}>
          <a href={linkVariationUrl || checkoutUrl}>
            <MinicartIconButton
              quantityDisplay={quantityDisplay}
              showTotalizer={showTotalizer}
              viewBox={iconProps?.viewBox}
            />
          </a>
        </div>
      </aside>
    )
  }

  return (
    <aside
      className={`${handles.minicartWrapperContainer} relative fr flex items-center`}
    >
      <div className={`${handles.minicartContainer} flex flex-column`}>
        {variation === 'drawer' ? (
          <DrawerMode
            backdropMode={backdropMode}
            maxDrawerWidth={maxDrawerWidth}
            drawerSlideDirection={drawerSlideDirection}
            quantityDisplay={quantityDisplay}
          >
            {children}
          </DrawerMode>
        ) : (
          <PopupMode
            quantityDisplay={quantityDisplay}
            iconButtonViewBox={iconProps?.viewBox}
          >
            {children}
          </PopupMode>
        )}
      </div>
    </aside>
  )
}

const CartIdPixel = () => {
  const { orderForm, loading }: OrderFormContext = useOrderForm()

  const orderFormId = !loading && orderForm ? orderForm.id : undefined
  useCartIdPixel(orderFormId)

  return null
}

const EnhancedMinicart = (props: MinicartProps) => (
  <MinicartContextProvider
    variation={props.variation}
    openOnHover={props.openOnHover}
    cartIconProps={props.iconProps}
  >
    <CartIdPixel />
    <Minicart {...props} />
  </MinicartContextProvider>
)

export default EnhancedMinicart
