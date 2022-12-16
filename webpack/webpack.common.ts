import webpack from "webpack";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import Dotenv from 'dotenv-webpack';

const baseConfig = (): webpack.Configuration => {
    return ({
        entry: "./src/index.tsx",
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".scss", ".css"],
            plugins: [new TsconfigPathsPlugin()],
            modules: [path.resolve(__dirname, "../src"), "../node_modules"],
        },
        output: {
            path: path.join(__dirname, "/bundles"),
            publicPath: '/',
            filename: "build.js"
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [{
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "emp-[local]"
                            },
                        }
                    }, {
                        loader: "sass-loader"
                    }]

                },
                
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true
                    },

                    exclude: /dist/
                },

            ]
        },



        plugins: [
            new Dotenv(),

            new HtmlWebpackPlugin({
                template: "./src/index.html"
            }),


            new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: "./src/**/*.{ts,tsx,js,jsx}"
                }
            })
        ]
    })

};

export default baseConfig;

