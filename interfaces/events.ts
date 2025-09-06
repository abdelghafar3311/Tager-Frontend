export interface Events {
  onClick?: () => void;

  // 🖱️ Mouse Events
  onDoubleClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onMouseMove?: () => void;

  // 🎹 Keyboard Events
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;

  // 👆 Focus
  onFocus?: () => void;
  onBlur?: () => void;

  // 📱 Touch Events
  onTouchStart?: () => void;
  onTouchMove?: () => void;
  onTouchEnd?: () => void;
  onTouchCancel?: () => void;

  // 🖥️ Pointer Events
  onPointerDown?: () => void;
  onPointerMove?: () => void;
  onPointerUp?: () => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onPointerCancel?: () => void;

  // 🎨 Animation & Transition Events
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
  onAnimationIteration?: () => void;
  onTransitionEnd?: () => void;
}
