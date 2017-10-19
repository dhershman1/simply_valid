import buble from 'rollup-plugin-buble';

export default {
	entry: 'tests/test-imports.js',
	moduleName: 'simplyValid',
	format: 'umd',
	plugins: [
		buble()
	],
	dest: 'test-dist/test-imports.umd.js'
};
