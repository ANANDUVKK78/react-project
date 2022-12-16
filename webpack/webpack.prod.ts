import * as webpack from "webpack";
import { merge } from 'webpack-merge';
import baseConfig from './webpack.common';


const config = (): webpack.Configuration => {
  return merge(baseConfig(), {
    mode: "production"
  });
};

export default config;
