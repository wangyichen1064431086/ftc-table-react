import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import minify from 'rollup-plugin-minify-es';
import cssdiscardcomments from 'postcss-discard-comments';

export default {
  input: './js/index.js',
  output:[
    {
      name:'FtcTable',
      sourcemap: true,
      globals:{
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types':'PropTypes',
        'classnames':'classnames',
        'react-css-modules':'CSSModules',
        'react-immutable-render-mixin':'immutableRenderMixin',
        'immutable':'immutable'
      },
      file: './build/index.js',
      format: 'umd'
    },
    {
      sourcemap: true,
      file: './build/index.es.js',
      format: 'es'
    },
  ],

  plugins: [
    postcss({
      modules: true,
      plugins: [
        cssdiscardcomments()
      ]
    }),
    babel({
      exclude: 'node_modules/**'
    }),

    resolve({
      jsnext: true,
      main:true
    }),
    commonjs({
      namedExports: {
        'node_modules/immutable/dist/immutable.js':['Seq']
      }
    }),
    minify({
      compress: {
        drop_console:true
      }
    })
  ],

  external: ['react', 'react-dom','prop-types','classnames','react-css-modules', 'react-immutable-render-mixin','immutable']
  ,

  
}