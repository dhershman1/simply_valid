import buble from 'rollup-plugin-buble';

export default {
	entry: 'src/index.js',
	moduleName: 'simplyValid',
	format: 'cjs',
	plugins: [
		buble()
	],
	dest: 'dist/simply_valid.cjs.js'
};
