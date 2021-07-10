import { Text, TextProps, Link } from '@chakra-ui/react'
import * as React from 'react'

export const Copyright = (props: TextProps) => (
  <>
    <Text fontSize="sm" {...props}>
      SVG Gobbler is an open source initiative by{' '}
      <Link href="https://rossmoody.com/" color="red">
        Ross Moody
      </Link>
      .
    </Text>
    <Text fontSize="sm" {...props}>
      If you find it helpful, please leave a review on the{' '}
      <Link
        href="https://chrome.google.com/webstore/detail/svg-gobbler/mpbmflcodadhgafbbakjeahpandgcbch?hl=en"
        color="red"
      >
        Chrome Web Store
      </Link>{' '}
      or{' '}
      <Link
        href="https://addons.mozilla.org/en-US/firefox/addon/svg-gobbler/"
        color="red"
      >
        Firefox Addon Marketplace
      </Link>
      .
    </Text>
  </>
)
