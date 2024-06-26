import { PaletteMode } from "@mui/material";

import { ContentWidth } from "src/@core/layouts/types";

type ThemeConfig = {
  mode: PaletteMode;
  DashboardName: string;
  routingLoader: boolean;
  disableRipple: boolean;
  navigationSize: number;
  menuTextTruncate: boolean;
  contentWidth: ContentWidth;
  responsiveFontSizes: boolean;
};

const themeConfig: ThemeConfig = {
  DashboardName: "Service Station",
  mode: "light",
  contentWidth: "boxed",

  routingLoader: true,

  menuTextTruncate: true,
  navigationSize: 260,

  responsiveFontSizes: true,
  disableRipple: false,
};

export default themeConfig;
