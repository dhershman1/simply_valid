import {
	meetsCVN,
	meetsCVNAmex,
	meetsMinMax,
	meetsPassReq,
	meetsTreadDepth,
	meetsYearStandard
} from '../dist/simply_valid.cjs.js';
import test from 'tape';

test('Test meetsCVN', t => {
	t.ok(meetsCVN);
	t.end();
});

test('Test meetsCVNAmex', t => {
	t.ok(meetsCVNAmex);
	t.end();
});

test('Test meetsMinMax', t => {
	t.ok(meetsMinMax);
	t.end();
});

test('Test meetsPassReq', t => {
	t.ok(meetsPassReq);
	t.end();
});

test('Test meetsTreadDepth', t => {
	t.ok(meetsTreadDepth);
	t.end();
});

test('Test meetsYearStandard', t => {
	t.ok(meetsYearStandard);
	t.end();
});
