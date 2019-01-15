import fs from 'fs';
import path from 'path';
import minimatch from 'minimatch';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

const ROOT_RESOLVE = path.resolve();

const PACKAGES_RESOLVE = path.resolve('packages');

const ALL_PACKAGES = '*';

export const INCLUDES = process.env.PACKAGES ? process.env.PACKAGES.split(/\s*,\s*/) : [];

const config = {
  input: path.resolve(ROOT_RESOLVE, 'src', 'index.js'),
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  external: [
    '@psychobolt/react-regl',
    'react',
    'react-dom',
    'react-is',
    'regl',
    'multi-regl',
    'resl',
    'styled-components',
  ],
};

export const configs = Object.entries(
  (fs.existsSync(PACKAGES_RESOLVE)
    ? fs.readdirSync(PACKAGES_RESOLVE)
    : []
  ).reduce((collection, name) => {
    const pathname = path.resolve(PACKAGES_RESOLVE, name);
    if (fs.statSync(pathname).isDirectory()
      && INCLUDES.some(pattern => minimatch(pathname, `${PACKAGES_RESOLVE}/${pattern}`))) {
      return {
        ...collection,
        [pathname]: {
          ...config,
          input: path.resolve(PACKAGES_RESOLVE, name, 'src', 'index.js'),
        },
      };
    }
    return collection;
  }, {}),
);

if ((INCLUDES.length === 0 || INCLUDES.includes(ALL_PACKAGES))
    && fs.statSync(config.input).isFile()) {
  configs.push([ROOT_RESOLVE, config]);
}

export default config;
