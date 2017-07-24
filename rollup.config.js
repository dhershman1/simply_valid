import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

export default {
	entry: 'src/index.js',
	moduleName: 'simplyValid',
	format: 'umd',
	plugins: [
		buble(),
		uglify()
	],
	dest: 'dist/simply_valid.umd.js'
};
