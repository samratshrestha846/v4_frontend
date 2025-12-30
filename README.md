Hyper React was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

[![Quality Gate Status](https://sonar.ditagtech.com/api/project_badges/measure?project=dit-technologies_v4-frontend_AZEHtI0tksuPDo1fkUwZ&metric=alert_status&token=sqb_8f120264e725186524167782ae7f317e6ff1a5b7)](https://sonar.ditagtech.com/dashboard?id=dit-technologies_v4-frontend_AZEHtI0tksuPDo1fkUwZ)

# Docker-React Install
#### Building our image
Now to get our container up and running, we have to first run the build command. This command goes over every step we have defined in our dockerfile as you will see when you run it:

### `docker build -t nameofyourapp:latest .`

#### Running your container
Now to get our container up and running, we have to first run the build command. This command goes over every step we have defined in our dockerfile as you will see when you run it:

### `docker run --name nameofyourchoice -d -p yourcustomport:3000 nameofyourapp:latest`

######-d: This runs your container in detached mode. Simply put, when you leave a terminal session, it keeps your container running still.
######-p: This is used to publish the port you would like your application to run on. If you run your container without publishing a port, whatever is running in your container will only be accessible in your container.

See the section about [docker-react](https://medium.com/geekculture/getting-started-with-docker-in-your-react-js-application-the-basics-6e5300cf749d) for more information.

##Theme
Hyper React – Admin & Dashboard Template [ReactJS] https://themes.getbootstrap.com/product/hyper-react-admin-dashboard-template/


## Available Scripts

In the project directory, you can run:
### `yarn`

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# v4_frontend
