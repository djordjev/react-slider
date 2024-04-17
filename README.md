# react-slider
Custom implementation of slider component for react. Implemented as a task for position in `PSPDFKit`.

## Overview
Because the task is to implement only one component I decided it makes more sense to implement it within `storybook` instead of 
spinning the whole react project (Remix.run or Next.js or something similar). The component is simple it allows user to change
the value either by dragging the handle or pressing `left` and `right` keys while handle is in focus. 
I did some basic project setup, like setting up linter, prettier, tests but did not go too deep into it since it was not 
the main objective of the task. There are several more things that should be done when setting up "component library project" and
I'm happy to talk about those on interview. 

## Running the project
After clonning the repo run:
```bash
npm i 
npm run storybook
```

It should run storybook with only one component present on `localhost:6006`. Visit that page and you should see the slider.
