import { SheetsRegistry, GenerateClassName } from "jss"
import {
  createMuiTheme,
  createGenerateClassName,
  Theme,
} from "@material-ui/core/styles"
import teal from "@material-ui/core/colors/teal"

const theme = createMuiTheme({
  palette: {
    type: "dark",
    secondary: teal,
    background: {
      default: "#252527",
      paper: "#534150",
    },
  },
  typography: {
    useNextVariants: true,
  },
})

export type PageContext = {
  theme: Theme
  sheetsManager: Map<any, any>
  sheetsRegistry: SheetsRegistry
  generateClassName: GenerateClassName<any>
}

function createPageContext(): PageContext {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  }
}

export default function getPageContext(): PageContext {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext()
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext()
  }

  return global.__INIT_MATERIAL_UI__
}
