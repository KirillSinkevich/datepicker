import {
  animate,
  animation,
  AnimationTriggerMetadata,
  keyframes,
  style,
  transition,
  trigger
} from "@angular/animations";

export const fadeInUp: AnimationTriggerMetadata = trigger('fadeInUp', [
  transition(
  ':enter',
  animation([
    style({opacity: 0}),
    animate(
      150,
      keyframes([
        style({opacity: 0, transform: 'translate(0px, -50px)'}),
        style({opacity: 1, transform: 'translate(0px, 0px)'}),
      ]),
    ),
  ])),
    transition(
  ':leave',
  animation([
    style({opacity: 0}),
    animate(
      150,
      keyframes([
        style({opacity: 1, transform: 'translate(0px, 0px)'}),
        style({opacity: 0, transform: 'translate(0px, -50px)'}),
      ]),
    ),
  ]))

]);
