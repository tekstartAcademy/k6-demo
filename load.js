import http from 'k6/http';
import { sleep, check } from 'k6';

// stages:[.   stress test configuration
//     { duration: '30', target: 100 }, // ramp-up to 50 users
//     { duration: '30s', target: 1000 }, // hold 50 user
//     { duration: '2m', target: 0 } // ramp-down to 0 users
// ]


export const options = {
stages:[
    { duration: '2m', target: 50 }, // ramp-up to 50 users
    { duration: '5m', target: 50 }, // hold 50 user
    { duration: '2m', target: 0 } // ramp-down to 0 users
],

    summaryTrendStats: ['avg', 'p(95)', 'p(99)', 'min', 'med', 'max']
}

const payload = JSON.stringify({
  "username": "george.bluth@reqres.in",
  "email": "perf@test.om",
  "password": "nft123"
});

const params = {
headers: {
    'Content-Type': 'application/json',
     'x-api-key': 'reqres-free-v1'
  },
}

const sendRequest = () => {
    let res = http.post('https://reqres.in/api/register', payload, params);

    if (res.status !== 200) {
        console.error(`Request failed with status ${res.status}: ${res.body}`);
    }else {
        console.log(`Request succeeded with status ${res.status}`);
    }
    return res;
}

export default function () {
    let res = sendRequest();

    check(res, {
        'is status 200 ?': (r) => r.status === 200,
        'is response body not empty?': (r) => r.body.length > 0
    });

    sleep(1) //think-time between iteration
}
