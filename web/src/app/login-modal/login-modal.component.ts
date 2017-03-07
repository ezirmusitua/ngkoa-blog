import { Component, OnInit, Input, Output, EventEmitter, trigger, state, style, animate, transition } from '@angular/core';
import { UserService } from '../user.service';
import { RxSubjectService } from '../shared/rx-subject.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'jfb-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(0.3, 0.3, 0.3)' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ transform: 'scale3d(.3, .3, .3)' }))
      ])
    ])
  ]
})
export class LoginModalComponent implements OnInit {
  visible: boolean = false;
  floatingNavSubscription: Subscription;
  email: string = '';
  password: string = '';
  constructor(
    private userService: UserService,
    private subjects: RxSubjectService,
  ) { }

  ngOnInit() {
    this.floatingNavSubscription = this.subjects.floatingNavBtnSubject.subscribe((res) => {
      if (res.category === 400) {
        this.visible = true;
      }
    });
  }

  close() {
    this.visible = false;
  }

  login() {
    this.userService.uniqLogin(this.email, this.password);
    this.password = '';
    this.visible = false;
  }
}