import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const extensions = ['.ts', '.tsx'];

const name = 'ReactDocumentAttributes';

export default {
  input: './src/index.ts',
  external: ['react'],
  plugins: [
    resolve({ extensions }),
    babel({ extensions, include: ['src/**/*'] }),
  ],

  output: [
    {
      file: pkg.module,
      format: 'es',
    },
    {
      file: pkg.main,
      format: 'umd',
      name,
      globals: {
        react: 'React',
      },
    },
  ],
};
