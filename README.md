# react-slider
Custom implementation of slider component for react. Implemented as a task for position in `PSPDFKit`.

## Overview
Because the task is to implement only one component I decided it makes more sense to implement it within `storybook` instead of 
spinning the whole react project (Remix.run or Next.js or something similar). The component is simple it allows user to change
the value either by dragging the handle or pressing `left` and `right` keys while handle is in focus. 
I did some basic project setup, like setting up linter, prettier, tests but did not go too deep into it since it was not 
the main objective of the task. There are several more things that should be done when setting up "component library project" and
I'm happy to talk about those on interview. 

~Sliding functionality relied on `drag` api and it's events `onDrag`, `onDragStart` and `onDragEnd`.~ When dragging starts, first thing is to remember initial position of cursor in component ref. When user moves mouse `onDrag` events are fired so I pick up position of the cursor and compare it to initial position. That way I can calculate X-axis offset. Then I compare that offset to the whole width of slider to get percentage of the whole range that was changed. Finally I add that percentage to the current value to update it and make handle track the cursor.

While the previous version looked good on Chrome looks like there's an [issue](https://bugzilla.mozilla.org/show_bug.cgi?id=505521) on Firefox. So I replaced the implementation with one that relies on `mousemove` event instead of `drag`. The logic is exactly the same just events that are triggering it are different

Few things worth noting is I added accessability properties. Few unit tests are added. I'm using css modules because vite (which is
used for bundling here) supports them out of the box.

## Running the project
After clonning the repo run:
```bash
npm i 
npm run storybook
```

It should run storybook with only one component present on `localhost:6006`. Visit that page and you should see the slider.
