import { Injectable } from "@angular/core";
import { Observable, Observer, interval } from "rxjs";
import { share, map, take } from "rxjs/operators";


@Injectable({
  providedIn: "root"
})
export class ObservablesService {

  private observable1$: Observable<number>;
  private observable2$: Observable<number>;
  private observable3$: Observable<number>;


  constructor() {
    this.observable1$ = Observable.create((observer: Observer<any>) => {
      let counter = 0;
      setInterval(() => {
        counter += 1;
        console.log('internal without custome unsubscribe', counter);
        observer.next(counter);
        if (counter === 11)
          console.warn('You need to reload the page to get rid of it');
      }, 1000);
    });

    this.observable2$ = Observable.create((observer: Observer<any>) => {
      let counter = 0;
      let interval = setInterval(() => {
        counter += 1;
        console.log('internal with custom unsubscribe', counter);
        observer.next(counter);
      }, 1000);
      return () => clearInterval(interval);
    })

    this.observable3$ = Observable.create((observer: Observer<any>) => {
      let counter = 0;
      let interval = setInterval(() => {
        counter += 1;
        console.log('internal with share', counter);
        observer.next(counter);
      }, 1000);
      return () => clearInterval(interval);
    }).pipe(share())
  }

  getWithoutCustomUnsubscribe() {
    return this.observable1$;
  }

  getWithCustomUnsubscribe() {
    return this.observable2$;
  }

  getWithShare() {
    return this.observable3$;
  }

  getFromTo(startingNumber: number, endingNumber): Observable<number> {
    return interval(1000).pipe(
      map(i => i+startingNumber),
      take(endingNumber-startingNumber+1)
    );
  }
}
