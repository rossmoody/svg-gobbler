import React from 'react'
import { Button, Grid, useColorModeValue, Tooltip } from '@chakra-ui/react'
import { FaExternalLinkAlt } from 'react-icons/fa'

function openSvgInNewTab(url: string) {
  chrome.tabs.create({ url })
}

function sendMessage(callback: any) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabArray) => {
    const currentTabId = tabArray[0].id!

    chrome.tabs.onUpdated.addListener(function listener(
      tab = currentTabId,
      changeInfo
    ) {
      if (changeInfo.status !== 'complete') return
      chrome.tabs.onUpdated.removeListener(listener)

      setTimeout(() => {
        chrome.tabs.sendMessage(
          tab,
          { message: 'start_gobbling' },
          ({ data }) => {
            callback(data, tab)
          }
        )
      }, 200)
    })
  })
}

function buildPage(data: any, prevTabId: number) {
  chrome.tabs.remove(prevTabId)

  const url = chrome.runtime.getURL(`index.html?id=${Math.random()}`)

  chrome.tabs.create({ url }, (tab) => {
    chrome.tabs.onUpdated.addListener(function listener(
      tabId = tab.id!,
      changeInfo
    ) {
      if (changeInfo.status !== 'complete') return
      chrome.tabs.onUpdated.removeListener(listener)

      chrome.tabs.sendMessage(tabId, { data })
    })
  })
}

function handleCorsTab(forwardingUrl: string) {
  openSvgInNewTab(forwardingUrl)
  sendMessage(buildPage)
}

const CardActionCors = ({ forwardingUrl }: { forwardingUrl: string }) => {
  return (
    <Grid
      position="absolute"
      templateColumns="1fr"
      top="12px"
      bottom={0}
      left={0}
      right={0}
      bg={useColorModeValue('white', 'gray.700')}
    >
      <Tooltip
        hasArrow
        borderRadius="md"
        padding={4}
        label="This SVG is protected by cross-origin requests and must be opened in a new tab to download."
      >
        <Button
          onClick={() => handleCorsTab(forwardingUrl)}
          rightIcon={<FaExternalLinkAlt />}
        >
          Open in new tab
        </Button>
      </Tooltip>
    </Grid>
  )
}

export default CardActionCors
