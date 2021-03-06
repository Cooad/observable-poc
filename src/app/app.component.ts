import { Component } from '@angular/core';
import { merge } from "rxjs";
import { ObservablesService } from './services/observables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Observable POC';

  constructor(private service: ObservablesService) {}

  async demo1() {
    console.log('Firing demo without custom unsubscribe');
    let sub = this.service.getWithoutCustomUnsubscribe().subscribe(x => console.log('oudside 1: ',x));
    await wait(5000);
    let sub2 = this.service.getWithoutCustomUnsubscribe().subscribe(x => console.log('outside 2: ',x));
    await wait(5000);
    sub.unsubscribe();
    await wait(2100);
    sub2.unsubscribe();
  }

  async demo2() {
    console.log('Firing demo with custom unsubscribe');
    let sub = this.service.getWithCustomUnsubscribe().subscribe(x => console.log('oudside 1: ',x));
    await wait(5000);
    let sub2 = this.service.getWithCustomUnsubscribe().subscribe(x => console.log('outside 2: ',x));
    await wait(5000);
    sub.unsubscribe();
    await wait(2100);
    sub2.unsubscribe();
  }

  async demo3() {
    console.log('Firing demo with share');
    let sub = this.service.getWithShare().subscribe(x => console.log('oudside 1: ',x));
    await wait(5000);
    let sub2 = this.service.getWithShare().subscribe(x => console.log('outside 2: ',x));
    await wait(5000);
    sub.unsubscribe();
    await wait(2100);
    sub2.unsubscribe();
    await wait(1000);
    let sub3 = this.service.getWithShare().subscribe(x => console.log('oudside 3: ',x));
    await wait(4000);
    sub3.unsubscribe();
  }

  async demo4() {
    console.log('Firing merge test');
    let sub = merge(
      this.service.getFromTo(1,5),
      this.service.getFromTo(6,10)
      )
      .subscribe(console.log,null,() => console.log('completes'));
  }
}

function wait(wait: number): Promise<void> {
  return new Promise((resolve,reject) => {
    setTimeout(() => resolve(),wait);
  })
}
