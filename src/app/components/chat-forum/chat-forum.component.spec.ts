import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatForumComponent } from './chat-forum.component';

describe('ChatForumComponent', () => {
  let component: ChatForumComponent;
  let fixture: ComponentFixture<ChatForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
