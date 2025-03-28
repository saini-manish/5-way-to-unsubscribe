import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Subject, Subscription, interval, takeUntil } from 'rxjs';
import { MyService } from '../my.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AutoUnsubscribe } from '../decorators/autoUnsub.decorator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
@AutoUnsubscribe()
export class UserComponent implements OnInit {
  constructor() {
    // interval(1000).pipe(takeUntilDestroyed()).subscribe(console.log);
  }
  private destroyRef = inject(DestroyRef);
  notifier = new Subject();
  private myService = inject(MyService);
  private subscription$!: Subscription;
  public users: any;
  public ngOnInit(): void {
    this.users = this.myService.getUsers();

    this.subscription$ = interval(1000).subscribe((tick: number) => {
      console.log('Subscription is listening');
    });
  }

  public ngOnDestroy(): void {
  }
}
