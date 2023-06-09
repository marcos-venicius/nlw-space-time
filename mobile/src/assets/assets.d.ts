declare module "*.png";

declare module "*.svg" {
  import React from "raect";

  import { SvgProps } from "react-native-svg";

  const content: React.FC<SvgProps>;

  export default content;
}
