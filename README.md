# oral-food-challenge

This project is a small project to examine food allergies and intolerances using the concept of [oral food challenge](https://en.wikipedia.org/wiki/Oral_food_challenge).

The general idea is to have a baseline diet that does not trigger any reaction in the subject, and then have periods where one certain food is consumed in ever increasing amounts to see if it triggers a reaction. 

Every day a set of pictures need to be taken using the same angles, lightning etc and the image browser in this project is designed to being able to quickly browse the images so that any changes in the skin can be examined efficiently. 

To use, edit the daily-log.json file and upload the images to the public folder matching the base uri specified in the imagesBaseUri property in the daily-log.json file. The images need to be ordered consitently based on the angle the image is taken at for the image browser to work as intended. The periods between the the oral food challenges is called elimination periods and is specified by setting elimination=true in the daily-log.json file and is colored green on the web frontend.

Click on an image to open it in image mode. Then use the keyboard arrow keys or click on the image to navigate and the Escape key or click outside image to exit. The images are navigated as a 2-dimensional grid, so that using arrow up/down or click top/bottom of the image goes to the next/previous day for that specific image angle. Image angle can be changed by using arrow left/right or click left/right of the image. 

The main point of this project is that by quickly navigating between the different days it's possible to identify minor changes in the skin for a specific day and match that to the food that was consumed.

The helper-projects folder contains mini-projects for data processing etc.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Disclaimer

The author(s) does not take any responsibility for the use of this project or the practice of performing oral food challenge.