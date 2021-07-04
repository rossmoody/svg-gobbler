import { Text, TextProps, Link } from '@chakra-ui/layout'
import * as React from 'react'

export const Copyright = (props: TextProps) => (
  <>
    <Text fontSize="sm" {...props}>
      SVG Gobbler is an open source initiative by{' '}
      <Link href="#" color="red">
        Ross Moody
      </Link>
      .
    </Text>
    <Text fontSize="sm" {...props}>
      If you find it helpful, please leave a review on the{' '}
      <Link href="#" color="red">
        Chrome Web Store
      </Link>{' '}
      or{' '}
      <Link href="#" color="red">
        Firefox Addon Marketplace
      </Link>
      .
    </Text>
  </>
)
