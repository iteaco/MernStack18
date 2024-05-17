let path = require("path"), //path module of node framework
HtmlWebpackPlugin = require('html-webpack-plugin'), //this plugin is used to load the index html file on request

config = 
{
    //The default entry is src/index.js, so we can skip the entry section.

    output: 
    {
        path: path.join(__dirname, '/dist'), //the path for the output folder
        filename: 'bundle.js' //the output file name
    },
    // webpack 5 comes with devServer which loads in development mode
    devServer: 
    {
        port: 9090,
        historyApiFallback: true, //localhost:9090/user
	    watchFiles: ['src/**/*.html'] // path to your html files. To reload automatically when saving changes to html files.
    },
    // Rules of how webpack will take our files, compile & bundle them for the browser 
    module: 
    {
        rules: 
        [
            {
                test: /\.(js|jsx)$/, //test is to check all the files that are .js, .jsx
                exclude: /nodeModules/, //exclude from folder nodeModules
                use: {
                    loader: 'babel-loader' //The loader, also called module, to be used to convert .js and .jsx files specified above into Vanilla JavaScript. It has to be present in file package.json.
                    //The "babel-loader" will use the presets ("@babel/preset-env", "@babel/preset-react") specified in file .babelrc 
                }
            },
            {
                test: /\.css$/,
                exclude: /nodeModules/,
                use: ['style-loader', 'css-loader'] //The loaders "style-loader" & "css-loader" to be used for .css files. They have be be present in file package.json.
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                exclude: /nodeModules/,
                type: 'asset/resource',
                //we don't use any loader for this section
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })] //A request to the URL localhost:9090 will load this html file.
};

module.exports = config;
