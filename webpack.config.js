const path = require('path'); // Common js

module.exports = {
  mode: 'development', // Com essa opção de development ele é gerado um pouco mais rapido e não possui encurtamente de código
  entry: './frontend/main.js',
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'), // Essa parte seria onde queremos que as aplicações em Js (bundle) sejam enviadas, colocamos o caminho a ser seguido para o destino final, o "resolve" nos permite colocar apenas nomes dos arquivos
    filename: 'bundle.js' // Nome do arquivo que iremos buscar para enviar o conteudo, a parte de cima foi o caminha das PASTAS
  },
  module: {
    rules: [{
      exclude: /node_modules/, // Excluimos esse arquivo da analise do webpack não necessáriamente o arquivo ( pasta ), apenas retiramos da fila de analise para não pesar nosso programa 
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  devtool: 'source-map' // Faz um mapeamento do erro caso ocorra do arquivo original, pois apenas lembrando que o bundle é a junção de vários arquivos convertidos.
};