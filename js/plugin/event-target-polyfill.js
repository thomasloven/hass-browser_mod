/*
This file is copied from https://github.com/benlesh/event-target-polyfill and tweaked such that it never polyfills Event

MIT License

Copyright (c) 2020 Ben Lesh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const root =
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global);

function isConstructor(fn) {
  try {
    new fn();
  } catch (error) {
    return false;
  }
  return true;
}

if (false) {
  root.Event = (function () {
    function Event(type, options) {
      this.bubbles = !!options && !!options.bubbles;
      this.cancelable = !!options && !!options.cancelable;
      this.composed = !!options && !!options.composed;
      this.type = type;
    }

    return Event;
  })();
}

if (
  typeof root.EventTarget === "undefined" ||
  !isConstructor(root.EventTarget)
) {
  root.EventTarget = (function () {
    function EventTarget() {
      this.__listeners = new Map();
    }

    EventTarget.prototype = Object.create(Object.prototype);

    EventTarget.prototype.addEventListener = function (
      type,
      listener,
      options
    ) {
      if (arguments.length < 2) {
        throw new TypeError(
          `TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only ${arguments.length} present.`
        );
      }
      const __listeners = this.__listeners;
      const actualType = type.toString();
      if (!__listeners.has(actualType)) {
        __listeners.set(actualType, new Map());
      }
      const listenersForType = __listeners.get(actualType);
      if (!listenersForType.has(listener)) {
        // Any given listener is only registered once
        listenersForType.set(listener, options);
      }
    };

    EventTarget.prototype.removeEventListener = function (
      type,
      listener,
      _options
    ) {
      if (arguments.length < 2) {
        throw new TypeError(
          `TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only ${arguments.length} present.`
        );
      }
      const __listeners = this.__listeners;
      const actualType = type.toString();
      if (__listeners.has(actualType)) {
        const listenersForType = __listeners.get(actualType);
        if (listenersForType.has(listener)) {
          listenersForType.delete(listener);
        }
      }
    };

    EventTarget.prototype.dispatchEvent = function (event) {
      if (!(event instanceof Event)) {
        throw new TypeError(
          `Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'.`
        );
      }
      const type = event.type;
      const __listeners = this.__listeners;
      const listenersForType = __listeners.get(type);
      if (listenersForType) {
        for (const [listener, options] of listenersForType.entries()) {
          try {
            if (typeof listener === "function") {
              // Listener functions must be executed with the EventTarget as the `this` context.
              listener.call(this, event);
            } else if (listener && typeof listener.handleEvent === "function") {
              // Listener objects have their handleEvent method called, if they have one
              listener.handleEvent(event);
            }
          } catch (err) {
            // We need to report the error to the global error handling event,
            // but we do not want to break the loop that is executing the events.
            // Unfortunately, this is the best we can do, which isn't great, because the
            // native EventTarget will actually do this synchronously before moving to the next
            // event in the loop.
            setTimeout(() => {
              throw err;
            });
          }
          if (options && options.once) {
            // If this was registered with { once: true }, we need
            // to remove it now.
            listenersForType.delete(listener);
          }
        }
      }
      // Since there are no cancellable events on a base EventTarget,
      // this should always return true.
      return true;
    };

    return EventTarget;
  })();
}
