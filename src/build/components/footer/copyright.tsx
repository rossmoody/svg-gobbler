import React from 'react'
import { Text, TextProps, Link } from '@chakra-ui/react'

import loc from '../utils/localization'

export const Copyright = (props: TextProps) => (
  <>
    <Text fontSize="sm" {...props}>
      {loc('footer_title')}
      <Link href={loc('footer_portfolio')} color="red">
        {loc('footer_titleName')}
      </Link>
      .
    </Text>
    <Text fontSize="sm" {...props}>
      {loc('footer_desc')}
      <Link href={loc('footer_chromeLink')} color="red">
        {loc('footer_chrome')}
      </Link>
      {loc('footer_or')}
      <Link href={loc('footer_firefoxLink')} color="red">
        {loc('footer_firefox')}
      </Link>
      .
    </Text>
  </>
)
