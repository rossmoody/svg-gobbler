import { ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react'
import React from 'react'
import { GitHub, Twitter } from 'react-feather'
import loc from '../utils/localization'

export const SocialMediaLinks = (props: ButtonGroupProps) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton
      as="a"
      href={loc('footer_github')}
      aria-label="GitHub"
      icon={<GitHub size={20} />}
    />
    <IconButton
      as="a"
      href={loc('footer_twitter')}
      aria-label="Twitter"
      icon={<Twitter size={20} />}
    />
  </ButtonGroup>
)
