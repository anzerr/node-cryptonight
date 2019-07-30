
const cp = require('child_process');

const base = require('path').resolve(__dirname).replace(/\\/g, '/');

const run = (test) => {
	return new Promise((resolve) => cp.fork(`${base}/${test}`).on('error', console.log).on('exit', resolve));
};

let test = [
	'tests/compare_both.js',
	'tests/test.js',
	'tests/test_async.js',
	'tests/test_async-wow.js',
	'tests/test_async_light.js',
	'tests/test_async_heavy.js',
	'tests/test_async_pico.js',
	'tests/test_sync-1.js',
	'tests/test_sync-2.js',
	'tests/test_sync-r.js',
	'tests/test_sync-half.js',
	'tests/test_sync-wow.js',
	'tests/test_sync-xtl.js',
	'tests/test_sync-msr.js',
	'tests/test_sync-xao.js',
	'tests/test_sync-rto.js',
	'tests/test_sync-gpu.js',
	'tests/test_sync-rwz.js',
	'tests/test_sync-zls.js',
	'tests/test_sync-double.js',
	'tests/test_sync.js',
	'tests/test_sync_light.js',
	'tests/test_sync_light-1.js',
	'tests/test_sync_heavy.js',
	'tests/test_sync_heavy-xhv.js',
	'tests/test_sync_heavy-tube.js',
	'tests/test_sync_pico.js',
	'tests/test_perf.js',
	'tests/test_perf_light.js',
	'tests/test_perf_heavy.js',
	'tests/test_perf_gpu.js',
	'tests/test_perf_wow.js',
	'tests/test_perf_pico.js',
	'tests/test_perf_rwz.js',
	'tests/test_perf_zls.js',
	'tests/test_perf_double.js'
];

let p = Promise.resolve();
for (let i in test) {
	((t) => {
		p = p.then(() => run(t));
	})(test[i]);
}
p.then(() => console.log('done'));
