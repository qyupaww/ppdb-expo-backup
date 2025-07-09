module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            "@/assets": "./assets",
            "@/components": "./components",
            "@/utils": "./utils",
            "@/api": "./api",
            "@/context": "./context",
            "@/hooks": "./hooks",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
  };
};
