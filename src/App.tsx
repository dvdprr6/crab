import React from 'react'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as eva from '@eva-design/eva'
import { Stack } from '@crab-components'
import { Provider } from 'react-redux'
import { store } from '@crab-reducers'

const theme1 = {
  "color-primary-100": "#FEF0E3",
  "color-primary-200": "#FDDEC8",
  "color-primary-300": "#F9C5AC",
  "color-primary-400": "#F3AD95",
  "color-primary-500": "#eb8872",
  "color-primary-600": "#CA5F53",
  "color-primary-700": "#A93C39",
  "color-primary-800": "#882428",
  "color-primary-900": "#701520",

  "color-success-100": "#EBF0F4",
  "color-success-200": "#D9E2EA",
  "color-success-300": "#ADB7C2",
  "color-success-400": "#737B86",
  "color-success-500": "#2C3036",
  "color-success-600": "#20252E",
  "color-success-700": "#161B26",
  "color-success-800": "#0E121F",
  "color-success-900": "#080C19",

  "color-info-100": "#FDE8DC",
  "color-info-200": "#FBCBB9",
  "color-info-300": "#F3A694",
  "color-info-400": "#E78276",
  "color-info-500": "#d84e4b",
  "color-info-600": "#B9363F",
  "color-info-700": "#9B2537",
  "color-info-800": "#7D172F",
  "color-info-900": "#670E2B",
  "color-warning-100": "#F8FAF7",
  "color-warning-200": "#F1F5F0",
  "color-warning-300": "#DBE1DA",
  "color-warning-400": "#BCC3BC",
  "color-warning-500": "#949c94",
  "color-warning-600": "#6C866E",
  "color-warning-700": "#4A7051",
  "color-warning-800": "#2F5A3A",
  "color-warning-900": "#1C4A2C",
  "color-danger-100": "#F7F7FA",
  "color-danger-200": "#F0F0F5",
  "color-danger-300": "#DADAE1",
  "color-danger-400": "#BCBCC3",
  "color-danger-500": "#94949c",
  "color-danger-600": "#6C6C86",
  "color-danger-700": "#4A4A70",
  "color-danger-800": "#2F2F5A",
  "color-danger-900": "#1C1C4A",

  // Soft Darker theme
  'color-basic-100': '#FFFFFF',
  'color-basic-200': '#F5F5F5',
  'color-basic-300': '#F5F5F5',
  'color-basic-400': '#D4D4D4',
  'color-basic-500': '#B3B3B3',
  'color-basic-600': '#808080',
  'color-basic-700': '#4A4A4A',
  'color-basic-800': '#383838',
  'color-basic-900': '#292929',
  'color-basic-1000': '#1F1F1F',
  'color-basic-1100': '#141414',
  'color-basic-transparent-100': 'rgba(128, 128, 128, 0.08)',
  'color-basic-transparent-200': 'rgba(128, 128, 128, 0.16)',
  'color-basic-transparent-300': 'rgba(128, 128, 128, 0.24)',
  'color-basic-transparent-400': 'rgba(128, 128, 128, 0.32)',
  'color-basic-transparent-500': 'rgba(128, 128, 128, 0.4)',
  'color-basic-transparent-600': 'rgba(128, 128, 128, 0.48)'
}

const theme2 = {
  'color-primary-100': '#FFECD2',
  'color-primary-200': '#FFD3A6',
  'color-primary-300': '#FFB579',
  'color-primary-400': '#FF9758',
  'color-primary-500': '#FF6721',
  'color-primary-600': '#DB4818',
  'color-primary-700': '#B72F10',
  'color-primary-800': '#931A0A',
  'color-primary-900': '#7A0C06',
  'color-primary-transparent-100': 'rgba(255, 103, 33, 0.08)',
  'color-primary-transparent-200': 'rgba(255, 103, 33, 0.16)',
  'color-primary-transparent-300': 'rgba(255, 103, 33, 0.24)',
  'color-primary-transparent-400': 'rgba(255, 103, 33, 0.32)',
  'color-primary-transparent-500': 'rgba(255, 103, 33, 0.4)',
  'color-primary-transparent-600': 'rgba(255, 103, 33, 0.48)',
  'color-success-100': '#F2FDDE',
  'color-success-200': '#E2FCBD',
  'color-success-300': '#CCF79B',
  'color-success-400': '#B4EF80',
  'color-success-500': '#92E557',
  'color-success-600': '#6FC43F',
  'color-success-700': '#50A42B',
  'color-success-800': '#35841B',
  'color-success-900': '#226D10',
  'color-success-transparent-100': 'rgba(146, 229, 87, 0.08)',
  'color-success-transparent-200': 'rgba(146, 229, 87, 0.16)',
  'color-success-transparent-300': 'rgba(146, 229, 87, 0.24)',
  'color-success-transparent-400': 'rgba(146, 229, 87, 0.32)',
  'color-success-transparent-500': 'rgba(146, 229, 87, 0.4)',
  'color-success-transparent-600': 'rgba(146, 229, 87, 0.48)',
  'color-info-100': '#FFECD2',
  'color-info-200': '#FFD3A6',
  'color-info-300': '#FFB579',
  'color-info-400': '#FF9758',
  'color-info-500': '#FF6721',
  'color-info-600': '#DB4818',
  'color-info-700': '#B72F10',
  'color-info-800': '#931A0A',
  'color-info-900': '#7A0C06',
  'color-info-transparent-100': 'rgba(255, 103, 33, 0.08)',
  'color-info-transparent-200': 'rgba(255, 103, 33, 0.16)',
  'color-info-transparent-300': 'rgba(255, 103, 33, 0.24)',
  'color-info-transparent-400': 'rgba(255, 103, 33, 0.32)',
  'color-info-transparent-500': 'rgba(255, 103, 33, 0.4)',
  'color-info-transparent-600': 'rgba(255, 103, 33, 0.48)',
  'color-warning-100': '#FFF9D7',
  'color-warning-200': '#FFF2AF',
  'color-warning-300': '#FFE887',
  'color-warning-400': '#FFDF69',
  'color-warning-500': '#FFD038',
  'color-warning-600': '#DBAC28',
  'color-warning-700': '#B78B1C',
  'color-warning-800': '#936B11',
  'color-warning-900': '#7A550A',
  'color-warning-transparent-100': 'rgba(255, 208, 56, 0.08)',
  'color-warning-transparent-200': 'rgba(255, 208, 56, 0.16)',
  'color-warning-transparent-300': 'rgba(255, 208, 56, 0.24)',
  'color-warning-transparent-400': 'rgba(255, 208, 56, 0.32)',
  'color-warning-transparent-500': 'rgba(255, 208, 56, 0.4)',
  'color-warning-transparent-600': 'rgba(255, 208, 56, 0.48)',
  'color-danger-100': '#FEE3DE',
  'color-danger-200': '#FEC0BE',
  'color-danger-300': '#FE9DA3',
  'color-danger-400': '#FD8597',
  'color-danger-500': '#FC5D85',
  'color-danger-600': '#D84377',
  'color-danger-700': '#B52E6A',
  'color-danger-800': '#921D5C',
  'color-danger-900': '#781153',
  'color-danger-transparent-100': 'rgba(252, 93, 133, 0.08)',
  'color-danger-transparent-200': 'rgba(252, 93, 133, 0.16)',
  'color-danger-transparent-300': 'rgba(252, 93, 133, 0.24)',
  'color-danger-transparent-400': 'rgba(252, 93, 133, 0.32)',
  'color-danger-transparent-500': 'rgba(252, 93, 133, 0.4)',
  'color-danger-transparent-600': 'rgba(252, 93, 133, 0.48)',

  // Soft Darker theme
  'color-basic-100': '#FFFFFF',
  'color-basic-200': '#F5F5F5',
  'color-basic-300': '#F5F5F5',
  'color-basic-400': '#D4D4D4',
  'color-basic-500': '#B3B3B3',
  'color-basic-600': '#808080',
  'color-basic-700': '#4A4A4A',
  'color-basic-800': '#383838',
  'color-basic-900': '#292929',
  'color-basic-1000': '#1F1F1F',
  'color-basic-1100': '#141414',
  'color-basic-transparent-100': 'rgba(128, 128, 128, 0.08)',
  'color-basic-transparent-200': 'rgba(128, 128, 128, 0.16)',
  'color-basic-transparent-300': 'rgba(128, 128, 128, 0.24)',
  'color-basic-transparent-400': 'rgba(128, 128, 128, 0.32)',
  'color-basic-transparent-500': 'rgba(128, 128, 128, 0.4)',
  'color-basic-transparent-600': 'rgba(128, 128, 128, 0.48)'
}

// REFERENCE: https://colors.eva.design/?utm_campaign=eva_colors%20-%20home%20-%20kitten_docs&utm_source=ui_kitten&utm_medium=referral&utm_content=branding_article_link
// REFERENCE: https://uiblogger.medium.com/best-dark-mode-color-palettes-288b1731e0ac

const App = () => {

  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme2}}>
        <Stack />
      </ApplicationProvider>
    </Provider>
  )
}

export default App
