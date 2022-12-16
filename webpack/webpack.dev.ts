import * as webpack from "webpack";
import { merge } from 'webpack-merge';
import baseConfig from './webpack.common';


const config = (): webpack.Configuration => {
  return merge(baseConfig(), {
    mode: "development",
    devServer: {
      inline: true,
      historyApiFallback: true,
      port: 4200,
    }
  });
};

export default config;


