import uglify from 'rollup-plugin-uglify';
import buble from 'rollup-plugin-buble';

export default {
	entry: 'index.js',
	moduleName: 'simplyValid',
	format: 'umd',
	plugins: [
		buble(),
		uglify()
	],
	dest: 'dist/simply_valid.umd.js'
};
