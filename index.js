const button = document.querySelector('button');


//-----##1 EXAMPLE----- - clicked

// Rx.Observable.fromEvent(button,'click')
//     .subscribe(()=>console.log('Clicked!'));

//-----##2 EXAMPLE----- - count clicks

// Rx.Observable.fromEvent(button, 'click')
//     .scan(count => count + 1, 5)
//     .subscribe(count=>console.log(`Clicked ${count} times`) );

//-----##3 EXAMPLE----- - only one click per second 

// Rx.Observable.fromEvent(button, 'click')
//     .throttleTime(1000)
//     .scan(count => count + 1, 0)
//     .subscribe(count => console.log(`Clicked ${count} times`));

//-----##4 EXAMPLE----- - mouse position

// Rx.Observable.fromEvent(button, 'click')
//     .throttleTime(1000)
//     .map(event=>event.clientX)
//     .scan((count,clientX) => count + clientX, 0)
//     .subscribe(count => console.log(count));

//-----##5 EXAMPLE----- - order of logs

// const observable = Rx.Observable.create((observer)=>{
//     observer.next(1);
//     observer.next(2);
//     observer.next(3);
//     setTimeout(()=>{
//         observer.next(4);
//         observer.complete();
//     },1000);
// })

// console.log('just before subscribe');
// observable.subscribe({
//     next: x => console.log('got value: ' + x),
//     error: err => console.error('something wrong occurred: ' + err),
//     complete: () => console.log('done'),
// });
// console.log('just after subscribe');

//-----##6 EXAMPLE----- - Observable return multiple values

// const foo = Rx.Observable.create((observer) => {
//     console.log('Hello');
//     observer.next(42);
// })

// foo.subscribe(x => console.log(x));
// foo.subscribe(y => console.log(y));

/*

FROM PROMISE

const myPromise = new Promise((resolve, reject)=>{
    console.log('promise was created');
    setTimeout(() => {
        resolve('Hello from promise');
    }, 3000)
});

const source = Rx.Observable.fromPromise(myPromise)
    .subscribe(x => console.log(x))

*/



//-----##7 EXAMPLE----- - Return multiple values synchronously

// const foo = Rx.Observable.create((observer) => {
//     console.log('Hello');
//     observer.next(42);
//     observer.next(100);
//     observer.next(200);
// })

// console.log('before');
// foo.subscribe(x => console.log(x));
// console.log('after');

//-----##8 EXAMPLE----- - Return multiple values asynchronously with observable.subscribe

// const foo = Rx.Observable.create(observer => {
//     console.log('hello');
//     observer.next(42);
//     observer.next(100);
//     observer.next(200);
//     setTimeout(() => {
//         observer.next(300);
//     },1000);
// })

// console.log('before');
// foo.subscribe(x => console.log(x));
// console.log('after');

//-----##9 EXAMPLE----- - Creating Observables

// const observable = Rx.Observable.create(function subscribe(observer){
//     const id = setInterval(() => {
//         observer.next('hi');
//     }, 1000);
// })

// observable.subscribe(x => console.log(x));

//-----##10 EXAMPLE----- - many next notifications, it stops on error or complete

// const observable = Rx.Observable.create(observer => {
//     observer.next(1);
//     observer.next(2);
//     observer.next(3);
//     observer.complete();
//     observer.next(4); //this is not delivered anymore
// })

// observable.subscribe(x => console.log(x));

//-----##11 EXAMPLE----- - Try/catch good practice

// const observable = Rx.Observable.create(observer => {
//     try {
//         observer.next(1);
//         observer.next(2);
//         observer.next(3);
//         observer.next(4);
//     } catch (err) {
//         observer.error(err);
//     }
// })

// observable.subscribe(x => console.log(x));

//-----##12 EXAMPLE----- - unsubscribe()

// const observable1 = Rx.Observable.interval(400);
// const observable2 = Rx.Observable.interval(300);

// const subscription = observable1.subscribe(x => console.log('first: ' + x));
// const childSubscription = observable2.subscribe(x => console.log('second: ' + x));

// subscription.add(childSubscription); // merge subscriptions

// setTimeout(() => {
//     subscription.unsubscribe();
// }, 2000);

//-----##13 EXAMPLE----- - Subject example - subject allow multiple observers

// const subject = new Rx.Subject();

// subject.subscribe({
//     next: (v) => console.log('ObserverA: ' + v)
// });

// subject.subscribe({
//     next: (v) => console.log('ObserverB: ' + v)
// });

// subject.next(1);
// subject.next(2);

//##-----14 EXAMPLE----- - subject as argument to the subscribe in observable

// const subject = new Rx.Subject();
// subject.subscribe({
//     next: (v) => console.log('observerA: ' + v)
// })

// subject.subscribe({
//     next: (v) => console.log('observerB: ' + v)
// }) 

// const observable = Rx.Observable.from([1,2,3,6]);

// observable.subscribe(subject);

//-----##15 EXAMPLE----- -multicasted observables 

// const source = Rx.Observable.from([1,2,3]);
// const subject = new Rx.Subject();
// const multicasted = source.multicast(subject);

// multicasted.subscribe({
//     next: (v) => console.log(`observerA ${v}`)
// })

// multicasted.subscribe({
//     next: (v) => console.log(`observerB ${v}`)
// })

// multicasted.connect();

//-----##16 EXAMPLE----- -multicasted observables 

// var source = Rx.Observable.interval(100);
// var subject = new Rx.Subject();
// var multicasted = source.multicast(subject);
// var subscription1, subscription2, subscriptionConnect;

// subscription1 = multicasted.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });
// // We should call `connect()` here, because the first
// // subscriber to `multicasted` is interested in consuming values
// subscriptionConnect = multicasted.connect();


// //pana in momentul asta observerA se executa de 6 ori 
// //observerB porneste dupa 600ms 
// setTimeout(() => {
//   subscription2 = multicasted.subscribe({
//     next: (v) => console.log('observerB: ' + v)
//   });
// }, 600);

// //observerA se opreste dupa ce se executa de 11 ori
// setTimeout(() => {
//   subscription1.unsubscribe();
// }, 1200);

// //observerB se opreste dupa ce se executa de 19 ori
// setTimeout(() => {
//   subscription2.unsubscribe();
//   subscriptionConnect.unsubscribe(); // for the shared Observable execution
// }, 2000);

//-----##17 EXAMPLE----- count the occurence of observera and observerb. Reference counting

// var source = Rx.Observable.interval(100);
// var subject = new Rx.Subject();
// var refCounted = source.multicast(subject).refCount();
// var subscription1, subscription2, subscriptionConnect;

// console.log('observerA subscribed');
// subscription1 = refCounted.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });

// setTimeout(()=>{
//     console.log('observerB subscribed');
//     subscription2 = refCounted.subscribe({
//         next: (v) => console.log('observerB: ' + v)
//     });
// }, 1000)


// setTimeout(() => {
//   console.log('observerA unsubscribed');
//   subscription1.unsubscribe();
// }, 1200);

// setTimeout(() => {
//   console.log('observerB unsubscribed');
//   subscription2.unsubscribe();
// }, 1800);


//-----##18 EXAMPLE----- represent values over time with behavior subject

// var subject = new Rx.BehaviorSubject(7);

// subject.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// })

// subject.next(1);
// subject.next(2);

// subject.subscribe({
//     next: (v) => console.log(`observerB: ${v}`)
// })

// subject.next(3);

//-----##19 EXAMPLE----- it replays the numbers setted . if 3 it repeats 2,3,4. if 2 it repeats 3,4

// const subject = new Rx.ReplaySubject(3);

// subject.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// })

// subject.next(1)
// subject.next(2)
// subject.next(3)
// subject.next(4)

// subject.subscribe({
//     next: (v) => console.log(`observerB: ${v}`)
// })

// subject.next(5);


//-----##20 EXAMPLE-----

// const subject = new Rx.ReplaySubject(100, 1500);

// subject.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// });

// var i = 1;

// setInterval(()=>subject.next(i++), 1200);

// setTimeout(()=> {
//     subject.subscribe({
//         next: (v) => console.log(`observerB ${v}`)
//     });
// }, 1000)


//-----##21 EXAMPLE----- asyncsubject returns 5 

// const subject = new Rx.AsyncSubject();

// subject.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// })

// subject.next(1);
// subject.next(2);
// subject.next(3);
// subject.next(4);

// subject.subscribe({
//     next: (v) => console.log(`observerB: ${v}`)
// })

// subject.next(5);

// subject.complete();


// -----##22 EXAMPLE-----  OPERATORS . multiply list with 10

// const multiplyByTen = (input) => {
//     const output = Rx.Observable.create(observer => {
//         input.subscribe({
//             next: (v) => observer.next(10 * v),
//             error: (err) => observer.error(err),
//             complete: () => observer.complete()
//         });
//     });
//     return output;
// }

// const input = Rx.Observable.from([1,2,3,4]);
// const output = multiplyByTen(input);
// output.subscribe(x => console.log(x) );


// -----##23 EXAMPLE----- SCHEDULERS

// const observable = Rx.Observable.create(observer => {
//     observer.next(1);
//     observer.next(2);
//     observer.next(3);
//     observer.complete();
// })
// .observeOn(Rx.Scheduler.async);

// console.log('just before subscribe');

// observable.subscribe({
//     next: x => console.log(`got value ${x}`),
//     error: err => console.error(`something wrong occured ${err}`),
//     complete: () => console.log('done')
// })

// console.log('just after subscribe');

// const axios = require('axios');


// ----- TUTORIAL -----
// Rx.Observables.of('foo','bar');

// Rx.Observable.from([1,2,3]);

// Rx.Observable.fromEvent(button,'click')

// Rx.Observable.fromPromise(fetch('/users'));

const input = Rx.Observable.fromEvent(document.querySelector('input'), 'input');

//delays the appereance of the input
// input.delay(500)
//     .map(event => event.target.value)
//     .subscribe(caine => console.log(caine));


//outputs only if there are 3 or more characters in the input
// input.filter(event => event.target.value.length > 2)
//     .map(event => event.target.value)
//     .subscribe(value => console.log(value));


//delays
// input.throttleTime(1200)
//     .map(event => event.target.value)
//     .subscribe(value => console.log(value));


//delays and lets you finish typing before outputing
// input.debounceTime(1200)
//     .map(event => event.target.value)
//     .subscribe(s => console.log(s));


//stops the stream of events after 3 event
// input.take(3) 
//     .map(event => event.target.value)
//     .subscribe(v => console.log(v));


//take until the button stops the stream
// const stopStream = Rx.Observable.fromEvent(button, 'click');
// input.takeUntil(stopStream)
//     .map(event => event.target.value)
//     .subscribe(value => console.log(value));


//pass a new value
// input.map(event => event.target.value)
//     .subscribe(value => console.log(value));


//pass a new value 2
// input.pluck('target','value').pairwise()
//     .subscribe(value => console.log(value));


// Rx.Observable.fromEvent(button,'click')
//     .scan(count => count + 1, 0)
//     .subscribe(v => console.log(v));


// --------- EXPLORE THE API ---------


// -- Create an observable

// const observable = Rx.Observable.create(observer => {
//     observer.next(1);
//     observer.next(2);
//     observer.next(3);
//     observer.complete();
// })

// observable.subscribe(
//     value => console.log(value),
//     err => {},
//     () => console.log('end')
// );



// const result = Rx.Observable.fromPromise(fetch('https://www.reddit.com/r/wtf.json'));
// result.subscribe(x => console.log(x), e => console.error(e));

// var numbers = Rx.Observable.range(1, 10);
// numbers.subscribe(x => console.log(x));

// const numbers = Rx.Observable.of(10,20,30);
// const letters = Rx.Observable.of('a','b','c');
// const interval = Rx.Observable.interval(1000);
// const result = numbers.concat(letters).concat(interval);
// result.subscribe(x => console.log(x));

// const observable = Rx.Observable.interval(1000)
// .subscribe(x => console.log(x));

// const timer = Rx.Observable.timer(3000, 1000)
// .subscribe(x => console.log(x));

// const clicks = Rx.Observable.fromEvent(button,'click')
//     .map(x => x.clientX)
//     .subscribe(x => console.log(x));

// var clicks = Rx.Observable.fromEvent(document, 'click');
// var greetings = clicks.mapTo('Hi');
// greetings.subscribe(x => console.log(x));

// const clicks = Rx.Observable.fromEvent(button, 'click');
// var tagNames = clicks.pluck('target','tagName');
// tagNames.subscribe(x => console.log(x));

// const arr = Rx.Observable.of(1,2,3,4,5)
// .filter(x => x % 2 === 0)
// .subscribe(d => console.log(d))

// var interval = Rx.Observable.interval(1000)
//     .take(5)
//     .subscribe(x=>console.log(x));

// var clicks = Rx.Observable.fromEvent(document,'click')
//     .takeWhile(ev => ev.clientX > 200)
//     .subscribe(x => console.log(x));

// const arr = Rx.Observable.of(1,2,3,4,5)
// .skip(2)
// .subscribe(x => console.log(x));

// const clicks = Rx.Observable.fromEvent(document, 'click')
//     .throttleTime(1000)
//     .subscribe(x => console.log(x))

// const clicks = Rx.Observable.fromEvent(document, 'click')
//     .debounce(() => Rx.Observable.interval(1000))
//     .subscribe(x => console.log(x));

// const arr = Rx.Observable.of(1,23,23,32,42,1,1,1,2,2,2,2,2,45)
//     .distinctUntilChanged().subscribe(x => console.log(x));

// const clicks = Rx.Observable.fromEvent(document,'click')
//     .takeUntil(Rx.Observable.interval(1000));
// var ones = clicks.mapTo(1);
// var count = ones.reduce((acc, one)=> acc + one, 0);
//     count.subscribe(x => console.log(x));

// const x = Rx.Observable.of(1,2,3)
//     .scan((acc, curr)=> acc+curr, 0)
//     .subscribe(x => console.log(x))

// var letters = Rx.Observable.of('a','b',13,'d');
// var upperCase = letters.map(x => x.toUpperCase());
// var materialized = upperCase.materialize();
// materialized.subscribe(x => console.log(x));


// var seconds = Rx.Observable.interval(1000);
// var clicks = Rx.Observable.fromEvent(document, 'click');
// var secondsBeforeClick = seconds.takeUntil(clicks);
// var result = secondsBeforeClick.count();
// result.subscribe(x => console.log(x));


// const numbers = Rx.Observable.range(1,7);
// const result = numbers.count(i => i % 2 === 1);
// result.subscribe(x => console.log(x));

// const cv = Rx.Observable.of(1,2,3,4)
//     .startWith('ca')
//     .subscribe(x => console.log(x))

// var clicks = Rx.Observable.fromEvent(document,'click')
//     .delay(1000)
//     .subscribe(x => console.log(x))

// let source = Rx.Observable
// .of(42,53,21,24)
// .bufferCount(3)
// .subscribe(x => console.log(x));


// var clicks = Rx.Observable.fromEvent(document, 'click');
// var parts = clicks.partition(ev => ev.target.tagName === 'DIV');
// var clicksOnDivs = parts[0];
// var clicksElsewhere = parts[1];
// clicksOnDivs.subscribe(x => console.log('div clicked: ', x));
// clicksElsewhere.subscribe(x => console.log('other clicked: ', x));

// var clicks = Rx.Observable.fromEvent(document, 'click')
//     .bufferTime(2000)
//     .subscribe(x => console.log(x));

// var clicks = Rx.Observable.fromEvent(document, 'click');
// var interval = Rx.Observable.interval(1000);
// var buffered = interval.buffer(clicks);
// buffered.subscribe(x => console.log(x));

// const clicks = Rx.Observable.fromEvent(document, 'click');
// const buffered = clicks.bufferWhen(()=> Rx.Observable.interval(1000 + Math.random()*4000));
// buffered.subscribe(x => console.log(x));


// const d = Rx.Observable.of(1,2,3,4,5,6)
//     .groupBy(i => i % 2)
//     .subscribe(x => console.log(x));

// var letters = Rx.Observable.of('a','b','c');
// var result = letters.expand(x => 
//     Rx.Observable.interval(1000).map(i => x + i)
// );
// result.subscribe(x => console.log(x));

// const timer1 = Rx.Observable.interval(1000).take(10);
// const timer2 = Rx.Observable.interval(2000).take(6);
// const timer3 = Rx.Observable.interval(500).take(10);

// var merged = Rx.Observable.merge(timer1, timer2,timer3);
// merged.subscribe(x => console.log(x));


//Asynchronous dispatch
/*

const pingEpic = action$ => 
    action$.filter(action => action.type === 'PING')
    .delay(1000)
    .mapTo({type: 'PONG'});

const pingReducer = (state = {isPinging: false}, action) => {
    switch(action.type) {
        case 'PING':
            return {isPinging: true};
        case 'PONG': 
            return {isPinging: false};
        default:
            return state;
    }
}

it will receive the ping action and after one second will receive the pong action

*/


/*
Fetch data from github


import {ajax} from 'rxjs/observable/dom/ajax';

//action creator
const fetchUser = username => ({
    type: 'FETCH_USER',
    payload: username
});

const fetchUserFulfilled = payload => ({
    type: 'FETCH_USER_FULFILLED',
    payload
})

//epic
const fetchUserEpic = action$ => 
    action$.ofType('FETCH_USER')
        .mergeMap(action => 
            ajax.getJSON(`https://api.github.com/users/${action.payload}`)
                .map(response => fetchUserFulfilled(response))  
        );


//reducer
const users = (state= {}, action) => {
    switch(action.type) {
        case 'FETCH_USER_FULFILLED': 
            return {
                ...state,
                [action.payload.login]: action.payload
            }
        default: 
            return state;
    }
}

*/


/*

//action creators
const increment = () => ({
    type: 'INCREMENT'
})

const incrementIfOdd = () => ({
    type: 'INCREMENT_IF_ODD'
})

//epic
const incrementIfOddEpic = (action$, store) =>
    action$.ofType('INCREMENT_IF_ODD')
        .filter(() => store.getState().counter % 2 === 1)
        .map(() => increment())

//reducer
const counter = (state = 0, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        default: 
            return state;
    }
}

//later 
dispatchEvent(incrementIfOdd());

*/



/*

//how to combine epics
const rootEpic = combineEpics(
    pingEpic,
    fetchUserEpic
)

*/


/* HOW TO SETUP THE STORE WITH REDUCERS AND EPICS


//import all epics into a single file which then export the root epic and the root reducer

import {combineEpics} from 'redux-observable';
import {combineReducers} from 'redux';
import reducer1, {epic1} from '../blabla/epic';
import reducer2, {epic2} from '../blabla/epic2';

export const rootEpic = combineEpics(
    epic1,
    epic2
)

export const rootReducer = combineReducers({
    reducer1,
    reducer2
})

//after that import 
import {createEpicMiddleware} from 'redux-observable';
import {rootEpic} from '../up';

const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore(){
    const store = createStore(
        rootReducer,
        applyMiddleware(epicMiddleware)
    );
    return store;
}


*/



//RECIPES 

/*

//1 CANCELATION
const fetchUserEpic = action$ => 
    action$.ofType(FETCH_USER)
    .mergeMap(action => 
        ajax.getJSON(`/api/users/${action.payload}`)
        .map(response => fetchUserFulfilled(response))
        .takeUntil(action$.ofType(FETCH_USER_CANCELLED))
    );


*/


/*

//CREATE A SECOND OBSERVER TO MANAGE ERRORS IN ASYNC AND SHIELD THE MAIN OBSERVER CHAIN

const rx = Rx.Observable.interval(1000)
    .switchMap(() => this.http.get(url)
        .catch(err => Observable.empty())
    )
    .subscribe(data => render(data))


*/


/*

//ERROR HANDLING 

const fetchUserEpic = action$ => 
    action$.ofType('FETCH_USER')
        .mergeMap(action => 
            ajax.getJSON(`/api/users/${action.payload}`)
            .map(response => fetchUserFulfilled(response))
            .catch(error => Observable.of({
                type: 'FETCH_USER_REJECTED'
            }))
        )

*/


/*

//FETCH DATA WITH AXIOS IN EPIC
import axios from 'axios';

const fetchUserEpic = action$ => 
    action$.ofType('fetch_user')
        .flatMap(() => 
            Observable.from(axios.get('/api/users/1'))
            .map(response => ({type: 'fetch_user_done', user: response.data}))
            .catch(error => Observable.of({type:'fetch_user_error', error}))
            .startWith({type: 'fetch_user_ing'})
        )

*/




