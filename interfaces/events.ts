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

import React from "react";

export interface InpEvents<T extends HTMLInputElement | HTMLTextAreaElement> {
  onChange?: (e: React.ChangeEvent<T>) => void;
  onInput?: (e: React.FormEvent<T>) => void;

  onFocus?: (e: React.FocusEvent<T>) => void;
  onBlur?: (e: React.FocusEvent<T>) => void;

  onKeyDown?: (e: React.KeyboardEvent<T>) => void;
  onKeyPress?: (e: React.KeyboardEvent<T>) => void;
  onKeyUp?: (e: React.KeyboardEvent<T>) => void;

  onClick?: (e: React.MouseEvent<T>) => void;
  onDoubleClick?: (e: React.MouseEvent<T>) => void;
  onContextMenu?: (e: React.MouseEvent<T>) => void;

  onMouseDown?: (e: React.MouseEvent<T>) => void;
  onMouseUp?: (e: React.MouseEvent<T>) => void;
  onMouseEnter?: (e: React.MouseEvent<T>) => void;
  onMouseLeave?: (e: React.MouseEvent<T>) => void;
  onMouseMove?: (e: React.MouseEvent<T>) => void;

  onWheel?: (e: React.WheelEvent<T>) => void;

  onPaste?: (e: React.ClipboardEvent<T>) => void;
  onCopy?: (e: React.ClipboardEvent<T>) => void;
  onCut?: (e: React.ClipboardEvent<T>) => void;

  onCompositionStart?: (e: React.CompositionEvent<T>) => void;
  onCompositionUpdate?: (e: React.CompositionEvent<T>) => void;
  onCompositionEnd?: (e: React.CompositionEvent<T>) => void;

  onTouchStart?: (e: React.TouchEvent<T>) => void;
  onTouchMove?: (e: React.TouchEvent<T>) => void;
  onTouchEnd?: (e: React.TouchEvent<T>) => void;
  onTouchCancel?: (e: React.TouchEvent<T>) => void;

  onPointerDown?: (e: React.PointerEvent<T>) => void;
  onPointerMove?: (e: React.PointerEvent<T>) => void;
  onPointerUp?: (e: React.PointerEvent<T>) => void;
  onPointerCancel?: (e: React.PointerEvent<T>) => void;
  onPointerEnter?: (e: React.PointerEvent<T>) => void;
  onPointerLeave?: (e: React.PointerEvent<T>) => void;
  onPointerOver?: (e: React.PointerEvent<T>) => void;
  onPointerOut?: (e: React.PointerEvent<T>) => void;
}
