import { ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react'
import React from 'react'
import { GitCommit, Twitter } from 'react-feather'
import loc from '../utils/localization'

export const SocialMediaLinks = (props: ButtonGroupProps) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton
      as="a"
      href={loc('footer_github')}
      aria-label="GitHub"
      icon={<GitCommit fontSize="20px" />}
    />
    <IconButton
      as="a"
      href={loc('footer_twitter')}
      aria-label="Twitter"
      icon={<Twitter fontSize="20px" />}
    />
  </ButtonGroup>
)
