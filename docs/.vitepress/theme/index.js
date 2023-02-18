import DefaultTheme from "vitepress/theme";
import "./custom.css";
import LinkCard from "./LinkCard.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("LinkCard", LinkCard);
  },
};

/* 
  颜色： https://ant.design/docs/spec/colors-cn
  插画：https://undraw.co/
*/
