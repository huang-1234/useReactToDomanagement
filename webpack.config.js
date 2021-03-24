/* const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/; // 新增less配置
const lessModuleRegex = /\.module\.less$/; // 新增less配置，这个其实不配置也行
//
{
    test: sassModuleRegex,
    use: getStyleLoaders({
            importLoaders: 2,
            sourceMap: isEnvProduction && shouldUseSourceMap,
            modules: true,
            getLocalIdent: getCSSModuleLocalIdent
        },
        "sass-loader"
    )
}, 
{
    test: lessRegex,
    exclude: lessModuleRegex,
    use: getStyleLoaders({
            importLoaders: 1,// 值是1
            modules: true, // 增加这个可以通过模块方式来访问css
            sourceMap: isEnvProduction && shouldUseSourceMap
        },
        "less-loader"
    ),
    sideEffects: true
}, 
// 这个测试删了也不影响
{
    test: lessModuleRegex,
    use: getStyleLoaders({
            importLoaders: 1,
            sourceMap: isEnvProduction && shouldUseSourceMap,
            modules: true,
            getLocalIdent: getCSSModuleLocalIdent
        },
        "less-loader"
    )
},
// "file" loader makes sure those assets get served by WebpackDevServer. */