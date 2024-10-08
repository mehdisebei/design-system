const postcssFlexbugsFixes = require("postcss-flexbugs-fixes");
const postcssPresetEnv = require("postcss-preset-env");
const postcssNormalize = require("postcss-normalize");
const postcssSass = require("@csstools/postcss-sass");
const cssnano = require("cssnano");
const { cpSync, lstatSync } = require("fs");

module.exports = ({ ...ctx }) => {
  const prod = ctx.env === "production";

  return {
    parser: "postcss-scss",
    plugins: [
      postcssSass,
      postcssFlexbugsFixes,
      postcssPresetEnv({
        stage: 4,
      }),
      postcssNormalize,
      prod && cssnano,
      () => {
        cpSync("src/", "dist/", {
          recursive: true,
          filter(source) {
            const regex = /^.+(s?css)$/;
            return lstatSync(source).isDirectory() || regex.test(source);
          },
        });

        cpSync("../../common/glyphicons/", "dist/common/glyphicons/", {
          recursive: true,
        });

        cpSync("../../common/assets/", "dist/common/assets/", {
          recursive: true,
        });

        return {
          postcssPlugin: "Copy file",
        };
      },
    ].filter(Boolean),
  };
};
