import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  // Vai definir os padrões de tipagem de quando eu importar o styled-components.
  export interface DefaultTheme extends ThemeType {}
}
