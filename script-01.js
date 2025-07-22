import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 10,    // virtual users
    duration: '10s', // total test time
    summaryTrendStats: ['avg', 'p(95)', 'p(99)', 'min', 'med', 'max']
}

export default function () {
    let res = http.get('https://test.k6.io')

    check(res, {
        'is status 200 ?': (r) => r.status === 201
    })

    // sleep(1) //think-time between iteration
}