import {init} from "xpresser";

const $ = init({
    name: "Test Plugin",
    env: "development",
    paths: {base: __dirname, backend: __dirname}
})

$.initializeTypescript(__filename);

$.on.boot((next) => {

    $.router.get('/', 'AppController@index');
    $.router.post('/', 'AppController@login');

    next();
})

$.boot();