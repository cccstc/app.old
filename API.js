import Rx from "@reactivex/rxjs";

export const BookletObservable = () =>
    Rx.Observable
        .fromPromise(
            fetch("https://app.cccstc.org/booklet/list").then(response =>
                response.json()
            )
        )
        .map(json => Rx.Observable.from(json.booklets))
        .mergeAll();

export const RecordObservable = () =>
    Rx.Observable
        .fromPromise(
            fetch("https://app.cccstc.org/record/list").then(response =>
                response.json()
            )
        )
        .map(json => Rx.Observable.from(json.records))
        .mergeAll();
